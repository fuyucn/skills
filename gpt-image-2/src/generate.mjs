#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const SIZES = new Set(["1024x1024", "1792x1024", "1024x1792"]);

function help() {
  console.log(`GPT Image 2 Generator — via third-party Token Hub

Usage:
  node src/generate.mjs --prompt "your prompt" [options]

Options:
  --prompt <text>       Image description (required).
  --size <WxH>          1024x1024, 1792x1024, or 1024x1792. Default: 1024x1024.
  --n <number>          Images to generate (1-10). Only 1 for non-square sizes.
  --format <type>       url (returns link) or b64_json (saves locally). Default: b64_json.
  --output-dir <path>   Default: outputs.
  --prefix <name>       Output filename prefix. Default: gpt-image.
  --help                Show this help.

Environment (.env file in skill root):
  GPT_IMAGE_BASE_URL   Third-party hub base URL (e.g. https://hub.example.com).
  GPT_IMAGE_TOKEN      Auth token from the hub.`);
}

function parseArgs(argv) {
  const args = {
    size: "1024x1024",
    n: 1,
    format: "b64_json",
    outputDir: path.resolve("outputs"),
    prefix: "gpt-image",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) throw new Error(`Missing value for ${arg}`);
      i += 1;
      return value;
    };

    switch (arg) {
      case "-h":
      case "--help":
        args.help = true;
        break;
      case "-p":
      case "--prompt":
        args.prompt = next();
        break;
      case "--size":
        args.size = next();
        break;
      case "--n":
        args.n = Number(next());
        break;
      case "--format":
        args.format = next();
        break;
      case "--output-dir":
        args.outputDir = path.resolve(next());
        break;
      case "--prefix":
        args.prefix = next().replace(/[^a-zA-Z0-9._-]/g, "-");
        break;
      default:
        if (!arg.startsWith("--") && !args.prompt) {
          args.prompt = [arg, ...argv.slice(i + 1)].join(" ");
          i = argv.length;
          break;
        }
        throw new Error(`Unknown option: ${arg}`);
    }
  }

  return args;
}

async function loadDotEnv() {
  try {
    const text = await readFile(path.resolve(".env"), "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (!match || process.env[match[1]]) continue;
      process.env[match[1]] = match[2].trim().replace(/^["']|["']$/g, "");
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

function validate(args) {
  if (args.help) return;
  if (!args.prompt || !args.prompt.trim()) throw new Error("Provide --prompt with a non-empty prompt.");
  if (!SIZES.has(args.size)) throw new Error(`--size must be one of: ${[...SIZES].join(", ")}`);
  if (!Number.isInteger(args.n) || args.n < 1 || args.n > 10) throw new Error("--n must be an integer from 1 to 10.");
  if (args.size !== "1024x1024" && args.n > 1) throw new Error("--n can only be > 1 for size 1024x1024.");
  if (!["url", "b64_json"].includes(args.format)) throw new Error('--format must be "url" or "b64_json".');
  if (args.prompt.length > 4000) throw new Error(`Prompt too long: ${args.prompt.length} chars. Max is 4000.`);
}

async function generateImages(args, baseUrl, token) {
  const url = `${baseUrl.replace(/\/+$/, "")}/v1/images/generations`;
  const body = {
    model: "gpt-image-2",
    prompt: args.prompt,
    n: args.n,
    size: args.size,
    response_format: args.format,
  };

  console.log(`endpoint: ${url}`);
  console.log(`model: gpt-image-2`);
  console.log(`size: ${args.size} | n: ${args.n} | format: ${args.format}`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Invalid JSON response (${response.status}): ${text.slice(0, 500)}`);
  }

  if (!response.ok) {
    throw new Error(`API ${response.status}: ${JSON.stringify(data, null, 2)}`);
  }

  return data;
}

async function saveImages(data, args) {
  await mkdir(args.outputDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const results = [];

  for (let i = 0; i < data.data.length; i += 1) {
    const item = data.data[i];
    const suffix = data.data.length > 1 ? `-${String(i + 1).padStart(2, "0")}` : "";
    const base = `${args.prefix}-${timestamp}${suffix}`;

    if (args.format === "b64_json" && item.b64_json) {
      const ext = ".png";
      const imagePath = path.join(args.outputDir, `${base}${ext}`);
      await writeFile(imagePath, Buffer.from(item.b64_json, "base64"));
      results.push({ index: i, localPath: imagePath, url: item.url });
      console.log(`saved [${i + 1}/${data.data.length}]: ${imagePath}`);
    } else if (item.url) {
      results.push({ index: i, url: item.url });
      console.log(`url [${i + 1}/${data.data.length}]: ${item.url}`);
    }
  }

  return { results, timestamp, base: `${args.prefix}-${timestamp}` };
}

async function writeMetadata(args, data, saved) {
  await mkdir(args.outputDir, { recursive: true });
  const metadataPath = path.join(args.outputDir, `${saved.base}.json`);
  await writeFile(
    metadataPath,
    `${JSON.stringify(
      {
        model: "gpt-image-2",
        prompt: args.prompt,
        size: args.size,
        n: args.n,
        format: args.format,
        images: saved.results,
        api_response: data,
        created_at: new Date().toISOString(),
      },
      null,
      2,
    )}\n`,
  );
  console.log(`metadata: ${metadataPath}`);
  return metadataPath;
}

async function main() {
  await loadDotEnv();
  const args = parseArgs(process.argv.slice(2));
  if (args.help) return help();
  validate(args);

  const baseUrl = process.env.GPT_IMAGE_BASE_URL;
  const token = process.env.GPT_IMAGE_TOKEN;
  if (!baseUrl) throw new Error("Missing GPT_IMAGE_BASE_URL. Set it in the skill .env file.");
  if (!token) throw new Error("Missing GPT_IMAGE_TOKEN. Set it in the skill .env file.");

  console.log("Generating...\n");
  const data = await generateImages(args, baseUrl, token);
  const saved = await saveImages(data, args);
  await writeMetadata(args, data, saved);

  console.log("\nDone.");
}

main().catch((error) => {
  console.error(`\nError: ${error.message}`);
  process.exitCode = 1;
});

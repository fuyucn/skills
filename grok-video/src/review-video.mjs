#!/usr/bin/env node
import { mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { spawn } from "node:child_process";
import ffmpegPath from "ffmpeg-static";

function help() {
  console.log(`Grok video frame review

Usage:
  npm run review -- --video outputs/video.mp4 [options]

Options:
  --video <path>       Required video file.
  --output-dir <path>  Default: outputs/reviews.
  --fps <number>       Frames per second to sample. Default: 1.
  --tile <cols>x<rows> Contact sheet tile layout. Default: 5x2.
  --width <pixels>     Width of each tile. Default: 240.
  --help               Show this help.

The script creates a contact sheet for quick manual/agent review of continuity, hands, text, and scene jumps.`);
}

function parseArgs(argv) {
  const args = {
    outputDir: path.resolve("outputs", "reviews"),
    fps: 1,
    tile: "5x2",
    width: 240,
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
      case "--video":
        args.video = path.resolve(next());
        break;
      case "--output-dir":
        args.outputDir = path.resolve(next());
        break;
      case "--fps":
        args.fps = Number(next());
        break;
      case "--tile":
        args.tile = next();
        break;
      case "--width":
        args.width = Number(next());
        break;
      default:
        throw new Error(`Unknown option: ${arg}`);
    }
  }

  return args;
}

function validate(args) {
  if (args.help) return;
  if (!args.video) throw new Error("Provide --video <path>.");
  if (!Number.isFinite(args.fps) || args.fps <= 0) throw new Error("--fps must be greater than 0.");
  if (!Number.isInteger(args.width) || args.width < 80) throw new Error("--width must be an integer >= 80.");
  if (!/^\d+x\d+$/.test(args.tile)) throw new Error("--tile must look like 5x2.");
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    let stderr = "";
    const child = spawn(command, args, { stdio: ["ignore", "ignore", "pipe"] });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${path.basename(command)} exited with code ${code}\n${stderr}`));
    });
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) return help();
  validate(args);

  if (!ffmpegPath) throw new Error("ffmpeg-static did not provide an ffmpeg binary.");

  await mkdir(args.outputDir, { recursive: true });
  const base = path.basename(args.video, path.extname(args.video)).replace(/[^a-zA-Z0-9._-]/g, "-");
  const outputPath = path.join(args.outputDir, `${base}-contact-sheet.jpg`);
  const filter = `fps=${args.fps},scale=${args.width}:${args.width}:force_original_aspect_ratio=decrease,pad=${args.width}:${args.width}:(ow-iw)/2:(oh-ih)/2,tile=${args.tile}`;

  await run(ffmpegPath, [
    "-y",
    "-i",
    args.video,
    "-vf",
    filter,
    "-frames:v",
    "1",
    "-update",
    "1",
    outputPath,
  ]);

  console.log(`contact_sheet: ${outputPath}`);
  console.log("review_checklist: continuity, identity consistency, hands/fingers, text overlays, scene jumps");
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

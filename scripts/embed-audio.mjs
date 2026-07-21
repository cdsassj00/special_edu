#!/usr/bin/env node
/**
 * embed-audio.mjs — 구운 mp3를 base64로 HTML 안에 내장한다.
 * 내장 후에는 HTML 파일 하나만 공유해도 ssjvoice 나레이션이 재생된다.
 *
 * 사용법: node scripts/embed-audio.mjs <html파일> <오디오프리픽스>
 * 예:    node scripts/embed-audio.mjs sample.html sp-
 *        node scripts/embed-audio.mjs index.html ""     (audio/s*.mp3)
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const [htmlFile = "sample.html", prefix = "sp-"] = process.argv.slice(2);
const htmlPath = join(ROOT, htmlFile);

let html = readFileSync(htmlPath, "utf8");
const re = /\/\*AUDIO_EMBED_START\*\/[\s\S]*?\/\*AUDIO_EMBED_END\*\//;
if (!re.test(html)) { console.error(`${htmlFile}에 AUDIO_EMBED 마커가 없습니다.`); process.exit(1); }

const files = readdirSync(join(ROOT, "audio"))
  .filter(f => f.startsWith(prefix) && f.endsWith(".mp3")).sort();
if (!files.length) { console.error(`audio/${prefix}*.mp3 파일이 없습니다.`); process.exit(1); }

const entries = files.map(f => {
  const key = basename(f, ".mp3").slice(prefix.length);
  const b64 = readFileSync(join(ROOT, "audio", f)).toString("base64");
  return `"${key}":"data:audio/mpeg;base64,${b64}"`;
});
html = html.replace(re,
  `/*AUDIO_EMBED_START*/const AUDIO_DATA={${entries.join(",")}};/*AUDIO_EMBED_END*/`);
writeFileSync(htmlPath, html);
console.log(`${htmlFile} ← ${files.length}개 mp3 내장 완료 (${(html.length / 1024 / 1024).toFixed(2)}MB)`);

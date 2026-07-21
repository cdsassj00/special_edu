#!/usr/bin/env node
/**
 * bake-narration.mjs — index.html의 SCRIPT 나레이션을 ElevenLabs 'ssjvoice'로
 * 미리 mp3로 구워 audio/ 폴더에 저장한다.
 * 구워두면 페이지 열람자는 API 키 없이도 ssjvoice 나레이션을 듣는다.
 *
 * 사용법:
 *   ELEVENLABS_API_KEY=xi-... node scripts/bake-narration.mjs
 *
 * 옵션 환경변수:
 *   VOICE_NAME  (기본 ssjvoice)   VOICE_ID (지정 시 이름 검색 생략)
 *   MODEL_ID    (기본 eleven_multilingual_v2)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) { console.error("ELEVENLABS_API_KEY 환경변수가 필요합니다."); process.exit(1); }
const VOICE_NAME = (process.env.VOICE_NAME || "ssjvoice").toLowerCase();
const MODEL_ID = process.env.MODEL_ID || "eleven_multilingual_v2";

/* index.html에서 SCRIPT 배열 추출 */
const html = readFileSync(join(ROOT, "index.html"), "utf8");
const m = html.match(/const SCRIPT = (\[[\s\S]*?\]);\n\/\* ={10,}/);
if (!m) { console.error("index.html에서 SCRIPT 배열을 찾지 못했습니다."); process.exit(1); }
const SCRIPT = new Function(`return ${m[1]}`)();

/* 보이스 ID 확인 */
let voiceId = process.env.VOICE_ID;
if (!voiceId) {
  const r = await fetch("https://api.elevenlabs.io/v1/voices", { headers: { "xi-api-key": KEY } });
  if (!r.ok) { console.error("voices 조회 실패:", r.status, await r.text()); process.exit(1); }
  const { voices } = await r.json();
  const v = voices.find(v => v.name.toLowerCase() === VOICE_NAME)
         || voices.find(v => v.name.toLowerCase().includes(VOICE_NAME));
  if (!v) { console.error(`'${VOICE_NAME}' 보이스를 계정에서 찾지 못했습니다. 보유 보이스:`, voices.map(v=>v.name).join(", ")); process.exit(1); }
  voiceId = v.voice_id;
  console.log(`보이스: ${v.name} (${voiceId})`);
}

const outDir = join(ROOT, "audio");
if (!existsSync(outDir)) mkdirSync(outDir);

for (let s = 0; s < SCRIPT.length; s++) {
  for (let l = 0; l < SCRIPT[s].lines.length; l++) {
    const text = SCRIPT[s].lines[l].replace(/<[^>]+>/g, "");
    const file = join(outDir, `s${s}-l${l}.mp3`);
    process.stdout.write(`[${s + 1}/${SCRIPT.length}] s${s}-l${l}: ${text.slice(0, 30)}… `);
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
      method: "POST",
      headers: { "xi-api-key": KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ text, model_id: MODEL_ID, voice_settings: { stability: 0.45, similarity_boost: 0.8 } })
    });
    if (!r.ok) { console.error("\nTTS 실패:", r.status, await r.text()); process.exit(1); }
    writeFileSync(file, Buffer.from(await r.arrayBuffer()));
    console.log("저장됨");
  }
}
console.log("\n완료 — audio/ 폴더가 채워졌습니다. index.html은 이 파일들을 자동으로 우선 사용합니다.");

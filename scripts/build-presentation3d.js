/* 3D 발표 조립: 업로드 템플릿의 엔진을 유지하고 콘텐츠를 운영계획으로 교체 */
const fs = require("fs");
const SRC = "/root/.claude/uploads/f6d2288b-24ca-5b33-b8d1-3127ba61d913/56562018-_______3D.html";
const OUT = "/home/user/special_edu/presentation3d.html";
let h = fs.readFileSync(SRC, "utf8");
const NEWCARD_SRC = "function makeCard(o) {\n  const W = 1024, pad = 46;\n  const lines = o.lines || [];\n  const LH = 56, TH = o.title ? 82 : 28;\n  const H = TH + lines.length * LH + 40;\n  const tex = cTex(W, H, c => {\n    c.fillStyle = \"rgba(9,11,19,.94)\"; rr(c, 0, 0, W, H, 22); c.fill();\n    c.globalAlpha = .55; c.strokeStyle = o.color; c.lineWidth = 2.5; rr(c, 1.5, 1.5, W-3, H-3, 21); c.stroke();\n    c.globalAlpha = 1;\n    c.fillStyle = o.color; rr(c, 0, 30, 6, TH - 40, 3); c.fill();\n    let y = 0;\n    if (o.title) { c.font = fw(700, 40); c.fillStyle = o.color; c.fillText(o.title, pad, 56); y = TH; } else y = 28;\n    lines.forEach((ln, i2) => {\n      const hot = ln.startsWith(\"!\");\n      c.font = fw(hot ? 700 : 400, 33);\n      c.fillStyle = hot ? \"#e8c268\" : \"#ccd3e0\";\n      c.fillText(ln.replace(/^!/, \"\"), pad, y + 42 + i2 * LH);\n    });\n  });\n  const h2 = o.w * H / W;\n  const m = new T.Mesh(new T.PlaneGeometry(o.w, h2),\n    new T.MeshBasicMaterial({ map: tex, transparent: true, side: T.DoubleSide }));\n  const g = new T.Group(); g.add(m); g.userData.mesh = m;\n  return g;\n}";
const CONSTC = 'const C = { amber:"#c9d2e0", blue:"#aab6c9", green:"#aab6c9", violet:"#98a2b5", red:"#e8c268", gold:"#e8c268", orange:"#b0bac9", ink:"#f2f4f8", dim:"#8a93a8" };';


function replaceBetween(str, startAnchor, endAnchor, replacement, keepAnchors) {
  const s = str.indexOf(startAnchor);
  if (s < 0) throw new Error("start anchor not found: " + startAnchor.slice(0, 40));
  const e = str.indexOf(endAnchor, s + startAnchor.length);
  if (e < 0) throw new Error("end anchor not found: " + endAnchor.slice(0, 40));
  return str.slice(0, s) + (keepAnchors ? startAnchor : "") + replacement +
         (keepAnchors ? endAnchor : "") + str.slice(e + endAnchor.length);
}

/* ── 타이틀/HUD/로더/캡션 문구 ── */
h = h.replace(/<title>[\s\S]*?<\/title>/, "<title>전문인재 양성과정 운영계획 — 3D 발표 (ssjvoice)</title>");
h = h.replace(/<div id="loader"><div class="pl"><\/div><p>[\s\S]*?<\/p><\/div>/,
  '<div id="loader"><div class="pl"></div><p>운영계획 3D 무대 준비 중…</p></div>');
h = h.replace(/<div id="hud"><p class="hk">[\s\S]*?<\/p><\/div>/,
  '<div id="hud"><p class="hk">PROLOGUE</p><p class="ht">전문인재 양성과정 운영계획</p></div>');
h = h.replace(/<a id="srcbtn"[\s\S]*?<\/a>/, "");
h = h.replace(/<div id="caption"><span class="cno">★<\/span><span class="ctx">[\s\S]*?<\/span><\/div>/,
  '<div id="caption"><span class="cno">★</span><span class="ctx">▶ 재생을 누르면 ssjvoice 나레이션과 함께 자동 상영됩니다. 스크롤로 직접 볼 수도 있어요.</span></div>');

/* ── 챕터(캡션 = 나레이션 대본 그대로) ── */
const CH = `
  { kicker:"PROLOGUE", title:"운영계획 한눈에", color:"#98a0b4",
    caps:["여러분, 반갑습니다. 지금부터 올해 전문인재 양성과정이 어떻게 굴러가는지 — 전체 그림을 한 번에 보여드리겠습니다.",
          "화면의 문장 그대로입니다. 개인으로 증명하고, 팀으로 완성한다. 이 한 문장이 오늘 발표의 전부입니다.",
          "숫자 네 개만 먼저 기억해 주세요. 정원 48명 — 1기 스물네 명, 2기 스물네 명. 팀프로젝트 12팀. 파생되는 기관컨설팅 5개 기관. 끝나는 시점 — 10월 말입니다."] },
  { kicker:"MASTER FLOW", title:"전체 구조", color:"#98a0b4",
    caps:["먼저 구조부터 정확히 잡고 가겠습니다. 이 과정의 본 트랙은 개인에서 팀입니다. 기관컨설팅은 — 거기서 갈라져 나오는 파생 트랙입니다.",
          "출발은 개인프로젝트, 4주. 8월 6일부터 9월 4일까지 — 주 1회. 앞의 2주는 자유주제, 뒤의 2주는 소속 기관 주제입니다.",
          "4주가 끝나면 평가와 선발. NIA, 행정안전부, CDSA — 필요하면 외부 위원까지. 전원을 같은 기준으로 순위화해서 5개 기관을 뽑습니다. 여기가 분기점입니다.",
          "하지만 본선은 계속 갑니다. 팀프로젝트 4주 — 9월 17일부터 10월 23일까지. 그리고 저 흰 박스, 10월 말 — 과정 완성. 전원이 걷는 길입니다.",
          "그리고 점선으로 내려가는 저 박스 — 기관컨설팅. 선정된 다섯 명만 추가로 여는 독립 프로젝트입니다. 본선 따로, 파생 따로."] },
  { kicker:"STRUCTURE", title:"추진체계 — 사람", color:"#98a0b4",
    caps:["이 판에 서는 사람들입니다. 전문인재 48명 — 1기와 2기. 4인 1조 12개 팀. 그리고 CDSA 컨설턴트 5명 — 이중균, 현중균, 신성진, 김용재, 김태유. 전 구간을 같이 갑니다.",
          "한 가지만 미리 말씀드립니다. 48명은 정원 기준입니다. 중간에 이탈이 생기면 — 이후 단계 인원과 팀 편성은 조정됩니다. 끝까지 가는 것 자체가 조건입니다."] },
  { kicker:"PHASE 01", title:"개인프로젝트", color:"#98a0b4",
    caps:["첫 번째 관문, 개인프로젝트. 2주짜리 블록 두 개 — 자유주제, 기관주제. 원칙 하나 — 같은 기관이어도 1인당 1주제. 얹혀 가는 건 없습니다.",
          "일정 보시죠. 목요일이 1기, 금요일이 2기입니다.",
          "1주차 — 8월 6일과 7일. 자유주제를 정하고 만들기 시작합니다. CDSA가 옆에서 코칭합니다.",
          "2주차 — 8월 13일과 14일. 오전 완성, 오후 발표·평가. 그리고 과제 — 소속 기관의 페인포인트를 찾아오세요. 정의하고, 인터뷰하고, 근거를 확보합니다.",
          "3주차 — 8월 27일과 28일. 오전에 과제 확정, 바로 개발. 실데이터가 있으면 실데이터로, 없으면 목업으로.",
          "4주차 — 9월 3일과 4일. 오전 마무리, 오후 최종 발표. NIA·행정안전부·CDSA 평가단이 전원을 평가해 상위 5개 기관을 선정합니다.",
          "주제요? 뭐든 됩니다. 폐쇄망 프로그램, 클라우드 서비스, 크롬 확장, 웹앱, 앱, 논문, 라즈베리파이까지. 막히면 주말 줌 개별코칭. 인증 수료엔 가점이 붙습니다."] },
  { kicker:"SELECTION", title:"48 → 5", color:"#e8c268",
    caps:["지금 화면에 뜨는 점 하나하나가 — 여러분입니다. 1기, 2기 구분 없이 전원. 같은 평가자가, 같은 기준으로 순위를 매깁니다.",
          "그중 다섯. 다섯 개 기관이 기관컨설팅 무대에 오르고 — 선정된 순간부터, 그분은 소속 기관 PoC의 PM이 됩니다.",
          "가점은 두 가지. 하나 — 개인프로젝트 인증 수료. 둘 — 기관 실무진 다섯 명의 참여확약서. 기관을 미리 움직여 놓은 사람이 유리합니다."] },
  { kicker:"PHASE 02 · SPIN-OFF", title:"기관컨설팅", color:"#98a0b4",
    caps:["선정된 다섯 분의 이야기입니다. 다시 강조합니다 — 과정과 별개의 독립 프로젝트입니다. 팀프로젝트와 병행합니다.",
          "기관마다 한 팀. 꼭짓점에 PM — 여러분. 실무진 최소 5명이 요구사항과 데이터를 대고, CDSA 컨설턴트 1명이 PoC 설계·개발을 리드합니다.",
          "참여 기관에는 지원이 있습니다. 활동비와 AI 사용료 — 기관당 최대 300여만원, 실비 정산입니다.",
          "운영은 온라인 회의와 오프라인 워크샵을 섞어 — 10월 말 완료가 목표입니다."] },
  { kicker:"PHASE 03", title:"팀프로젝트", color:"#98a0b4",
    caps:["본선의 마지막 — 팀프로젝트. 서로 다른 기관의 네 명이 한 팀. 그래서 해커톤형 자유주제입니다.",
          "1주차 — 9월 17·18일, 주제와 기획 확정. 2주차 — 10월 1·2일, 개발 시작. 팀당 AI 구독료 30만원 지원.",
          "3주차 — 10월 15·16일, HTML 통일 양식 보고서 — 그대로 책으로 발간됩니다. 4주차 — 10월 22·23일, 최종 발표·평가·시상.",
          "쓴소리 하나. 무임승차 — 매 기수 있었습니다. 올해는 안 됩니다. 역할 분담과 기여도 평가를 명확히 반영합니다.",
          "기관컨설팅 선정자 다섯 분은 팀프로젝트와 PM을 병행합니다 — 일정 관리는 저희가 같이 설계합니다."] },
  { kicker:"AWARDS & SUPPORT", title:"별개의 두 예산", color:"#e8c268",
    caps:["돈 이야기입니다. 헷갈리기 쉬워서 대놓고 말씀드립니다 — 시상금과 활동지원비는, 별개의 두 예산입니다.",
          "팀프로젝트 시상 — 1·2기 통합 다섯 팀. 최우수 200만원, 우수 100만원, 혁신상 세 팀 각 50만원. AI 구독료 30만원은 별도 지원.",
          "기관컨설팅 활동지원비 — 기관당 최대 300여만원 실비. 왼쪽은 성적, 오른쪽은 참여 — 서로 다른 주머니입니다."] },
  { kicker:"CLOSING", title:"개인으로 증명, 팀으로 완성", color:"#eceef4",
    caps:["정리하겠습니다. 하나 — 혼자 완성합니다. 개인프로젝트 4주, 1인 1주제. 둘 — 팀으로 완성합니다. 팀프로젝트 4주, 시상, 그리고 책.",
          "화면의 문장 그대로 — 이 과정의 마지막은, 팀프로젝트입니다.",
          "기관컨설팅은 잘한 사람에게 열리는 보너스 트랙 — 과정의 완성은 전원이 팀으로 끝까지 가는 것입니다.",
          "첫 세션 — 8월 6일 목요일 1기, 8월 7일 금요일 2기. 그날 뵙겠습니다. 감사합니다."] },
`;
h = replaceBetween(h, "const CH = [", "];\nconst N = CH.length;", "const CH = [" + CH + "\n];\nconst N = CH.length;", false);
h = h.replace("const CH = [" , "const CH = ["); /* no-op safety */
h = h.replace(/const dotNames = \[[^\]]*\];/,
  'const dotNames = ["오프닝","플로우","사람","개인프로젝트","평가·선발","기관컨설팅","팀프로젝트","예산","클로징"];');

/* ── 팔레트: 모노톤 + 골드 ── */
h = h.replace(/const C = \{[^}]*\};/, function(){return CONSTC;});
/* ── 헤일로 좌표 ── */
h = h.replace(/\[\[-34,18,C\.violet\][\s\S]*?\]\.forEach/,
  "[[0,18,C.amber],[-30,28,C.blue],[-30,8,C.violet],[0,2,C.gold],[30,8,C.green],[30,28,C.red],[0,44,C.gold]].forEach");

/* ── 카드 리스타일 ── */
h = replaceBetween(h, "function makeCard(o) {", "\nfunction makeText", NEWCARD_SRC + "\nfunction makeText", false);
h = h.replace("function makeCard(o) {function makeCard","function makeCard");
/* ── 배경 톤다운 ── */
h = h.replace("col+=vec3(.3,.22,.08)*line*.35;","col+=vec3(.16,.20,.32)*line*.22;");
h = h.replace("col+=vec3(.85,.55,.15)*pulse*.35;","col+=vec3(.45,.55,.85)*pulse*.15;");
h = h.replace("dust(800, 0xffb02e, .28, .4); dust(600, 0x4f8df7, .24, .35);","dust(700, 0x8ea8cc, .26, .2); dust(500, 0x5a6f96, .22, .15);");
h = h.replace("glowSprite(cc, 22, .12)","glowSprite(cc, 22, .06)");
h = h.replace("new T.MeshBasicMaterial({ color, transparent: true, opacity: .3 }));","new T.MeshBasicMaterial({ color, transparent: true, opacity: .16 }));");
h = h.replace("new T.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: .5 }));","new T.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: .25 }));");
h = h.replace("glowSprite(color, r * 3.2)","glowSprite(color, r * 2.5, .26)");
/* ── 존 구성 ── */

const ZONES = `function buildZones() {
  /* Z0 오프닝 */
  let z = zone(0);
  st(z, makeText("전문인재 양성과정", { size: 2.5, color: C.ink }), 0, [0, 28.4, 6]);
  st(z, makeText("OPERATION PLAN 2026", { size: .8, color: C.dim, weight: 600 }), 0, [0, 30.6, 6]);
  st(z, makeText("개인으로 증명하고, 팀으로 완성한다", { size: 1.1, color: C.gold, weight: 700 }), 1, [0, 25.6, 6]);
  const stats = [
    ["48명", "정원 · 1기+2기", C.gold, -11],
    ["12팀", "팀프로젝트", C.blue, -3.7],
    ["5기관", "파생 · 컨설팅", C.blue, 3.7],
    ["10월말", "전체 완료", C.blue, 11]
  ];
  stats.forEach(([t, s, cc, x]) => {
    st(z, makeOrb(1.75, cc, t, s), 2, [x, 19.5, 1],
      { t: t + " — " + s, b: "발표 전체에서 기억할 핵심 숫자입니다." });
  });
  st(z, makeText("▶ 재생 또는 ▼ 스크롤", { size: .7, color: C.dim, weight: 600 }), 2, [0, 14.2, 4]);

  /* Z1 마스터 플로우 */
  z = zone(1);
  st(z, makeCard({ w: 12, title: "본 트랙: 개인 → 팀", color: C.dim,
    lines: ["기관컨설팅은 여기서 갈라지는 파생 트랙"] }), 0, [0, 26.5, -54]);
  st(z, makeCard({ w: 8.6, title: "① 개인프로젝트", color: C.amber,
    lines: ["08/06 ~ 09/04 · 주 1회", "자유주제 2주 + 기관주제 2주"] }), 1, [-24, 18, -55],
    { t: "개인프로젝트 — 4주", b: "전원이 1인 1주제로 참여.\\n앞 2주 자유주제, 뒤 2주 소속 기관 주제." });
  st(z, makeArrow([[-19.5, 18, -55], [-16.5, 18.8, -54.5], [-13.5, 18, -55]], C.blue, { packets: 1 }), 2, [0, 0, 0]);
  st(z, makeCard({ w: 8.6, title: "② 평가·선발", color: C.blue,
    lines: ["NIA · 행정안전부 · CDSA (+외부)", "동일 기준 순위화 → 5개 기관"] }), 2, [-8, 18, -55],
    { t: "평가·선발 — 분기점", b: "48명 전원을 같은 기준으로 순위화.\\n여기서 파생 트랙(기관컨설팅)이 갈라집니다." });
  st(z, makeArrow([[-3.5, 18, -55], [-0.5, 18.8, -54.5], [2.5, 18, -55]], C.blue, { packets: 1 }), 3, [0, 0, 0]);
  st(z, makeCard({ w: 8.6, title: "③ 팀프로젝트", color: C.green,
    lines: ["09/17 ~ 10/23 · 4인 1팀", "해커톤형 → 시상 · 책 발간"] }), 3, [8, 18, -55],
    { t: "팀프로젝트 — 과정 완성형", b: "다기관 혼성 4인 팀 12개.\\n최종 발표·시상, 보고서는 책으로." });
  st(z, makeArrow([[12.5, 18, -55], [15.5, 18.8, -54.5], [18, 18, -55]], C.blue, { packets: 1 }), 3, [0, 0, 0]);
  st(z, makeCard({ w: 5.6, title: "10월 말", color: C.ink, lines: ["과정 완성"] }), 3, [22.5, 18, -55]);
  st(z, makeArrow([[-8, 15.6, -55], [-8, 12.5, -53.8], [-8, 10.2, -55]], C.gold, { r: .13, packets: 1 }), 4, [0, 0, 0]);
  st(z, makeCard({ w: 9.4, title: "↘ 기관컨설팅 (파생·독립)", color: C.gold,
    lines: ["5개 기관 · 전문인재 = PM", "~10월 말 · 본선과 병행"] }), 4, [-8, 7.6, -55],
    { t: "기관컨설팅 — 파생 트랙", b: "선정된 5명만 추가로 여는 독립 프로젝트.\\n본선(팀프로젝트)과 병행합니다." });

  /* Z2 사람 */
  z = zone(2);
  st(z, makeCard({ w: 6.4, title: "48명", color: C.blue, lines: ["전문인재 · 1기+2기"] }), 0, [-37, 31.5, 0]);
  st(z, makeCard({ w: 6.4, title: "12팀", color: C.blue, lines: ["4인 1조 × 6팀 × 2"] }), 0, [-30, 31.5, .5]);
  st(z, makeCard({ w: 6.4, title: "5명", color: C.gold, lines: ["CDSA 컨설턴트"] }), 0, [-23, 31.5, 0]);
  ["이중균","현중균","신성진","김용재","김태유"].forEach((nm, i) => {
    st(z, makeOrb(1.05, C.gold, nm), 0, [-36 + i * 3, 26.6, 1],
      { t: "CDSA 컨설턴트 — " + nm, b: "개인프로젝트 코칭부터 기관 PoC까지 전 구간 동행." });
  });
  st(z, makeCard({ w: 12.5, title: "48명은 정원 기준", color: C.red,
    lines: ["중도 이탈 시 이후 인원·팀 편성 조정", "!끝까지 가는 것 자체가 조건"] }), 1, [-30, 22.4, 1.5]);

  /* Z3 개인프로젝트 */
  z = zone(3);
  st(z, makeCard({ w: 11, title: "PHASE 01 — 개인프로젝트", color: C.violet,
    lines: ["자유주제 2주 + 기관주제 2주", "!원칙: 1인당 1주제"] }), 0, [-30, 13.8, 1]);
  st(z, makeText("목요일 = 1기 · 금요일 = 2기", { size: .6, color: C.dim, weight: 700 }), 1, [-30, 10.3, 0]);
  st(z, makeCard({ w: 6.6, title: "1주차 08/06·07", color: C.violet,
    lines: ["자유주제 선정·착수", "CDSA 코칭"] }), 2, [-37.5, 7.2, 0]);
  st(z, makeCard({ w: 6.6, title: "2주차 08/13·14", color: C.violet,
    lines: ["오전 완성 · 오후 발표", "기관 페인포인트 과제"] }), 3, [-32.5, 7.2, .5]);
  st(z, makeCard({ w: 6.6, title: "3주차 08/27·28", color: C.violet,
    lines: ["과제 확정 → 개발", "실데이터 or 목업"] }), 4, [-27.5, 7.2, 0]);
  st(z, makeCard({ w: 6.6, title: "4주차 09/03·04", color: C.violet,
    lines: ["최종 발표 · 평가", "!상위 5개 기관 선정"] }), 5, [-22.5, 7.2, .5]);
  st(z, makeCard({ w: 13.5, title: "주제는 뭐든 됩니다", color: C.dim,
    lines: ["폐쇄망 · 클라우드 · 크롬확장 · 웹앱 · 앱 · 논문 · 라즈베리파이", "주말 줌 개별코칭 · !인증 수료 = 가점"] }), 6, [-30, 2.4, 1.5]);

  /* Z4 선발 48→5 */
  z = zone(4);
  st(z, makeText("SELECTION — 48 → 5", { size: 1.2, color: C.gold, weight: 800 }), 0, [0, 8.2, 1]);
  const dotsG = new T.Group();
  const WIN = [4, 11, 21, 30, 43];
  for (let i = 0; i < 48; i++) {
    const col = i % 12, row = (i / 12) | 0;
    const win = WIN.indexOf(i) > -1;
    const s = new T.Mesh(new T.SphereGeometry(.42, 12, 10),
      new T.MeshBasicMaterial({ color: win ? 0xffc94d : 0x98a0b4, transparent: true, opacity: win ? 1 : .8 }));
    s.position.set((col - 5.5) * 1.55, (1.5 - row) * 1.55, win ? .4 : 0);
    dotsG.add(s);
  }
  st(z, dotsG, 0, [0, 3.6, 0],
    { t: "48명 전원", b: "1기·2기 구분 없이 같은 평가자, 같은 기준으로 순위화합니다." });
  const winG = new T.Group();
  WIN.forEach((i, k) => {
    const col = i % 12, row = (i / 12) | 0;
    const g2 = glowSprite("#ffc94d", 4.5, .9);
    g2.position.set((col - 5.5) * 1.55, (1.5 - row) * 1.55, .8);
    winG.add(g2);
  });
  st(z, winG, 1, [0, 3.6, 0]);
  st(z, makeText("5개 기관 → 전문인재 = PM", { size: .95, color: C.gold, weight: 800 }), 1, [0, -.9, 1]);
  st(z, makeCard({ w: 12, title: "가점 두 가지", color: C.gold,
    lines: ["① 개인프로젝트 인증 수료", "② 기관 실무진 5인 참여확약서"] }), 2, [0, -4.2, 1.5]);

  /* Z5 기관컨설팅 */
  z = zone(5);
  st(z, makeCard({ w: 12, title: "PHASE 02 — 기관컨설팅", color: C.green,
    lines: ["!과정과 별개의 독립 프로젝트", "팀프로젝트와 병행"] }), 0, [30, 14.6, 1]);
  st(z, makeOrb(1.7, C.gold, "PM", "전문인재 1명"), 1, [30, 10.2, .5],
    { t: "PM — 선정된 전문인재", b: "일정 조율, CDSA와 기획서 공동 작성, 계획 수립." });
  st(z, makeOrb(1.55, C.blue, "실무진 5+", "AX팀 등 현업"), 1, [25, 5.2, 0],
    { t: "기관 실무진 최소 5명", b: "요구사항·데이터 제공, 참여확약서 제출, PoC 검증." });
  st(z, makeOrb(1.55, C.violet, "CDSA 1", "컨설턴트"), 1, [35, 5.2, 0],
    { t: "CDSA 컨설턴트 1명", b: "기술 컨설팅 · PoC 설계·개발 리드." });
  st(z, makeArrow([[28.9, 9, .3], [26.5, 7.5, .8], [25.6, 6.6, .3]], C.gold, { r: .11 }), 1, [0, 0, 0]);
  st(z, makeArrow([[31.1, 9, .3], [33.5, 7.5, .8], [34.4, 6.6, .3]], C.gold, { r: .11 }), 1, [0, 0, 0]);
  st(z, makeArrow([[26.6, 5.2, .3], [30, 4.4, .8], [33.4, 5.2, .3]], C.blue, { r: .11, packets: 1 }), 1, [0, 0, 0]);
  st(z, makeCard({ w: 9, title: "참여 기관 지원", color: C.green,
    lines: ["활동비 + AI 사용료(구독 포함)", "!기관당 최대 300여만원 · 실비"] }), 2, [37.8, 11.4, 1]);
  st(z, makeCard({ w: 10.5, title: "운영 방식", color: C.dim,
    lines: ["온라인 회의 + 오프라인 워크샵", "워크샵 단위 계획 · 10월 말 완료"] }), 3, [30, 1.2, 1.5]);

  /* Z6 팀프로젝트 */
  z = zone(6);
  st(z, makeCard({ w: 11.5, title: "PHASE 03 — 팀프로젝트", color: C.red,
    lines: ["다기관 혼성 4인 1팀", "해커톤형 자유주제"] }), 0, [30, 33.8, 1]);
  st(z, makeCard({ w: 6.4, title: "1주차 09/17·18", color: C.red,
    lines: ["주제·기획서 확정", "컨설턴트 코칭"] }), 1, [24.8, 29.4, 0]);
  st(z, makeCard({ w: 6.4, title: "2주차 10/01·02", color: C.red,
    lines: ["개발 착수", "!팀당 AI 구독료 30만원"] }), 1, [29.6, 29.4, .5]);
  st(z, makeCard({ w: 6.4, title: "3주차 10/15·16", color: C.red,
    lines: ["개발 + HTML 보고서", "!그대로 책으로 발간"] }), 2, [34.4, 29.4, 0]);
  st(z, makeCard({ w: 6.4, title: "4주차 10/22·23", color: C.red,
    lines: ["최종 발표 · 평가", "시상"] }), 2, [39.2, 29.4, .5]);
  st(z, makeCard({ w: 12, title: "무임승차 — 올해는 안 됩니다", color: C.red,
    lines: ["역할 분담 · 기여도 평가 명확 반영", "!팀의 화합 = 결과물의 품질"] }), 3, [30, 24.2, 1.5]);
  st(z, makeCard({ w: 11, title: "병행 안내", color: C.dim,
    lines: ["컨설팅 선정 5인은 팀PJ와 PM 병행", "일정 관리는 함께 설계"] }), 4, [30, 20.6, 1]);

  /* Z7 예산 */
  z = zone(7);
  st(z, makeCard({ w: 12.5, title: "별개의 두 예산", color: C.gold,
    lines: ["시상금 ↔ 활동지원비", "!섞어서 계산하지 마세요"] }), 0, [0, 49.4, 1]);
  const pod = new T.Group();
  const podData = [[0, 3.4, 0xffc94d, "최우수 200"], [-3.1, 2.3, 0xc8cfdd, "우수 100"], [3.1, 1.7, 0xcd8f52, "혁신×3 각50"]];
  podData.forEach(([x, hh, cc, lb]) => {
    const b = new T.Mesh(new T.BoxGeometry(2.6, hh, 2.2),
      new T.MeshBasicMaterial({ color: cc, transparent: true, opacity: .85 }));
    b.position.set(x, hh / 2, 0);
    const t = makeText(lb, { size: .52, color: "#ffffff", weight: 800 });
    t.position.set(x, hh + .7, .2);
    pod.add(b, t);
  });
  st(z, pod, 1, [-5.5, 41.4, 0],
    { t: "팀프로젝트 시상 — 1·2기 통합 5팀", b: "최우수 1팀 200만원 · 우수 1팀 100만원 · 혁신상 3팀 각 50만원.\\n팀당 AI 구독료 30만원은 별도 지원." });
  st(z, makeText("시상금 — 팀프로젝트 성적", { size: .7, color: C.dim, weight: 700 }), 1, [-5.5, 39.9, 1]);
  st(z, makeCard({ w: 9, title: "활동지원비", color: C.green,
    lines: ["기관컨설팅 참여 기관당", "!최대 300여만원 · 실비 정산"] }), 2, [6, 44.2, .5]);
  st(z, makeText("서로 다른 주머니입니다", { size: .8, color: C.gold, weight: 800 }), 2, [0, 38.4, 2]);

  /* Z8 클로징 */
  z = zone(8);
  st(z, makeText("개인으로 증명하고,", { size: 2, color: C.ink }), 0, [0, 23.4, 8]);
  st(z, makeText("팀으로 완성한다", { size: 2, color: C.amber }), 1, [0, 20.4, 8]);
  st(z, makeCard({ w: 12, title: "이 과정의 마지막은 — 팀프로젝트", color: C.ink,
    lines: ["기관컨설팅 = 잘한 사람의 보너스 트랙", "완성 = 전원이 팀으로 끝까지"] }), 2, [0, 15.6, 8]);
  st(z, makeText("첫 세션 — 08/06(목) 1기 · 08/07(금) 2기", { size: .95, color: C.gold, weight: 800 }), 3, [0, 11.6, 8]);
  st(z, makeText("감사합니다", { size: 1.3, color: C.ink, weight: 800 }), 3, [0, 9.4, 8]);
}`;
h = replaceBetween(h, "function buildZones() {", "\n}\n\n/* ═══════ 카메라 앵커 ═══════ */",
  ZONES + "\n\n/* ═══════ 카메라 앵커 ═══════ */", false);

/* ── 카메라 앵커 ── */
const CAM = `const A = [
  { p: [0, 21, 42],    l: [0, 21.5, 0] },
  { p: [0, 16, 8],     l: [0, 17, -55] },
  { p: [-30, 28.5, 21],l: [-30, 27.5, 0] },
  { p: [-30, 8, 24],   l: [-30, 7.5, 0] },
  { p: [0, 2.5, 21],   l: [0, 2, 0] },
  { p: [30, 8, 23],    l: [30, 7.8, 0] },
  { p: [30, 27.5, 23], l: [30, 27, 0] },
  { p: [0, 44.5, 21],  l: [0, 44, 0] },
  { p: [0, 24, 62],    l: [0, 17, 0] },
]`;
h = replaceBetween(h, "const A = [", "].map(a => ({ p: new T.Vector3(...a.p), l: new T.Vector3(...a.l) }));",
  CAM.replace("const A = [", "") + ".map(a => ({ p: new T.Vector3(...a.p), l: new T.Vector3(...a.l) }));", false);
h = h.replace(/\.map\(a => \(\{ p: new T\.Vector3/, ".map(a => ({ p: new T.Vector3");
/* replaceBetween가 'const A = ['를 지웠으므로 복원 */
h = h.replace("const A = ]" , "const A = ["); /* safety */
if (!h.includes("const A = [")) h = h.replace("\n  { p: [0, 21, 42]", "\nconst A = [\n  { p: [0, 21, 42]");


/* ── 문장 단위 서브 카메라 앵커 주입 ── */
const SUBCODE = `
const SUB = {
 0:[{p:[0,27,36],l:[0,28,6]},{p:[0,25,26],l:[0,25.3,6]},{p:[0,19.5,19],l:[0,19.8,1]}],
 1:[{p:[0,16,-14],l:[0,17,-55]},{p:[-24,18,-40],l:[-24,18,-55]},{p:[-8,18,-40],l:[-8,18,-55]},{p:[14,18,-38],l:[15,18,-55]},{p:[-8,12.5,-40],l:[-8,12,-55]}],
 2:[{p:[-30,28.5,21],l:[-30,28,0]},{p:[-30,23.8,13],l:[-30,23.2,0]}],
 3:[{p:[-30,12.5,17],l:[-30,12.3,0]},{p:[-30,9.8,13],l:[-30,9.6,0]},{p:[-37,7.6,9],l:[-37.4,7.3,0]},{p:[-32.4,7.6,9],l:[-32.6,7.3,0]},{p:[-27.6,7.6,9],l:[-27.6,7.3,0]},{p:[-22.8,7.6,9],l:[-22.6,7.3,0]},{p:[-30,3.4,13],l:[-30,3,0]}],
 4:[{p:[0,4.2,19],l:[0,3.8,0]},{p:[0,2.8,14],l:[0,2.4,0]},{p:[0,-2.2,11],l:[0,-3.2,0]}],
 5:[{p:[30,12.6,16],l:[30,11.8,0]},{p:[30,7.6,15],l:[30,7.2,0]},{p:[35.5,10.8,10],l:[36.6,11,0]},{p:[30,3.2,11],l:[30,2.4,0]}],
 6:[{p:[30,32.4,15],l:[30,32.6,0]},{p:[27.2,29.7,9],l:[27.3,29.4,0]},{p:[36.6,29.7,9],l:[36.8,29.4,0]},{p:[30,24.6,10],l:[30,24.2,0]},{p:[30,20.9,9],l:[30,20.6,0]}],
 7:[{p:[0,48.5,14],l:[0,49.2,0]},{p:[-5.5,42.2,11],l:[-5.5,41.6,0]},{p:[3.8,43,12],l:[4.6,43.6,0]}],
 8:[{p:[0,22,26],l:[0,22.2,8]},{p:[0,20.4,29],l:[0,20.2,8]},{p:[0,16.8,33],l:[0,16.2,8]},{p:[0,20,54],l:[0,16,8]}]
};
Object.keys(SUB).forEach(function(k){SUB[k]=SUB[k].map(function(a){return {p:new T.Vector3(a.p[0],a.p[1],a.p[2]), l:new T.Vector3(a.l[0],a.l[1],a.l[2])};});});
function segAt(i, t){
  const S2=SUB[i];
  if(!S2) return {p:A[i].p.clone(), l:A[i].l.clone()};
  if(S2.length<2) return {p:S2[0].p.clone(), l:S2[0].l.clone()};
  const x=clamp(t,0,1)*(S2.length-1);
  const k=Math.min(S2.length-2,Math.max(0,Math.floor(x)));
  const u=ease(clamp((x-k-.2)/.6,0,1));   /* 앵커에서 머물다가 다음 문장으로 이동 */
  return {p:S2[k].p.clone().lerp(S2[k+1].p,u), l:S2[k].l.clone().lerp(S2[k+1].l,u)};
}
`;
h = h.replace("].map(a => ({ p: new T.Vector3(...a.p), l: new T.Vector3(...a.l) }));",
  "].map(a => ({ p: new T.Vector3(...a.p), l: new T.Vector3(...a.l) }));\n" + SUBCODE);
h = h.replace(`    p = A[i].p.clone(); l = A[i].l.clone();
    active = i; stepP = clamp(local / HOLD, 0, 1);
    p.lerp(l, stepP * .1);`,
`    active = i; stepP = clamp(local / HOLD, 0, 1);
    const sg = segAt(i, stepP); p = sg.p; l = sg.l;`);
h = h.replace(`    p = A[i].p.clone().lerp(A[i + 1].p, t);
    l = A[i].l.clone().lerp(A[i + 1].l, t);`,
`    const s0 = segAt(i, 1), s1 = segAt(i + 1, 0);
    p = s0.p.lerp(s1.p, t);
    l = s0.l.lerp(s1.l, t);`);

/* ── 존 가시성: 인접 존만 (클로징은 전체 조감) ── */
{
  const ZV_OLD=["zones.forEach((z, zi) => {","      if (!z) return;","      const nCaps = CH[zi].caps.length;"].join("\n");
  const ZV_NEW=["zones.forEach((z, zi) => {","      if (!z) return;","      z.visible = (active === N - 1) || Math.abs(zi - active) <= 1;","      const nCaps = CH[zi].caps.length;"].join("\n");
  if(!h.includes(ZV_OLD)) throw new Error("zone visibility anchor not found");
  h = h.replace(ZV_OLD, ZV_NEW);
}
/* ── 나레이션 플레이어 ── */
const PLAYER = `
<script id="np">
(function(){
'use strict';
/*AUDIO_EMBED_START*/var AUDIO_DATA={};/*AUDIO_EMBED_END*/
var COUNTS=[3,5,2,7,3,4,5,3,4];              /* 챕터별 캡션 수 = 나레이션 파일 수 */
var HOLD=.68;
var clamp=function(v,a,b){return Math.min(b,Math.max(a,v));};
function secPx(){return innerHeight*2.4;}
function targetY(g){
  var i=0,acc=0;
  while(i<COUNTS.length-1&&acc+COUNTS[i]<=g){acc+=COUNTS[i];i++;}
  var j=g-acc,n=COUNTS[i];
  return (i+HOLD*((j+.62)/n))*secPx();
}
var TOTAL=COUNTS.reduce(function(a,b){return a+b;},0);
var css=document.createElement('style');
css.textContent='#npStart{position:fixed;left:50%;bottom:86px;transform:translateX(-50%);z-index:99;cursor:pointer;border:none;border-radius:999px;padding:15px 32px;font-size:15.5px;font-weight:800;font-family:inherit;color:#000;background:#ffc94d;box-shadow:0 14px 40px -10px rgba(255,201,77,.55);transition:transform .4s cubic-bezier(.34,1.56,.64,1),opacity .4s}#npStart:hover{transform:translateX(-50%) translateY(-3px)}#npStart.off{opacity:0;pointer-events:none}#npCtl{position:fixed;right:16px;bottom:16px;z-index:99;display:none}#npCtl.on{display:block}#npCtl button{cursor:pointer;border:1px solid rgba(255,255,255,.25);background:rgba(10,10,14,.75);color:#fff;border-radius:999px;padding:9px 16px;font-size:13px;font-weight:700;font-family:inherit}';
document.head.appendChild(css);
var b=document.createElement('button');b.id='npStart';b.textContent='▶  나레이션과 함께 자동 상영 (ssjvoice)';
var ctl=document.createElement('div');ctl.id='npCtl';ctl.innerHTML='<button id="npBtn">⏸ 일시정지</button>';
document.body.appendChild(b);document.body.appendChild(ctl);
var P={on:false,idx:0,gen:0,audio:null,t0:0,dur:0,fromY:0,toY:0,timer:0,raf:0};
P.est=function(n){return Math.max(2600,n*150);};
P.line=function(){
  var self=this,g=++this.gen,i=this.idx;
  if(i>=TOTAL){this.finish();return;}
  this.fromY=scrollY;this.toY=targetY(i);
  this.dur=this.est(60);this.t0=performance.now();
  var spoken=false;
  var done=function(){
    if(spoken||g!==self.gen)return;
    var remain=self.t0+self.dur-performance.now();
    if(remain>150){clearTimeout(self.timer);self.timer=setTimeout(done,remain);return;}
    spoken=true;self.idx++;self.line();
  };
  var a=new Audio(AUDIO_DATA[String(i)]||('audio/pt-'+i+'.mp3'));
  a.addEventListener('loadedmetadata',function(){
    if(g!==self.gen||!isFinite(a.duration))return;
    self.dur=Math.max(1500,a.duration*1000);self.t0=performance.now();
    clearTimeout(self.timer);self.timer=setTimeout(done,self.dur+3000);
  });
  a.addEventListener('ended',function(){if(g===self.gen)done();});
  a.addEventListener('error',function(){if(g===self.gen){clearTimeout(self.timer);self.timer=setTimeout(done,self.dur);}});
  a.play().catch(function(){if(g===self.gen){clearTimeout(self.timer);self.timer=setTimeout(done,self.dur);}});
  this.audio=a;
  clearTimeout(this.timer);this.timer=setTimeout(done,this.dur+6000);
  (function tick(){
    if(!P.on||g!==P.gen)return;
    var p=clamp((performance.now()-P.t0)/(P.dur*.88),0,1);
    var e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
    scrollTo(0,P.fromY+(P.toY-P.fromY)*e);
    P.raf=requestAnimationFrame(tick);
  })();
};
P.start=function(from){this.stopAudio();this.on=true;this.idx=from||0;this.gen++;
  b.classList.add('off');ctl.classList.add('on');
  document.getElementById('npBtn').textContent='⏸ 일시정지';this.line();};
P.pause=function(){this.on=false;this.gen++;this.stopAudio();
  cancelAnimationFrame(this.raf);clearTimeout(this.timer);
  document.getElementById('npBtn').textContent='▶ 이어보기';};
P.resume=function(){
  var y=scrollY,best=0,bd=1e18;
  for(var i=0;i<TOTAL;i++){var d=Math.abs(targetY(i)-y);if(d<bd){bd=d;best=i;}}
  this.start(best);};
P.stopAudio=function(){if(this.audio){this.audio.pause();this.audio=null;}};
P.finish=function(){this.on=false;this.gen++;this.stopAudio();
  document.getElementById('npBtn').textContent='↺ 다시보기';};
b.addEventListener('click',function(){P.start(0);});
document.getElementById('npBtn').addEventListener('click',function(){
  if(P.on)P.pause();else if(P.idx>=TOTAL)P.start(0);else P.resume();});
['wheel','touchmove'].forEach(function(ev){
  addEventListener(ev,function(){if(P.on)P.pause();},{passive:true});});
addEventListener('keydown',function(e){
  if(e.code!=='Space')return;e.preventDefault();
  if(P.on)P.pause();else if(b.classList.contains('off'))P.resume();else P.start(0);});
})();
<\/script>
`;
h = h.replace("</body>", PLAYER.replace("<\\/script>", "</scr" + "ipt>") + "\n</body>");


/* ── Pretendard 내장 ── */
const FONT_B64 = fs.readFileSync("/tmp/claude-0/-home-user-special-edu/f6d2288b-24ca-5b33-b8d1-3127ba61d913/scratchpad/PretendardVariable.woff2").toString("base64");
h = h.replace(/<link rel="stylesheet" href="https:..cdn.jsdelivr[^>]*>/, "");
h = h.replace("</head>", "<style>@font-face{font-family:'Pretendard Variable';src:url(data:font/woff2;base64," + FONT_B64 + ") format('woff2');font-weight:45 920;font-style:normal;font-display:block}</style></head>");
h = h.replace("document.fonts && document.fonts.ready ? document.fonts.ready.then(boot) : boot();", "if(document.fonts&&document.fonts.load){Promise.all([\"400\",\"700\",\"800\"].map(function(w){return document.fonts.load(w+\" 40px 'Pretendard Variable'\",\"전문인재Aa08월\");})).then(boot).catch(boot);}else boot();");

fs.writeFileSync(OUT, h);
console.log("built:", OUT, (h.length / 1024 / 1024).toFixed(2) + "MB");

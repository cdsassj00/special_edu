# V3 네온 터널 빌드 방법
1. scripts/presentation3d-v3.src.html 수정 (대본 CAPS / 패널 PANELS / 경로·이펙트)
2. /*THREE_EMBED*/ 자리에 three147.min.js + CopyShader + LuminosityHighPassShader
   + Pass + EffectComposer + RenderPass + ShaderPass + UnrealBloomPass(r147 UMD) 연결 삽입
3. </head> 앞에 Pretendard Variable woff2 base64 @font-face 삽입
4. node scripts/embed-audio.mjs presentation3d-v3.html pt-

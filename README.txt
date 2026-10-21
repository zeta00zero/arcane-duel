Arcane Duel Chronicles - web build with Online Duel
Open index.html (or upload this whole folder). Videos load from assets/video next to index.html.
Online Duel uses WebRTC data channels. Serve the folder over HTTPS (itch.io, Netlify and GitHub Pages all do).
It also worked in tests when opened from disk (file://) and over plain http:// in Chromium. HTTPS is still
recommended: browsers may restrict features on insecure pages. For example, the Copy button then uses a fallback.
See HOW_TO_PLAY_ONLINE.txt and CREDITS.txt.

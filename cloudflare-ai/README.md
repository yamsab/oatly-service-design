# Real AI option for Ask Oatly

The website immediately provides concise, natural product responses using its local catalog. To activate actual generative AI, deploy this Worker to your own Cloudflare account. It connects to a hosted Llama 3.1 model using Cloudflare Workers AI binding; no API keys are placed in the browser.

Cloudflare Workers AI currently gives Free accounts 10,000 neurons per day. Once the free quota is consumed, further requests fail rather than automatically charging on a Free account. This Worker also has approximate 15-request-per-minute per-IP limiting; it is not a strict global quota.

## Steps to connect AI

1. In your terminal run: npx wrangler login
2. Download/clone this GitHub repository and enter its cloudflare-ai directory: cd cloudflare-ai
3. Deploy: npx wrangler deploy
4. Copy the printed workers.dev HTTPS URL, e.g. https://oatly-ask-ai.YOURSUBDOMAIN.workers.dev
5. Update the repository root file assistant-config.js to:
   window.OATLY_AI_ENDPOINT = 'https://oatly-ask-ai.YOURSUBDOMAIN.workers.dev/chat';
6. Commit and reload GitHub Pages. Ask Oatly switches automatically to real AI responses.

The service has /health and /chat endpoints. Chat requests require browser Origin https://yamsab.github.io; a public endpoint can still be called by non-browser clients, so check your free quota. The worker does not keep a chat database. When live AI is enabled, it processes typed or locally transcribed messages, recent chat turns, selected IDs and filter settings using Cloudflare Workers AI. Offline product answers remain available whenever it is not configured or cannot be reached. Live stock and prices are not checked. No API keys, secrets, or passwords belong in GitHub source.

Example checks:
- How much sugar is in iKaffe? Answer: 3.4 g sugars/100 ml.
- Is there anything with no sugar? No Sugars and Fiber Low-Calorie each have 0 g sugars/100 ml.
- Vilken har minst fett? Havredryck Ekologisk, 0.5 g fat/100 ml.

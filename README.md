# Find Your Perfect Oatly — Service Design Student Prototype

An **independent university service design prototype** exploring improvements to Oatly's product-discovery experience. **Not an official Oatly website, and not affiliated with or endorsed by Oatly.**

## What you can try

- **Find Your Perfect Oatly:** filter sample products by sugar content, fat level, intended use, flavour, and organic preference.
- **Side-by-side comparison:** compare product information with clear caveats about sustainability metrics.
- **Ask Oatly:** a friendly **guided, rule-based demonstration** that answers common product questions and helps apply filters. It is **not a live generative AI service**.
- **Optional voice controls:** speech recognition and spoken responses where the browser supports them.

## Open and publish

The site is a static HTML prototype: `index.html` contains the interface, styles and JavaScript.

To publish it with GitHub Pages:
1. Open **Settings → Pages** for this repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select **main** and **/(root)**, then click **Save**.
4. Wait for GitHub Pages to provide the HTTPS link: `https://yamsab.github.io/oatly-service-design/`.

### Microphone notes

Speech recognition requires compatible browser support, permission to use the microphone, and usually HTTPS (or localhost). Test the *deployed HTTPS site* rather than opening a downloaded HTML file with a `content://` address. If microphone support is unavailable or permission is denied, typing still works. Speech features may vary by Android/browser language settings and may rely on browser-provided cloud recognition.

## Course context

Designed for **GM1121 Service Design – Applied Consumer Behaviour**, as a practical demonstration of user-centred digital touchpoints, customer choice, engagement, trust and transparency. Relevant course themes include customer journey (Lemon & Verhoef, 2016), digital service innovation (Vargo et al., 2024), and authenticity in computer-generated interactions (Lou et al., 2023). These are design motivations—not evidence that the prototype improves outcomes without user testing.

## Important limitations

- Products and details are illustrative samples; verify current descriptions, ingredient/nutrition and footprint data against original Oatly sources before citing them in a report.
- The assistant does not check real-time store stock, location, or pricing.
- The prototype does not submit orders or collect account details.


## English and Swedish (EN / SV)

The page includes an EN/SV switcher in the header. It updates navigation, product filters, comparisons, Where to Buy, and the guided Ask Oatly assistant. Speech input defaults to the selected website language (when supported by the browser). The assistant is **rule-based**, not a hosted generative AI model; no translation service, API key or account is required. Switching the language starts a new on-page chat so previous replies are not misleadingly shown in the wrong language. Retailer links are illustrative and are not verified stock or price listings.


## Independent on-device speech recognition (Brave-compatible approach)

The microphone defaults to independent English/Swedish speech recognition using the multilingual `onnx-community/whisper-tiny` model in Transformers.js/ONNX Runtime WebAssembly. Click the mic to download the model on first use (tens of MB), then speak for up to 14 seconds and press Stop. Audio is recorded and transcribed **inside the browser**; it is **not uploaded to a speech-recognition server**. The model and JavaScript are fetched from Hugging Face and jsDelivr on first use, subject to network access, browser memory and content-blocking settings. Select *Browser voice* to use the legacy Web Speech recognition service if preferred (which can fail in Brave). The model is small, so its accuracy may be limited, especially for Swedish. This requires HTTPS, supported WebAssembly/MediaRecorder APIs and device permission. Browser caching is used when available. No API key or paid server is configured.

## Natural product guide (without an external AI API)

Ask Oatly answers concise product questions on this website in English and Swedish using the eight-product catalogue. It is a locally running, rule-based conversational guide, not a hosted generative AI model. It gives direct answers to sugar, fat, climate, organic, usage, retailer and comparison questions, while remembering the most recently discussed product for follow-ups. No chat API keys, account, or subscription are needed. The optional independent Whisper speech engine downloads its model on first use; speech recognition is separate from the local text guide.

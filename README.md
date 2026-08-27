# Gemini Watermark Remover & Gemini Video Watermark Remover 🌟

[![Live Website](https://img.shields.io/badge/Live_Tool-geminiremove.com-4f46e5?style=for-the-badge&logo=googlechrome)](https://geminiremove.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Next.js 16](https://img.shields.io/badge/Framework-Next.js_16-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)

👉 **Try the Live Tool Free**: [https://geminiremove.com](https://geminiremove.com)

A free, 100% private, client-side web application to remove Gemini watermarks and Google AI sparkle logos from Google Imagen photos and Google Veo 3 AI videos with zero quality loss and original audio preserved.

---

## 🔥 Key Features

- **100% Client-Side Privacy**: All processing runs locally inside your browser using HTML5 Canvas and WebCodecs. No images or videos are ever uploaded to external servers.
- **Mathematical Inverse Alpha Unblending**: Instead of blurry AI generative fill or inpainting, this tool reverses the exact linear alpha compositing equation:
  $$\text{Background} = \frac{\text{Watermarked} - \text{Logo} \times \alpha}{1 - \alpha}$$
  This restores 100% of the authentic original background pixels under the transparent watermark with zero blur or degradation.
- **Gemini Video Watermark Remover**: Hardware-accelerated WebCodecs frame-by-frame processing for Google Veo AI videos (MP4, WebM, MOV) with 100% audio track passthrough.
- **Dual Zoomed Live Preview**: Side-by-side 4x magnified preview windows for sub-pixel alignment over the 4-point sparkle logo.
- **100% Free & Unlimited**: No subscriptions, no registration, no file limits, and no added promotional watermarks.

---

## 🛠️ Built With

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Styling**: Tailwind CSS & Vanilla CSS Design System
- **Processing**: HTML5 Canvas API, WebCodecs, WebAssembly
- **Deployment**: [Vercel](https://vercel.com) Edge Network

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/KushalLukhi/gemini-watermark-remover.git

# Navigate into project directory
cd gemini-watermark-remover

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application locally.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).

---

Developed with ❤️ by [Kushal Lukhi](https://github.com/KushalLukhi).  
Official Website: [https://geminiremove.com](https://geminiremove.com)

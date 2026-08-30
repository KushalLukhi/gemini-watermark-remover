export type Locale = 'en' | 'es' | 'ja' | 'zh' | 'pt' | 'de' | 'fr';

export interface TranslationData {
  locale: Locale;
  langName: string;
  meta: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
  };
  hero: {
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
  };
  trust: {
    points: Array<{ title: string; desc: string }>;
  };
  howItWorks: {
    title: string;
    steps: Array<{ title: string; desc: string }>;
  };
  faq: {
    title: string;
    subtitle: string;
    items: Array<{ q: string; a: string }>;
  };
}

export const supportedLocales: Array<{ code: Locale; name: string; nativeName: string; flag: string }> = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', nativeName: '简体中文', flag: '🇨🇳' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
];

export const translations: Record<Locale, TranslationData> = {
  en: {
    locale: 'en',
    langName: 'English',
    meta: {
      title: 'Gemini Watermark Remover – Free AI Logo & Video Tool',
      description: 'Free Gemini watermark remover. Clean Google Gemini images and Veo videos with zero blur, original audio, and 100% private client-side processing.',
      keywords: 'gemini watermark remover, remove gemini watermark, gemini video watermark remover, free gemini watermark remover online, nano banana watermark remover',
      ogTitle: 'Gemini Watermark Remover – Free AI Logo & Video Tool',
      ogDescription: 'Free Gemini watermark remover. Clean Google Gemini images and Veo videos with zero blur and 100% client-side privacy.',
    },
    hero: {
      titlePrefix: 'Free ',
      titleHighlight: 'Gemini Watermark Remover',
      titleSuffix: ' Online',
      description: 'Drop a Gemini or Veo video or image and the sparkle logo is gone in seconds — every frame, original quality, ready to post.',
    },
    trust: {
      points: [
        { title: '100% Client-Side', desc: 'Runs locally in your browser' },
        { title: 'Zero Server Uploads', desc: 'Your files never leave your device' },
        { title: 'Mathematical Unblending', desc: 'No blurry AI inpainting smudges' },
        { title: 'Completely Free', desc: 'No signup, no limits, no watermark' },
      ],
    },
    howItWorks: {
      title: 'How to Remove Gemini Watermark from Images & Videos',
      steps: [
        { title: 'Upload Image or Video', desc: 'Select or drag & drop your Google Imagen photo or Gemini/Veo video file (MP4, WebM, MOV) into the tool.' },
        { title: 'Adjust & Align Logo', desc: 'Fine-tune the size and position sliders. Use the dual zoomed preview windows for pixel-perfect alignment.' },
        { title: 'Export Clean Media', desc: 'Click Remove & Export. Instantly download your clean, lossless file with audio intact and zero quality degradation.' },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about our free online Gemini watermark and logo removal tool.',
      items: [
        {
          q: 'How to remove the Gemini watermark from images and videos?',
          a: 'Simply drag and drop your Google Imagen 3 image or Veo 3 video into the tool. The application automatically detects the watermark location and mathematically unblends the transparent 4-point sparkle logo with zero blur.',
        },
        {
          q: 'How does mathematical unblending work?',
          a: 'Google blends the watermark using linear alpha compositing. Rather than hallucinating fake pixels with AI inpainting, our tool reverses the exact arithmetic: Background = (Watermarked - Logo × α) / (1 - α), recovering authentic original pixels.',
        },
        {
          q: 'Are my images and videos kept private?',
          a: 'Yes, 100%. All processing is executed strictly inside your local web browser using client-side HTML5 Canvas and WebCodecs. Files are never uploaded to any external server.',
        },
        {
          q: 'What formats are supported?',
          a: 'Images (PNG, JPG, WebP) and Videos (MP4, WebM, MOV) up to 4K resolution with full original audio preservation.',
        },
      ],
    },
  },

  es: {
    locale: 'es',
    langName: 'Español',
    meta: {
      title: 'Eliminar Marca de Agua Gemini Gratis – Quitar Logo IA y Video Online',
      description: 'Eliminador gratuito de marcas de agua de Google Gemini e Imagen 3. Quita el logo de brillo en fotos y videos Veo sin desenfoque y con total privacidad.',
      keywords: 'eliminar marca de agua gemini, quitar marca de agua gemini, gemini watermark remover español, quitar logo gemini, eliminar marca de agua veo',
      ogTitle: 'Eliminar Marca de Agua Gemini Gratis Online',
      ogDescription: 'Limpia imágenes de Google Gemini y videos Veo con precisión matemática, audio original intacto y procesamiento 100% privado en tu navegador.',
    },
    hero: {
      titlePrefix: 'Eliminar ',
      titleHighlight: 'Marca de Agua Gemini',
      titleSuffix: ' Gratis Online',
      description: 'Arrastra cualquier imagen o video de Google Gemini y Veo. El logo de brillo se elimina en segundos con calidad original intacta.',
    },
    trust: {
      points: [
        { title: '100% en el Navegador', desc: 'Se ejecuta localmente en tu dispositivo' },
        { title: 'Cero Cargas al Servidor', desc: 'Tus fotos y videos nunca salen de tu equipo' },
        { title: 'Fórmula Matemática', desc: 'Sin manchas borrosas de relleno por IA' },
        { title: 'Totalmente Gratuito', desc: 'Sin registros, sin límites y sin pagos' },
      ],
    },
    howItWorks: {
      title: 'Cómo Quitar la Marca de Agua de Gemini en Fotos y Videos',
      steps: [
        { title: 'Sube tu Imagen o Video', desc: 'Arrastra y suelta tu foto de Imagen 3 o video de Veo (MP4, WebM, MOV) en el área de carga.' },
        { title: 'Ajusta la Posición', desc: 'El sistema detecta automáticamente el logo. Usa la vista previa ampliada para un ajuste perfecto.' },
        { title: 'Descarga Limpio', desc: 'Haz clic en Exportar para descargar tu archivo limpio con calidad 100% original y audio intacto.' },
      ],
    },
    faq: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre la herramienta gratuita para quitar marcas de agua de Gemini.',
      items: [
        {
          q: '¿Cómo quitar la marca de agua de Gemini en imágenes y videos?',
          a: 'Arrastra y suelta tu archivo en la herramienta. El motor detecta el logo de 4 puntas y aplica una inversión matemática de transparencia para recuperar los píxeles originales sin desenfoques.',
        },
        {
          q: '¿Es seguro y privado?',
          a: 'Sí, 100% privado. Todo el procesamiento se realiza dentro de tu navegador web mediante HTML5 Canvas y WebCodecs. Ningún archivo se envía a servidores externos.',
        },
        {
          q: '¿Conserva el audio en los videos de Veo?',
          a: 'Sí. El audio original se extrae y se vuelve a empaquetar en el video exportado sin pérdida de calidad.',
        },
      ],
    },
  },

  ja: {
    locale: 'ja',
    langName: '日本語',
    meta: {
      title: 'Gemini 透かし 消す 無料 – Google AI ロゴ・動画ウォーターマーク削除',
      description: 'Google Gemini（Imagen 3）画像およびVeo AI動画の透かしロゴを無料で完全削除。ぼかしなし、高画質、音声保持、完全プライベート処理。',
      keywords: 'gemini 透かし 消す, gemini ロゴ 削除, gemini ウォーターマーク 削除 無料, veo 動画 透かし 消去, google ai 透かし 除去',
      ogTitle: 'Gemini 透かし削除ツール – 完全無料＆プライベート',
      ogDescription: 'Google Geminiのキラキラ透かしロゴをブラウザ上で数秒で綺麗に除去。サーバー送信なし、100%安全。',
    },
    hero: {
      titlePrefix: '無料 ',
      titleHighlight: 'Gemini 透かし削除ツール',
      titleSuffix: ' オンライン',
      description: 'Gemini画像やVeo動画をドラッグ＆ドロップするだけ。キラキラロゴをぼかしゼロで瞬時に除去し、元の画質と音声を完全保持します。',
    },
    trust: {
      points: [
        { title: '100% ブラウザ処理', desc: '端末ローカルで安全に実行' },
        { title: 'サーバー送信ゼロ', desc: '画像や動画が外部に流出しません' },
        { title: '数学的アルファ逆合成', desc: 'AIインペイントのぼやけ一切なし' },
        { title: '完全無料・無制限', desc: '会員登録やクレジット表記も不要' },
      ],
    },
    howItWorks: {
      title: 'Gemini の透かしロゴを消す 3 つのステップ',
      steps: [
        { title: '画像または動画をアップロード', desc: 'Gemini画像（PNG、JPG、WebP）またはVeo動画（MP4、WebM、MOV）を選択またはドロップします。' },
        { title: '位置とサイズの微調整', desc: 'ロゴの位置が自動検出されます。拡大プレビュー画面で位置を確認・調整できます。' },
        { title: '綺麗になったファイルを保存', desc: '「エクスポート」をクリックして、高画質な透かしなしファイルを即座にダウンロードします。' },
      ],
    },
    faq: {
      title: 'よくある質問 (FAQ)',
      subtitle: 'Gemini透かし除去ツールの仕組み、対応形式、プライバシーについて。',
      items: [
        {
          q: 'Geminiの透かしはどのように消していますか？',
          a: 'Geminiのロゴは半透明のアルファ合成で付加されています。本ツールはその透過計算を数学的に逆算し、ロゴの下の元のピクセルを復元するため、ぼかしのない鮮明な仕上がりになります。',
        },
        {
          q: 'Veo動画の音声は維持されますか？',
          a: 'はい。WebCodecs技術により動画フレームのみを処理し、オリジナル音声を再圧縮なしでそのまま出力します。',
        },
        {
          q: '画像や動画がサーバーに保存される心配はありませんか？',
          a: '100%安全です。すべての処理はお使いのブラウザ内部で完結し、外部サーバーへの通信は一切行われません。',
        },
      ],
    },
  },

  zh: {
    locale: 'zh',
    langName: '简体中文',
    meta: {
      title: 'Gemini 去水印 在线免费 – 谷歌 AI 图片与 Veo 视频水印消除工具',
      description: '免费 Gemini 水印去除工具。一键消除 Google Gemini (Imagen 3) 图片及 Veo 视频四角星光 Logo，无模糊、保留原音、100% 本地隐私处理。',
      keywords: 'gemini 去水印, 谷歌 gemini 水印消除, gemini logo 移除, veo 视频去水印, google ai 去水印 在线免费',
      ogTitle: 'Gemini 去水印 在线免费工具',
      ogDescription: '运用数学逆向 Alpha 混合算法，精准消除 Gemini 星光图标，还原底层清晰画质，纯浏览器本地运算。',
    },
    hero: {
      titlePrefix: '免费 ',
      titleHighlight: 'Gemini 去水印工具',
      titleSuffix: ' 在线版',
      description: '拖入 Google Gemini 或 Veo 视频与图片，秒级去除右下角星光 Logo，画质无损、原音保留。',
    },
    trust: {
      points: [
        { title: '100% 浏览器本地运行', desc: '纯客户端 Canvas/WebCodecs 处理' },
        { title: '零服务器上传', desc: '媒体文件绝不离开您的设备' },
        { title: '精准数学逆向还原', desc: '无 AI 涂抹杂斑与模糊' },
        { title: '完全免费无限制', desc: '无需注册登录，无二次水印' },
      ],
    },
    howItWorks: {
      title: '如何去除 Gemini 图片与视频水印',
      steps: [
        { title: '上传图片或视频', desc: '拖拽或选择您的 Imagen 3 图片或 Veo 视频文件（MP4、WebM、MOV）。' },
        { title: '自动识别与微调', desc: '工具自动定位水印坐标，您可以通过放大双预览框进行像素级微调。' },
        { title: '一键导出高清文件', desc: '点击导出按钮，立即保存无水印、无画质损伤的媒体文件。' },
      ],
    },
    faq: {
      title: '常见问题解答',
      subtitle: '关于 Gemini 在线去水印工具的技术原理与隐私保障。',
      items: [
        {
          q: '数学逆向去水印与传统 AI 涂抹有什么区别？',
          a: '传统 AI 工具通常将水印视为遮挡物进行猜测重绘，容易产生糊斑。Gemini 水印属于半透明叠加，本工具通过逆向透明度算式，精准还原被遮盖的真实像素。',
        },
        {
          q: '处理视频会丢失音频吗？',
          a: '不会。导出的视频完整保留原版音轨与采样率，画质与音频均无任何损失。',
        },
        {
          q: '我的隐私数据安全吗？',
          a: '绝对安全。所有运算均在您的浏览器本地执行，绝不向任何云端服务器上传文件。',
        },
      ],
    },
  },

  pt: {
    locale: 'pt',
    langName: 'Português',
    meta: {
      title: 'Remover Marca d\'Água Gemini Grátis – Limpar Logo Google AI e Vídeo',
      description: 'Ferramenta gratuita para remover marca d\'água do Google Gemini e Veo. Elimina o logo com precisão matemática, sem borrões e com privacidade 100% local.',
      keywords: 'remover marca d agua gemini, tirar marca d agua gemini gratis, gemini watermark remover portugues, tirar logo gemini, removedor marca d agua veo',
      ogTitle: 'Remover Marca d\'Água Gemini Online Grátis',
      ogDescription: 'Remova marcas d\'água do Google Gemini e Veo no navegador com qualidade original intacta e zero uploads para servidores.',
    },
    hero: {
      titlePrefix: 'Remover ',
      titleHighlight: 'Marca d\'Água Gemini',
      titleSuffix: ' Grátis Online',
      description: 'Arraste imagens ou vídeos do Google Gemini e Veo. O logo de brilho desaparece em segundos com qualidade original preservada.',
    },
    trust: {
      points: [
        { title: '100% no Navegador', desc: 'Processamento local no seu dispositivo' },
        { title: 'Zero Uploads', desc: 'Seus arquivos nunca saem do seu computador ou celular' },
        { title: 'Fórmula Matemática', desc: 'Sem borrões de inteligência artificial' },
        { title: 'Totalmente Grátis', desc: 'Sem necessidade de cadastro, ilimitado' },
      ],
    },
    howItWorks: {
      title: 'Como Remover Marca d\'Água do Gemini em Fotos e Vídeos',
      steps: [
        { title: 'Envie a Imagem ou Vídeo', desc: 'Selecione ou arraste seu arquivo (PNG, JPG, WebP, MP4, WebM, MOV).' },
        { title: 'Ajuste o Posicionamento', desc: 'O sistema detecta o logo automaticamente. Confira o alinhamento no painel de zoom.' },
        { title: 'Baixe o Arquivo Limpo', desc: 'Clique em Exportar para baixar seu arquivo com áudio intacto e nitidez total.' },
      ],
    },
    faq: {
      title: 'Perguntas Frequentes',
      subtitle: 'Tudo o que você precisa saber sobre a remoção de marcas d\'água do Google Gemini.',
      items: [
        {
          q: 'Como funciona a remoção sem borrões?',
          a: 'A marca d\'água do Gemini é semitransparente. Nossa ferramenta aplica a fórmula inversa exata da transparência, revelando os pixels originais que estão embaixo do logo.',
        },
        {
          q: 'É seguro usar com arquivos pessoais?',
          a: 'Sim, 100%. Nada é enviado para a nuvem. O processamento é realizado via HTML5 Canvas e WebCodecs no seu próprio navegador.',
        },
      ],
    },
  },

  de: {
    locale: 'de',
    langName: 'Deutsch',
    meta: {
      title: 'Gemini Wasserzeichen Entfernen Kostenlos – Google AI Logo & Video Tool',
      description: 'Kostenloses Tool zum Entfernen von Google Gemini & Veo Wasserzeichen. Ohne Unschärfe, 100% mathematisch präzise, original Audio und lokaler Datenschutz.',
      keywords: 'gemini wasserzeichen entfernen, google gemini logo entfernen kostenlos, veo video wasserzeichen entfernen, gemini watermark remover deutsch',
      ogTitle: 'Gemini Wasserzeichen Entfernen Online Kostenlos',
      ogDescription: 'Entferne das Gemini Glitzer-Logo aus Bildern und Videos direkt im Browser ohne Qualitätsverlust und ohne Server-Uploads.',
    },
    hero: {
      titlePrefix: 'Kostenlos ',
      titleHighlight: 'Gemini Wasserzeichen Entfernen',
      titleSuffix: ' Online',
      description: 'Gemini- oder Veo-Videos und -Bilder einfügen – das Glitzer-Logo wird in Sekunden ohne Unschärfe und in voller Originalqualität entfernt.',
    },
    trust: {
      points: [
        { title: '100% Lokal im Browser', desc: 'Läuft direkt auf Ihrem Endgerät' },
        { title: 'Keine Server-Uploads', desc: 'Ihre Dateien verlassen niemals Ihr Gerät' },
        { title: 'Mathematisch Exakt', desc: 'Keine verschwommenen AI-Inpainting-Flecken' },
        { title: 'Völlig Kostenlos', desc: 'Ohne Anmeldung, ohne Limits, ohne Abos' },
      ],
    },
    howItWorks: {
      title: 'So entfernen Sie das Gemini-Wasserzeichen aus Bildern & Videos',
      steps: [
        { title: 'Datei hochladen', desc: 'Ziehen Sie Ihr Imagen 3 Bild oder Veo Video (MP4, WebM, MOV) in den Upload-Bereich.' },
        { title: 'Logo ausrichten', desc: 'Die Position wird automatisch erkannt. Nutzen Sie die Zoom-Vorschau für perfekte Ausrichtung.' },
        { title: 'Bereinigte Datei laden', desc: 'Klicken Sie auf Exportieren, um Ihre Datei mit unverändertem Ton und Originalschärfe zu speichern.' },
      ],
    },
    faq: {
      title: 'Häufig gestellte Fragen (FAQ)',
      subtitle: 'Wissenswertes über das kostenlose Gemini-Wasserzeichen-Entfernungstool.',
      items: [
        {
          q: 'Wie unterscheidet sich die mathematische Methode von KI-Inpainting?',
          a: 'Herkömmliche KI-Tools übermalen das Wasserzeichen mit geschätzten Pixeln. Unser Tool invertiert die Alpha-Transparenz und stellt die echten Originalpixel darunter bitgenau wieder her.',
        },
        {
          q: 'Bleibt der Ton in Veo-Videos erhalten?',
          a: 'Ja, die originale Audiospur wird ohne Neucodierung 1:1 in das bereinigte Ausgabevideo übertragen.',
        },
      ],
    },
  },

  fr: {
    locale: 'fr',
    langName: 'Français',
    meta: {
      title: 'Supprimer Filigrane Gemini Gratuit – Logo Google AI & Vidéo Veo',
      description: 'Outil gratuit pour supprimer le filigrane Google Gemini et Veo. Restauration mathématique sans flou, audio original conservé et 100% confidentiel.',
      keywords: 'supprimer filigrane gemini, enlever logo gemini gratuit, effacer filigrane google ai, gemini watermark remover francais, filigrane veo video',
      ogTitle: 'Supprimer Filigrane Gemini Gratuit en Ligne',
      ogDescription: 'Nettoyez vos images Google Gemini et vidéos Veo directement dans votre navigateur sans flou et sans aucun transfert de données vers un serveur.',
    },
    hero: {
      titlePrefix: 'Supprimer ',
      titleHighlight: 'Filigrane Gemini',
      titleSuffix: ' Gratuit en Ligne',
      description: 'Déposez une image ou vidéo Gemini / Veo. Le logo étoilé disparaît en quelques secondes avec une qualité originale intacte.',
    },
    trust: {
      points: [
        { title: '100% dans le Navigateur', desc: 'Traitement local sur votre appareil' },
        { title: 'Zéro Téléversement Serveur', desc: 'Vos médias restent strictement sur votre appareil' },
        { title: 'Décomposition Mathématique', desc: 'Aucun flou ni bavure d\'inpainting IA' },
        { title: 'Totalement Gratuit', desc: 'Sans inscription, sans limitation, sans abonnement' },
      ],
    },
    howItWorks: {
      title: 'Comment supprimer le filigrane Gemini des images et vidéos',
      steps: [
        { title: 'Déposez votre fichier', desc: 'Sélectionnez votre image Imagen 3 ou vidéo Veo (MP4, WebM, MOV).' },
        { title: 'Ajustez la position', desc: 'Le logo est détecté automatiquement. Vérifiez l\'alignement avec la prévisualisation zoomée.' },
        { title: 'Téléchargez le résultat', desc: 'Cliquez sur Exporter pour enregistrer votre fichier propre avec son audio d\'origine.' },
      ],
    },
    faq: {
      title: 'Foire Aux Questions (FAQ)',
      subtitle: 'Tout ce que vous devez savoir sur la suppression du filigrane Gemini.',
      items: [
        {
          q: 'Comment fonctionne la suppression mathématique ?',
          a: 'Le logo Gemini est superposé avec transparence alpha. Notre outil inverse la formule arithmétique pour récupérer les vrais pixels originaux situés sous le filigrane.',
        },
        {
          q: 'Mes fichiers sont-ils protégés ?',
          a: 'Oui, à 100%. Tout s\'exécute localement dans votre navigateur via HTML5 Canvas et WebCodecs. Rien n\'est envoyé sur Internet.',
        },
      ],
    },
  },
};

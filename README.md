# ScaleX Media — Single Page Landing Page

A production-ready, high-converting single-page landing page built for **ScaleX Media**, a Performance Marketing Agency founded by **Anand Singh**. Engineered with vanilla HTML5, CSS3, and JavaScript, optimized for fast mobile rendering on cold Meta & Google ad traffic.

---

## 🚀 Quick Setup Instructions (3 Steps)

### Step 1: Configure Formspree Lead Notifications
1. Go to [formspree.io](https://formspree.io) and create a free account registered to `anandsingh7206@gmail.com`.
2. Create a new form (e.g. named `ScaleX Media Leads`).
3. Copy your Form ID (e.g. `xvgzpqok`).
4. Open `js/main.js` and update line 13:
   ```javascript
   const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
   ```
   *Note: Submissions automatically redirect leads directly into a pre-filled WhatsApp conversation (+91 80526 61507) even if the form service experiences network latency.*

### Step 2: Upload Founder Video (Optional)
The hero section includes a dedicated video player frame for founder Anand Singh:
- Drop your video file into the `assets/` directory named `founder-anand.mp4`.
- Optionally add a poster image named `founder-poster.jpg`.
- *Built-in Fallback:* If no video file is present, the page automatically displays a dark placeholder panel with play controls without breaking layout or throwing errors.

### Step 3: Deploy to Production
Since this project requires zero build steps or React dependencies:
- **Netlify**: Drag and drop the `scalex-media` directory into [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel**: Run `vercel` in this folder via terminal or import repository to Vercel dashboard.
- **GitHub Pages**: Upload to a repository and enable Pages in repository settings.

---

## 📁 Project Structure

```
scalex-media/
├── index.html              # Main HTML5 single-page structure & LocalBusiness JSON-LD schema
├── css/
│   └── style.css           # Hand-written CSS design system, bento layout & mobile styling
├── js/
│   └── main.js             # Vanilla JS: Lightbox modal, counters, form validation & WhatsApp flow
├── assets/
│   ├── scalexmedia_logo.png
│   ├── a2ef73edfc0ec261cc90b0dfa4e0a4e8.jpg # Google Ads 5.25K conversions
│   ├── 9eb1f932807c96837ea48a936b1c57f2.jpg # Google Ads 1.79K leads
│   ├── 67401725e78e1318d1fce422dcaedf4e.jpg # Google Ads 56.1K conversion value
│   ├── eba7e530d11223cbe183a6b1eb86a483.jpg # Meta Ads 11.73x ROAS
│   ├── photo_2026-01-17_12-16-59.jpg       # Meta Ads 4.69x ROAS
│   ├── photo_2026-01-17_12-16-58.jpg       # Meta Ads 1,659 purchases
│   ├── photo_2026-01-17_12-16-59__2_.jpg   # Meta Ads 523 purchases
│   ├── photo_2026-03-14_11-27-39.jpg       # Meta Ads ₹18.44 per lead
│   └── photo_2026-03-14_11-24-46.jpg       # Meta Ads 174 calls at ₹15.59
└── README.md
```

---

## 🎨 Brand Design Tokens

- **Background Base**: `#050505` (Matches dark logo background seamlessly)
- **Elevated Surface**: `#0D0D10`
- **Panel Surface**: `#141419`
- **Accent Primary**: `#2563EB`
- **Accent Glow**: `linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)`
- **Positive Delta**: `#22C55E`
- **Typography**: `Plus Jakarta Sans` (Google Fonts)

---

## 📞 Direct Business Contact Information

- **Founder**: Anand Singh
- **Phone / WhatsApp**: +91 80526 61507
- **Email**: anandsingh7206@gmail.com
- **HQ Location**: Lucknow, Uttar Pradesh, India

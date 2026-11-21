# NOVA — 3D Swapping Cards Authentication Experience ✨

A high-performance, dark-glassmorphism authentication interface featuring fluid **3D card swapping motion**, a multi-scene **atmospheric brand showcase**, real-time **password telemetry**, **confetti physics celebrations**, and an all-new **unified luxury modal system** replacing standard browser dialogs.

---

## 🌟 Highlights & Key Features

### 🔄 1. Fluid 3D Card Swapping Motion
- **Seamless Spatial Flip**: Switch between **Create account (Sign Up)** and **Welcome back (Log In)** using either the quick top navigation pill or inline form links (`Log in` / `Create one`).
- **Interactive Depth & Z-Space**: Realistic 3D perspective transforms (`translateZ`, `rotateY`, `cubic-bezier`) that prevent layer clipping across all modern browsers.
- **Desktop Parallax Tilt**: Subtle cursor-following parallax physics that reacts naturally to mouse movement.

### 🖼️ 2. Atmospheric Visual Showcase Carousel
- **3 Dynamic Visual Themes**:
  1. *Twilight Dunes*: Rich purple & indigo desert dunes beneath a starry sky.
  2. *Cosmic Aurora & Alpine Peaks*: Emerald aurora lights dancing over mountain ranges.
  3. *Deep Cyber Neon & Horizon Grid*: Cyberpunk sunset horizon with glowing gridlines.
- **Interactive Pill Dashes**: Click any dash indicator to switch visuals instantly or let the 6-second auto-rotation play with hover-pause.
- **Synchronized Headlines**: Animated typography that smoothly transitions alongside the visual artwork.

### 🛡️ 3. Real-Time Password Telemetry & Security
- **Multi-Segment Strength Meter**: Evaluates length, upper/lowercase, numbers, and special symbols across 5 distinct security tiers (*Too short*, *Weak*, *Fair*, *Good*, *Strong 🔥*).
- **Match Confirmation Badge**: Live validation checking that your password and confirmation password match with clear visual feedback (`✓ Passwords match` or `✕ Passwords do not match`).
- **Interactive Visibility Toggles**: Custom SVG eye icons allowing users to toggle masked/unmasked passwords independently.

### 💎 4. Unified Luxury Custom Pop-Up Modal System
- **Zero Browser Native Alerts**: All native system pop-ups (`alert(...)`) have been replaced by a unified, theme-matched modal dialog.
- **Glassmorphic Backdrop Blur**: Ultra-dark tinted background overlay (`rgba(10, 11, 18, 0.82)`) with a `20px` backdrop filter blur and smooth scale-in animation.
- **Dynamic Icon Halos & Color Schemes**:
  - 🟢 **Success**: Emerald & purple gradient with celebratory checkmark (triggers confetti explosion!).
  - 🌐 **Google SSO**: Official multi-colored Google SVG icon.
  - 🍎 **Apple ID**: Crisp monochrome Apple icon with glowing silver aura.
  - ℹ️ **Information**: Sky-blue gradient info icon for platform features, Terms, and password resets.
  - ⚠️ **Validation / Warning**: Amber-orange alert icon for missing fields, mismatch warnings, and validation.
- **Keyboard & Click Accessibility**: Dismissible via primary action button, corner `×` button, backdrop click, or the `Escape` key.

### 🌐 5. "Back to Website" Interactive Landing Page
- Click the **"Back to website"** pill to transition into the full NOVA creator platform landing page with hero copy, call-to-actions, and interactive feature cards.
- Seamless "Go to Sign Up" button to return to the 3D authentication card at any moment.

### 📱 6. Perfect Responsive Design Across All Devices
- **Desktop (> 960px)**: Side-by-side 3D cards with full perspective transforms and mouse tilt physics.
- **Tablet (680px – 960px)**: Balanced container widths and smooth touch-adapted 3D transitions.
- **Mobile (<= 680px)**:
  - Automatic single-column layout with visual showcase transitioning into a compact, eye-catching banner.
  - Swapping changes forms cleanly without clipping or broken horizontal offsets.
  - 100% full-width touch targets (inputs, primary CTA, and stacked Google/Apple social buttons for thumb reachability).
- **Narrow Phones (<= 380px)**: Scaled padding and typography preventing any horizontal scrollbars.

---

## 📂 Project Structure

```text
SignUp form/
│
├── index.html        # Complete semantic HTML structure, SVGs, and modal components
├── style.css         # Modern CSS (Variables, 3D Transforms, Glassmorphism, Breakpoints)
├── script.js         # Reactive JavaScript (Swapping, Carousel, Validation, Modal & Confetti)
└── README.md         # Comprehensive project documentation
```

---

## 🚀 How to Run the Project

No dependencies or build steps are required. The project is built entirely with vanilla web standards (**HTML5**, **CSS3**, and **Vanilla JavaScript**).

### Option 1: Direct Browser Launch
1. Double-click [index.html](file:///c:/Users/Anamika%20vyas/OneDrive/Desktop/SignUp%20form/index.html) to open it in your default browser (Google Chrome, Microsoft Edge, Firefox, Safari).
2. Or right-click [index.html](file:///c:/Users/Anamika%20vyas/OneDrive/Desktop/SignUp%20form/index.html) and select **Open with... -> Google Chrome**.

### Option 2: VS Code Live Server
1. Open the project folder in VS Code:
   ```bash
   code "c:\Users\Anamika vyas\OneDrive\Desktop\SignUp form"
   ```
2. Click **Go Live** in the bottom status bar (or right-click `index.html` and choose **Open with Live Server**).
3. The app will open at `http://127.0.0.1:5500/index.html`.

---

## 🎨 Design Customization Guide

All visual themes, colors, and timing variables are centralized in `style.css`:

```css
:root {
  --bg-page: #14151f;         /* Deep canvas background */
  --card-shell: #1d1e2b;      /* Main 3D container background */
  --card-surface: #242636;    /* Surface elements */
  --primary: #7059e2;         /* Brand accent color */
  --primary-hover: #836df5;   /* Active button hover */
  --primary-glow: rgba(112, 89, 226, 0.45);
  --success: #10b981;        /* Password strong & success state */
  --danger: #ef4444;         /* Error & weak password */
  --warning: #f59e0b;        /* Medium strength alert */
}
```

### Changing the Carousel Timing
In `script.js`, change the timer duration (defaults to `6000ms` / 6 seconds):
```javascript
let slideTimer = setInterval(() => {
  const next = (activeSlideIndex + 1) % slideData.length;
  setSlide(next);
}, 6000); // Adjust millisecond interval here
```

### Triggering Custom Modals Programmatically
Any script or feature can trigger the unified modal system with a simple call:
```javascript
showCustomModal({
  title: "Your Title Here",
  message: "Your message or <strong>HTML content</strong> here.",
  type: "success", // "success" | "google" | "apple" | "info" | "warning"
  buttonText: "Continue",
  onConfirm: () => {
    console.log("User confirmed modal!");
  }
});
```

---

## 💡 Browser Compatibility

- **Google Chrome / Chromium**: Full 3D acceleration, backdrop filters, and SVG rendering.
- **Microsoft Edge**: Fully supported.
- **Mozilla Firefox**: Fully supported (`backdrop-filter` enabled by default).
- **Apple Safari (macOS & iOS)**: Fully supported with `-webkit-backdrop-filter` fallbacks.

---

## 📄 License
This project is open-source and free to customize for personal and commercial applications.

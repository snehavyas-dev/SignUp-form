/* =========================================================
   NOVA — Modern 3D Swapping Cards Authentication
   Features: 
   - 3D Card Swapping Motion (SignUp <-> LogIn)
   - 3-Image Atmospheric Showcase Carousel
   - Live Password Strength Analyzer & Confirm Match Indicator
   - Password Visibility Toggles
   - Unified Glassmorphic Custom Modal System (zero native alerts)
   - Physics-based Confetti FX Celebration
   - "Back to website" Landing Page Switcher
   - Mobile & Touch Responsive Controls
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const authBox = document.getElementById("auth-box");
  const websiteView = document.getElementById("website-view");
  const btnToggleSwap = document.getElementById("btn-toggle-swap");
  const swapBtnLabel = document.getElementById("swap-btn-label");
  const btnBackWeb = document.getElementById("btn-back-web");
  const btnDemoViewWebsite = document.getElementById("btn-demo-view-website");
  const btnReturnToSignup = document.getElementById("btn-return-to-signup");
  const btnHeroSignup = document.getElementById("btn-hero-signup");
  const btnHeroLearn = document.getElementById("btn-hero-learn");
  const linkGotoLogin = document.getElementById("link-goto-login");
  const linkGotoSignup = document.getElementById("link-goto-signup");
  const viewSignup = document.getElementById("view-signup");
  const viewLogin = document.getElementById("view-login");
  const carouselHeadline = document.getElementById("carousel-headline");
  const pips = document.querySelectorAll(".indicator-dash");
  const slideBgs = document.querySelectorAll(".slide-bg");
  const visualShowcase = document.getElementById("visual-showcase");

  // Modal Elements
  const appModal = document.getElementById("app-modal");
  const modalIcon = document.getElementById("modal-icon");
  const modalTitle = document.getElementById("modal-title");
  const modalMessage = document.getElementById("modal-message");
  const modalActionBtn = document.getElementById("modal-action-btn");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  let isSwapped = false;
  let activeSlideIndex = 0;
  let modalConfirmCallback = null;

  /* ================= 1. UNIFIED LUXURY CUSTOM POP-UP MODAL SYSTEM ================= */
  const MODAL_ICONS = {
    success: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `,
    google: `
      <svg width="32" height="32" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
    `,
    apple: `
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.64 1.36-.57.65-1.06 1.72-.93 2.74 1 .08 2.02-.5 2.64-1.25z"/>
      </svg>
    `,
    info: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    `,
    warning: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    `
  };

  function showCustomModal({ title, message, type = "info", buttonText = "Continue", onConfirm = null }) {
    if (!appModal) return;

    modalTitle.textContent = title;
    modalMessage.innerHTML = message;
    modalActionBtn.textContent = buttonText;
    modalConfirmCallback = onConfirm;

    modalIcon.className = "modal-icon-wrap";
    modalIcon.classList.add(`type-${type}`);
    modalIcon.innerHTML = MODAL_ICONS[type] || MODAL_ICONS.info;

    appModal.classList.add("active");
  }

  function hideCustomModal() {
    if (!appModal) return;
    appModal.classList.remove("active");
    if (typeof modalConfirmCallback === "function") {
      const cb = modalConfirmCallback;
      modalConfirmCallback = null;
      cb();
    }
  }

  if (modalActionBtn) modalActionBtn.addEventListener("click", hideCustomModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", hideCustomModal);
  if (appModal) {
    appModal.addEventListener("click", (e) => {
      if (e.target === appModal) hideCustomModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && appModal && appModal.classList.contains("active")) {
      hideCustomModal();
    }
  });

  /* ================= 2. 3-IMAGE CAROUSEL SWITCHER ================= */
  const slideData = [
    { headline: "Capturing Moments, <br />Creating Memories" },
    { headline: "Empowering Creators, <br />Everywhere" },
    { headline: "Seamless Security, <br />Frictionless Flow" }
  ];

  function setSlide(index) {
    activeSlideIndex = index;

    slideBgs.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    pips.forEach((pip, i) => {
      pip.classList.toggle("active", i === index);
    });

    if (carouselHeadline) {
      carouselHeadline.style.opacity = "0";
      setTimeout(() => {
        carouselHeadline.innerHTML = slideData[index].headline;
        carouselHeadline.style.opacity = "1";
      }, 200);
    }
  }

  pips.forEach((pip) => {
    pip.addEventListener("click", () => {
      const idx = parseInt(pip.dataset.index, 10);
      setSlide(idx);
    });
  });

  let slideTimer = setInterval(() => {
    const next = (activeSlideIndex + 1) % slideData.length;
    setSlide(next);
  }, 6000);

  if (visualShowcase) {
    visualShowcase.addEventListener("mouseenter", () => clearInterval(slideTimer));
    visualShowcase.addEventListener("mouseleave", () => {
      clearInterval(slideTimer);
      slideTimer = setInterval(() => {
        const next = (activeSlideIndex + 1) % slideData.length;
        setSlide(next);
      }, 6000);
    });
  }

  /* ================= 3. 3D CARD SWAPPING MOTION (SIGN-UP <-> LOG-IN) ================= */
  function toggleCardSwap(forceState = null) {
    if (forceState !== null) {
      isSwapped = forceState;
    } else {
      isSwapped = !isSwapped;
    }

    if (isSwapped) {
      authBox.classList.add("is-swapped");
      if (swapBtnLabel) swapBtnLabel.textContent = "Swap to Sign Up";
      // Switch form views immediately so login card loads without delay
      viewSignup.classList.add("is-hidden");
      viewLogin.classList.remove("is-hidden");
    } else {
      authBox.classList.remove("is-swapped");
      if (swapBtnLabel) swapBtnLabel.textContent = "Swap to Log In";
      viewLogin.classList.add("is-hidden");
      viewSignup.classList.remove("is-hidden");
    }
  }

  if (btnToggleSwap) btnToggleSwap.addEventListener("click", () => toggleCardSwap());
  if (linkGotoLogin) {
    linkGotoLogin.addEventListener("click", (e) => {
      e.preventDefault();
      toggleCardSwap(true);
    });
  }
  if (linkGotoSignup) {
    linkGotoSignup.addEventListener("click", (e) => {
      e.preventDefault();
      toggleCardSwap(false);
    });
  }

  /* ================= 4. "BACK TO WEBSITE" PAGE NAVIGATION ================= */
  function showWebsiteDemo() {
    authBox.classList.add("page-hidden");
    websiteView.classList.add("page-active");
    if (btnDemoViewWebsite) btnDemoViewWebsite.style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showAuthCard() {
    websiteView.classList.remove("page-active");
    authBox.classList.remove("page-hidden");
    if (btnDemoViewWebsite) btnDemoViewWebsite.style.display = "inline-flex";
  }

  if (btnBackWeb) btnBackWeb.addEventListener("click", showWebsiteDemo);
  if (btnDemoViewWebsite) btnDemoViewWebsite.addEventListener("click", showWebsiteDemo);
  if (btnReturnToSignup) btnReturnToSignup.addEventListener("click", showAuthCard);
  if (btnHeroSignup) btnHeroSignup.addEventListener("click", showAuthCard);

  if (btnHeroLearn) {
    btnHeroLearn.addEventListener("click", () => {
      showCustomModal({
        title: "NOVA Platform Features",
        message: "Enjoy physics-driven 3D transitions, end-to-end encrypted creator assets, and seamless real-time syncing across all devices.",
        type: "info",
        buttonText: "Got It"
      });
    });
  }

  /* ================= 5. 3D MOUSE PARALLAX TILT PHYSICS (DESKTOP ONLY) ================= */
  document.addEventListener("mousemove", (e) => {
    // Disable parallax on mobile/tablets or when website view is active
    if (!authBox || authBox.classList.contains("page-hidden") || window.innerWidth < 920) return;

    const rect = authBox.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
    const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

    const tiltX = -deltaY * 4.5;
    const tiltY = deltaX * 4.5;

    authBox.style.transform = `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
  });

  document.addEventListener("mouseleave", () => {
    if (authBox && window.innerWidth >= 920) {
      authBox.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  });

  /* ================= 6. PASSWORD VISIBILITY TOGGLES ================= */
  document.querySelectorAll(".toggle-eye-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);
      const showSvg = btn.querySelector(".eye-show");
      const hideSvg = btn.querySelector(".eye-hide");

      if (!input) return;

      if (input.type === "password") {
        input.type = "text";
        if (showSvg) showSvg.style.display = "none";
        if (hideSvg) hideSvg.style.display = "block";
      } else {
        input.type = "password";
        if (showSvg) showSvg.style.display = "block";
        if (hideSvg) hideSvg.style.display = "none";
      }
    });
  });

  /* ================= 7. LIVE PASSWORD STRENGTH ANALYZER ================= */
  const signupPwd = document.getElementById("signup-pwd");
  const pwdMeter = document.getElementById("pwd-meter");
  const pwdStrengthLabel = document.getElementById("pwd-strength-label");
  const pwdStrengthHint = document.getElementById("pwd-strength-hint");

  if (signupPwd) {
    signupPwd.addEventListener("input", () => {
      const val = signupPwd.value;
      if (!val) {
        if (pwdMeter) pwdMeter.style.display = "none";
        return;
      }

      if (pwdMeter) pwdMeter.style.display = "block";
      let score = 0;
      if (val.length >= 8) score++;
      if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;

      const levels = [
        { label: "Too short", color: "var(--danger)", hint: "Use 8+ characters" },
        { label: "Weak", color: "var(--danger)", hint: "Add uppercase & numbers" },
        { label: "Fair", color: "var(--warning)", hint: "Add symbols & mixed case" },
        { label: "Good", color: "#60a5fa", hint: "Almost perfect" },
        { label: "Strong 🔥", color: "var(--success)", hint: "Secure password!" }
      ];

      const cfg = levels[score];
      if (pwdStrengthLabel) {
        pwdStrengthLabel.textContent = cfg.label;
        pwdStrengthLabel.style.color = cfg.color;
      }
      if (pwdStrengthHint) pwdStrengthHint.textContent = cfg.hint;

      for (let i = 1; i <= 4; i++) {
        const seg = document.getElementById(`seg-${i}`);
        if (seg) seg.style.background = i <= score ? cfg.color : "rgba(255, 255, 255, 0.1)";
      }

      checkMatch();
    });
  }

  /* ================= 8. PASSWORD MATCH CONFIRMATION BADGE ================= */
  const signupConfirm = document.getElementById("signup-confirm-pwd");
  const matchBadge = document.getElementById("pwd-match-badge");

  function checkMatch() {
    if (!signupConfirm || !matchBadge) return;
    const p1 = signupPwd ? signupPwd.value : "";
    const p2 = signupConfirm.value;

    if (!p2) {
      matchBadge.style.display = "none";
      return;
    }

    matchBadge.style.display = "block";
    if (p1 === p2 && p1.length >= 8) {
      matchBadge.className = "match-status-badge match-ok";
      matchBadge.textContent = "✓ Passwords match";
    } else {
      matchBadge.className = "match-status-badge match-fail";
      matchBadge.textContent = "✕ Passwords do not match";
    }
  }

  if (signupConfirm) signupConfirm.addEventListener("input", checkMatch);

  /* ================= 9. CONFETTI CELEBRATION FX ================= */
  function shootConfetti() {
    const colors = ["#7059e2", "#836df5", "#10b981", "#38bdf8", "#f43f5e", "#fbbf24"];
    for (let i = 0; i < 70; i++) {
      const dot = document.createElement("div");
      dot.style.position = "fixed";
      dot.style.zIndex = "100000";
      dot.style.width = `${Math.random() * 8 + 5}px`;
      dot.style.height = `${Math.random() * 8 + 5}px`;
      dot.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      dot.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      dot.style.left = "50%";
      dot.style.top = "50%";
      dot.style.pointerEvents = "none";
      document.body.appendChild(dot);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 450 + 200;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity - 180;

      dot.animate(
        [
          { transform: "translate(0, 0) scale(1)", opacity: 1 },
          { transform: `translate(${vx}px, ${vy + 550}px) rotate(${Math.random() * 720}deg) scale(0)`, opacity: 0 }
        ],
        {
          duration: Math.random() * 1000 + 900,
          easing: "cubic-bezier(0.25, 1, 0.5, 1)",
          fill: "forwards"
        }
      ).onfinish = () => dot.remove();
    }
  }

  /* ================= 10. SOCIAL SINGLE SIGN-ON (GOOGLE & APPLE) ================= */
  // Google SSO
  document.querySelectorAll("#btn-social-google, .btn-social-login-google").forEach((btn) => {
    btn.addEventListener("click", () => {
      showCustomModal({
        title: "Google Authentication",
        message: "Connecting securely to Google OAuth service... Please authorize the request to continue.",
        type: "google",
        buttonText: "Continue with Google"
      });
    });
  });

  // Apple SSO
  document.querySelectorAll("#btn-social-apple, .btn-social-login-apple").forEach((btn) => {
    btn.addEventListener("click", () => {
      showCustomModal({
        title: "Apple ID Sign-In",
        message: "Authorizing with Apple Secure Enclave & Passkeys. Confirm with Touch ID or Face ID on your device.",
        type: "apple",
        buttonText: "Authorize"
      });
    });
  });

  // Forgot Password
  const linkForgotPwd = document.getElementById("link-forgot-pwd");
  if (linkForgotPwd) {
    linkForgotPwd.addEventListener("click", (e) => {
      e.preventDefault();
      showCustomModal({
        title: "Reset Password",
        message: "A secure reset link has been dispatched to your email address. Follow the instructions to reset your password.",
        type: "info",
        buttonText: "Got It"
      });
    });
  }

  // Terms and conditions popup
  document.querySelectorAll('a[href="#terms"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showCustomModal({
        title: "Terms & Privacy Policy",
        message: "By joining NOVA, your creative assets remain 100% yours and protected by zero-knowledge encrypted storage.",
        type: "info",
        buttonText: "I Accept"
      });
    });
  });

  /* ================= 11. FORM SUBMISSIONS WITH VALIDATION & FEEDBACK ================= */
  const formSignup = document.getElementById("form-signup-action");
  const formLogin = document.getElementById("form-login-action");
  const firstNameInput = document.getElementById("first-name");
  const lastNameInput = document.getElementById("last-name");
  const signupEmailInput = document.getElementById("signup-email");
  const termsAgreeInput = document.getElementById("terms-agree");
  const loginEmailInput = document.getElementById("login-email");
  const loginPwdInput = document.getElementById("login-pwd");

  // Sign-Up Form Submit
  if (formSignup) {
    formSignup.addEventListener("submit", (e) => {
      e.preventDefault();

      const fName = firstNameInput ? firstNameInput.value.trim() : "";
      const lName = lastNameInput ? lastNameInput.value.trim() : "";
      const email = signupEmailInput ? signupEmailInput.value.trim() : "";
      const pwd = signupPwd ? signupPwd.value : "";
      const confirmPwd = signupConfirm ? signupConfirm.value : "";
      const termsAccepted = termsAgreeInput ? termsAgreeInput.checked : true;

      // Validate inputs
      if (!fName || !lName || !email || !pwd) {
        showCustomModal({
          title: "Missing Information",
          message: "Please fill in all required fields (Name, Email, and Password) to proceed.",
          type: "warning",
          buttonText: "Fix Fields"
        });
        return;
      }

      if (pwd.length < 8) {
        showCustomModal({
          title: "Password Too Short",
          message: "Your password must contain at least 8 characters for security.",
          type: "warning",
          buttonText: "Update Password"
        });
        return;
      }

      if (pwd !== confirmPwd) {
        showCustomModal({
          title: "Passwords Do Not Match",
          message: "Please ensure your confirmation password matches the password you entered.",
          type: "warning",
          buttonText: "Review Passwords"
        });
        return;
      }

      if (!termsAccepted) {
        showCustomModal({
          title: "Terms & Conditions",
          message: "Please check the box to agree to the Terms & Conditions before creating your account.",
          type: "warning",
          buttonText: "I Agree"
        });
        return;
      }

      // Success
      shootConfetti();
      showCustomModal({
        title: "Welcome to NOVA! 🎉",
        message: `Your account has been created for <strong>${fName} ${lName}</strong>. Start capturing moments and creating memories!`,
        type: "success",
        buttonText: "Enter Dashboard",
        onConfirm: () => {
          formSignup.reset();
          if (pwdMeter) pwdMeter.style.display = "none";
          if (matchBadge) matchBadge.style.display = "none";
        }
      });
    });
  }

  // Log-In Form Submit
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = loginEmailInput ? loginEmailInput.value.trim() : "";
      const pwd = loginPwdInput ? loginPwdInput.value : "";

      if (!email || !pwd) {
        showCustomModal({
          title: "Missing Credentials",
          message: "Please provide both your email address and password to sign in.",
          type: "warning",
          buttonText: "Try Again"
        });
        return;
      }

      // Success
      shootConfetti();
      showCustomModal({
        title: "Welcome Back! 🚀",
        message: `Successfully authenticated as <strong>${email}</strong>. Loading your personalized creative space...`,
        type: "success",
        buttonText: "Open Workspace",
        onConfirm: () => {
          formLogin.reset();
        }
      });
    });
  }
});

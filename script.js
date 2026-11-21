/* =========================================================
   NOVA — Modern 3D Swapping Cards Authentication
   Features: 3D Swapping Motion, 3-Image Carousel, Live Password
   Analyzer, Visibility Toggles, Match Badges & Confetti FX
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
  const linkGotoLogin = document.getElementById("link-goto-login");
  const linkGotoSignup = document.getElementById("link-goto-signup");
  const viewSignup = document.getElementById("view-signup");
  const viewLogin = document.getElementById("view-login");
  const carouselHeadline = document.getElementById("carousel-headline");
  const pips = document.querySelectorAll(".indicator-dash");
  const slideBgs = document.querySelectorAll(".slide-bg");
  const visualShowcase = document.getElementById("visual-showcase");

  let isSwapped = false;
  let activeSlideIndex = 0;

  // Atmospheric slide data (matching the 3 SVG images)
  const slideData = [
    { headline: "Capturing Moments, <br />Creating Memories" },
    { headline: "Empowering Creators, <br />Everywhere" },
    { headline: "Seamless Security, <br />Frictionless Flow" }
  ];

  /* ================= 1. 3-IMAGE CAROUSEL SWITCHER ================= */
  function setSlide(index) {
    activeSlideIndex = index;

    // Switch active slide SVG with smooth transition
    slideBgs.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    // Update indicator dashes
    pips.forEach((pip, i) => {
      pip.classList.toggle("active", i === index);
    });

    // Smoothly update headline with subtle fade
    carouselHeadline.style.opacity = "0";
    setTimeout(() => {
      carouselHeadline.innerHTML = slideData[index].headline;
      carouselHeadline.style.opacity = "1";
    }, 200);
  }

  pips.forEach((pip) => {
    pip.addEventListener("click", () => {
      const idx = parseInt(pip.dataset.index, 10);
      setSlide(idx);
    });
  });

  // Optional auto-slide rotation every 6 seconds
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

  /* ================= 2. 3D CARD SWAPPING MOTION ================= */
  function toggleCardSwap(forceState = null) {
    if (forceState !== null) {
      isSwapped = forceState;
    } else {
      isSwapped = !isSwapped;
    }

    if (isSwapped) {
      authBox.classList.add("is-swapped");
      if (swapBtnLabel) swapBtnLabel.textContent = "Swap to Sign Up";
      setTimeout(() => {
        viewSignup.classList.add("is-hidden");
        viewLogin.classList.remove("is-hidden");
      }, 300);
    } else {
      authBox.classList.remove("is-swapped");
      if (swapBtnLabel) swapBtnLabel.textContent = "Swap to Log In";
      setTimeout(() => {
        viewLogin.classList.add("is-hidden");
        viewSignup.classList.remove("is-hidden");
      }, 300);
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

  /* ================= 3. "BACK TO WEBSITE" PAGE NAVIGATION ================= */
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

  const btnHeroLearn = document.getElementById("btn-hero-learn");
  if (btnHeroLearn) {
    btnHeroLearn.addEventListener("click", () => {
      alert("NOVA Core: High-performance creative tools, real-time sync, and modern security.");
    });
  }

  /* ================= 4. 3D MOUSE PARALLAX TILT PHYSICS ================= */
  document.addEventListener("mousemove", (e) => {
    if (!authBox || authBox.classList.contains("page-hidden")) return;
    const rect = authBox.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
    const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

    const tiltX = -deltaY * 5; // Subtle luxury 3D card tilt
    const tiltY = deltaX * 5;

    authBox.style.transform = `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
  });

  document.addEventListener("mouseleave", () => {
    if (authBox) authBox.style.transform = "rotateX(0deg) rotateY(0deg)";
  });

  /* ================= 5. PASSWORD VISIBILITY TOGGLES ================= */
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

  /* ================= 6. LIVE PASSWORD STRENGTH ANALYZER ================= */
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
        { label: "Fair", color: "var(--warning)", hint: "Add symbols" },
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

  /* ================= 7. PASSWORD MATCH CONFIRMATION BADGE ================= */
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

  /* ================= 8. CONFETTI CELEBRATION FX ================= */
  function shootConfetti() {
    const colors = ["#7059e2", "#836df5", "#10b981", "#38bdf8", "#f43f5e", "#fbbf24"];
    for (let i = 0; i < 60; i++) {
      const dot = document.createElement("div");
      dot.style.position = "fixed";
      dot.style.zIndex = "999";
      dot.style.width = `${Math.random() * 8 + 5}px`;
      dot.style.height = `${Math.random() * 8 + 5}px`;
      dot.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      dot.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      dot.style.left = "50%";
      dot.style.top = "50%";
      dot.style.pointerEvents = "none";
      document.body.appendChild(dot);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 400 + 200;
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

  /* ================= 9. FORM SUBMISSIONS ================= */
  const successModal = document.getElementById("success-modal");
  const btnCloseSuccess = document.getElementById("btn-close-success");
  const formSignup = document.getElementById("form-signup-action");
  const formLogin = document.getElementById("form-login-action");

  if (formSignup) {
    formSignup.addEventListener("submit", (e) => {
      e.preventDefault();
      shootConfetti();
      if (successModal) successModal.classList.add("active");
    });
  }

  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      shootConfetti();
      if (successModal) successModal.classList.add("active");
    });
  }

  if (btnCloseSuccess) {
    btnCloseSuccess.addEventListener("click", () => {
      if (successModal) successModal.classList.remove("active");
      if (formSignup) formSignup.reset();
      if (formLogin) formLogin.reset();
      if (pwdMeter) pwdMeter.style.display = "none";
      if (matchBadge) matchBadge.style.display = "none";
    });
  }

  document.querySelectorAll(".btn-social").forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("Single Sign-On (SSO) popup opened.");
    });
  });
});

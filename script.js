/* ═══════════════════════════════════════════════════════════════
   AYAAN.MA · BISMILLAH RASAM — Invitation Script
   ═══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────
   FAMILY CONFIGURATION — edit these values only
   ───────────────────────────────────────────────────────────── */
const CONFIG = {
  babyName: "AYAAN.MA",

  // Event date & time (local time of the venue)
  eventDate: "2026-11-28T17:30:00",

  // WhatsApp number for RSVP, in international format WITHOUT '+' or spaces.
  // Example: "919876543210" (India) · "971501234567" (UAE) · "966501234567" (KSA)
  // Currently set to +91 93858 81725 (India).
  whatsappNumber: "919385881725",

  // Exact Google Maps location link of the home.
  // "Get Directions" opens this pin (launches the Maps app on phones).
  mapsUrl: "https://maps.app.goo.gl/8Mt25F4oQihy2YRa8?g_st=iw",

  // Optional fallback: a text address used only if mapsUrl is empty.
  // Example: "12 Rose Street, Green Park, Chennai, India"
  homeAddress: "",

  // Optional: a Google Maps "Embed a map" iframe URL for a live map.
  // Leave "" to show the elegant placeholder.
  mapsEmbedUrl: "",

  // Optional: path or URL to a soft background audio file (e.g. "assets/audio.mp3").
  // Leave "" to use the built-in gentle ambient tone (no file needed).
  audioSrc: "",
};

/* ═══════════════════════════════════════════════════════════ */
(() => {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Toast ─────────────────────────────────────────────── */
  const toastEl = $("#toast");
  let toastTimer = null;
  function toast(message, ms = 3800) {
    toastEl.textContent = message;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), ms);
  }

  /* ═══════════════════════════════════════════════════════
     1 · OPENING — ROYAL DOORS
     ═══════════════════════════════════════════════════════ */
  const opening = $("#opening");
  const openBtn = $("#openInvitation");

  function openDoors() {
    opening.classList.add("doors-open");
  }

  if (reduceMotion) {
    openDoors();
  } else {
    // Let the Bismillah breathe, then swing the doors open.
    setTimeout(openDoors, 3000);
  }

  openBtn.addEventListener("click", () => {
    opening.classList.add("exit");
    document.body.classList.remove("locked");
    initReveals();
    startParticles();
    setTimeout(() => opening.remove(), 1300);
    // Gentle nudge toward the ambience control.
    setTimeout(() => toast("Tap the ♪ button below for soft ambience", 4200), 1600);
  });

  /* ═══════════════════════════════════════════════════════
     2 · SCROLL REVEALS
     ═══════════════════════════════════════════════════════ */
  function initReveals() {
    const items = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("visible"));
      return;
    }
    // Stagger siblings inside each section for a cascade effect.
    const sections = $$(".section, .hero");
    sections.forEach((sec) => {
      $$(".reveal", sec).forEach((el, i) => {
        el.style.setProperty("--d", `${Math.min(i * 0.12, 0.7)}s`);
      });
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    items.forEach((el) => io.observe(el));
  }

  /* ═══════════════════════════════════════════════════════
     3 · GOLDEN PARTICLES
     ═══════════════════════════════════════════════════════ */
  function startParticles() {
    if (reduceMotion) return;
    const canvas = $("#particles");
    const ctx = canvas.getContext("2d");
    let w, h, dpr;
    let particles = [];
    let running = true;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(70, Math.floor((w * h) / 22000));
      particles = Array.from({ length: count }, spawn);
    }

    function spawn() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.9,
        vy: 0.12 + Math.random() * 0.35,
        vx: (Math.random() - 0.5) * 0.16,
        phase: Math.random() * Math.PI * 2,
        speed: 0.004 + Math.random() * 0.01,
        alpha: 0.25 + Math.random() * 0.55,
      };
    }

    function tick() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.phase += p.speed;
        p.y -= p.vy;
        p.x += p.vx + Math.sin(p.phase) * 0.18;
        if (p.y < -8) { p.y = h + 8; p.x = Math.random() * w; }
        if (p.x < -8) p.x = w + 8;
        if (p.x > w + 8) p.x = -8;
        const glow = p.alpha * (0.6 + 0.4 * Math.sin(p.phase * 2));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 217, 140, ${glow.toFixed(3)})`;
        ctx.shadowColor = "rgba(212, 175, 55, 0.8)";
        ctx.shadowBlur = p.r * 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      requestAnimationFrame(tick);
    }

    document.addEventListener("visibilitychange", () => {
      running = !document.hidden;
      if (running) requestAnimationFrame(tick);
    });
    window.addEventListener("resize", resize, { passive: true });
    resize();
    requestAnimationFrame(tick);
  }

  /* ═══════════════════════════════════════════════════════
     4 · COUNTDOWN
     ═══════════════════════════════════════════════════════ */
  const target = new Date(CONFIG.eventDate).getTime();
  const cd = {
    days: $("#cd-days"),
    hours: $("#cd-hours"),
    mins: $("#cd-mins"),
    secs: $("#cd-secs"),
  };
  const pad = (n) => String(n).padStart(2, "0");

  function updateCountdown() {
    const diff = target - Date.now();
    if (diff <= 0) {
      $("#countdown").hidden = true;
      $("#countdownDone").hidden = false;
      clearInterval(cdTimer);
      return;
    }
    const s = Math.floor(diff / 1000);
    cd.days.textContent = pad(Math.floor(s / 86400));
    cd.hours.textContent = pad(Math.floor((s % 86400) / 3600));
    cd.mins.textContent = pad(Math.floor((s % 3600) / 60));
    cd.secs.textContent = pad(s % 60);
  }
  const cdTimer = setInterval(updateCountdown, 1000);
  updateCountdown();

  /* ═══════════════════════════════════════════════════════
     5 · LOCATION / DIRECTIONS
     ═══════════════════════════════════════════════════════ */
  if (CONFIG.mapsEmbedUrl) {
    const frame = $("#mapFrame");
    $("#mapPlaceholder").remove();
    const iframe = document.createElement("iframe");
    iframe.src = CONFIG.mapsEmbedUrl;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.allowFullscreen = true;
    iframe.title = "Event location map";
    frame.appendChild(iframe);
  }

  $("#directionsBtn").addEventListener("click", () => {
    if (CONFIG.mapsUrl.trim()) {
      window.open(CONFIG.mapsUrl, "_blank", "noopener");
    } else if (CONFIG.homeAddress.trim()) {
      const url =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(CONFIG.homeAddress);
      window.open(url, "_blank", "noopener");
    } else {
      toast("The family will add the home address soon, Insha'Allah. 🌙");
    }
  });

  // Make the map card itself tappable when a location link is set.
  if (CONFIG.mapsUrl.trim()) {
    const placeholder = $("#mapPlaceholder");
    if (placeholder) {
      placeholder.classList.add("tappable");
      placeholder.setAttribute("role", "link");
      placeholder.setAttribute("tabindex", "0");
      placeholder.setAttribute("aria-label", "Open our home location in Google Maps");
      const openMaps = () => window.open(CONFIG.mapsUrl, "_blank", "noopener");
      placeholder.addEventListener("click", openMaps);
      placeholder.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openMaps(); }
      });
    }
  }

  /* ═══════════════════════════════════════════════════════
     6 · RSVP VIA WHATSAPP
     ═══════════════════════════════════════════════════════ */
  const rsvpForm = $("#rsvpForm");
  const nameInput = $("#guestName");
  const rsvpHint = $("#rsvpHint");

  if (!CONFIG.whatsappNumber) {
    rsvpHint.textContent =
      "The family's WhatsApp number will be added soon — your response will be copied so you can send it easily.";
  }

  nameInput.addEventListener("input", () => nameInput.classList.remove("invalid"));

  rsvpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (!name) {
      nameInput.classList.add("invalid");
      nameInput.focus();
      toast("Kindly enter your good name first.");
      return;
    }
    const count = $("#guestCount").value;
    const attending = rsvpForm.querySelector('input[name="attending"]:checked').value;

    const message = [
      "Assalamu Alaikum! 🌙",
      "",
      `RSVP — Bismillah Rasam of ${CONFIG.babyName}`,
      "Saturday, 28 November 2026 · 5:30 PM onwards",
      "",
      `Guest Name: ${name}`,
      `Number of Guests: ${count}`,
      attending === "yes"
        ? "Status: Insha'Allah, we will attend ✨"
        : "Status: Unable to attend, but our prayers are with you 🤲",
      "",
      "May Allah bless AYAAN.MA. Ameen!",
    ].join("\n");

    const encoded = encodeURIComponent(message);

    if (CONFIG.whatsappNumber) {
      window.open(
        `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`,
        "_blank",
        "noopener"
      );
      toast("JazakAllah Khair! Your RSVP is on its way. 🌙");
    } else {
      try {
        await navigator.clipboard.writeText(message);
        toast("RSVP copied! Send it to the family on WhatsApp. 🌙", 5000);
      } catch {
        window.open(`https://wa.me/?text=${encoded}`, "_blank", "noopener");
      }
    }
  });

  /* ═══════════════════════════════════════════════════════
     7 · SHARE INVITATION
     ═══════════════════════════════════════════════════════ */
  $("#shareBtn").addEventListener("click", async () => {
    const shareData = {
      title: `${CONFIG.babyName} — Bismillah Rasam`,
      text:
        `🌙 You are cordially invited to the Bismillah Rasam of ${CONFIG.babyName}\n` +
        `📅 Saturday, 28 November 2026 · 5:30 PM onwards\n🏡 Our Home\n\n` +
        `A Beautiful Beginning of Knowledge ✨`,
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* cancelled */ }
    } else {
      const text = `${shareData.text}\n\n${shareData.url}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    }
  });

  /* ═══════════════════════════════════════════════════════
     8 · BACKGROUND AMBIENCE (file or gentle synthesized pad)
     ═══════════════════════════════════════════════════════ */
  const audioBtn = $("#audioToggle");
  let audioCtx = null;
  let masterGain = null;
  let fileAudio = null;
  let playing = false;
  let synthNodes = [];

  function buildSynth() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0;

    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.Q.value = 0.4;

    masterGain.connect(filter);
    filter.connect(audioCtx.destination);

    // Warm, serene chord — a soft devotional ambience.
    const voices = [
      { freq: 146.83, gain: 0.30, type: "sine" },     // D3
      { freq: 220.0,  gain: 0.22, type: "sine" },     // A3
      { freq: 293.66, gain: 0.16, type: "triangle" }, // D4
      { freq: 349.23, gain: 0.08, type: "sine" },     // F4
    ];
    voices.forEach((v, i) => {
      const osc = audioCtx.createOscillator();
      osc.type = v.type;
      osc.frequency.value = v.freq;
      osc.detune.value = (i - 1.5) * 3;

      const g = audioCtx.createGain();
      g.gain.value = v.gain;

      // Slow breathing tremolo, each voice slightly out of phase.
      const lfo = audioCtx.createOscillator();
      lfo.frequency.value = 0.06 + i * 0.023;
      const lfoGain = audioCtx.createGain();
      lfoGain.gain.value = v.gain * 0.45;
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);

      osc.connect(g);
      g.connect(masterGain);
      osc.start();
      lfo.start();
      synthNodes.push(osc, lfo);
    });
  }

  function fade(target, seconds = 1.4) {
    const now = audioCtx.currentTime;
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(masterGain.gain.value, now);
    masterGain.gain.linearRampToValueAtTime(target, now + seconds);
  }

  async function startAudio() {
    if (CONFIG.audioSrc) {
      if (!fileAudio) {
        fileAudio = new Audio(CONFIG.audioSrc);
        fileAudio.loop = true;
        fileAudio.volume = 0.45;
        fileAudio.addEventListener("error", () => {
          fileAudio = null;
          CONFIG.audioSrc = "";
          startAudio(); // fall back to synth
        }, { once: true });
      }
      try {
        await fileAudio.play();
        return true;
      } catch {
        return false;
      }
    }
    if (!audioCtx) buildSynth();
    if (audioCtx.state === "suspended") await audioCtx.resume();
    fade(0.055);
    return true;
  }

  function stopAudio() {
    if (fileAudio) fileAudio.pause();
    if (audioCtx) fade(0, 0.8);
  }

  audioBtn.addEventListener("click", async () => {
    playing = !playing;
    if (playing) {
      const ok = await startAudio();
      if (!ok) { playing = false; toast("Audio could not start on this device."); }
    } else {
      stopAudio();
    }
    audioBtn.classList.toggle("playing", playing);
    audioBtn.setAttribute("aria-pressed", String(playing));
    audioBtn.setAttribute(
      "aria-label",
      playing ? "Mute background ambience" : "Play background ambience"
    );
  });

  // Pause ambience when the tab is hidden, resume if it was playing.
  document.addEventListener("visibilitychange", () => {
    if (!playing) return;
    if (document.hidden) stopAudio();
    else startAudio();
  });
})();
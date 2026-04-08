(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const initFirebase = () => {
    try {
      if (!window.firebase) return null;
      const firebaseConfig = {
        apiKey: "AIzaSyDceqvB3PplG4ie9CwuvMQgEnJHDQ8FQ8A",
        authDomain: "wedding-card-7777.firebaseapp.com",
        projectId: "wedding-card-7777",
        storageBucket: "wedding-card-7777.firebasestorage.app",
        messagingSenderId: "1046185480932",
        appId: "1:1046185480932:web:98032b6e99af9603c692f1",
      };
      if (!firebase.apps?.length) firebase.initializeApp(firebaseConfig);
      if (!firebase.firestore) return null;
      return firebase.firestore();
    } catch (_) {
      return null;
    }
  };

  const firestore = initFirebase();

  const cover = $("#cover");
  const openInvite = $("#openInvite");
  const glassdoor = $("#glassdoor");
  const main = $("#jemputan");
  const bottomnav = $("#bottomnav");
  const year = $("#year");

  const cdDays = $("#cdDays");
  const cdHours = $("#cdHours");
  const cdMins = $("#cdMins");
  const cdSecs = $("#cdSecs");
  const cdNote = $("#cdNote");

  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightboxImg");
  const lightboxClose = $("#lightboxClose");

  const rsvpForm = $("#rsvpForm");
  const rsvpNote = $("#rsvpNote");
  const openRsvp = $("#openRsvp");
  const rsvpModal = $("#rsvpModal");
  const rsvpClose = $("#rsvpClose");
  const rsvpCancel = $("#rsvpCancel");
  const rsvpStepChoose = $("#rsvpStepChoose");
  const rsvpStepForm = $("#rsvpStepForm");
  const rsvpChooseHadir = $("#rsvpChooseHadir");
  const rsvpChooseTidak = $("#rsvpChooseTidak");
  const rsvpAttendance = $("#rsvpAttendance");
  const rsvpName = $("#rsvpName");

  const noticeModal = $("#noticeModal");
  const noticeOk = $("#noticeOk");

  const openContact = $("#openContact");
  const contactModal = $("#contactModal");
  const contactClose = $("#contactClose");

  const openGift = $("#openGift");
  const giftModal = $("#giftModal");
  const giftClose = $("#giftClose");
  const giftCopy = $("#giftCopy");
  const giftAcc = $("#giftAcc");
  const giftNote = $("#giftNote");

  const openLocation = $("#openLocation");
  const locModal = $("#locModal");
  const locClose = $("#locClose");

  const ucapanList = $("#ucapanList");
  const openUcapan = $("#openUcapan");
  const openRsvpFromUcapan = $("#openRsvpFromUcapan");
  const ucapanModal = $("#ucapanModal");
  const ucapanClose = $("#ucapanClose");

  const smoothScrollTo = (targetY, durationMs = 8000, root = getScrollRoot()) => {
    const startY = root.scrollTop;
    const maxY = Math.max(0, root.scrollHeight - root.clientHeight);
    const endY = Math.min(maxY, Math.max(0, Number(targetY) || 0));
    const startT = performance.now();
    const dur = Math.max(0, Number(durationMs) || 0);
    if (dur <= 0 || Math.abs(endY - startY) < 1) {
      root.scrollTop = endY;
      return;
    }

    const step = (t) => {
      const p = Math.min(1, (t - startT) / dur);
      const e = easeOutCubic(p);
      root.scrollTop = startY + (endY - startY) * e;
      if (p < 1) window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  };

  const scrollToHashTarget = (hash, durationMs = 1200) => {
    if (!hash || hash === '#') return false;
    let id = hash;
    try {
      id = decodeURIComponent(hash);
    } catch (_) {
      // ignore
    }

    const el = document.querySelector(id);
    if (!el) return false;
    const root = getScrollRoot();
    const y = el.getBoundingClientRect().top + root.scrollTop;
    smoothScrollTo(y, durationMs, root);
    return true;
  };
  const ucapanForm = $("#ucapanForm");
  const ucapanNote = $("#ucapanNote");
  const ucapanName = $("#ucapanName");
  const ucapanText = $("#ucapanText");

  const musicToggle = $("#musicToggle");
  const bgMusic = $("#bgMusic");
  const musicLabel = $("#musicLabel");

  const WEDDING_ISO = "2026-05-23T11:00:00+08:00";
  const weddingAt = new Date(WEDDING_ISO);

  const getBgUrlFromEl = (el) => {
    if (!el) return null;
    const bg = window.getComputedStyle(el).backgroundImage;
    if (!bg || bg === 'none') return null;
    const match = bg.match(/url\((['"]?)(.*?)\1\)/);
    return match?.[2] || null;
  };

  let bgFitImg = null;
  const fitCardToBackground = () => {
    if (!main) return;

    const manualRaw = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--card-width-manual')
      .trim();
    const manual = Number.parseInt(manualRaw || '0', 10) || 0;
    if (manual > 0) {
      document.documentElement.style.setProperty('--card-width-effective', `${manual}px`);
      return;
    }

    const url = getBgUrlFromEl(main);
    if (!url) return;

    if (!bgFitImg) bgFitImg = new Image();

    const apply = () => {
      const w = bgFitImg.naturalWidth || 0;
      const h = bgFitImg.naturalHeight || 0;
      if (!w || !h) return;

      const ratio = w / h;
      const menuHeightRaw = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--menu-height')
        .trim();
      const menuHeight = Number.parseInt(menuHeightRaw || '0', 10) || 0;

      const availableHeight = Math.max(320, window.innerHeight - menuHeight);
      const desired = Math.floor(availableHeight * ratio);
      const widthPx = Math.max(320, Math.min(window.innerWidth, desired));
      document.documentElement.style.setProperty('--card-width-effective', `${widthPx}px`);
    };

    if (bgFitImg.src !== url) {
      bgFitImg.onload = apply;
      bgFitImg.src = url;
    } else {
      apply();
    }
  };

  const setText = (el, text) => {
    if (!el) return;
    el.textContent = String(text);
  };

  const pad2 = (n) => String(n).padStart(2, "0");

  const escapeHtml = (s) =>
    String(s)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');

  const playCardCoverVideo = () => {
    const targets = ['.cardcover__video', '.glassdoor__video'];
    for (const sel of targets) {
      const v = document.querySelector(sel);
      if (!v || !(v instanceof HTMLVideoElement)) continue;
      v.play().catch(() => {
        // Autoplay can be blocked; video is muted so this should usually succeed.
      });
    }
  };

  let heroCarouselAutoScrollStarted = false;
  let autoScrollContentStarted = false;

  const startAutoScrollContent = () => {
    if (autoScrollContentStarted) return;
    autoScrollContentStarted = true;
    const scroller = (() => {
      if (main && main.scrollHeight > main.clientHeight + 2) return main;
      return document.scrollingElement || document.documentElement;
    })();

    let raf = 0;
    let last = 0;
    let cancelled = false;

    const stop = () => {
      cancelled = true;
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      scroller.removeEventListener('wheel', stop);
      scroller.removeEventListener('touchstart', stop);
      scroller.removeEventListener('pointerdown', stop);
      window.removeEventListener('keydown', stop);
    };

    const speedPxPerSec = 28;
    const step = (t) => {
      if (cancelled) return;
      if (!last) last = t;
      const dt = (t - last) / 1000;
      last = t;

      const maxTop = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
      if (maxTop <= 0) {
        stop();
        return;
      }

      scroller.scrollTop = Math.min(maxTop, scroller.scrollTop + speedPxPerSec * dt);
      if (scroller.scrollTop >= maxTop - 1) {
        stop();
        return;
      }

      raf = window.requestAnimationFrame(step);
    };

    const enableCancelAfterMs = 700;
    window.setTimeout(() => {
      if (cancelled) return;
      scroller.addEventListener('wheel', stop, { passive: true });
      scroller.addEventListener('touchstart', stop, { passive: true });
      scroller.addEventListener('pointerdown', stop, { passive: true });
      window.addEventListener('keydown', stop);
    }, enableCancelAfterMs);

    window.setTimeout(() => {
      if (cancelled) return;
      raf = window.requestAnimationFrame(step);
    }, 350);
  };

  const openGlassDoor = () => {
    if (!glassdoor) return;
    if (glassdoor.classList.contains('is-opening')) return;

    playCardCoverVideo();

    if (!heroCarouselAutoScrollStarted) {
      heroCarouselAutoScrollStarted = true;
      initHeroCarouselAutoScroll();
    }

    if (bgMusic) {
      bgMusic.preload = 'auto';
      bgMusic.load();
      bgMusic.volume = 1;
    }

    tryPlayMusic().catch(() => {
      if (!bgMusic) return;
      const retryOnce = () => {
        bgMusic.removeEventListener('canplay', retryOnce);
        tryPlayMusic().catch(() => {
          // Autoplay may still be blocked on some devices.
        });
      };
      bgMusic.addEventListener('canplay', retryOnce, { once: true });
    });

    glassdoor.classList.add('is-opening');

    let done = false;
    const finalizeOpen = () => {
      if (done) return;
      done = true;
      glassdoor.style.display = 'none';
      document.body.classList.remove('is-glassdoor-locked');
      if (bottomnav) bottomnav.hidden = false;
      startRevealObserver();
      startCountdown();
      startAutoScrollContent();
    };

    const leftPanel = glassdoor.querySelector('.glassdoor__panel--left');
    const onAnimEnd = (e) => {
      if (!(e instanceof AnimationEvent)) return;
      if (e.animationName !== 'glassLeft') return;
      leftPanel?.removeEventListener('animationend', onAnimEnd);
      finalizeOpen();
    };
    leftPanel?.addEventListener('animationend', onAnimEnd);

    window.setTimeout(finalizeOpen, 2600);
  };

  const loadState = () => {
    document.body.classList.add('is-invite-open');
    document.body.classList.add('is-glassdoor-locked');

    if (cover) cover.style.display = 'none';
    if (main) main.hidden = false;
    if (bottomnav) bottomnav.hidden = false;

    if (glassdoor) {
      glassdoor.style.display = '';
      glassdoor.classList.remove('is-opening');
    }

    fitCardToBackground();
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const diffParts = (ms) => {
    const total = Math.max(0, ms);
    const sec = Math.floor(total / 1000);
    const days = Math.floor(sec / (3600 * 24));
    const hours = Math.floor((sec % (3600 * 24)) / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;
    return { days, hours, mins, secs };
  };

  let countdownTimer = null;
  const startCountdown = () => {
    if (countdownTimer) return;

    const tick = () => {
      const now = new Date();
      const ms = weddingAt.getTime() - now.getTime();

      if (ms <= 0) {
        setText(cdDays, "0");
        setText(cdHours, "0");
        setText(cdMins, "0");
        setText(cdSecs, "0");
        setText(cdNote, "Hari ini hari bahagia. Jumpa anda di majlis.");
        return;
      }

      const { days, hours, mins, secs } = diffParts(ms);
      setText(cdDays, days);
      setText(cdHours, pad2(hours));
      setText(cdMins, pad2(mins));
      setText(cdSecs, pad2(secs));
      setText(cdNote, "");
    };

    tick();
    countdownTimer = window.setInterval(tick, 1000);
  };

  let revealObserver = null;
  const markAutoRevealTargets = () => {
    const root = main || document;
    const candidates = [
      '.section:not(.hero)',
      '.section__head',
      '.card:not(.hero__card)',
      '.timeline__item',
      '.gallery__grid',
      '.gallery__item',
      '.schedule__timeline',
      '.schedule__row',
      '.closing__card',
      '.footer',
    ];

    $$(candidates.join(','), root).forEach((el) => {
      if (el instanceof HTMLElement && !el.hasAttribute('data-reveal')) {
        el.setAttribute('data-reveal', '');
      }
    });
  };

  const startRevealObserver = () => {
    markAutoRevealTargets();

    const items = $$('[data-reveal]');

    for (const el of items) {
      if (!(el instanceof HTMLElement)) continue;
      el.style.transitionDelay = '0s';
    }

    if (revealObserver) {
      for (const el of items) {
        if (el instanceof HTMLElement && el.dataset.revealObserved !== '1') {
          el.dataset.revealObserved = '1';
          revealObserver.observe(el);
        }
      }
      return;
    }

    revealObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            revealObserver.unobserve(e.target);
          }
        }
      },
      {
        threshold: 0.15,
        root: main || null,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    for (const el of items) {
      if (el instanceof HTMLElement && el.dataset.revealObserved !== '1') {
        el.dataset.revealObserved = '1';
        revealObserver.observe(el);
      }
    }
  };

  const openLightbox = (src) => {
    if (!src) return;
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImg.removeAttribute('src');
  };

  const tryPlayMusic = async () => {
    if (!bgMusic) return;
    await bgMusic.play();
    musicToggle?.classList.add('is-playing');
    setText(musicLabel, 'Muzik On');
  };

  const pauseMusic = () => {
    if (!bgMusic) return;
    bgMusic.pause();
    musicToggle?.classList.remove('is-playing');
    setText(musicLabel, 'Muzik Off');
  };

  const toggleMusic = async () => {
    if (!bgMusic) return;
    if (bgMusic.paused) {
      try {
        await tryPlayMusic();
      } catch (_) {
        setText(musicLabel, "Muzik");
      }
    } else {
      pauseMusic();
    }
  };

  const updateNavDensity = () => {
    if (!bottomnav) return;
    if (window.innerWidth <= 390) bottomnav.classList.add('bottomnav--compact');
    else bottomnav.classList.remove('bottomnav--compact');
  };

  const parallax = () => {
    const bg = $('.cover__bg');
    if (!bg) return;

    const y = window.scrollY || 0;
    bg.style.transform = `translate3d(0, ${Math.min(0, -y * 0.08)}px, 0)`;
  };

  const saveRsvp = (payload) => {
    const key = 'rsvp_entries';
    const current = JSON.parse(localStorage.getItem(key) || '[]');
    current.unshift({ ...payload, at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(current.slice(0, 50)));
  };

  const hadirCountEl = $('#hadirCount');
  const tidakHadirCountEl = $('#tidakHadirCount');
  const updateKehadiranStats = () => {
    if (!hadirCountEl && !tidakHadirCountEl) return;
    const key = 'rsvp_entries';
    const items = JSON.parse(localStorage.getItem(key) || '[]');
    const hadir = items.filter(i => i && i.attendance === 'hadir').length;
    const tidak = items.filter(i => i && i.attendance === 'tidak_hadir').length;
    setText(hadirCountEl, hadir);
    setText(tidakHadirCountEl, tidak);
  };

  let kehadiranUnsub = null;
  const startKehadiranRealtime = () => {
    if (!firestore) return;
    if (kehadiranUnsub) return;
    kehadiranUnsub = firestore.collection('rsvps').onSnapshot(
      (snap) => {
        if (!hadirCountEl && !tidakHadirCountEl) return;
        let hadir = 0;
        let tidak = 0;
        snap.forEach((doc) => {
          const d = doc.data() || {};
          if (d.attendance === 'hadir') hadir += 1;
          else if (d.attendance === 'tidak_hadir') tidak += 1;
        });
        setText(hadirCountEl, hadir);
        setText(tidakHadirCountEl, tidak);
      },
      () => {
        updateKehadiranStats();
      }
    );
  };

  const saveRsvpToFirestore = async (payload) => {
    if (!firestore) return;
    const record = {
      ...payload,
      at: new Date().toISOString(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      userAgent: navigator.userAgent,
    };
    await firestore.collection('rsvps').add(record);
  };

  const saveUcapanToFirestore = async (payload) => {
    if (!firestore) return;
    const record = {
      name: payload?.name,
      wish: payload?.text,
      phone: payload?.phone,
      kategori: payload?.kategori,
      type: 'ucapan',
      at: new Date().toISOString(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      userAgent: navigator.userAgent,
    };
    await firestore.collection('rsvps').add(record);
  };

  let ucapanUnsub = null;
  const startUcapanRealtime = () => {
    if (!firestore) return;
    if (ucapanUnsub) return;
    ucapanUnsub = firestore
      .collection('rsvps')
      .orderBy('createdAt', 'desc')
      .limit(200)
      .onSnapshot(
        (snap) => {
          const items = [];
          snap.forEach((doc) => {
            const d = doc.data() || {};
            if (!d.name || !d.wish) return;
            items.push({
              name: String(d.name || ''),
              text: String(d.wish || ''),
              at: String(d.at || ''),
            });
          });
          saveUcapan(items);
          renderUcapan();
        },
        () => {
          // Firestore failed; keep localStorage rendering.
        }
      );
  };

  const openRsvpModal = () => {
    if (locModal?.classList.contains('is-open')) closeLocModal();
    if (contactModal?.classList.contains('is-open')) closeContactModal();
    if (giftModal?.classList.contains('is-open')) closeGiftModal();
    if (ucapanModal?.classList.contains('is-open')) closeUcapanModal();
    if (!rsvpModal) return;
    rsvpModal.classList.add('is-open');
    rsvpModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setText(rsvpNote, '');
    rsvpModal.classList.add('rsvpModal--choose');
    rsvpModal.classList.remove('rsvpModal--noPax');
    if (rsvpAttendance) rsvpAttendance.value = '';
    if (rsvpStepForm) rsvpStepForm.hidden = true;
    if (rsvpStepChoose) rsvpStepChoose.hidden = false;
  };

  const showRsvpChooseStep = () => {
    if (rsvpStepForm) rsvpStepForm.hidden = true;
    if (rsvpStepChoose) rsvpStepChoose.hidden = false;
    rsvpModal?.classList.add('rsvpModal--choose');
    rsvpModal?.classList.remove('rsvpModal--noPax');
    if (rsvpAttendance) rsvpAttendance.value = '';
    setText(rsvpNote, '');
  };

  const closeRsvpModal = () => {
    if (!rsvpModal) return;
    rsvpModal.classList.remove('is-open');
    rsvpModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const openContactModal = () => {
    if (rsvpModal?.classList.contains('is-open')) closeRsvpModal();
    if (locModal?.classList.contains('is-open')) closeLocModal();
    if (ucapanModal?.classList.contains('is-open')) closeUcapanModal();
    if (giftModal?.classList.contains('is-open')) closeGiftModal();
    if (!contactModal) return;
    contactModal.classList.add('is-open');
    contactModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeContactModal = () => {
    if (!contactModal) return;
    contactModal.classList.remove('is-open');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const openGiftModal = () => {
    if (rsvpModal?.classList.contains('is-open')) closeRsvpModal();
    if (locModal?.classList.contains('is-open')) closeLocModal();
    if (ucapanModal?.classList.contains('is-open')) closeUcapanModal();
    if (contactModal?.classList.contains('is-open')) closeContactModal();
    if (!giftModal) return;
    giftModal.classList.add('is-open');
    giftModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setText(giftNote, '');
  };

  const closeGiftModal = () => {
    if (!giftModal) return;
    giftModal.classList.remove('is-open');
    giftModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setText(giftNote, '');
  };

  const copyGiftAcc = async () => {
    const text = (giftAcc?.textContent || '').trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setText(giftNote, 'Disalin');
      window.setTimeout(() => setText(giftNote, ''), 1400);
    } catch (_) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setText(giftNote, 'Disalin');
        window.setTimeout(() => setText(giftNote, ''), 1400);
      } catch (_) {
        setText(giftNote, 'Tak dapat salin');
        window.setTimeout(() => setText(giftNote, ''), 1400);
      }
      ta.remove();
    }
  };

  const openLocModal = () => {
    if (rsvpModal?.classList.contains('is-open')) closeRsvpModal();
    if (contactModal?.classList.contains('is-open')) closeContactModal();
    if (giftModal?.classList.contains('is-open')) closeGiftModal();
    if (ucapanModal?.classList.contains('is-open')) closeUcapanModal();
    if (!locModal) return;
    locModal.classList.add('is-open');
    locModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLocModal = () => {
    if (!locModal) return;
    locModal.classList.remove('is-open');
    locModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  let noticeTimer = 0;
  const openNoticeModal = () => {
    if (!noticeModal) return;
    if (noticeTimer) window.clearTimeout(noticeTimer);
    noticeModal.classList.add('is-open');
    noticeModal.setAttribute('aria-hidden', 'false');
    noticeTimer = window.setTimeout(() => closeNoticeModal(), 5000);
  };
  const closeNoticeModal = () => {
    if (!noticeModal) return;
    if (noticeTimer) window.clearTimeout(noticeTimer);
    noticeTimer = 0;
    noticeModal.classList.remove('is-open');
    noticeModal.setAttribute('aria-hidden', 'true');
  };

  const setRsvpAttendance = (attendance) => {
    if (rsvpAttendance) rsvpAttendance.value = attendance;

    if (attendance === 'tidak_hadir') rsvpModal?.classList.add('rsvpModal--noPax');
    else rsvpModal?.classList.remove('rsvpModal--noPax');

    rsvpModal?.classList.remove('rsvpModal--choose');

    if (rsvpStepChoose) rsvpStepChoose.hidden = true;
    if (rsvpStepForm) {
      rsvpStepForm.hidden = false;
      rsvpStepForm.scrollTop = 0;
    }
    window.setTimeout(() => rsvpName?.focus(), 50);
  };

  const UCAPAN_KEY = 'ucapan_entries';
  const loadUcapan = () => {
    try {
      return JSON.parse(localStorage.getItem(UCAPAN_KEY) || '[]');
    } catch (_) {
      return [];
    }
  };
  const saveUcapan = (items) => {
    localStorage.setItem(UCAPAN_KEY, JSON.stringify(items.slice(0, 50)));
  };

  const formatUcapanText = (raw) => {
    const t = String(raw || '').trim();
    if (!t) return '';
    if (/^tahniah[!.?,]*$/i.test(t)) return '"Tahniah"';
    return t;
  };

  const formatName = (name) => {
    if (!name) return '';
    return name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  };

  const renderUcapan = () => {
    if (!ucapanList) return;
    const items = loadUcapan();
    ucapanList.innerHTML = items
      .map(
        (it) =>
          `<div class="ucapan__item"><div class="ucapan__text">"${escapeHtml(formatUcapanText(it.text))}"</div><div class="ucapan__from">${escapeHtml(formatName(it.name))}</div></div>`
      )
      .join('');
  };

  const openUcapanModal = () => {
    if (!ucapanModal) return;
    ucapanModal.classList.add('is-open');
    ucapanModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setText(ucapanNote, '');
    window.setTimeout(() => ucapanName?.focus(), 50);
  };

  const closeUcapanModal = () => {
    if (!ucapanModal) return;
    ucapanModal.classList.remove('is-open');
    ucapanModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const onUcapanSubmit = (e) => {
    e.preventDefault();
    const name = String(ucapanName?.value || '').trim();
    const text = String(ucapanText?.value || '').trim();
    const phone = String(ucapanPhone?.value || '').trim();
    const kategori = String(ucapanKategori?.value || '').trim();

    if (!name || !text) {
      setText(ucapanNote, 'Sila isi nama dan ucapan.');
      return;
    }

    const current = loadUcapan();
    current.unshift({ name, text, phone, kategori, at: new Date().toISOString() });
    saveUcapan(current);
    renderUcapan();

    Promise.resolve()
      .then(() => saveUcapanToFirestore({ name, text, phone, kategori }))
      .catch(() => {
        // LocalStorage already saved; Firestore failed.
      });

    if (ucapanForm) ucapanForm.reset();
    closeUcapanModal();
  };

  const onRsvpSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData(rsvpForm);
    const name = String(fd.get('name') || '').trim();
    const attendance = String(fd.get('attendance') || '').trim();
    const pax = attendance === 'tidak_hadir' ? 1 : Number(fd.get('pax') || 1);
    const phone = String(fd.get('phone') || '').trim();
    const kategori = String(fd.get('kategori') || '').trim();
    const wish = String(fd.get('wish') || '').trim();

    if (!name || !attendance || !Number.isFinite(pax) || pax < 1 || !phone || !kategori) {
      setText(rsvpNote, 'Sila lengkapkan maklumat yang diperlukan (Nama, Telefon, Kategori, Kehadiran).');
      return;
    }

    // Disable submit button to prevent double click
    const submitBtn = rsvpForm?.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Menghantar...';
    }

    const payload = { name, attendance, pax, phone, kategori, wish };
    saveRsvp(payload);
    updateKehadiranStats();

    if (wish) {
      const currentUcapan = loadUcapan();
      currentUcapan.unshift({ name, text: wish, phone, kategori, at: new Date().toISOString() });
      saveUcapan(currentUcapan);
      renderUcapan();
    }

    const finalizeOk = () => {
      setText(rsvpNote, '');
      closeRsvpModal();
      // Show success modal
      const successModal = document.getElementById('successModal');
      if (successModal) {
        successModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Hantar';
      }
    };

    saveRsvpToFirestore(payload)
      .then(finalizeOk)
      .catch(() => {
        // LocalStorage already saved; Firestore failed.
        setText(rsvpNote, 'RSVP diterima (offline). Terima kasih.');
        window.setTimeout(() => setText(rsvpNote, ''), 5000);
        window.setTimeout(() => closeRsvpModal(), 350);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Hantar';
        }
      });
  };

  const initGallery = () => {
    if (!lightbox || !lightboxImg) return;
    const items = $$('.gallery__item');
    items.forEach((btn, i) => {
      btn.addEventListener('click', () => openLightbox(btn.dataset.full));
    });
  };

  const initHeroCarouselAutoScroll = () => {
    const track = $('.hero__carouselTrack');
    if (!track) return;

    let timer = 0;
    const intervalMs = 2600;

    const next = () => {
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      if (maxScroll <= 0) return;

      const nextLeft = Math.min(maxScroll, track.scrollLeft + track.clientWidth);
      const wrapped = nextLeft >= maxScroll - 1;
      track.scrollTo({ left: wrapped ? 0 : nextLeft, behavior: 'smooth' });
    };

    const start = () => {
      if (timer) return;
      timer = window.setInterval(next, intervalMs);
    };

    const stop = () => {
      if (!timer) return;
      window.clearInterval(timer);
      timer = 0;
    };

    start();
    track.addEventListener('pointerdown', stop);
    track.addEventListener('pointerup', start);
    track.addEventListener('pointercancel', start);
    track.addEventListener('touchstart', stop, { passive: true });
    track.addEventListener('touchend', start, { passive: true });
    track.addEventListener('mouseenter', stop);
    track.addEventListener('mouseleave', start);
  };

  const init = () => {
    setText(year, new Date().getFullYear());

    document.documentElement.style.scrollBehavior = 'smooth';

    document.addEventListener('click', (e) => {
      const a = e.target instanceof Element ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (!href || href === '#') return;
      if (scrollToHashTarget(href, 1400)) {
        e.preventDefault();
        history.pushState(null, '', href);
      }
    });

    bottomnav?.addEventListener('click', (e) => {
      const btn = e.target instanceof Element ? e.target.closest('.bottomnav__btn') : null;
      if (!btn) return;
      btn.classList.remove('is-bouncing');
      btn.classList.add('is-bouncing');
      window.setTimeout(() => btn.classList.remove('is-bouncing'), 650);
    });

    openInvite?.addEventListener('click', openGlassDoor);

    openRsvp?.addEventListener('click', openRsvpModal);
    rsvpClose?.addEventListener('click', closeRsvpModal);
    rsvpCancel?.addEventListener('click', showRsvpChooseStep);
    rsvpModal?.addEventListener('click', (e) => {
      const t = e.target;
      if (t && t instanceof HTMLElement && t.dataset.close === 'true') {
        if (!t.closest('.bottomnav')) closeRsvpModal();
      }
    });
    rsvpChooseHadir?.addEventListener('click', () => {
      setRsvpAttendance('hadir');
      window.setTimeout(() => openNoticeModal(), 60);
    });
    rsvpChooseTidak?.addEventListener('click', () => setRsvpAttendance('tidak_hadir'));

    noticeOk?.addEventListener('click', closeNoticeModal);
    noticeModal?.addEventListener('click', (e) => {
      const t = e.target;
      if (t && t instanceof HTMLElement && t.dataset.close === 'true') closeNoticeModal();
    });

    // Success modal close
    document.getElementById('btnCloseSuccess')?.addEventListener('click', () => {
      const successModal = document.getElementById('successModal');
      if (successModal) {
        successModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });

    openLocation?.addEventListener('click', openLocModal);
    locClose?.addEventListener('click', closeLocModal);
    locModal?.addEventListener('click', (e) => {
      const t = e.target;
      if (t && t instanceof HTMLElement && t.dataset.close === 'true') {
        if (!t.closest('.bottomnav')) closeLocModal();
      }
    });

    openGift?.addEventListener('click', openGiftModal);
    giftClose?.addEventListener('click', closeGiftModal);
    giftCopy?.addEventListener('click', copyGiftAcc);
    giftModal?.addEventListener('click', (e) => {
      const t = e.target;
      if (t && t instanceof HTMLElement && t.dataset.close === 'true') {
        if (!t.closest('.bottomnav')) closeGiftModal();
      }
    });

    openContact?.addEventListener('click', openContactModal);
    contactClose?.addEventListener('click', closeContactModal);
    contactModal?.addEventListener('click', (e) => {
      const t = e.target;
      if (t && t instanceof HTMLElement && t.dataset.close === 'true') {
        if (!t.closest('.bottomnav')) closeContactModal();
      }
    });

    musicToggle?.addEventListener('click', toggleMusic);

    initGallery();

    renderUcapan();
    updateKehadiranStats();
    startKehadiranRealtime();
    startUcapanRealtime();
    openUcapan?.addEventListener('click', openUcapanModal);
    openRsvpFromUcapan?.addEventListener('click', openRsvpModal);
    ucapanClose?.addEventListener('click', closeUcapanModal);
    ucapanModal?.addEventListener('click', (e) => {
      const t = e.target;
      if (t && t instanceof HTMLElement && t.dataset.close === 'true') closeUcapanModal();
    });
    ucapanForm?.addEventListener('submit', onUcapanSubmit);

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => {
      const t = e.target;
      if (t && t instanceof HTMLElement && t.dataset.close === 'true') closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox?.classList.contains('is-open')) closeLightbox();
      if (e.key === 'Escape' && ucapanModal?.classList.contains('is-open')) closeUcapanModal();
      if (e.key === 'Escape' && rsvpModal?.classList.contains('is-open')) closeRsvpModal();
      if (e.key === 'Escape' && locModal?.classList.contains('is-open')) closeLocModal();
      if (e.key === 'Escape' && contactModal?.classList.contains('is-open')) closeContactModal();
      if (e.key === 'Escape' && giftModal?.classList.contains('is-open')) closeGiftModal();
    });

    rsvpForm?.addEventListener('submit', onRsvpSubmit);

    window.addEventListener('scroll', parallax, { passive: true });
    window.addEventListener('resize', () => {
      updateNavDensity();
      fitCardToBackground();
    });

    loadState();
    updateNavDensity();
    fitCardToBackground();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

/* ===== PREMIUM SPARKLE ===== */

const sparkleWrap =
 document.getElementById("sparkleLayer");

function createSparkle(){

 if(!sparkleWrap) return;

 const s =
 document.createElement("span");

 s.className="sparkle";

 const inner = document.createElement('span');
 inner.className = 'sparkle__inner';
 s.appendChild(inner);

 // random position
 s.style.left =
 Math.random()*100+"%";

 // random size
 const size =
 4 + Math.random()*10;

 s.style.width=size+"px";
 s.style.height=size+"px";

 // leaf-like drift/sway/rotation
 const drift = (-60 + Math.random() * 120).toFixed(1);
 const sway = (10 + Math.random() * 22).toFixed(1);
 const rot = (180 + Math.random() * 420).toFixed(0);
 s.style.setProperty('--drift', `${drift}px`);
 s.style.setProperty('--sway', `${sway}px`);
 s.style.setProperty('--rot', `${rot}deg`);

 const swayDur = (2.0 + Math.random() * 2.2).toFixed(2);
 const spinDur = (2.6 + Math.random() * 3.4).toFixed(2);
 const flutterDur = (1.2 + Math.random() * 1.6).toFixed(2);
 s.style.setProperty('--swayDur', `${swayDur}s`);
 s.style.setProperty('--spinDur', `${spinDur}s`);
 s.style.setProperty('--flutterDur', `${flutterDur}s`);

 // slow premium fall
 s.style.animationDuration =
 (7 + Math.random()*6)+"s";

 s.style.setProperty('--fallDur', s.style.animationDuration);

 sparkleWrap.appendChild(s);

 setTimeout(()=>{
  s.remove();
 },13000);

}

// banyak sikit sparkle
setInterval(createSparkle,1200);
})();

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Fix FormSubmit "_next" redirect to point at wherever this site is actually hosted ---------- */
  document.querySelectorAll('input[data-thankyou="true"]').forEach((el) => {
    el.value = `${window.location.origin}/thank-you.html`;
  });

  /* ---------- Slide-in menu ---------- */
  const menuBtn = document.getElementById('menuBtn');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const menuCloseBtn = document.getElementById('menuCloseBtn');

  const openMenu = () => {
    menuOverlay.classList.add('open');
    menuBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    menuOverlay.classList.remove('open');
    menuBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  menuBtn?.addEventListener('click', openMenu);
  menuCloseBtn?.addEventListener('click', closeMenu);
  menuBackdrop?.addEventListener('click', closeMenu);

  /* ---------- Menu submenu toggle (Property Listing) ---------- */
  document.querySelectorAll('.menu-has-sub > a').forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      toggle.parentElement.classList.toggle('open');
    });
  });

  /* ---------- Sell popup ---------- */
  const sellPopup = document.getElementById('sellPopup');
  const openSellBtn = document.getElementById('openSellPopup');
  const sellPopupClose = document.getElementById('sellPopupClose');

  openSellBtn?.addEventListener('click', () => sellPopup.classList.add('open'));
  sellPopupClose?.addEventListener('click', () => sellPopup.classList.remove('open'));
  sellPopup?.addEventListener('click', (e) => {
    if (e.target === sellPopup) sellPopup.classList.remove('open');
  });

  /* ---------- Gallery carousel (3 visible at a time, like the live site) ---------- */
  const galleryTrack = document.getElementById('galleryTrack');
  const galleryPrev = document.querySelector('.gallery-prev');
  const galleryNext = document.querySelector('.gallery-next');
  let galleryIndex = 0;
  const galleryCount = galleryTrack ? galleryTrack.children.length : 0;

  function getGalleryStep() {
    if (window.innerWidth <= 600) return 100;
    if (window.innerWidth <= 900) return 50;
    return 33.3333;
  }
  const updateGallery = () => {
    if (galleryTrack) galleryTrack.style.transform = `translateX(-${galleryIndex * getGalleryStep()}%)`;
  };
  galleryNext?.addEventListener('click', () => {
    galleryIndex = (galleryIndex + 1) % galleryCount;
    updateGallery();
  });
  galleryPrev?.addEventListener('click', () => {
    galleryIndex = (galleryIndex - 1 + galleryCount) % galleryCount;
    updateGallery();
  });
  window.addEventListener('resize', updateGallery);
  if (galleryCount > 0) {
    setInterval(() => {
      galleryIndex = (galleryIndex + 1) % galleryCount;
      updateGallery();
    }, 5000);
  }

  /* ---------- Testimonial carousel ---------- */
  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialPrev = document.querySelector('.testimonial-prev');
  const testimonialNext = document.querySelector('.testimonial-next');
  const dotsWrap = document.getElementById('testimonialDots');
  let tIndex = 0;
  const tCount = testimonialTrack ? testimonialTrack.children.length : 0;

  if (dotsWrap && tCount > 0) {
    for (let i = 0; i < tCount; i++) {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => { tIndex = i; updateTestimonial(); });
      dotsWrap.appendChild(dot);
    }
  }

  function updateTestimonial() {
    if (testimonialTrack) testimonialTrack.style.transform = `translateX(-${tIndex * 100}%)`;
    [...dotsWrap.children].forEach((d, i) => d.classList.toggle('active', i === tIndex));
  }

  testimonialNext?.addEventListener('click', () => {
    tIndex = (tIndex + 1) % tCount;
    updateTestimonial();
  });
  testimonialPrev?.addEventListener('click', () => {
    tIndex = (tIndex - 1 + tCount) % tCount;
    updateTestimonial();
  });
  if (tCount > 0) {
    setInterval(() => {
      tIndex = (tIndex + 1) % tCount;
      updateTestimonial();
    }, 6000);
  }

  /* ---------- Scroll-triggered fade-in animations (matches Elementor's fadeIn/fadeInUp/fadeInDown) ---------- */
  const animatedEls = document.querySelectorAll('[data-anim]');
  if ('IntersectionObserver' in window && animatedEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('anim-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    animatedEls.forEach((el) => io.observe(el));
  }

});

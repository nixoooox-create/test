// Nav scroll state
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target){
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Ambient ember particles
  const canvas = document.getElementById('embers');
  const ctx = canvas.getContext('2d');
  let W, H;
  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const embers = Array.from({length: reduceMotion ? 0 : 34}, () => ({
    x: Math.random() * W,
    y: H + Math.random() * H,
    r: 0.6 + Math.random() * 1.8,
    speed: 0.25 + Math.random() * 0.6,
    drift: (Math.random() - 0.5) * 0.4,
    flicker: Math.random() * Math.PI * 2,
    hue: Math.random() > 0.5 ? '201,162,39' : '181,69,27'
  }));

  function tick(){
    ctx.clearRect(0,0,W,H);
    embers.forEach(p => {
      p.y -= p.speed;
      p.x += Math.sin(p.flicker) * p.drift;
      p.flicker += 0.02;
      if (p.y < -10){
        p.y = H + 20;
        p.x = Math.random() * W;
      }
      const alpha = 0.15 + Math.abs(Math.sin(p.flicker)) * 0.5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue}, ${alpha})`;
      ctx.shadowColor = `rgba(${p.hue}, 0.8)`;
      ctx.shadowBlur = 6;
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  tick();

  // Flame mark subtle draw-in
  const flamePath = document.getElementById('flamePath');
  if (flamePath && !reduceMotion){
    const len = flamePath.getTotalLength();
    flamePath.style.strokeDasharray = len;
    flamePath.style.strokeDashoffset = len;
    const flameIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting){
          flamePath.animate(
            [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
            { duration: 1800, easing: 'ease-in-out', fill: 'forwards' }
          );
          flameIO.unobserve(flamePath);
        }
      });
    }, { threshold: 0.4 });
    flameIO.observe(flamePath);
  }

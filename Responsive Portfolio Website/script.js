/* script.js */

// Basic interactivity: nav toggle, smooth scroll, reveal, modal previews
(function(){
  // nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  toggle && toggle.addEventListener('click', ()=>{
    if(nav.style.display === 'flex') nav.style.display = '';
    else nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.background = 'rgba(255,255,255,0.02)';
    nav.style.position = 'absolute';
    nav.style.top = '64px';
    nav.style.right = '20px';
    nav.style.padding = '12px';
    nav.style.borderRadius = '8px';
  });

  // smooth scroll for hash links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth'});
        if(nav.style.display === 'flex') nav.style.display = '';
      }
    });
  });

  // reveal on scroll
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },{threshold:0.15});

  document.querySelectorAll('.project-card, .skill, .hero-text, .hero-card').forEach(el=>{
    el.style.opacity = 0; el.style.transform = 'translateY(20px)'; el.style.transition = 'all .6s cubic-bezier(.2,.9,.3,1)';
    observer.observe(el);
  });

  // project modal
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const closeBtn = document.querySelector('.modal-close');

  function openModal(slug){
    modal.setAttribute('aria-hidden','false');
    // lightweight previews for each project (placeholder)
    const previews = {
      'portfolio': '<p>Portfolio preview — hero, project list, smooth animations. (Full code will be added.)</p>',
      'ecommerce': '<p>E-commerce landing preview — hero CTA, product grid, responsive sections.</p>',
      'weather': '<p>Weather app preview — search by city, shows current conditions and forecast.</p>',
      'todo': '<p>Animated To‑Do preview — add / complete / delete tasks with transitions and localStorage.</p>',
      'contact-form': '<p>Contact form preview — client validation, success message, accessible labels.</p>'
    };
    modalContent.innerHTML = previews[slug] || '<p>Project preview not found.</p>';
  }

  document.querySelectorAll('[data-open]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const slug = btn.getAttribute('data-open');
      openModal(slug);
    });
  });

  function closeModal(){ modal.setAttribute('aria-hidden','true'); }
  closeBtn && closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

})();


/* End of bundle: index.html, style.css, script.js */
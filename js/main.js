/* ============================================================
   KRISHNA WAGH - PORTFOLIO INTERACTION LOGIC
   Theme Engine, Particle Mesh, Dynamic Modals, & Data Binding
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initAmbientCanvas();
  initScrollEffects();
  initTypingEffect();
  renderProfileInfo();
  renderSkills();
  renderProjects();
  renderJourney();
  renderTestimonials();
  initMobileNav();
  initProjectModals();
  initResumeModal();
  initCustomizerModal();
  initContactForm();
  initLucideIcons();
});

/* ------------------------------------------------------------
   1. Theme Management (Dark / Light)
   ------------------------------------------------------------ */
function initThemeEngine() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('krishna_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('krishna_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });
  }
}

function updateThemeIcon(theme) {
  const iconContainer = document.getElementById('theme-icon-container');
  if (!iconContainer) return;

  if (theme === 'light') {
    iconContainer.innerHTML = '<i data-lucide="moon" class="w-5 h-5 text-indigo-600"></i>';
  } else {
    iconContainer.innerHTML = '<i data-lucide="sun" class="w-5 h-5 text-amber-400"></i>';
  }
  if (window.lucide) {
    lucide.createIcons({ root: iconContainer });
  }
}

/* ------------------------------------------------------------
   2. Dynamic Typing Effect
   ------------------------------------------------------------ */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const profile = portfolioState.getProfile();
  const titles = profile.typingTitles && profile.typingTitles.length > 0 
    ? profile.typingTitles 
    : ["Software Engineer", "Full-Stack Developer", "Problem Solver"];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typingElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typingSpeed = 2200; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 450; // Pause before new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ------------------------------------------------------------
   3. Ambient Background Canvas (Subtle Particle Constellation)
   ------------------------------------------------------------ */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 35 : 65;
  const maxDistance = 110;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.6 + 0.8;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'light' 
        ? 'rgba(99, 102, 241, 0.4)' 
        : 'rgba(129, 140, 248, 0.35)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const opacity = (1 - dist / maxDistance) * 0.16;
          ctx.strokeStyle = document.documentElement.getAttribute('data-theme') === 'light'
            ? `rgba(99, 102, 241, ${opacity})`
            : `rgba(165, 180, 252, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ------------------------------------------------------------
   4. Scroll Effects & Navigation Spy
   ------------------------------------------------------------ */
function initScrollEffects() {
  const progressBar = document.getElementById('scroll-progress');
  const nav = document.getElementById('main-nav');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Nav shadow and elevation on scroll
    if (nav) {
      if (scrollTop > 40) {
        nav.classList.add('shadow-lg', 'bg-opacity-95');
      } else {
        nav.classList.remove('shadow-lg');
      }
    }

    // Active Section Spy
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-indigo-400', 'font-semibold', 'bg-indigo-500/10');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('text-indigo-400', 'font-semibold', 'bg-indigo-500/10');
      }
    });
  });
}

/* ------------------------------------------------------------
   5. Mobile Navigation Menu
   ------------------------------------------------------------ */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      menuBtn.setAttribute('aria-expanded', 'true');
    } else {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ------------------------------------------------------------
   6. Render Profile Information
   ------------------------------------------------------------ */
function renderProfileInfo() {
  const profile = portfolioState.getProfile();

  // Name bindings
  document.querySelectorAll('[data-bind="profile.name"]').forEach(el => {
    el.textContent = profile.name;
  });

  // Tagline bindings
  document.querySelectorAll('[data-bind="profile.tagline"]').forEach(el => {
    el.textContent = profile.tagline;
  });

  // Short Bio
  document.querySelectorAll('[data-bind="profile.bioShort"]').forEach(el => {
    el.textContent = profile.bioShort;
  });

  // Long Bio
  document.querySelectorAll('[data-bind="profile.bioLong"]').forEach(el => {
    el.textContent = profile.bioLong;
  });

  // Status Badge
  const statusBadge = document.getElementById('hero-status-badge');
  if (statusBadge && profile.statusBadge) {
    statusBadge.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-emerald-400 beacon-pulse mr-2"></span>${escapeHTML(profile.statusBadge)}`;
  }

  // Location
  document.querySelectorAll('[data-bind="profile.location"]').forEach(el => {
    el.textContent = profile.location;
  });

  // Email Links
  document.querySelectorAll('[data-bind="profile.email"]').forEach(el => {
    el.textContent = profile.email;
    if (el.tagName === 'A') {
      el.href = `mailto:${profile.email}`;
    }
  });

  // Social Links
  const githubLinks = document.querySelectorAll('[data-bind-link="profile.github"]');
  githubLinks.forEach(el => { el.href = profile.github || '#'; });

  const linkedinLinks = document.querySelectorAll('[data-bind-link="profile.linkedin"]');
  linkedinLinks.forEach(el => { el.href = profile.linkedin || '#'; });

  // Stats Grid in Hero
  const statsContainer = document.getElementById('hero-stats-container');
  if (statsContainer && profile.stats) {
    statsContainer.innerHTML = profile.stats.map(stat => `
      <div class="glass-panel p-4 rounded-2xl flex flex-col items-center sm:items-start text-center sm:text-left border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300">
        <div class="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-2">
          <i data-lucide="${stat.icon || 'star'}" class="w-5 h-5"></i>
        </div>
        <div class="text-2xl font-bold font-heading text-gradient tracking-tight">${stat.value}</div>
        <div class="text-xs text-slate-400 font-medium">${escapeHTML(stat.label)}</div>
      </div>
    `).join('');
  }
}

/* ------------------------------------------------------------
   7. Render Skills with Category Filter
   ------------------------------------------------------------ */
function renderSkills() {
  const skillsData = portfolioState.getSkills();
  const tabsContainer = document.getElementById('skills-tabs');
  const gridContainer = document.getElementById('skills-grid');

  if (!tabsContainer || !gridContainer) return;

  // Render Tabs
  tabsContainer.innerHTML = skillsData.categories.map((cat, idx) => `
    <button data-category="${cat.id}" class="skill-tab-btn px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${idx === 0 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'}">
      ${escapeHTML(cat.name)}
    </button>
  `).join('');

  function displaySkills(category = 'all') {
    const filtered = category === 'all' 
      ? skillsData.items 
      : skillsData.items.filter(s => s.category === category);

    gridContainer.innerHTML = filtered.map(skill => `
      <div class="glass-panel p-4 rounded-xl flex items-center justify-between border border-slate-800/80 hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 group">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-800/80 border border-slate-700/50 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
            <i data-lucide="${skill.icon || 'code'}" class="w-5 h-5" style="color: ${skill.color || '#818cf8'}"></i>
          </div>
          <div>
            <h4 class="font-medium text-slate-200 text-sm group-hover:text-white transition-colors">${escapeHTML(skill.name)}</h4>
            <span class="text-xs text-slate-400 font-mono capitalize">${escapeHTML(skill.category)}</span>
          </div>
        </div>
        <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">${escapeHTML(skill.level)}</span>
      </div>
    `).join('');

    initLucideIcons();
  }

  // Initial render
  displaySkills('all');

  // Handle Tab clicks
  const tabButtons = tabsContainer.querySelectorAll('.skill-tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-600/30');
        b.classList.add('bg-slate-800/60', 'text-slate-400');
      });
      btn.classList.remove('bg-slate-800/60', 'text-slate-400');
      btn.classList.add('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-600/30');

      displaySkills(btn.getAttribute('data-category'));
    });
  });
}

/* ------------------------------------------------------------
   8. Render Projects with Category Filter
   ------------------------------------------------------------ */
function renderProjects() {
  const projects = portfolioState.getProjects();
  const filterContainer = document.getElementById('project-filter-buttons');
  const projectGrid = document.getElementById('project-grid-container');

  if (!projectGrid) return;

  function displayProjects(filter = 'all') {
    const list = filter === 'all' 
      ? projects 
      : projects.filter(p => p.category === filter);

    projectGrid.innerHTML = list.map(project => `
      <div class="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover-elevate flex flex-col group transition-all duration-300">
        <!-- Project Visual Banner -->
        <div class="relative h-48 bg-gradient-to-br ${project.previewGradient || 'from-indigo-900 to-slate-900'} p-6 flex flex-col justify-between overflow-hidden">
          <div class="absolute inset-0 bg-black/25 backdrop-blur-[1px]"></div>
          
          <!-- Top Badges -->
          <div class="relative z-10 flex items-center justify-between">
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md border border-white/20">
              ${escapeHTML(project.badge || 'Project')}
            </span>
            ${project.featured ? `
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/90 text-white flex items-center gap-1 shadow-md">
                <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Featured
              </span>
            ` : ''}
          </div>

          <!-- Bottom Title & Meta in Banner -->
          <div class="relative z-10">
            <h3 class="text-xl font-bold text-white tracking-tight drop-shadow-sm group-hover:text-indigo-200 transition-colors">
              ${escapeHTML(project.title)}
            </h3>
            <p class="text-xs text-white/80 font-mono mt-0.5">${escapeHTML(project.stats?.metric || 'Clean Code')}</p>
          </div>
        </div>

        <!-- Project Content Body -->
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <p class="text-slate-300 text-sm leading-relaxed mb-4">
              ${escapeHTML(project.shortDesc)}
            </p>

            <!-- Tech Badges -->
            <div class="flex flex-wrap gap-1.5 mb-5">
              ${project.techStack.map(t => `
                <span class="px-2.5 py-1 text-xs rounded-md bg-slate-800/80 text-indigo-300 border border-slate-700/60 font-mono">
                  ${escapeHTML(t)}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Project Actions -->
          <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
            <button data-project-id="${project.id}" class="open-project-modal-btn text-xs font-semibold px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 transition-all flex items-center gap-1.5">
              <span>View Case Study</span>
              <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
            </button>
            <div class="flex items-center gap-2">
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors" title="View Source Code">
                <i data-lucide="github" class="w-4 h-4"></i>
              </a>
              <button data-project-id="${project.id}" class="open-project-modal-btn p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors" title="Live Preview">
                <i data-lucide="external-link" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    initLucideIcons();
    attachProjectModalListeners();
  }

  // Initial render
  displayProjects('all');

  // Filter Buttons
  if (filterContainer) {
    const filterBtns = filterContainer.querySelectorAll('.project-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-600/30');
          b.classList.add('bg-slate-800/60', 'text-slate-400');
        });
        btn.classList.remove('bg-slate-800/60', 'text-slate-400');
        btn.classList.add('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-600/30');

        displayProjects(btn.getAttribute('data-filter'));
      });
    });
  }
}

/* ------------------------------------------------------------
   9. Render Journey (Education & Experience Timeline)
   ------------------------------------------------------------ */
function renderJourney() {
  const journey = portfolioState.getJourney();
  const timelineContainer = document.getElementById('journey-timeline-container');

  if (!timelineContainer) return;

  timelineContainer.innerHTML = journey.map((item, idx) => `
    <div class="relative pl-8 pb-10 border-l-2 border-indigo-500/30 last:border-l-0 last:pb-0 group">
      <!-- Timeline Node Marker -->
      <div class="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-slate-900 border-2 border-indigo-500 text-indigo-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-md">
        <i data-lucide="${item.icon || 'milestone'}" class="w-4 h-4"></i>
      </div>

      <!-- Timeline Card -->
      <div class="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span class="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
            ${escapeHTML(item.period)}
          </span>
          <span class="text-xs text-slate-400 flex items-center gap-1">
            <i data-lucide="map-pin" class="w-3.5 h-3.5"></i> ${escapeHTML(item.location)}
          </span>
        </div>

        <h4 class="text-lg font-bold text-white font-heading">${escapeHTML(item.title)}</h4>
        <div class="text-indigo-400 font-medium text-sm mb-3">${escapeHTML(item.organization)}</div>
        <p class="text-slate-300 text-sm leading-relaxed mb-4">${escapeHTML(item.description)}</p>

        ${item.highlights && item.highlights.length > 0 ? `
          <ul class="space-y-1.5">
            ${item.highlights.map(h => `
              <li class="text-xs text-slate-400 flex items-start gap-2">
                <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
                <span>${escapeHTML(h)}</span>
              </li>
            `).join('')}
          </ul>
        ` : ''}
      </div>
    </div>
  `).join('');

  initLucideIcons();
}

/* ------------------------------------------------------------
   10. Render Testimonials & Peer Endorsements
   ------------------------------------------------------------ */
function renderTestimonials() {
  const testimonials = portfolioState.getTestimonials();
  const container = document.getElementById('testimonials-container');

  if (!container || !testimonials) return;

  container.innerHTML = testimonials.map(item => `
    <div class="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div class="text-indigo-400 mb-3">
          <i data-lucide="quote" class="w-8 h-8 opacity-60"></i>
        </div>
        <p class="text-slate-300 text-sm italic leading-relaxed mb-6">
          "${escapeHTML(item.quote)}"
        </p>
      </div>
      <div class="flex items-center gap-3 pt-4 border-t border-slate-800">
        <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
          ${item.author.charAt(0)}
        </div>
        <div>
          <div class="text-white font-semibold text-sm">${escapeHTML(item.author)}</div>
          <div class="text-xs text-slate-400">${escapeHTML(item.role)}</div>
        </div>
      </div>
    </div>
  `).join('');

  initLucideIcons();
}

/* ------------------------------------------------------------
   11. Interactive Project Detail Modal
   ------------------------------------------------------------ */
function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('close-project-modal-btn');
  const modalBackdrop = document.getElementById('project-modal-backdrop');

  if (!modal) return;

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

function attachProjectModalListeners() {
  const modal = document.getElementById('project-modal');
  const content = document.getElementById('project-modal-content');
  const buttons = document.querySelectorAll('.open-project-modal-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project-id');
      const project = portfolioState.getProjects().find(p => p.id === projectId);
      if (!project || !content) return;

      content.innerHTML = `
        <div class="p-6 sm:p-8">
          <!-- Header Banner -->
          <div class="p-6 rounded-2xl bg-gradient-to-r ${project.previewGradient || 'from-indigo-600 to-purple-600'} text-white mb-6 relative overflow-hidden">
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md border border-white/20 inline-block mb-3">
              ${escapeHTML(project.badge || 'Project Spotlight')}
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold font-heading mb-2">${escapeHTML(project.title)}</h2>
            <p class="text-sm text-white/90 max-w-xl">${escapeHTML(project.shortDesc)}</p>
          </div>

          <!-- Technical Breakdown -->
          <div class="space-y-6">
            <div>
              <h4 class="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-2">Project Overview & Architecture</h4>
              <p class="text-slate-300 text-sm leading-relaxed">${escapeHTML(project.fullDesc)}</p>
            </div>

            <!-- Key Features / Challenges Solved -->
            <div>
              <h4 class="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-2">Key Engineering Highlights</h4>
              <ul class="space-y-2">
                ${project.highlights.map(h => `
                  <li class="flex items-start gap-2 text-sm text-slate-300">
                    <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 shrink-0 mt-1"></i>
                    <span>${escapeHTML(h)}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Tech Stack List -->
            <div>
              <h4 class="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-2">Technologies Used</h4>
              <div class="flex flex-wrap gap-2">
                ${project.techStack.map(t => `
                  <span class="px-3 py-1 text-xs font-mono rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    ${escapeHTML(t)}
                  </span>
                `).join('')}
              </div>
            </div>

            <!-- Modal Actions -->
            <div class="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold flex items-center gap-2 border border-slate-700 transition-colors">
                <i data-lucide="github" class="w-4 h-4"></i>
                <span>Explore Source Code</span>
              </a>
              <button onclick="showToast('Live demonstration mode ready! Hosted on GitHub repository.', 'info')" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all">
                <i data-lucide="play-circle" class="w-4 h-4"></i>
                <span>Launch Interactive Demo</span>
              </button>
            </div>
          </div>
        </div>
      `;

      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      initLucideIcons();
    });
  });
}

/* ------------------------------------------------------------
   12. Interactive Resume Modal & Recruiter Viewer
   ------------------------------------------------------------ */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const openButtons = document.querySelectorAll('.open-resume-btn');
  const closeBtn = document.getElementById('close-resume-modal-btn');
  const resumeBackdrop = document.getElementById('resume-modal-backdrop');
  const printBtn = document.getElementById('resume-print-btn');
  const copySummaryBtn = document.getElementById('resume-copy-summary-btn');

  if (!resumeModal) return;

  function openResume() {
    renderResumeContent();
    resumeModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    resumeModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => btn.addEventListener('click', openResume));
  if (closeBtn) closeBtn.addEventListener('click', closeResume);
  if (resumeBackdrop) resumeBackdrop.addEventListener('click', closeResume);

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (copySummaryBtn) {
    copySummaryBtn.addEventListener('click', () => {
      const profile = portfolioState.getProfile();
      const summaryText = `${profile.name} - ${profile.tagline}\nEmail: ${profile.email}\nGitHub: ${profile.github}\nLinkedIn: ${profile.linkedin}\n\nSummary:\n${profile.bioLong}`;
      navigator.clipboard.writeText(summaryText).then(() => {
        showToast('Resume summary copied to clipboard! Ready to paste.', 'success');
      });
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !resumeModal.classList.contains('hidden')) {
      closeResume();
    }
  });
}

function renderResumeContent() {
  const printArea = document.getElementById('resume-print-area');
  if (!printArea) return;

  const profile = portfolioState.getProfile();
  const journey = portfolioState.getJourney();
  const projects = portfolioState.getProjects();
  const skills = portfolioState.getSkills();

  printArea.innerHTML = `
    <div class="max-w-3xl mx-auto p-6 sm:p-10 bg-slate-900/90 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl">
      <!-- Resume Header -->
      <div class="border-b border-slate-700/80 pb-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-3xl font-extrabold text-white font-heading">${escapeHTML(profile.name)}</h1>
          <p class="text-indigo-400 font-medium text-base">${escapeHTML(profile.tagline)}</p>
          <p class="text-xs text-slate-400 mt-1">${escapeHTML(profile.location)}</p>
        </div>
        <div class="text-right text-xs space-y-1 font-mono text-slate-300">
          <div><a href="mailto:${profile.email}" class="hover:text-indigo-400">${escapeHTML(profile.email)}</a></div>
          <div><a href="${profile.github}" target="_blank" class="hover:text-indigo-400">${escapeHTML(profile.github)}</a></div>
          <div><a href="${profile.linkedin}" target="_blank" class="hover:text-indigo-400">${escapeHTML(profile.linkedin)}</a></div>
        </div>
      </div>

      <!-- Professional Summary -->
      <div class="mb-6">
        <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 border-b border-slate-800 pb-1">Professional Summary</h3>
        <p class="text-xs text-slate-300 leading-relaxed">${escapeHTML(profile.bioLong)}</p>
      </div>

      <!-- Technical Skills Matrix -->
      <div class="mb-6">
        <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 border-b border-slate-800 pb-1">Technical Skills</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div>
            <strong class="text-slate-200">Languages & Web:</strong> 
            <span class="text-slate-400">JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS</span>
          </div>
          <div>
            <strong class="text-slate-200">Frameworks & Backend:</strong> 
            <span class="text-slate-400">React.js, Node.js, Express.js, RESTful APIs</span>
          </div>
          <div>
            <strong class="text-slate-200">Databases & Tools:</strong> 
            <span class="text-slate-400">MongoDB, PostgreSQL, Git, GitHub, Postman, Linux</span>
          </div>
          <div>
            <strong class="text-slate-200">Core CS:</strong> 
            <span class="text-slate-400">Data Structures, Algorithms, OOP, System Design Fundamentals</span>
          </div>
        </div>
      </div>

      <!-- Featured Projects -->
      <div class="mb-6">
        <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 border-b border-slate-800 pb-1">Key Projects</h3>
        <div class="space-y-4">
          ${projects.slice(0, 3).map(p => `
            <div>
              <div class="flex justify-between items-baseline">
                <span class="font-bold text-xs text-slate-200">${escapeHTML(p.title)}</span>
                <span class="text-[11px] text-slate-400 font-mono">${escapeHTML(p.techStack.join(', '))}</span>
              </div>
              <p class="text-xs text-slate-400 mt-1">${escapeHTML(p.shortDesc)}</p>
              <ul class="list-disc list-inside text-[11px] text-slate-400 mt-1 space-y-0.5">
                ${p.highlights.slice(0, 2).map(h => `<li>${escapeHTML(h)}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Education & Timeline -->
      <div>
        <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 border-b border-slate-800 pb-1">Education & Background</h3>
        <div class="space-y-3">
          ${journey.map(j => `
            <div class="flex justify-between items-start text-xs">
              <div>
                <div class="font-bold text-slate-200">${escapeHTML(j.title)}</div>
                <div class="text-indigo-300">${escapeHTML(j.organization)}</div>
              </div>
              <div class="text-slate-400 font-mono text-[11px]">${escapeHTML(j.period)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/* ------------------------------------------------------------
   13. Live Portfolio Customizer (Customize Details on the Fly)
   ------------------------------------------------------------ */
function initCustomizerModal() {
  const modal = document.getElementById('customizer-modal');
  const triggerBtn = document.getElementById('open-customizer-btn');
  const closeBtn = document.getElementById('close-customizer-btn');
  const cancelBtn = document.getElementById('cancel-customizer-btn');
  const resetBtn = document.getElementById('reset-customizer-btn');
  const form = document.getElementById('customizer-form');
  const backdrop = document.getElementById('customizer-modal-backdrop');

  if (!modal || !triggerBtn || !form) return;

  function openCustomizer() {
    const profile = portfolioState.getProfile();
    document.getElementById('edit-name').value = profile.name || '';
    document.getElementById('edit-tagline').value = profile.tagline || '';
    document.getElementById('edit-email').value = profile.email || '';
    document.getElementById('edit-location').value = profile.location || '';
    document.getElementById('edit-github').value = profile.github || '';
    document.getElementById('edit-linkedin').value = profile.linkedin || '';
    document.getElementById('edit-status').value = profile.statusBadge || '';
    document.getElementById('edit-bio').value = profile.bioShort || '';

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeCustomizer() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  triggerBtn.addEventListener('click', openCustomizer);
  if (closeBtn) closeBtn.addEventListener('click', closeCustomizer);
  if (cancelBtn) cancelBtn.addEventListener('click', closeCustomizer);
  if (backdrop) backdrop.addEventListener('click', closeCustomizer);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const updatedProfile = {
      name: document.getElementById('edit-name').value.trim(),
      tagline: document.getElementById('edit-tagline').value.trim(),
      email: document.getElementById('edit-email').value.trim(),
      location: document.getElementById('edit-location').value.trim(),
      github: document.getElementById('edit-github').value.trim(),
      linkedin: document.getElementById('edit-linkedin').value.trim(),
      statusBadge: document.getElementById('edit-status').value.trim(),
      bioShort: document.getElementById('edit-bio').value.trim()
    };

    portfolioState.saveData({ profile: updatedProfile });
    renderProfileInfo();
    closeCustomizer();
    showToast('Portfolio details updated successfully!', 'success');
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset all information back to original defaults?')) {
        portfolioState.resetToDefault();
        renderProfileInfo();
        closeCustomizer();
        showToast('Reset to original configuration.', 'info');
      }
    });
  }
}

/* ------------------------------------------------------------
   14. Contact Form & Clipboard Copy
   ------------------------------------------------------------ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = portfolioState.getProfile().email;
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email copied: ${email}`, 'success');
      });
    });
  });

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'warning');
      return;
    }

    // Save message locally
    const existingMessages = JSON.parse(localStorage.getItem('krishna_contact_inbox') || '[]');
    existingMessages.push({
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('krishna_contact_inbox', JSON.stringify(existingMessages));

    form.reset();
    showToast('Message sent! Thank you for reaching out, Krishna will reply promptly.', 'success');
  });
}

/* ------------------------------------------------------------
   15. Toast Notification System
   ------------------------------------------------------------ */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md border text-sm max-w-sm';

  let borderClass = 'border-indigo-500/50 bg-slate-900/90 text-white';
  let icon = 'info';

  if (type === 'success') {
    borderClass = 'border-emerald-500/50 bg-slate-900/90 text-emerald-300';
    icon = 'check-circle';
  } else if (type === 'warning') {
    borderClass = 'border-amber-500/50 bg-slate-900/90 text-amber-300';
    icon = 'alert-triangle';
  }

  toast.className += ` ${borderClass}`;
  toast.innerHTML = `
    <i data-lucide="${icon}" class="w-5 h-5 shrink-0"></i>
    <span class="flex-1">${escapeHTML(message)}</span>
    <button class="text-slate-400 hover:text-white" onclick="this.parentElement.remove()">
      <i data-lucide="x" class="w-4 h-4"></i>
    </button>
  `;

  container.appendChild(toast);
  initLucideIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ------------------------------------------------------------
   Helper Utilities
   ------------------------------------------------------------ */
function initLucideIcons() {
  if (window.lucide) {
    lucide.createIcons();
  }
}

function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// assets/script.js - full file with darker modal overlay + zoom animation, robust social wiring, projects, modal/carousel, contact
const API_URL = "https://portfolio-backend-1-mcyq.onrender.com/api/contact"; // optional backend endpoint for contact form
const GITHUB_USERNAME = "sonarosa"; // <-- set your GitHub username here
const LINKEDIN_URL = "https://www.linkedin.com/in/sona-rosa-babloo-725453227/"; // <-- set your LinkedIn profile URL

// -----------------------------
// Projects (with repo_url, demo_url, optional images array)
// Edit repo_url/demo_url/images as needed
const PROJECTS = [
  {
    title: "Small Object Detection in Adverse Weather",
    desc_short: "YOLOv8 models for small object detection in fog, rain and low-light.",
    desc_long: `Developed and optimized YOLOv8-based models for small object detection under fog, rain, and low-light conditions.
Key work: advanced synthetic augmentation pipelines, custom loss tuning for small objects, evaluation on adverse-weather datasets.`,
    tags: ["Computer Vision","YOLO","Robustness"],
    skills: ["YOLOv8","Synthetic Augmentation","Model Optimization"],
    repo_url: `https://github.com/${GITHUB_USERNAME}/small-object-detection-adverse-weather`,
    demo_url: "",
    images: ["assets/projects/small-object.jpeg","assets/projects/small-2.jpg"]
  },
  {
    title: "AI Automation in Financial Systems",
    desc_short: "LLM-driven agents & workflow automation for exchange gateways.",
    desc_long: `Built ML-powered automation modules for trade gateway systems and explored LLM-driven automation and workflow agents to improve decision pipelines. Integrated safeguards and audit logging.`,
    tags: ["Finance","Automation","LLM"],
    skills: ["LLM Agents","Workflow Automation","Production ML"],
    repo_url: `https://github.com/${GITHUB_USERNAME}/llm-finance-automation`,
    demo_url: "",
    images: []
  },
  {
    title: "Medical NER and Relation Extraction",
    desc_short: "BERT fine-tuning for biomedical NER + relation extraction.",
    desc_long: `Fine-tuned BERT / BioBERT models to extract entities and relations from clinical notes. Built pipelines for pseudonymization and structured export.`,
    tags: ["NLP","Transformers","BERT"],
    skills: ["BERT","NER","Relation Extraction"],
    repo_url: `https://github.com/${GITHUB_USERNAME}/medical-ner-relation`,
    demo_url: "",
    images: []
  },
  {
    title: "Automated Driving Learner Assistance — HackAthena’24",
    desc_short: "Real-time low-latency YOLO pipeline for driver training.",
    desc_long: `Trained YOLO models for real-time obstacle assessment and driver feedback. Emphasis on latency reduction and edge deployment. Won prize for practical demonstration.`,
    tags: ["Edge AI","Realtime","YOLO"],
    skills: ["Real-time Inference","Edge Deployment","YOLO"],
    repo_url: `https://github.com/${GITHUB_USERNAME}/driver-learner-assist`,
    demo_url: "",
    images: ["assets/projects/hackathena24.png"]
  },
  {
    title: "Automated Medical Assistant — Hackify (1st Prize)",
    desc_short: "YOLOv7 real-time visual assistant for clinicians.",
    desc_long: `Created a real-time inference pipeline to assist clinicians with visual cues and alerts. Designed low-latency inference and UI for quick adoption; awarded first prize.`,
    tags: ["Healthcare","YOLO","Realtime"],
    skills: ["Deployment","Model Optimization","Healthcare AI"],
    repo_url: `https://github.com/${GITHUB_USERNAME}/automated-medical-assistant`,
    demo_url: "",
    images: []
  },
  {
    title: "Hyperpersonalized Banking Recommendations — FIN-A-THON Finalist",
    desc_short: "Recommendation engine for financial products.",
    desc_long: `Built an ML-driven recommendation engine for banking applications focused on user modeling, feature-rich ranking models and pipeline scalability. Finalist in FIN-A-THON.`,
    tags: ["Recommendation","Finance","NLP"],
    skills: ["Recommendation Systems","User Modeling","Scalable Pipelines"],
    repo_url: `https://github.com/${GITHUB_USERNAME}/banking-recommendations`,
    demo_url: "",
    images: []
  }
];
// -----------------------------

// -----------------------------
// Inject upgraded modal CSS (darker overlay + zoom animation)
// -----------------------------
(function injectModalCSS(){
  const css = `
  .pr-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.85) !important;
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:9999;
    padding:20px;
    backdrop-filter: blur(4px);
  }

  .pr-modal {
    background: rgba(12,20,28,0.98) !important;
    color: #e9f5fb;
    border-radius:14px;
    max-width:1000px;
    width:100%;
    padding:24px;
    position:relative;
    box-shadow: 0 24px 80px rgba(0,0,0,0.75);
    animation: modalZoom 0.28s ease-out;
  }

  @keyframes modalZoom {
    0% { opacity:0; transform: scale(0.92) translateY(10px); }
    100% { opacity:1; transform: scale(1) translateY(0); }
  }

  .pr-close {
    position:absolute;
    top:12px;
    right:12px;
    background:transparent;
    border:1px solid rgba(255,255,255,0.15);
    color:#fff;
    padding:6px 10px;
    border-radius:8px;
    cursor:pointer;
  }

  .pr-title { font-size:22px; font-weight:800; margin:0 0 10px 0; }
  .pr-desc { color:#c9d8e2; margin-top:6px; white-space:pre-wrap; }

  .pr-tags { margin-top:12px; display:flex; gap:8px; flex-wrap:wrap; }
  .pr-tag { background: linear-gradient(90deg,var(--accent),var(--accent-2)); color:#022; padding:6px 10px; border-radius:999px; font-weight:800; }

  .pr-carousel { display:flex; align-items:center; gap:10px; margin-top:20px; }
  .pr-slide { width:100%; max-height:420px; display:flex; align-items:center; justify-content:center; overflow:hidden; border-radius:12px; background:#03131a; }
  .pr-slide img { max-width:100%; max-height:420px; object-fit:contain; display:block; }

  .pr-carousel-btn {
    background: rgba(255,255,255,0.1);
    border:1px solid rgba(255,255,255,0.15);
    color:#fff;
    padding:8px 12px;
    border-radius:8px;
    cursor:pointer;
  }

  .pr-bottom {
    margin-top:20px;
    display:flex;
    justify-content:space-between;
    flex-wrap:wrap;
    gap:12px;
  }

  .pr-btn { padding:10px 14px; border-radius:10px; font-weight:800; cursor:pointer; }
  .pr-primary { background: linear-gradient(90deg,var(--accent),var(--accent-2)); color:#022; }
  .pr-ghost { background:transparent; border:1px solid rgba(255,255,255,0.15); color:#c9d8e2; }
  `;
  const s = document.createElement('style');
  s.textContent = css;
  document.head.appendChild(s);
})();

// -----------------------------
// Main DOM ready logic
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // ----------------------------
  // Robust social wiring (anchors, buttons, many IDs/classes)
  // ----------------------------
  (function wireSocialLinks() {
    const githubUrl = `https://github.com/${GITHUB_USERNAME}`;
    const linkedinUrl = LINKEDIN_URL;

    const githubSelectors = [
      '#githubNav',
      '#viewAllRepos',
      '#githubProfileBtn',
      '#githubProfileBtn2',
      '.github-link',
      'a[href*="github.com"][data-profile!="false"]'
    ];

    const linkedinSelectors = [
      '#linkedinNav',
      '#linkedinCTA',
      '#linkedinProfileBtn',
      '#linkedinProfileBtn2',
      '.linkedin-link',
      'a[href*="linkedin.com"][data-profile!="false"]'
    ];

    function setUpButtons(selectors, url) {
      selectors.forEach(sel => {
        try {
          document.querySelectorAll(sel).forEach(el => {
            if (!el) return;
            if (el.tagName && el.tagName.toLowerCase() === 'a') {
              el.href = url;
              el.target = '_blank';
              el.rel = 'noopener noreferrer';
            } else {
              // fallback for button-like elements
              el.addEventListener('click', (e) => {
                e.preventDefault();
                window.open(url, '_blank', 'noopener');
              });
            }
          });
        } catch (err) {
          // ignore invalid selectors
        }
      });
    }

    setUpButtons(githubSelectors, githubUrl);
    setUpButtons(linkedinSelectors, linkedinUrl);

    // override href="#" anchors for likely social IDs
    document.querySelectorAll('a[href="#"]').forEach(a => {
      if (!a.id) return;
      const id = a.id.toLowerCase();
      if (id.includes('github')) {
        a.addEventListener('click', (e) => { e.preventDefault(); window.open(githubUrl, '_blank', 'noopener'); });
      }
      if (id.includes('linkedin')) {
        a.addEventListener('click', (e) => { e.preventDefault(); window.open(linkedinUrl, '_blank', 'noopener'); });
      }
    });
  })();

  // ----------------------------
  // Navbar active link highlight
  // ----------------------------
  const links = $$('.nav-link');
  links.forEach(a => a.addEventListener('click', (e) => {
    links.forEach(x => x.classList.remove('active'));
    e.currentTarget.classList.add('active');
  }));

  // Smooth scroll for internal anchors
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Animate skill bars when visible
  const bars = $$('.bar i');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        const el = ent.target;
        const width = el.getAttribute('data-width');
        if (width) el.style.width = width;
      }
    });
  }, { threshold: 0.18 });
  bars.forEach(b => obs.observe(b));

  // ----------------------------
  // Projects rendering and details modal
  // ----------------------------
  function renderProjects() {
    const container = $('#projectsList');
    if (!container) return;
    container.innerHTML = '';
    PROJECTS.forEach((p, idx) => {
      const card = document.createElement('article');
      card.className = 'project card';
      const tagsHtml = (p.tags || []).map(t => `<span class="tag">${t}</span>`).join(' ');
      const skillsHtml = (p.skills || []).slice(0,4).map(s => `<small class="muted" style="margin-right:8px">${s}</small>`).join('');
      card.innerHTML = `
        <h3>${p.title}</h3>
        <div class="muted" style="margin-top:6px">${p.desc_short}</div>
        <div class="tags" style="margin-top:10px">${tagsHtml}</div>
        <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center">
          <div>${skillsHtml}</div>
          <div style="display:flex;gap:8px">
            <button class="btn small primary details-btn" data-idx="${idx}">Details</button>
            <a class="btn small ghost" href="#contact">Contact</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    $$('.details-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = Number(e.currentTarget.getAttribute('data-idx'));
        openProjectModal(idx);
      });
    });
  }

  // Modal / Carousel state
  let carouselState = { idx: 0, slides: [] };

  function openProjectModal(idx) {
    const project = PROJECTS[idx];
    if (!project) return;
    let overlay = document.getElementById('pr-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'pr-overlay';
      overlay.className = 'pr-overlay';
      document.body.appendChild(overlay);
    }
    overlay.innerHTML = '';

    const modal = document.createElement('div');
    modal.className = 'pr-modal';
    modal.innerHTML = `
      <button class="pr-close" id="pr-close">Close</button>
      <div class="pr-title">${project.title}</div>
      <div class="pr-desc">${project.desc_long || project.desc_short}</div>
      <div class="pr-tags">${(project.tags||[]).map(t=>`<span class="pr-tag">${t}</span>`).join('')}</div>
    `;

    const images = (project.images || []).filter(Boolean);
    if (images.length > 0) {
      const carousel = document.createElement('div');
      carousel.className = 'pr-carousel';
      carousel.innerHTML = `
        <button class="pr-carousel-btn" id="pr-prev">◀</button>
        <div class="pr-slide" id="pr-slide"><img src="${images[0]}" alt="project image"/></div>
        <button class="pr-carousel-btn" id="pr-next">▶</button>
      `;
      modal.appendChild(carousel);
      carouselState.slides = images;
      carouselState.idx = 0;
    }

    const bottom = document.createElement('div');
    bottom.className = 'pr-bottom';
    const leftBtns = document.createElement('div'); leftBtns.className = 'pr-buttons';
    const repoBtn = document.createElement('a'); repoBtn.className = 'pr-btn pr-primary';
    repoBtn.textContent = project.repo_url ? 'View Repo' : 'Repo'; repoBtn.href = project.repo_url || '#'; repoBtn.target = '_blank'; repoBtn.rel = 'noopener';
    leftBtns.appendChild(repoBtn);
    if (project.demo_url) {
      const demoBtn = document.createElement('a'); demoBtn.className = 'pr-btn pr-ghost';
      demoBtn.textContent = 'Live Demo'; demoBtn.href = project.demo_url; demoBtn.target = '_blank'; demoBtn.rel = 'noopener';
      leftBtns.appendChild(demoBtn);
    }
    bottom.appendChild(leftBtns);
    const rightDiv = document.createElement('div'); rightDiv.innerHTML = `<a class="pr-btn pr-ghost" href="#contact">Contact about this</a>`;
    bottom.appendChild(rightDiv);
    modal.appendChild(bottom);
    overlay.appendChild(modal);

    const closeBtn = document.getElementById('pr-close');
    closeBtn.onclick = closeProjectModal;
    overlay.onclick = (ev) => { if (ev.target === overlay) closeProjectModal(); };

    const prevBtn = document.getElementById('pr-prev');
    const nextBtn = document.getElementById('pr-next');
    if (prevBtn && nextBtn) {
      prevBtn.onclick = () => changeSlide(-1);
      nextBtn.onclick = () => changeSlide(1);
      window.addEventListener('keydown', keyNav);
    }

    document.body.style.overflow = 'hidden';
  }

  function changeSlide(delta) {
    if (!carouselState.slides || carouselState.slides.length === 0) return;
    carouselState.idx = (carouselState.idx + delta + carouselState.slides.length) % carouselState.slides.length;
    const imgEl = document.querySelector('#pr-slide img');
    if (imgEl) imgEl.src = carouselState.slides[carouselState.idx];
  }

  function keyNav(e) {
    if (e.key === 'Escape') closeProjectModal();
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
  }

  function closeProjectModal() {
    const overlay = document.getElementById('pr-overlay');
    if (overlay) overlay.remove();
    window.removeEventListener('keydown', keyNav);
    document.body.style.overflow = '';
    carouselState = { idx: 0, slides: [] };
  }

  // ----------------------------
  // GitHub repos panel (public API)
  // ----------------------------
  async function loadRepos() {
    const repoListEl = document.getElementById('repoList');
    const refreshEl = document.getElementById('repoRefresh');
    if (!repoListEl) return;
    repoListEl.innerHTML = 'Loading repos…';
    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=6&sort=updated`);
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      const repos = await res.json();
      if (!Array.isArray(repos) || repos.length === 0) {
        repoListEl.innerHTML = '<div class="muted">No public repos found.</div>';
        return;
      }
      repoListEl.innerHTML = '';
      repos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'repo-card';
        card.innerHTML = `
          <div class="repo-title"><a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a></div>
          <div class="muted">${repo.description ? repo.description : ''}</div>
          <div class="repo-meta small" style="margin-top:6px">
            <div>★ ${repo.stargazers_count}</div>
            <div>${repo.language ? repo.language : ''}</div>
            <div>Updated ${new Date(repo.updated_at).toLocaleDateString()}</div>
          </div>
        `;
        repoListEl.appendChild(card);
      });
      if (refreshEl) refreshEl.textContent = 'updated just now';
    } catch (err) {
      console.error('Failed fetching repos', err);
      repoListEl.innerHTML = `<div class="muted">Could not load GitHub repos. (${err.message})</div>`;
      if (refreshEl) refreshEl.textContent = '';
    }
  }

  const refreshBtn = document.getElementById('refreshRepos');
  if (refreshBtn) refreshBtn.addEventListener('click', loadRepos);

  // ----------------------------
  // Init render + load
  // ----------------------------
  renderProjects();
  loadRepos();

  // ----------------------------
  // Contact form submission (calls backend /api/contact or configured API_URL)
  // ----------------------------
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (status) status.textContent = '';
      const name = (document.getElementById('name')||{}).value?.trim() || '';
      const email = (document.getElementById('email')||{}).value?.trim() || '';
      const message = (document.getElementById('message')||{}).value?.trim() || '';
      if (!message) { if (status) status.textContent = 'Please enter a message.'; return; }
      const payload = { name, email, message };

      let endpoint = API_URL || '/api/contact';
      try {
        if (status) status.textContent = 'Sending...';
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.ok && data.ok) {
          if (status) status.textContent = 'Message sent — thank you! ✅';
          form.reset();
        } else {
          if (status) status.textContent = data?.error || 'Failed to send message.';
        }
      } catch (err) {
        console.error(err);
        if (status) status.textContent = 'Could not reach the server. Check backend URL and CORS.';
      }
    });
  }

  // reset handler
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) resetBtn.addEventListener('click', () => {
    if (form) form.reset();
    if (status) status.textContent = '';
  });

  // set copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

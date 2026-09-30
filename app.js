let lenisInstance = null;
let currentLanguage = 'en';
let currentModalProjectId = null;

// projects data
const projectsData = {
    spot2tube: {
        title: "Spot2TubeSync",
        badgeEN: "SaaS Platform · Microservices Architecture",
        badgeTR: "SaaS Platformu · Mikroservis Mimarisi",
        descriptionEN: "A high performance, robust quota compliant SaaS utility engineered to automate large playlist migrations directly from Spotify to YouTube Music. Developed with an explicitly decoupled architecture using Next.js 15, Python 3.12+ FastAPI, Supabase PostgreSQL, and a PostgreSQL native message queue to ensure asynchronous, non blocking transfer operations with live WebSocket status telemetry.",
        descriptionTR: "Spotify çalma listelerini doğrudan YouTube Music platformuna aktaran, kota korumalı ve kararlı SaaS platformu. Next.js 15, Python 3.12+ FastAPI, Supabase PostgreSQL ve Postgres yerel mesaj kuyruğu ile inşa edilen ayrık mimarisi sayesinde aktarım işlemlerini asenkron yürütür ve canlı WebSocket telemetrisi sağlar.",
        architectureEN: [
            "Decoupled frontend built with Next.js App Router, TypeScript, and Tailwind CSS deployed on Vercel.",
            "Stateless REST API powered by Python 3.12+, FastAPI, and Pydantic v2 hosted on Render.",
            "Autonomous background worker consumer loop polling PGMQ for non blocking task processing.",
            "Supabase PostgreSQL with Row Level Security and Supabase Realtime WebSockets for live progress bars.",
            "Dual boundary authentication: multi provider OAuth PKCE for Spotify and Google YouTube secured via Auth.js v5.",
            "Intelligent song matching utilizing ytmusicapi and built in exponential backoff quota rate limiting."
        ],
        architectureTR: [
            "Vercel üzerinde barındırılan Next.js App Router, TypeScript ve Tailwind CSS ile geliştirilmiş ayrık ön yüz.",
            "Render üzerinde çalışan, iş mantığını ve doğrulamayı yöneten durumsuz Python 3.12+ FastAPI REST API.",
            "Dayanıklı çalma listesi senkronizasyon işlerini yürüten Postgres yerel PGMQ arka plan işçi tüketim döngüsü.",
            "Satır Düzeyi Güvenlik ve canlı ilerleme çubuğu için Supabase Realtime WebSockets bağlantısı.",
            "Auth.js v5 ile korunan çok sağlayıcılı OAuth PKCE kimlik doğrulama mimarisi.",
            "ytmusicapi ve dahili üstel geri çekilme algoritması ile platformlar arası akıllı parça eşleştirme."
        ],
        tagsEN: [
            "Next.js 15",
            "Python 3.12+",
            "FastAPI",
            "Pydantic v2",
            "Supabase",
            "PostgreSQL RLS",
            "PGMQ",
            "Docker",
            "Auth.js v5",
            "Tailwind CSS",
            "WebSockets"
        ],
        tagsTR: [
            "Next.js 15",
            "Python 3.12+",
            "FastAPI",
            "Pydantic v2",
            "Supabase",
            "PostgreSQL RLS",
            "PGMQ",
            "Docker",
            "Auth.js v5",
            "Tailwind CSS",
            "WebSockets"
        ],
        Images: [
            "assets/spot2tube.png"
        ],
        alt: "Spot2TubeSync Production Dashboard and Transfer Flow",
        link: "https://github.com/Bahabie/spot2tube"
    },
    portfolio: {
        title: "alibahayorgancioglu.com",
        badgeEN: "Personal Portfolio · Clean Vanilla Architecture",
        badgeTR: "Kişisel Portfolyo · Saf Web Mimarisi",
        descriptionEN: "An editorial dark themed personal portfolio designed to showcase production software engineering projects. Built with zero runtime UI frameworks, featuring custom Lenis smooth scroll orchestration, noise grain shaders, modal state isolation, and responsive accessibility.",
        descriptionTR: "Üretim düzeyindeki yazılım projelerini sergilemek için tasarlanmış lüks editoryal karanlık temalı kişisel portfolyo. Harici arayüz kütüphanesi olmadan saf mimariyle geliştirilmiş olup akıcı Lenis kaydırma, noise görsel katmanı, modal durum izolasyonu ve duyarlı erişilebilirlik sunar.",
        architectureEN: [
            "Engineered with semantic HTML5, modern vanilla CSS tokens, and pure ES6+ JavaScript without runtime dependencies.",
            "Integrated Lenis smooth scrolling with custom animation curves and modal scroll lock orchestration.",
            "Dynamic client side localization engine supporting seamless instant toggling between English and Turkish.",
            "Responsive two column editorial grid layout optimized for fluid hierarchy on desktop and mobile viewports.",
            "Fine tuned SVG grain noise overlays and glassmorphism backdrop filters for a luxury dark aesthetic."
        ],
        architectureTR: [
            "Çalışma zamanı bağımlılığı olmadan semantik HTML5, modern CSS değişkenleri ve saf ES6+ JavaScript ile geliştirildi.",
            "Özel animasyon eğrileri ve modal kaydırma kilitleme koordinasyonuna sahip Lenis akıcı kaydırma entegrasyonu.",
            "İngilizce ve Türkçe arasında anlık geçişi destekleyen dinamik istemci taraflı yerelleştirme motoru.",
            "Masaüstü ve mobil ekranlarda dengeli hiyerarşi için optimize edilmiş duyarlı iki sütunlu editoryal ızgara düzeni.",
            "Lüks karanlık estetik için ince ayarlı SVG noise dokusu ve glassmorphism arka plan filtreleri."
        ],
        tagsEN: [
            "Vanilla JS",
            "CSS Architecture",
            "Lenis Scroll",
            "UI UX Design",
            "GitHub Pages"
        ],
        tagsTR: [
            "Saf JavaScript",
            "CSS Mimarisi",
            "Lenis Scroll",
            "Arayüz Tasarımı",
            "GitHub Pages"
        ],
        Images: [
            "https://placehold.co/800x450/080808/f5f5f5?text=Personal+Portfolio"
        ],
        alt: "alibahayorgancioglu.com Personal Portfolio Architecture",
        link: "https://github.com/Bahabie/alibahayorgancioglu.com"
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
        lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // Nav links & logo smooth scroll
    function smoothScrollTo(selector) {
        const target = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (!target) return;
        if (lenisInstance) {
            lenisInstance.scrollTo(target, {
                offset: -40,
                duration: 1.2,
                easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
                lock: false
            });
        } else {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    document.querySelectorAll('nav:not(.contact-links) a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            e.stopPropagation();
            smoothScrollTo(target);
        }, true);
    });

    const logo = document.querySelector('nav .logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            if (lenisInstance) {
                lenisInstance.scrollTo('top', {
                    duration: 1.2,
                    easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
                });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, true);
    }

    // Theme Switch
    const themeBtn = document.getElementById("theme-switch");
    const langBtn = document.getElementById("lang-switch");
    const body = document.body;

    if (!themeBtn || !langBtn) return;

    themeBtn.addEventListener("click", () => {
        body.classList.toggle("light-mode");
        themeBtn.textContent = body.classList.contains("light-mode") ? "☾" : "☀";
    });

    // Language Dictionary (Unhyphenated, Natural, Human Phrasing)
    const translations = {
        en: {
            "nav-about": "About",
            "nav-skills": "Skills",
            "nav-work": "Work",
            "nav-experience": "Experience",
            "nav-education": "Education",
            "nav-contact": "Contact",

            "hero-line1": "Software",
            "hero-line2": "Developer",
            "hero-sub": "Software Developer architecting scalable web applications and SaaS platforms with Next.js, Python FastAPI, and PostgreSQL.",
            "hero-meta": "BASED IN TURKEY · OPEN TO OPPORTUNITIES",

            "about-title": "About",
            "about-lead": "Software Developer focused on building scalable web applications and SaaS platforms. Highly proficient in modern ecosystems including Next.js, Python FastAPI, and PostgreSQL.",
            "about-body": "Adept at integrating advanced AI tooling into development pipelines to accelerate code generation and optimize architecture. Strong advocate for modern UI and UX principles, consistently bridging the gap between robust backend performance and seamless, aesthetically driven user experiences.",

            "skills-title": "Technical Stack",
            "skills-intro": "Categorized technologies, frameworks, and architectural tooling applied in production.",
            "skills-cat-frontend": "Frontend Architecture",
            "skills-cat-backend": "Backend & Database",
            "skills-cat-cloud": "Cloud, DevOps & Tools",
            "skills-cat-design": "Design & UI UX Systems",

            "section-work": "Featured Work",
            "section-intro": "Production ready software and SaaS platforms engineered with modern web architecture.",
            "proj-spot2tube-badge": "SaaS Platform",
            "badge-spot2tube": "SaaS Platform",
            "proj-spot2tube-desc": "Asynchronous SaaS platform migrating Spotify playlists directly to YouTube Music with live WebSocket telemetry and Postgres queueing.",
            "proj-portfolio-badge": "Personal Portfolio",
            "proj-portfolio-desc": "Personal software developer portfolio engineered with semantic HTML5, pure JavaScript, smooth Lenis scrolling, and dynamic dual language localization.",
            "view-project": "View project details →",

            "exp-title": "Experience",
            "exp-intro": "Professional track record across production operations and IT infrastructure.",
            "exp-agm-role": "Production and Operations Specialist",
            "exp-agm-period": "Oct 2025 – Feb 2026",
            "exp-agm-b1": "Managed technical operations for SMT and FATP production lines, optimizing hardware calibration and overall system efficiency.",
            "exp-agm-b2": "Streamlined production workflows and supply chain coordination, successfully reducing operational bottlenecks in high precision environments.",
            "exp-titanic-role": "Information Technology Intern",
            "exp-titanic-period": "Jun 2021 – Aug 2022",
            "exp-titanic-b1": "Maintained LAN and WLAN network monitoring and implemented cybersecurity measures for corporate and guest networks.",
            "exp-titanic-b2": "Managed Property Management Systems and resolved hardware, software, and connectivity issues to ensure seamless daily operations.",

            "edu-title": "Education",
            "edu-intro": "Academic foundations in software engineering and artificial intelligence.",
            "edu-anadolu-school": "Anadolu University",
            "edu-anadolu-degree": "Associate Degree in Artificial Intelligence Supported Coding",
            "edu-anadolu-period": "2026 – Present",
            "edu-anadolu-desc": "Focusing on algorithmic problem solving, modern AI integration pipelines, machine learning foundations, and advanced coding methodologies.",
            "edu-ataturk-school": "Atatürk University",
            "edu-ataturk-degree": "Associate Degree in Web Design and Coding",
            "edu-ataturk-period": "2023 – 2026",
            "edu-ataturk-desc": "Curriculum covering full stack web architectures, UI and UX principles, modern JavaScript, database management, and responsive frontend systems.",

            "contact-label": "Get in touch",
            "contact-sub": "Open to full time engineering roles and high impact software collaborations."
        },
        tr: {
            "nav-about": "Hakkımda",
            "nav-skills": "Yetenekler",
            "nav-work": "Projeler",
            "nav-experience": "Deneyim",
            "nav-education": "Eğitim",
            "nav-contact": "İletişim",

            "hero-line1": "Yazılım",
            "hero-line2": "Geliştirici",
            "hero-sub": "Next.js, Python FastAPI ve PostgreSQL ile ölçeklenebilir web uygulamaları ve SaaS platformları geliştiren Yazılım Geliştirici.",
            "hero-meta": "TÜRKİYE MERKEZLİ · FIRSATLARA AÇIK",

            "about-title": "Hakkımda",
            "about-lead": "Ölçeklenebilir web uygulamaları ve SaaS platformları geliştiren Yazılım Geliştirici. Next.js, Python FastAPI ve PostgreSQL başta olmak üzere modern ekosistemlerde yetkin.",
            "about-body": "Geliştirme süreçlerine ileri düzey yapay zeka araçlarını entegre ederek kod üretimini ve sistem mimarisini optimize eden; güçlü arka plan performansı ile akıcı, estetik kullanıcı deneyimleri arasındaki köprüyü kuran bir yaklaşım benimsiyorum.",

            "skills-title": "Teknoloji Yığını",
            "skills-intro": "Geliştirme ve üretim süreçlerinde kullandığım teknolojiler, kütüphaneler ve mimari araçlar.",
            "skills-cat-frontend": "Ön Yüz Mimarisi",
            "skills-cat-backend": "Arka Yüz ve Veritabanı",
            "skills-cat-cloud": "Bulut, DevOps ve Araçlar",
            "skills-cat-design": "Tasarım ve UI UX Sistemleri",

            "section-work": "Öne Çıkan Projeler",
            "section-intro": "Modern web mimarisiyle geliştirilmiş üretime hazır yazılımlar ve SaaS platformları.",
            "proj-spot2tube-badge": "SaaS Platformu",
            "badge-spot2tube": "SaaS Platformu",
            "proj-spot2tube-desc": "Spotify çalma listelerini canlı WebSocket takibi ve Postgres kuyruk mimarisiyle YouTube Music platformuna aktaran asenkron SaaS uygulaması.",
            "proj-portfolio-badge": "Kişisel Portfolyo",
            "proj-portfolio-desc": "Semantik HTML5, saf JavaScript, akıcı Lenis kaydırma deneyimi ve dinamik iki dilli altyapıyla geliştirilmiş kişisel yazılım geliştirici portfolyosu.",
            "view-project": "Projeyi gör →",

            "exp-title": "Deneyim",
            "exp-intro": "Üretim operasyonları ve bilgi teknolojileri altyapısı alanlarındaki profesyonel iş deneyimlerim.",
            "exp-agm-role": "Üretim ve Operasyon Uzmanı",
            "exp-agm-period": "Eki 2025 – Şub 2026",
            "exp-agm-b1": "SMT ve FATP üretim hatlarının teknik operasyonlarını yönetti; donanım kalibrasyonunu ve genel sistem verimliliğini optimize etti.",
            "exp-agm-b2": "Üretim iş akışlarını ve tedarik zinciri koordinasyonunu optimize ederek yüksek hassasiyetli üretim ortamlarındaki operasyonel darboğazları azalttı.",
            "exp-titanic-role": "Bilgi Teknolojileri Stajyeri",
            "exp-titanic-period": "Haz 2021 – Ağu 2022",
            "exp-titanic-b1": "Kurumsal ve misafir ağlarında LAN ve WLAN ağ izleme süreçlerini yürüttü; temel siber güvenlik önlemlerini uyguladı.",
            "exp-titanic-b2": "Otel Yönetim Sistemlerini yönetti; donanım, yazılım ve ağ bağlantı sorunlarını çözerek kesintisiz günlük operasyon sağladı.",

            "edu-title": "Eğitim",
            "edu-intro": "Yazılım geliştirme ve yapay zeka alanlarındaki akademik eğitim geçmişim.",
            "edu-anadolu-school": "Anadolu Üniversitesi",
            "edu-anadolu-degree": "Ön Lisans, Yapay Zeka Destekli Kodlama",
            "edu-anadolu-period": "2026 – Günümüz",
            "edu-anadolu-desc": "Algoritmik problem çözme, modern yapay zeka entegrasyonu, makine öğrenimi temelleri ve ileri kodlama teknikleri üzerine odaklanmaktadır.",
            "edu-ataturk-school": "Atatürk Üniversitesi",
            "edu-ataturk-degree": "Ön Lisans, Web Tasarım ve Kodlama",
            "edu-ataturk-period": "2023 – 2026",
            "edu-ataturk-desc": "Kapsamlı web mimarileri, UI ve UX ilkeleri, modern JavaScript, veritabanı yönetimi ve duyarlı arayüz sistemlerini kapsayan kapsamlı müfredat.",

            "contact-label": "İletişime Geçin",
            "contact-sub": "Tam zamanlı yazılım pozisyonlarına ve yenilikçi projelere açığım."
        }
    };

    currentLanguage = "en";

    langBtn.addEventListener("click", () => {
        currentLanguage = currentLanguage === "en" ? "tr" : "en";
        langBtn.textContent = currentLanguage === "en" ? "TR" : "EN";
        updateText();

        const projectModal = document.getElementById('project-modal');
        if (projectModal && projectModal.classList.contains('active')) {
            refreshModalForLanguage();
        }
    });

    function updateText() {
        document.querySelectorAll("[data-lang]").forEach(el => {
            const key = el.getAttribute("data-lang");
            if (translations[currentLanguage]?.[key]) {
                el.style.opacity = 0;
                setTimeout(() => {
                    el.textContent = translations[currentLanguage][key];
                    el.style.opacity = 1;
                }, 180);
            }
        });
    }

    const style = document.createElement('style');
    style.innerHTML = `[data-lang] { transition: opacity 0.18s ease-in-out; }`;
    document.head.appendChild(style);

    // Project Modal
    const projectModal = document.getElementById('project-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');

    function openProjectModal(projectId) {
        const project = projectsData[projectId];
        if (!project) return;

        currentModalProjectId = projectId;

        document.getElementById("modal-title").textContent = project.title;
        document.getElementById("modal-badge").textContent = currentLanguage === 'tr' ? project.badgeTR : project.badgeEN;
        const featuredImg = document.getElementById("modal-featured-image");
        if (featuredImg && project.Images && project.Images.length > 0) {
            featuredImg.src = project.Images[0];
            featuredImg.alt = project.alt || project.title;
        }
        document.getElementById("modal-link").href = project.link;

        const description = currentLanguage === 'tr' ? project.descriptionTR : project.descriptionEN;
        document.getElementById("modal-description").textContent = description;

        // Architecture list
        const archTitle = document.getElementById("modal-arch-title");
        if (archTitle) {
            archTitle.textContent = currentLanguage === 'tr' ? "Teknik Mimari ve Özellikler" : "Key Architecture & Core Features";
        }

        const archContainer = document.getElementById("modal-architecture");
        if (archContainer) {
            archContainer.innerHTML = '';
            const archList = currentLanguage === 'tr' ? project.architectureTR : project.architectureEN;
            archList.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                archContainer.appendChild(li);
            });
        }

        // Tags
        const currentTags = currentLanguage === 'tr' ? project.tagsTR : project.tagsEN;
        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = '';
        currentTags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'modal-tag';
            tagEl.textContent = tag;
            tagsContainer.appendChild(tagEl);
        });

        const modalLink = document.getElementById('modal-link');
        modalLink.textContent = currentLanguage === 'tr' ? "GitHub'da İncele →" : 'View on GitHub →';

        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');

        if (lenisInstance) {
            lenisInstance.stop();
        }
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        currentModalProjectId = null;

        if (lenisInstance) {
            lenisInstance.start();
        }
        document.body.style.overflow = '';
    }

    function refreshModalForLanguage() {
        if (!projectModal.classList.contains('active')) return;

        const projectId = currentModalProjectId || 'spot2tube';
        const project = projectsData[projectId];
        if (!project) return;

        const modalBadge = document.getElementById('modal-badge');
        const descriptionEl = document.getElementById('modal-description');
        const archTitle = document.getElementById("modal-arch-title");
        const archContainer = document.getElementById("modal-architecture");
        const tagsContainer = document.getElementById('modal-tags');
        const modalLink = document.getElementById('modal-link');

        if (modalBadge) modalBadge.textContent = currentLanguage === 'tr' ? project.badgeTR : project.badgeEN;
        if (archTitle) archTitle.textContent = currentLanguage === 'tr' ? "Teknik Mimari ve Özellikler" : "Key Architecture & Core Features";

        const featuredImg = document.getElementById("modal-featured-image");
        if (featuredImg && project.Images && project.Images.length > 0) {
            featuredImg.src = project.Images[0];
            featuredImg.alt = project.alt || project.title;
        }

        descriptionEl.style.opacity = 0;
        setTimeout(() => {
            descriptionEl.textContent = currentLanguage === 'tr' ? project.descriptionTR : project.descriptionEN;
            descriptionEl.style.opacity = 1;
        }, 150);

        if (archContainer) {
            archContainer.innerHTML = '';
            const archList = currentLanguage === 'tr' ? project.architectureTR : project.architectureEN;
            archList.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                archContainer.appendChild(li);
            });
        }

        const currentTags = currentLanguage === 'tr' ? project.tagsTR : project.tagsEN;
        tagsContainer.innerHTML = '';
        currentTags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'modal-tag';
            tagEl.textContent = tag;
            tagsContainer.appendChild(tagEl);
        });

        modalLink.textContent = currentLanguage === 'tr' ? "GitHub'da İncele →" : 'View on GitHub →';
    }

    // Event listeners for project cards
    const projectCards = document.querySelectorAll('.project-card[data-project-id]');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            openProjectModal(projectId);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeProjectModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeProjectModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });

    // Scroll reveal observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

});

let lenisInstance = null;
let currentLanguage = 'en';

// projects data
const projectsData = {
    orion: {
        title: "Orion One",
        descriptionEN: "An enterprise grade dashboard bridging raw telemetry and strategic decision-making with low latency rendering. Features real time visibility into cloud resource consumption and CI/CD pipeline health.",
        descriptionTR: "Ham telemetri ile stratejik karar alma arasında köprü kuran, düşük gecikmeli işleme sunan kurumsal düzeyde bir pano. Gerçek zamanlı bulut kaynağı tüketimi ve CI/CD boru hattı sağlığınız görünürlüğü sağlar.",
         tagsEN: ["JavaScript", "TypeScript", "Real Time Telemetry", "Enterprise"],
         tagsTR: ["JavaScript", "TypeScript", "Gerçek Zamanlı Telemetri", "Kurumsal"],
         Images: ["https://placehold.co/800x450/0f3460/1a5490?text=OrionONE+Dashboard", "https://placehold.co/800x450/0f3460/1a5490?text=OrionONE+Analytics"],
         link: "https://github.com/Bahabie/Orion-ONE"
    },
};

document.addEventListener('DOMContentLoaded', () => {
    
//lenis scroll 
if (typeof Lenis !== 'undefined' ) {
    lenisInstance = new Lenis({
        duration:2.5,
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


// nav links & logo click

function smoothScrollTo(selector) {
const target = typeof selector === 'string' ? document.querySelector(selector) : selector;
if (!target) return;
if (lenisInstance) {
    lenisInstance.scrollTo(target, {
        offset: 0,
        duration: 3.2,
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
                lenisInstance.scrollTo('top', { duration: 2, easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2) });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, true);
}

const themeBtn = document.getElementById("theme-switch");
const langBtn = document.getElementById("lang-switch");
const body = document.body;

if (!themeBtn || !langBtn) return;

themeBtn.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    themeBtn.textContent = body.classList.contains("light-mode") ? "☾" : "☀";
});

// language switch
const translations = {
    en: {
        "nav-work": "Work",
        "nav-about": "About",
        "nav-contact": "Contact",
        "hero-line1": "Software",
        "hero-line2": "Developer",
        "hero-sub": "Web Design and Coding student at Atatürk University. Building modern, responsive and user friendly websites.",
        "section-work": "Projects",
        "proj-1-desc": "High performance Enterprise AI & Cloud Intelligence Hub featuring real time telemetry.",
        "view-project": "View project →",
        "contact-label": "Get in touch",
        "hero-meta": "BASED IN TURKEY",
        "scroll-hint": "Scroll",
        "about-title": "About",
        "about-lead": "I design and build interfaces that are clear, fast, and enjoyable to use. I very care about typography, motion, and the small details.",
        "about-body": "When I'm not coding, I'm learning new tools or exploring design systems. Open to freelance and full time opportunities.",
        "skills-label": "I work with",
        "section-intro": "A selection of projects I've worked on.",
    },
    tr: {
        "nav-work": "Projeler",
        "nav-about": "Hakkımda",
        "nav-contact": "İLETİŞİM",
        "hero-line1": "Yazılım",
        "hero-line2": "Geliştirici",
        "hero-sub": "Atatürk Üniversitesi Web Tasarım ve Kodlama öğrencisi. Modern, duyarlı ve kullanıcı dostu web siteleri tasarlıyorum.",
        "section-work": "Projeler",
        "proj-1-desc": "Gerçek zamanlı telemetri ve CI/CD takibi sunan, yüksek performanslı kurumsal Yapay Zeka merkezi.",
        "view-project": "Projeyi gör →",
        "contact-label": "İLETİŞİM",
        "hero-meta": "TÜRKİYE MERKEZLİ",
        "scroll-hint": "Aşağı kaydır",
        "about-title": "Hakkımda",
        "about-lead": "Net, hızlı ve kullanımı keyifli arayüzler tasarlayıp kodluyorum. Tipografi, hareket ve küçük detaylara çok önem veriyorum.",
        "about-body": "Kod yazmıyorken yeni araçlar öğreniyor veya tasarım sistemlerini keşfediyorım. Freelance ve tam zamanlı fırsatlara açığım.",
        "skills-label": "Kullandığım TEKNOLOJİLER",
        "section-intro": "Üzerinde çalıştığım projelerim.",
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
                }, 200);
            }
        });
    }

    const style = document.createElement('style');
    style.innerHTML = `[data-lang] { transition: opacity 0.2s ease-in-out; }`;
    document.head.appendChild(style);

    // project modal
    const projectModal = document.getElementById('project-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    
    function openProjectModal(projectId) {
        const project = projectsData[projectId];
        if (!project) return;

        document.getElementById("modal-title").textContent = project.title;
        document.getElementById("modal-featured-image").src = project.Images[0];
        document.getElementById("modal-featured-image").alt = project.title;
        document.getElementById("modal-link").href = project.link;

        const description = currentLanguage === 'tr' ? project.descriptionTR : project.descriptionEN;
        document.getElementById("modal-description").textContent = description;

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
        modalLink.textContent = currentLanguage === 'tr' ? 'GitHub\'da Gör →' : 'View on GitHub →';

        projectModal.classList.add('active');
        if (lenisInstance) {
            lenisInstance.stop();
        } else {
            document.body.style.overflow = 'hidden';
        }
    }

    function closeProjectModal() {
        projectModal.classList.remove('active');
        if (lenisInstance) {
            lenisInstance.start();
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    function refreshModalForLanguage() {
        if (!projectModal.classList.contains('active')) return;

        const modalTitle = document.getElementById('modal-title').textContent;
        let currentProjectId = null;

        for (const [id, project] of Object.entries(projectsData)) {
            if (project.title === modalTitle) {
                currentProjectId = id;
                break;
            }
        }

        if (currentProjectId) {
            const project = projectsData[currentProjectId];

            const descriptionEl = document.getElementById('modal-description');
            descriptionEl.style.opacity = 0;
            setTimeout(() => {
                const description = currentLanguage === 'tr' ? project.descriptionTR : project.descriptionEN;
                descriptionEl.textContent = description;
                descriptionEl.style.opacity = 1;
            }, 150);

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
            modalLink.textContent = currentLanguage === 'tr' ? 'GitHub\'da Gör →' : 'View on GitHub →';
        }
    }

    // event listeners
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

    // scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

});

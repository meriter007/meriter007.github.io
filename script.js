// Language and Theme Management
class PortfolioManager {
    constructor() {
        this.currentLang = 'it';
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        this.setupLanguageSwitch();
        this.setupThemeSwitch();
        this.setupAnimations();
        this.setupTypingEffect();
        this.setupSkillBars();
        this.setupCodeToggle();
        this.setupContactForm();
        this.setupSmoothScroll();
        this.setupPopups();
        this.loadSavedPreferences();
    }

    // Language Management
    setupLanguageSwitch() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.switchLanguage(lang);
                
                // Update active button
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
    switchLanguage(lang) {
        this.currentLang = lang;
        document.documentElement.lang = lang;
        
        // Update all translatable elements
        const elements = document.querySelectorAll('[data-it][data-en]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    // Usa innerHTML invece di textContent per interpretare i <br>
                    element.innerHTML = text.replace(/\n/g, ''); // Rimuove eventuali newline raw
                }
            }
        });
    
        // Update typing text
        this.updateTypingText();
        
        // Save preference
        localStorage.setItem('language', lang);
    }

    updateTypingText() {
        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            const text = typingElement.dataset[this.currentLang];
            if (text) {
                this.typeText(typingElement, text);
            }
        }
    }

    // Theme Management
    setupThemeSwitch() {
        const themeBtn = document.getElementById('themeToggle');
        
        themeBtn.addEventListener('click', () => {
            const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme);
        });
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const themeBtn = document.getElementById('themeToggle');
        const icon = themeBtn.querySelector('i');
        
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }

    // Typing Effect
    setupTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            const text = typingElement.dataset[this.currentLang];
            this.typeText(typingElement, text);
        }
    }

    typeText(element, text) {
        element.textContent = '';
        let i = 0;
        
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
    }

    // Scroll Animations
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // Add animation classes to elements
        const animateElements = document.querySelectorAll(
            '.timeline-item, .skill-category, .project-card, .cert-card, .course-card, .app-card, .stat-item'
        );
        
        animateElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    // Skill Bars Animation
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.dataset.progress;
                    entry.target.style.width = progress + '%';
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // Code Toggle Functionality
    setupCodeToggle() {
        const codeToggleButtons = document.querySelectorAll('.code-toggle');
        
        codeToggleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const codeContent = btn.closest('.code-preview').querySelector('.code-content');
                const isActive = codeContent.classList.contains('active');
                
                // Close all other code previews
                document.querySelectorAll('.code-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Toggle current one
                if (!isActive) {
                    codeContent.classList.add('active');
                    btn.innerHTML = '<i class="fas fa-times"></i>';
                } else {
                    btn.innerHTML = '<i class="fas fa-code"></i>';
                }
            });
        });
    }

    // Contact Form
    setupContactForm() {
        const form = document.getElementById('contactForm');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Simulate form submission
                this.showNotification(
                    this.currentLang === 'it' 
                        ? 'Messaggio inviato con successo!' 
                        : 'Message sent successfully!',
                    'success'
                );
                
                // Reset form
                form.reset();
            });
        }
    }

    // Smooth Scroll
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Popup System
    setupPopups() {
        const courseCards = document.querySelectorAll('.course-card');
        const certCards = document.querySelectorAll('.cert-card');
        const popupOverlay = document.getElementById('popupOverlay');
        const popupClose = document.getElementById('popupClose');
        
        // Course cards
        courseCards.forEach(card => {
            card.addEventListener('click', () => {
                const courseId = card.dataset.course;
                this.showCoursePopup(courseId);
            });
        });
        
        // Certification cards
        certCards.forEach(card => {
            card.addEventListener('click', () => {
                const certId = card.dataset.cert;
                this.showCertPopup(certId);
            });
        });
        
        // Close popup
        if (popupClose) {
            popupClose.addEventListener('click', () => {
                this.closePopup();
            });
        }
        
        if (popupOverlay) {
            popupOverlay.addEventListener('click', (e) => {
                if (e.target === popupOverlay) {
                    this.closePopup();
                }
            });
        }
        
        // Close with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePopup();
            }
        });
    }
    
    showCoursePopup(courseId) {
        const courseData = this.getCourseData(courseId);
        const popupTitle = document.getElementById('popupTitle');
        const popupContent = document.getElementById('popupContent');
        const popupOverlay = document.getElementById('popupOverlay');
        
        if (popupTitle && popupContent && popupOverlay) {
            popupTitle.textContent = courseData.title;
            popupContent.innerHTML = this.generateCoursePopupContent(courseData);
            popupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    showCertPopup(certId) {
        const certData = this.getCertData(certId);
        const popupTitle = document.getElementById('popupTitle');
        const popupContent = document.getElementById('popupContent');
        const popupOverlay = document.getElementById('popupOverlay');
        
        if (popupTitle && popupContent && popupOverlay) {
            popupTitle.textContent = certData.title;
            popupContent.innerHTML = this.generateCertPopupContent(certData);
            popupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closePopup() {
        const popupOverlay = document.getElementById('popupOverlay');
        if (popupOverlay) {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    getCourseData(courseId) {
        const courses = {
            'react-advanced': {
                title: 'React Advanced Patterns',
                provider: 'Frontend Masters',
                duration: '8 ore',
                level: 'Avanzato',
                description: {
                    it: 'Corso approfondito sui pattern avanzati di React, inclusi Render Props, Higher-Order Components, Context API e Custom Hooks.',
                    en: 'In-depth course on advanced React patterns, including Render Props, Higher-Order Components, Context API and Custom Hooks.'
                },
                topics: {
                    it: [
                        'Render Props Pattern',
                        'Higher-Order Components (HOCs)',
                        'Context API e useContext',
                        'Custom Hooks avanzati',
                        'Performance Optimization',
                        'Error Boundaries',
                        'Suspense e Concurrent Features'
                    ],
                    en: [
                        'Render Props Pattern',
                        'Higher-Order Components (HOCs)',
                        'Context API and useContext',
                        'Advanced Custom Hooks',
                        'Performance Optimization',
                        'Error Boundaries',
                        'Suspense and Concurrent Features'
                    ]
                },
                skills: ['React', 'JavaScript', 'TypeScript', 'Performance'],
                certificate: true,
                completed: true
            },
            'nodejs-complete': {
                title: 'Node.js Complete Guide',
                provider: 'Udemy',
                duration: '40 ore',
                level: 'Intermedio',
                description: {
                    it: 'Corso completo su Node.js che copre dalle basi fino alle applicazioni enterprise con Express, MongoDB e deployment.',
                    en: 'Complete Node.js course covering from basics to enterprise applications with Express, MongoDB and deployment.'
                },
                topics: {
                    it: [
                        'Fondamenti di Node.js',
                        'Express.js Framework',
                        'Database Integration (MongoDB)',
                        'Authentication & Authorization',
                        'RESTful APIs',
                        'GraphQL',
                        'Testing con Jest',
                        'Deployment e DevOps'
                    ],
                    en: [
                        'Node.js Fundamentals',
                        'Express.js Framework',
                        'Database Integration (MongoDB)',
                        'Authentication & Authorization',
                        'RESTful APIs',
                        'GraphQL',
                        'Testing with Jest',
                        'Deployment and DevOps'
                    ]
                },
                skills: ['Node.js', 'Express', 'MongoDB', 'JWT'],
                certificate: true,
                completed: true
            },
            'ml-basics': {
                title: 'Machine Learning Basics',
                provider: 'Coursera',
                duration: '60 ore',
                level: 'Principiante',
                description: {
                    it: 'Introduzione al Machine Learning con Python, algoritmi di base e applicazioni pratiche.',
                    en: 'Introduction to Machine Learning with Python, basic algorithms and practical applications.'
                },
                topics: {
                    it: [
                        'Introduzione al ML',
                        'Supervised Learning',
                        'Unsupervised Learning',
                        'Python per Data Science',
                        'Scikit-learn',
                        'Data Preprocessing',
                        'Model Evaluation'
                    ],
                    en: [
                        'Introduction to ML',
                        'Supervised Learning',
                        'Unsupervised Learning',
                        'Python for Data Science',
                        'Scikit-learn',
                        'Data Preprocessing',
                        'Model Evaluation'
                    ]
                },
                skills: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
                certificate: false,
                completed: false
            },
            'docker-k8s': {
                title: 'Docker & Kubernetes',
                provider: 'Linux Academy',
                duration: '30 ore',
                level: 'Intermedio',
                description: {
                    it: 'Corso completo su containerizzazione con Docker e orchestrazione con Kubernetes.',
                    en: 'Complete course on containerization with Docker and orchestration with Kubernetes.'
                },
                topics: {
                    it: [
                        'Docker Fundamentals',
                        'Docker Compose',
                        'Kubernetes Architecture',
                        'Pods e Services',
                        'Deployments',
                        'ConfigMaps e Secrets',
                        'Monitoring e Logging'
                    ],
                    en: [
                        'Docker Fundamentals',
                        'Docker Compose',
                        'Kubernetes Architecture',
                        'Pods and Services',
                        'Deployments',
                        'ConfigMaps and Secrets',
                        'Monitoring and Logging'
                    ]
                },
                skills: ['Docker', 'Kubernetes', 'DevOps', 'YAML'],
                certificate: true,
                completed: false
            }
        };
        
        return courses[courseId] || {};
    }
    
    getCertData(certId) {
        const certifications = {
            'aws-architect': {
                title: 'AWS Certified Solutions Architect',
                provider: 'Amazon Web Services',
                level: 'Associate',
                validUntil: '2026',
                description: {
                    it: 'Certificazione che dimostra competenze nella progettazione di architetture distribuite su AWS.',
                    en: 'Certification demonstrating skills in designing distributed architectures on AWS.'
                },
                skills: {
                    it: [
                        'Progettazione di architetture resilienti',
                        'Definizione di architetture performanti',
                        'Specifica di applicazioni sicure',
                        'Progettazione di soluzioni cost-effective',
                        'Definizione di architetture operationally excellent'
                    ],
                    en: [
                        'Design resilient architectures',
                        'Define performant architectures',
                        'Specify secure applications',
                        'Design cost-optimized solutions',
                        'Define operationally excellent architectures'
                    ]
                },
                technologies: ['AWS EC2', 'AWS S3', 'AWS RDS', 'AWS Lambda', 'AWS VPC'],
                examScore: '850/1000',
                completed: true
            },
            'k8s-admin': {
                title: 'Certified Kubernetes Administrator',
                provider: 'Linux Foundation',
                level: 'Professional',
                validUntil: '2027',
                description: {
                    it: 'Certificazione per amministratori Kubernetes che dimostra competenze nella gestione di cluster.',
                    en: 'Kubernetes administrator certification demonstrating cluster management skills.'
                },
                skills: {
                    it: [
                        'Installazione e configurazione cluster',
                        'Gestione workloads e scheduling',
                        'Servizi e networking',
                        'Storage management',
                        'Troubleshooting',
                        'Sicurezza del cluster'
                    ],
                    en: [
                        'Cluster installation and configuration',
                        'Workloads and scheduling management',
                        'Services and networking',
                        'Storage management',
                        'Troubleshooting',
                        'Cluster security'
                    ]
                },
                technologies: ['Kubernetes', 'Docker', 'etcd', 'kubectl', 'Helm'],
                examScore: 'In corso',
                completed: false
            },
            'gcp-dev': {
                title: 'Google Cloud Professional Developer',
                provider: 'Google Cloud',
                level: 'Professional',
                validUntil: '2027',
                description: {
                    it: 'Certificazione per sviluppatori che costruiscono applicazioni scalabili su Google Cloud.',
                    en: 'Certification for developers building scalable applications on Google Cloud.'
                },
                skills: {
                    it: [
                        'Progettazione di applicazioni cloud-native',
                        'Costruzione e testing di applicazioni',
                        'Deployment di applicazioni',
                        'Integrazione con servizi Google Cloud',
                        'Gestione di dati e storage'
                    ],
                    en: [
                        'Designing cloud-native applications',
                        'Building and testing applications',
                        'Deploying applications',
                        'Integrating Google Cloud services',
                        'Managing data and storage'
                    ]
                },
                technologies: ['GCP', 'Cloud Functions', 'Cloud Run', 'Firestore', 'BigQuery'],
                examScore: 'Pianificato',
                completed: false
            },
            'scrum-master': {
                title: 'Certified Scrum Master',
                provider: 'Scrum Alliance',
                level: 'Professional',
                validUntil: '2025',
                description: {
                    it: 'Certificazione che dimostra competenze nella facilitazione di team Scrum e metodologie agili.',
                    en: 'Certification demonstrating skills in facilitating Scrum teams and agile methodologies.'
                },
                skills: {
                    it: [
                        'Facilitazione di eventi Scrum',
                        'Coaching del team',
                        'Rimozione di impedimenti',
                        'Promozione di pratiche agili',
                        'Collaborazione con Product Owner'
                    ],
                    en: [
                        'Facilitating Scrum events',
                        'Team coaching',
                        'Impediment removal',
                        'Promoting agile practices',
                        'Product Owner collaboration'
                    ]
                },
                technologies: ['Scrum', 'Agile', 'Jira', 'Confluence', 'Kanban'],
                examScore: 'Certificato',
                completed: true
            }
        };
        
        return certifications[certId] || {};
    }
    
    generateCoursePopupContent(courseData) {
        const lang = this.currentLang;
        const description = courseData.description[lang] || courseData.description.it;
        const topics = courseData.topics[lang] || courseData.topics.it;
        
        return `
            <div class="popup-section">
                <h4>${lang === 'it' ? 'Descrizione' : 'Description'}</h4>
                <p>${description}</p>
            </div>
            
            <div class="popup-section">
                <h4>${lang === 'it' ? 'Dettagli' : 'Details'}</h4>
                <p><strong>${lang === 'it' ? 'Provider' : 'Provider'}:</strong> ${courseData.provider}</p>
                <p><strong>${lang === 'it' ? 'Durata' : 'Duration'}:</strong> ${courseData.duration}</p>
                <p><strong>${lang === 'it' ? 'Livello' : 'Level'}:</strong> ${courseData.level}</p>
                <p><strong>${lang === 'it' ? 'Certificato' : 'Certificate'}:</strong> ${courseData.certificate ? (lang === 'it' ? 'Sì' : 'Yes') : (lang === 'it' ? 'No' : 'No')}</p>
            </div>
            
            <div class="popup-section">
                <h4>${lang === 'it' ? 'Argomenti trattati' : 'Topics covered'}</h4>
                <ul>
                    ${topics.map(topic => `<li>${topic}</li>`).join('')}
                </ul>
            </div>
            
            <div class="popup-section">
                <h4>${lang === 'it' ? 'Competenze acquisite' : 'Skills acquired'}</h4>
                <div class="popup-tech-grid">
                    ${courseData.skills.map(skill => `
                        <div class="popup-tech-item">
                            <i class="fas fa-check-circle" style="color: var(--accent-success);"></i>
                            <span>${skill}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    generateCertPopupContent(certData) {
        const lang = this.currentLang;
        const description = certData.description[lang] || certData.description.it;
        const skills = certData.skills[lang] || certData.skills.it;
        
        return `
            <div class="popup-section">
                <h4>${lang === 'it' ? 'Descrizione' : 'Description'}</h4>
                <p>${description}</p>
            </div>
            
            <div class="popup-section">
                <h4>${lang === 'it' ? 'Dettagli' : 'Details'}</h4>
                <p><strong>${lang === 'it' ? 'Provider' : 'Provider'}:</strong> ${certData.provider}</p>
                <p><strong>${lang === 'it' ? 'Livello' : 'Level'}:</strong> ${certData.level}</p>
                ${certData.validUntil ? `<p><strong>${lang === 'it' ? 'Valida fino al' : 'Valid until'}:</strong> ${certData.validUntil}</p>` : ''}
                ${certData.examScore ? `<p><strong>${lang === 'it' ? 'Punteggio' : 'Score'}:</strong> ${certData.examScore}</p>` : ''}
            </div>
            
            <div class="popup-section">
                <h4>${lang === 'it' ? 'Competenze certificate' : 'Certified skills'}</h4>
                <ul>
                    ${skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </div>
            
            <div class="popup-section">
                <h4>${lang === 'it' ? 'Tecnologie' : 'Technologies'}</h4>
                <div class="popup-tech-grid">
                    ${certData.technologies.map(tech => `
                        <div class="popup-tech-item">
                            <i class="fas fa-cog" style="color: var(--accent-primary);"></i>
                            <span>${tech}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Notification System
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#48bb78' : '#667eea'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Load saved preferences
    loadSavedPreferences() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedLang = localStorage.getItem('language') || 'it';
        
        this.setTheme(savedTheme);
        this.switchLanguage(savedLang);
        
        // Update active language button
        const langBtn = document.querySelector(`[data-lang="${savedLang}"]`);
        if (langBtn) {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            langBtn.classList.add('active');
        }
    }
}
// js/skills.js
function initSkillsMarquee() {
    const track = document.querySelector('.skill-marquee-track');
    if (!track) return; // Esce se l'elemento non esiste
    
    const container = document.querySelector('.skill-marquee-container');
    const descElement = document.getElementById('current-skill-desc');
    let isDragging = false;
    let startX, scrollLeft;
    
    // Clone items for infinite effect
    const items = track.querySelectorAll('.skill-item');
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });
    
    // Mouse drag functionality
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = track.scrollLeft;
        container.style.cursor = 'grabbing';
    });
    
    container.addEventListener('mouseleave', () => {
        isDragging = false;
        container.style.cursor = 'grab';
    });
    
    container.addEventListener('mouseup', () => {
        isDragging = false;
        container.style.cursor = 'grab';
    });
    
    container.addEventListener('mousemove', (e) => {
        if(!isDragging) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        track.style.transform = `translateX(${-walk}px)`;
    });
    
    // Click on skill to show description
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('click', () => {
            const lang = document.documentElement.lang || 'it';
            const desc = item.getAttribute(`data-desc-${lang}`);
            if (descElement) descElement.textContent = desc;
        });
    });
}

// Inizializza quando il DOM è pronto
document.addEventListener('DOMContentLoaded', initSkillsMarquee);

// Se usi moduli ES6, esporta la funzione
// export default initSkillsMarquee;
// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main portfolio manager
    const portfolio = new PortfolioManager();
    
    // Add some interactive easter eggs
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            portfolio.showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });
    
    // Add rainbow animation for easter egg
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    console.log('🚀 Portfolio loaded successfully!');
    console.log('💡 Try the terminal page for interactive commands!');
});
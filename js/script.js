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
            const text = element.dataset[lang];
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            }
        });

        // Update typing text
        this.updateTypingText();
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
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        this.setTheme(savedTheme);
        
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
            '.timeline-item, .skill-category, .project-card, .cert-item, .dev-item, .stat-item'
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
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Interactive Terminal Commands
class TerminalSimulator {
    constructor() {
        this.commands = {
            'help': () => this.showHelp(),
            'about': () => this.showAbout(),
            'skills': () => this.showSkills(),
            'contact': () => this.showContact(),
            'clear': () => this.clearTerminal(),
            'theme': (args) => this.toggleTheme(),
            'lang': (args) => this.switchLang(args[0])
        };
        
        this.setupTerminalInput();
    }

    setupTerminalInput() {
        const terminalBody = document.querySelector('.terminal-body');
        if (!terminalBody) return;

        // Add input line
        const inputLine = document.createElement('div');
        inputLine.className = 'terminal-input-line';
        inputLine.innerHTML = `
            <span class="terminal-prompt">$</span>
            <input type="text" class="terminal-input" placeholder="Type 'help' for commands...">
        `;
        
        terminalBody.appendChild(inputLine);
        
        const input = inputLine.querySelector('.terminal-input');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand(input.value.trim());
                input.value = '';
            }
        });

        // Style the input
        Object.assign(input.style, {
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#d4d4d4',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--font-size-sm)',
            flex: '1',
            marginLeft: '8px'
        });
    }

    executeCommand(command) {
        const [cmd, ...args] = command.toLowerCase().split(' ');
        
        // Add command to terminal
        this.addToTerminal(`$ ${command}`, 'command');
        
        if (this.commands[cmd]) {
            this.commands[cmd](args);
        } else if (command) {
            this.addToTerminal(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
        }
    }

    addToTerminal(text, type = 'output') {
        const terminalBody = document.querySelector('.terminal-body');
        const outputDiv = document.createElement('div');
        outputDiv.className = `terminal-${type}`;
        outputDiv.innerHTML = text;
        
        // Insert before input line
        const inputLine = terminalBody.querySelector('.terminal-input-line');
        terminalBody.insertBefore(outputDiv, inputLine);
        
        // Scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    showHelp() {
        const helpText = `
Available commands:
• help - Show this help message
• about - Show information about me
• skills - List my technical skills
• contact - Show contact information
• theme - Toggle dark/light theme
• lang [it|en] - Switch language
• clear - Clear terminal
        `;
        this.addToTerminal(helpText, 'output');
    }

    showAbout() {
        const aboutText = `
Marco Rossi - Full-Stack Developer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Passionate about creating elegant solutions
💻 5+ years of experience in web development
🚀 Specialized in React, Node.js, and modern architectures
📍 Based in Milano, Italia
        `;
        this.addToTerminal(aboutText, 'output');
    }

    showSkills() {
        const skillsText = `
Technical Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Frontend: React, Vue.js, TypeScript, CSS/SASS
Backend: Node.js, Python, Express, FastAPI
Database: PostgreSQL, MongoDB, Redis
Tools: Docker, AWS, Git, Figma
        `;
        this.addToTerminal(skillsText, 'output');
    }

    showContact() {
        const contactText = `
Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 marco.rossi@example.com
📱 +39 123 456 7890
🔗 linkedin.com/in/marcorossi
🐙 github.com/marcorossi
        `;
        this.addToTerminal(contactText, 'output');
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        this.addToTerminal(`Theme switched to ${newTheme} mode`, 'output');
    }

    switchLang(lang) {
        if (lang === 'it' || lang === 'en') {
            // Trigger language switch
            const langBtn = document.querySelector(`[data-lang="${lang}"]`);
            if (langBtn) {
                langBtn.click();
                this.addToTerminal(`Language switched to ${lang === 'it' ? 'Italian' : 'English'}`, 'output');
            }
        } else {
            this.addToTerminal('Usage: lang [it|en]', 'error');
        }
    }

    clearTerminal() {
        const terminalBody = document.querySelector('.terminal-body');
        const inputLine = terminalBody.querySelector('.terminal-input-line');
        
        // Remove all children except input line
        while (terminalBody.firstChild && terminalBody.firstChild !== inputLine) {
            terminalBody.removeChild(terminalBody.firstChild);
        }
    }
}

// Particle Background Effect
class ParticleBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        
        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.animate();
        this.setupResize();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.1';
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }

    createParticles() {
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = getComputedStyle(document.documentElement)
                .getPropertyValue('--accent-primary');
            this.ctx.fill();
        });
        
        // Draw connections
        this.drawConnections();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = getComputedStyle(document.documentElement)
                        .getPropertyValue('--accent-primary');
                    this.ctx.globalAlpha = 1 - distance / 100;
                    this.ctx.stroke();
                    this.ctx.globalAlpha = 1;
                }
            }
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupResize() {
        window.addEventListener('resize', () => {
            this.resize();
        });
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas) {
            document.body.removeChild(this.canvas);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main portfolio manager
    const portfolio = new PortfolioManager();
    
    // Initialize terminal simulator
    const terminal = new TerminalSimulator();
    
    // Initialize particle background (optional - can be disabled for performance)
    // const particles = new ParticleBackground();
    
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
    console.log('💡 Try typing commands in the terminal or use the Konami code for a surprise!');
});
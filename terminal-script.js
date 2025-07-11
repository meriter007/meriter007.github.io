// Terminal Portafolio Manager
class TerminalPortafolio {
    constructor() {
        this.currentLang = 'it';
        this.currentTheme = 'dark';
        this.commandHistory = [];
        this.historyIndex = -1;
        this.isFullscreen = false;
        
        this.commands = {
            'help': () => this.showHelp(),
            'about': () => this.loadAboutSection(),
            'experience': () => this.loadExperienceSection(),
            'skills': () => this.loadSkillsSection(),
            'courses': () => this.loadCoursesSection(),
            'certifications': () => this.loadCertificationsSection(),
            'projects': () => this.loadProjectsSection(),
            'webapps': () => this.loadWebAppsSection(),
            'contact': () => this.loadContactSection(),
            'clear': () => this.clearTerminal(),
            'theme': () => this.toggleTheme(),
            'lang': (args) => this.switchLanguage(args[0]),
            'history': () => this.showHistory(),
            'exit': () => this.exit()
        };
        
        this.init();
    }

    init() {
        this.setupTerminalInput();
        this.setupLanguageSwitch();
        this.setupThemeSwitch();
        this.setupTerminalActions();
        this.loadSavedPreferences();
    }

    setupTerminalInput() {
        const input = document.getElementById('terminalInput');
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = input.value.trim();
                if (command) {
                    this.executeCommand(command);
                    this.commandHistory.unshift(command);
                    this.historyIndex = -1;
                }
                input.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.historyIndex < this.commandHistory.length - 1) {
                    this.historyIndex++;
                    input.value = this.commandHistory[this.historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    input.value = this.commandHistory[this.historyIndex];
                } else if (this.historyIndex === 0) {
                    this.historyIndex = -1;
                    input.value = '';
                }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.autoComplete(input);
            }
        });
    }

    executeCommand(command) {
        const [cmd, ...args] = command.toLowerCase().split(' ');
        
        // Add command to terminal output
        this.addToTerminal(`mario@Portafolio:~$ ${command}`, 'command');
        
        if (this.commands[cmd]) {
            this.commands[cmd](args);
        } else if (command) {
            this.addToTerminal(`bash: ${cmd}: command not found`, 'error');
            this.addToTerminal(`Type 'help' for available commands.`, 'info');
        }
        
        this.scrollToBottom();
    }

    addToTerminal(text, type = 'output') {
        const terminalBody = document.getElementById('terminalBody');
        const inputLine = terminalBody.querySelector('.terminal-input-line');
        
        const outputDiv = document.createElement('div');
        outputDiv.className = `terminal-${type}`;
        outputDiv.innerHTML = text;
        
        terminalBody.insertBefore(outputDiv, inputLine);
        this.scrollToBottom();
    }

    scrollToBottom() {
        const terminalBody = document.getElementById('terminalBody');
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    // Command implementations
    showHelp() {
        const helpText = this.currentLang === 'it' ? `
<div class="help-section">
    <h3>📋 Comandi Disponibili:</h3>
    <div class="help-commands">
        <div class="help-category">
            <h4>🔍 Esplorazione Portafolio:</h4>
            <div class="help-item"><span class="cmd">about</span> - Informazioni su di me</div>
            <div class="help-item"><span class="cmd">experience</span> - Esperienze lavorative</div>
            <div class="help-item"><span class="cmd">skills</span> - Competenze tecniche</div>
            <div class="help-item"><span class="cmd">courses</span> - Corsi completati</div>
            <div class="help-item"><span class="cmd">certifications</span> - Certificazioni</div>
            <div class="help-item"><span class="cmd">projects</span> - Progetti personali</div>
            <div class="help-item"><span class="cmd">webapps</span> - Sviluppi app web</div>
            <div class="help-item"><span class="cmd">contact</span> - Informazioni di contatto</div>
        </div>
        <div class="help-category">
            <h4>⚙️ Comandi Sistema:</h4>
            <div class="help-item"><span class="cmd">clear</span> - Pulisci terminale</div>
            <div class="help-item"><span class="cmd">theme</span> - Cambia tema</div>
            <div class="help-item"><span class="cmd">lang [it|en]</span> - Cambia lingua</div>
            <div class="help-item"><span class="cmd">history</span> - Cronologia comandi</div>
        </div>
    </div>
    <p class="help-tip">💡 Usa TAB per autocompletamento, ↑↓ per cronologia comandi</p>
</div>` : `
<div class="help-section">
    <h3>📋 Available Commands:</h3>
    <div class="help-commands">
        <div class="help-category">
            <h4>🔍 Portafolio Exploration:</h4>
            <div class="help-item"><span class="cmd">about</span> - About me information</div>
            <div class="help-item"><span class="cmd">experience</span> - Work experience</div>
            <div class="help-item"><span class="cmd">skills</span> - Technical skills</div>
            <div class="help-item"><span class="cmd">courses</span> - Completed courses</div>
            <div class="help-item"><span class="cmd">certifications</span> - Certifications</div>
            <div class="help-item"><span class="cmd">projects</span> - Personal projects</div>
            <div class="help-item"><span class="cmd">webapps</span> - Web app developments</div>
            <div class="help-item"><span class="cmd">contact</span> - Contact information</div>
        </div>
        <div class="help-category">
            <h4>⚙️ System Commands:</h4>
            <div class="help-item"><span class="cmd">clear</span> - Clear terminal</div>
            <div class="help-item"><span class="cmd">theme</span> - Toggle theme</div>
            <div class="help-item"><span class="cmd">lang [it|en]</span> - Switch language</div>
            <div class="help-item"><span class="cmd">history</span> - Command history</div>
        </div>
    </div>
    <p class="help-tip">💡 Use TAB for autocompletion, ↑↓ for command history</p>
</div>`;
        
        this.addToTerminal(helpText, 'help');
    }

    loadAboutSection() {
        this.addToTerminal('Loading about section...', 'info');
        
        const aboutContent = this.currentLang === 'it' ? `
<div class="section-content about-section">
    <h2>👨‍💻 Chi Sono</h2>
    <div class="about-grid">
        <div class="about-text">
            <p>Sono Marco Rossi, un <strong>Full-Stack Developer</strong> con oltre 5 anni di esperienza nello sviluppo di applicazioni web moderne e scalabili.</p>
            <p>La mia passione per la tecnologia mi spinge a rimanere sempre aggiornato sulle ultime tendenze del settore, con particolare focus su <strong>React</strong>, <strong>Node.js</strong> e architetture cloud.</p>
            <p>Credo fermamente nell'importanza del <strong>clean code</strong>, delle best practices e dell'approccio DevOps per creare soluzioni robuste e maintainabili.</p>
        </div>
        <div class="about-stats">
            <div class="stat-item">
                <span class="stat-number">5+</span>
                <span class="stat-label">Anni Esperienza</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">50+</span>
                <span class="stat-label">Progetti Completati</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">15+</span>
                <span class="stat-label">Tecnologie</span>
            </div>
        </div>
    </div>
</div>` : `
<div class="section-content about-section">
    <h2>👨‍💻 About Me</h2>
    <div class="about-grid">
        <div class="about-text">
            <p>I'm Marco Rossi, a <strong>Full-Stack Developer</strong> with over 5 years of experience in developing modern and scalable web applications.</p>
            <p>My passion for technology drives me to stay updated on the latest industry trends, with particular focus on <strong>React</strong>, <strong>Node.js</strong> and cloud architectures.</p>
            <p>I firmly believe in the importance of <strong>clean code</strong>, best practices and DevOps approach to create robust and maintainable solutions.</p>
        </div>
        <div class="about-stats">
            <div class="stat-item">
                <span class="stat-number">5+</span>
                <span class="stat-label">Years Experience</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">50+</span>
                <span class="stat-label">Projects Completed</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">15+</span>
                <span class="stat-label">Technologies</span>
            </div>
        </div>
    </div>
</div>`;
        
        this.loadDynamicContent(aboutContent);
    }

    loadExperienceSection() {
        this.addToTerminal('Loading experience section...', 'info');
        
        const experienceContent = this.currentLang === 'it' ? `
<div class="section-content experience-section">
    <h2>💼 Esperienze Lavorative</h2>
    <div class="timeline">
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3>Senior Full-Stack Developer</h3>
                <h4>TechCorp Solutions</h4>
                <span class="timeline-date">2022 - Presente</span>
                <p>Sviluppo di applicazioni enterprise con React e Node.js. Leadership tecnica di un team di 4 sviluppatori.</p>
                <div class="tech-tags">
                    <span class="tech-tag">React</span>
                    <span class="tech-tag">Node.js</span>
                    <span class="tech-tag">AWS</span>
                    <span class="tech-tag">Docker</span>
                </div>
            </div>
        </div>
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3>Full-Stack Developer</h3>
                <h4>WebDev Agency</h4>
                <span class="timeline-date">2020 - 2022</span>
                <p>Sviluppo di siti web e applicazioni per clienti enterprise. Implementazione di soluzioni e-commerce scalabili.</p>
                <div class="tech-tags">
                    <span class="tech-tag">Vue.js</span>
                    <span class="tech-tag">Express</span>
                    <span class="tech-tag">MongoDB</span>
                    <span class="tech-tag">Stripe</span>
                </div>
            </div>
        </div>
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3>Frontend Developer</h3>
                <h4>StartupTech</h4>
                <span class="timeline-date">2019 - 2020</span>
                <p>Sviluppo interfacce utente responsive e implementazione di design systems per prodotti SaaS.</p>
                <div class="tech-tags">
                    <span class="tech-tag">JavaScript</span>
                    <span class="tech-tag">CSS/SASS</span>
                    <span class="tech-tag">Figma</span>
                    <span class="tech-tag">Git</span>
                </div>
            </div>
        </div>
    </div>
</div>` : `
<div class="section-content experience-section">
    <h2>💼 Work Experience</h2>
    <div class="timeline">
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3>Senior Full-Stack Developer</h3>
                <h4>TechCorp Solutions</h4>
                <span class="timeline-date">2022 - Present</span>
                <p>Development of enterprise applications with React and Node.js. Technical leadership of a 4-developer team.</p>
                <div class="tech-tags">
                    <span class="tech-tag">React</span>
                    <span class="tech-tag">Node.js</span>
                    <span class="tech-tag">AWS</span>
                    <span class="tech-tag">Docker</span>
                </div>
            </div>
        </div>
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3>Full-Stack Developer</h3>
                <h4>WebDev Agency</h4>
                <span class="timeline-date">2020 - 2022</span>
                <p>Development of websites and applications for enterprise clients. Implementation of scalable e-commerce solutions.</p>
                <div class="tech-tags">
                    <span class="tech-tag">Vue.js</span>
                    <span class="tech-tag">Express</span>
                    <span class="tech-tag">MongoDB</span>
                    <span class="tech-tag">Stripe</span>
                </div>
            </div>
        </div>
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3>Frontend Developer</h3>
                <h4>StartupTech</h4>
                <span class="timeline-date">2019 - 2020</span>
                <p>Development of responsive user interfaces and implementation of design systems for SaaS products.</p>
                <div class="tech-tags">
                    <span class="tech-tag">JavaScript</span>
                    <span class="tech-tag">CSS/SASS</span>
                    <span class="tech-tag">Figma</span>
                    <span class="tech-tag">Git</span>
                </div>
            </div>
        </div>
    </div>
</div>`;
        
        this.loadDynamicContent(experienceContent);
    }

    loadSkillsSection() {
        this.addToTerminal('Loading skills section...', 'info');
        
        const skillsContent = this.currentLang === 'it' ? `
<div class="section-content skills-section">
    <h2>🛠️ Competenze Tecniche</h2>
    <div class="skills-grid">
        <div class="skill-category">
            <h3><i class="fas fa-code"></i> Frontend</h3>
            <div class="skill-items">
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #61DAFB;"><i class="fab fa-react"></i></div>
                        <span class="skill-name">React</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="90"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #4FC08D;"><i class="fab fa-vuejs"></i></div>
                        <span class="skill-name">Vue.js</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="85"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #F7DF1E;"><i class="fab fa-js-square"></i></div>
                        <span class="skill-name">JavaScript</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="95"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #3178C6;"><i class="fas fa-code"></i></div>
                        <span class="skill-name">TypeScript</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="80"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="skill-category">
            <h3><i class="fas fa-server"></i> Backend</h3>
            <div class="skill-items">
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #339933;"><i class="fab fa-node-js"></i></div>
                        <span class="skill-name">Node.js</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="88"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #3776AB;"><i class="fab fa-python"></i></div>
                        <span class="skill-name">Python</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="75"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #336791;"><i class="fas fa-database"></i></div>
                        <span class="skill-name">PostgreSQL</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="82"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #47A248;"><i class="fas fa-leaf"></i></div>
                        <span class="skill-name">MongoDB</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="78"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="skill-category">
            <h3><i class="fas fa-tools"></i> Tools & DevOps</h3>
            <div class="skill-items">
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #2496ED;"><i class="fab fa-docker"></i></div>
                        <span class="skill-name">Docker</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="85"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #FF9900;"><i class="fab fa-aws"></i></div>
                        <span class="skill-name">AWS</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="80"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #F05032;"><i class="fab fa-git-alt"></i></div>
                        <span class="skill-name">Git</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="92"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #F24E1E;"><i class="fab fa-figma"></i></div>
                        <span class="skill-name">Figma</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="70"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>` : `
<div class="section-content skills-section">
    <h2>🛠️ Technical Skills</h2>
    <div class="skills-grid">
        <div class="skill-category">
            <h3><i class="fas fa-code"></i> Frontend</h3>
            <div class="skill-items">
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #61DAFB;"><i class="fab fa-react"></i></div>
                        <span class="skill-name">React</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="90"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #4FC08D;"><i class="fab fa-vuejs"></i></div>
                        <span class="skill-name">Vue.js</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="85"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #F7DF1E;"><i class="fab fa-js-square"></i></div>
                        <span class="skill-name">JavaScript</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="95"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #3178C6;"><i class="fas fa-code"></i></div>
                        <span class="skill-name">TypeScript</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="80"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="skill-category">
            <h3><i class="fas fa-server"></i> Backend</h3>
            <div class="skill-items">
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #339933;"><i class="fab fa-node-js"></i></div>
                        <span class="skill-name">Node.js</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="88"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #3776AB;"><i class="fab fa-python"></i></div>
                        <span class="skill-name">Python</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="75"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #336791;"><i class="fas fa-database"></i></div>
                        <span class="skill-name">PostgreSQL</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="82"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #47A248;"><i class="fas fa-leaf"></i></div>
                        <span class="skill-name">MongoDB</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="78"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="skill-category">
            <h3><i class="fas fa-tools"></i> Tools & DevOps</h3>
            <div class="skill-items">
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #2496ED;"><i class="fab fa-docker"></i></div>
                        <span class="skill-name">Docker</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="85"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #FF9900;"><i class="fab fa-aws"></i></div>
                        <span class="skill-name">AWS</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="80"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #F05032;"><i class="fab fa-git-alt"></i></div>
                        <span class="skill-name">Git</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="92"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-header">
                        <div class="skill-icon" style="color: #F24E1E;"><i class="fab fa-figma"></i></div>
                        <span class="skill-name">Figma</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="70"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
        
        this.loadDynamicContent(skillsContent);
        this.animateSkillBars();
    }

    loadCoursesSection() {
        this.addToTerminal('Loading courses section...', 'info');
        
        const coursesContent = this.currentLang === 'it' ? `
<div class="section-content courses-section">
    <h2>📚 Corsi Completati</h2>
    <div class="courses-grid">
        <div class="course-card completed">
            <div class="course-header">
                <div class="course-icon"><i class="fab fa-react"></i></div>
                <div class="course-status completed-status">✓</div>
            </div>
            <div class="course-content">
                <h3>React Advanced Patterns</h3>
                <div class="course-provider">Frontend Masters</div>
                <div class="course-date">Completato: Marzo 2024</div>
                <div class="course-badge completed-badge">Completato</div>
            </div>
        </div>
        <div class="course-card completed">
            <div class="course-header">
                <div class="course-icon"><i class="fab fa-node-js"></i></div>
                <div class="course-status completed-status">✓</div>
            </div>
            <div class="course-content">
                <h3>Node.js Complete Guide</h3>
                <div class="course-provider">Udemy</div>
                <div class="course-date">Completato: Gennaio 2024</div>
                <div class="course-badge completed-badge">Completato</div>
            </div>
        </div>
        <div class="course-card progress">
            <div class="course-header">
                <div class="course-icon"><i class="fas fa-brain"></i></div>
                <div class="course-status progress-status">⏳</div>
            </div>
            <div class="course-content">
                <h3>Machine Learning Basics</h3>
                <div class="course-provider">Coursera</div>
                <div class="course-date">In corso: 60% completato</div>
                <div class="course-badge progress-badge">In Corso</div>
            </div>
        </div>
        <div class="course-card planned">
            <div class="course-header">
                <div class="course-icon"><i class="fab fa-docker"></i></div>
                <div class="course-status planned-status">📅</div>
            </div>
            <div class="course-content">
                <h3>Docker & Kubernetes</h3>
                <div class="course-provider">Linux Academy</div>
                <div class="course-date">Pianificato: Giugno 2024</div>
                <div class="course-badge planned-badge">Pianificato</div>
            </div>
        </div>
    </div>
</div>` : `
<div class="section-content courses-section">
    <h2>📚 Completed Courses</h2>
    <div class="courses-grid">
        <div class="course-card completed">
            <div class="course-header">
                <div class="course-icon"><i class="fab fa-react"></i></div>
                <div class="course-status completed-status">✓</div>
            </div>
            <div class="course-content">
                <h3>React Advanced Patterns</h3>
                <div class="course-provider">Frontend Masters</div>
                <div class="course-date">Completed: March 2024</div>
                <div class="course-badge completed-badge">Completed</div>
            </div>
        </div>
        <div class="course-card completed">
            <div class="course-header">
                <div class="course-icon"><i class="fab fa-node-js"></i></div>
                <div class="course-status completed-status">✓</div>
            </div>
            <div class="course-content">
                <h3>Node.js Complete Guide</h3>
                <div class="course-provider">Udemy</div>
                <div class="course-date">Completed: January 2024</div>
                <div class="course-badge completed-badge">Completed</div>
            </div>
        </div>
        <div class="course-card progress">
            <div class="course-header">
                <div class="course-icon"><i class="fas fa-brain"></i></div>
                <div class="course-status progress-status">⏳</div>
            </div>
            <div class="course-content">
                <h3>Machine Learning Basics</h3>
                <div class="course-provider">Coursera</div>
                <div class="course-date">In progress: 60% completed</div>
                <div class="course-badge progress-badge">In Progress</div>
            </div>
        </div>
        <div class="course-card planned">
            <div class="course-header">
                <div class="course-icon"><i class="fab fa-docker"></i></div>
                <div class="course-status planned-status">📅</div>
            </div>
            <div class="course-content">
                <h3>Docker & Kubernetes</h3>
                <div class="course-provider">Linux Academy</div>
                <div class="course-date">Planned: June 2024</div>
                <div class="course-badge planned-badge">Planned</div>
            </div>
        </div>
    </div>
</div>`;
        
        this.loadDynamicContent(coursesContent);
    }

    loadCertificationsSection() {
        this.addToTerminal('Loading certifications section...', 'info');
        
        const certificationsContent = this.currentLang === 'it' ? `
<div class="section-content certifications-section">
    <h2>🏆 Certificazioni</h2>
    <div class="certifications-grid">
        <div class="cert-card completed">
            <div class="cert-header">
                <div class="cert-icon"><i class="fab fa-aws"></i></div>
                <div class="cert-status completed-status">✓</div>
            </div>
            <div class="cert-content">
                <h3>AWS Certified Solutions Architect</h3>
                <div class="cert-provider">Amazon Web Services</div>
                <div class="cert-date">Ottenuta: Febbraio 2024</div>
                <div class="cert-badge completed-badge">Certificato</div>
            </div>
        </div>
        <div class="cert-card progress">
            <div class="cert-header">
                <div class="cert-icon"><i class="fas fa-dharmachakra"></i></div>
                <div class="cert-status progress-status">⏳</div>
            </div>
            <div class="cert-content">
                <h3>Certified Kubernetes Administrator</h3>
                <div class="cert-provider">Linux Foundation</div>
                <div class="cert-date">Esame: Maggio 2024</div>
                <div class="cert-badge progress-badge">In Corso</div>
            </div>
        </div>
        <div class="cert-card completed">
            <div class="cert-header">
                <div class="cert-icon"><i class="fas fa-users"></i></div>
                <div class="cert-status completed-status">✓</div>
            </div>
            <div class="cert-content">
                <h3>Certified Scrum Master</h3>
                <div class="cert-provider">Scrum Alliance</div>
                <div class="cert-date">Ottenuta: Settembre 2023</div>
                <div class="cert-badge completed-badge">Certificato</div>
            </div>
        </div>
        <div class="cert-card planned">
            <div class="cert-header">
                <div class="cert-icon"><i class="fab fa-google"></i></div>
                <div class="cert-status planned-status">📅</div>
            </div>
            <div class="cert-content">
                <h3>Google Cloud Professional Developer</h3>
                <div class="cert-provider">Google Cloud</div>
                <div class="cert-date">Pianificata: Luglio 2024</div>
                <div class="cert-badge planned-badge">Pianificata</div>
            </div>
        </div>
    </div>
</div>` : `
<div class="section-content certifications-section">
    <h2>🏆 Certifications</h2>
    <div class="certifications-grid">
        <div class="cert-card completed">
            <div class="cert-header">
                <div class="cert-icon"><i class="fab fa-aws"></i></div>
                <div class="cert-status completed-status">✓</div>
            </div>
            <div class="cert-content">
                <h3>AWS Certified Solutions Architect</h3>
                <div class="cert-provider">Amazon Web Services</div>
                <div class="cert-date">Obtained: February 2024</div>
                <div class="cert-badge completed-badge">Certified</div>
            </div>
        </div>
        <div class="cert-card progress">
            <div class="cert-header">
                <div class="cert-icon"><i class="fas fa-dharmachakra"></i></div>
                <div class="cert-status progress-status">⏳</div>
            </div>
            <div class="cert-content">
                <h3>Certified Kubernetes Administrator</h3>
                <div class="cert-provider">Linux Foundation</div>
                <div class="cert-date">Exam: May 2024</div>
                <div class="cert-badge progress-badge">In Progress</div>
            </div>
        </div>
        <div class="cert-card completed">
            <div class="cert-header">
                <div class="cert-icon"><i class="fas fa-users"></i></div>
                <div class="cert-status completed-status">✓</div>
            </div>
            <div class="cert-content">
                <h3>Certified Scrum Master</h3>
                <div class="cert-provider">Scrum Alliance</div>
                <div class="cert-date">Obtained: September 2023</div>
                <div class="cert-badge completed-badge">Certified</div>
            </div>
        </div>
        <div class="cert-card planned">
            <div class="cert-header">
                <div class="cert-icon"><i class="fab fa-google"></i></div>
                <div class="cert-status planned-status">📅</div>
            </div>
            <div class="cert-content">
                <h3>Google Cloud Professional Developer</h3>
                <div class="cert-provider">Google Cloud</div>
                <div class="cert-date">Planned: July 2024</div>
                <div class="cert-badge planned-badge">Planned</div>
            </div>
        </div>
    </div>
</div>`;
        
        this.loadDynamicContent(certificationsContent);
    }

    loadProjectsSection() {
        this.addToTerminal('Loading projects section...', 'info');
        
        const projectsContent = this.currentLang === 'it' ? `
<div class="section-content projects-section">
    <h2>🚀 Progetti Personali</h2>
    <div class="projects-grid">
        <div class="project-card">
            <div class="project-header">
                <h3>E-Commerce Platform</h3>
                <div class="project-links">
                    <a href="#" class="project-link"><i class="fab fa-github"></i></a>
                    <a href="#" class="project-link"><i class="fas fa-external-link-alt"></i></a>
                </div>
            </div>
            <div class="project-description">
                Piattaforma e-commerce completa con gestione prodotti, carrello, pagamenti e dashboard admin.
            </div>
            <div class="project-tech">
                <span class="tech-tag">React</span>
                <span class="tech-tag">Node.js</span>
                <span class="tech-tag">MongoDB</span>
                <span class="tech-tag">Stripe</span>
            </div>
            <div class="code-preview">
                <div class="code-header">
                    <span class="code-title">ProductCard.jsx</span>
                    <button class="code-toggle"><i class="fas fa-code"></i></button>
                </div>
                <div class="code-content">
                    <pre><code>const ProductCard = ({ product, onAddToCart }) => {
  return (
    &lt;div className="product-card"&gt;
      &lt;img src={product.image} alt={product.name} /&gt;
      &lt;h3&gt;{product.name}&lt;/h3&gt;
      &lt;p className="price"&gt;€{product.price}&lt;/p&gt;
      &lt;button onClick={() => onAddToCart(product)}&gt;
        Aggiungi al Carrello
      &lt;/button&gt;
    &lt;/div&gt;
  );
};</code></pre>
                </div>
            </div>
        </div>
        <div class="project-card">
            <div class="project-header">
                <h3>Task Management App</h3>
                <div class="project-links">
                    <a href="#" class="project-link"><i class="fab fa-github"></i></a>
                    <a href="#" class="project-link"><i class="fas fa-external-link-alt"></i></a>
                </div>
            </div>
            <div class="project-description">
                Applicazione per la gestione di task e progetti con drag & drop, notifiche e collaborazione team.
            </div>
            <div class="project-tech">
                <span class="tech-tag">Vue.js</span>
                <span class="tech-tag">Express</span>
                <span class="tech-tag">PostgreSQL</span>
                <span class="tech-tag">Socket.io</span>
            </div>
            <div class="code-preview">
                <div class="code-header">
                    <span class="code-title">TaskBoard.vue</span>
                    <button class="code-toggle"><i class="fas fa-code"></i></button>
                </div>
                <div class="code-content">
                    <pre><code>&lt;template&gt;
  &lt;div class="task-board"&gt;
    &lt;div v-for="column in columns" :key="column.id" 
         class="column"&gt;
      &lt;h3&gt;{{ column.title }}&lt;/h3&gt;
      &lt;draggable v-model="column.tasks" 
                 @change="updateTask"&gt;
        &lt;task-card v-for="task in column.tasks" 
                   :key="task.id" :task="task" /&gt;
      &lt;/draggable&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
                </div>
            </div>
        </div>
    </div>
</div>` : `
<div class="section-content projects-section">
    <h2>🚀 Personal Projects</h2>
    <div class="projects-grid">
        <div class="project-card">
            <div class="project-header">
                <h3>E-Commerce Platform</h3>
                <div class="project-links">
                    <a href="#" class="project-link"><i class="fab fa-github"></i></a>
                    <a href="#" class="project-link"><i class="fas fa-external-link-alt"></i></a>
                </div>
            </div>
            <div class="project-description">
                Complete e-commerce platform with product management, cart, payments and admin dashboard.
            </div>
            <div class="project-tech">
                <span class="tech-tag">React</span>
                <span class="tech-tag">Node.js</span>
                <span class="tech-tag">MongoDB</span>
                <span class="tech-tag">Stripe</span>
            </div>
            <div class="code-preview">
                <div class="code-header">
                    <span class="code-title">ProductCard.jsx</span>
                    <button class="code-toggle"><i class="fas fa-code"></i></button>
                </div>
                <div class="code-content">
                    <pre><code>const ProductCard = ({ product, onAddToCart }) => {
  return (
    &lt;div className="product-card"&gt;
      &lt;img src={product.image} alt={product.name} /&gt;
      &lt;h3&gt;{product.name}&lt;/h3&gt;
      &lt;p className="price"&gt;€{product.price}&lt;/p&gt;
      &lt;button onClick={() => onAddToCart(product)}&gt;
        Add to Cart
      &lt;/button&gt;
    &lt;/div&gt;
  );
};</code></pre>
                </div>
            </div>
        </div>
        <div class="project-card">
            <div class="project-header">
                <h3>Task Management App</h3>
                <div class="project-links">
                    <a href="#" class="project-link"><i class="fab fa-github"></i></a>
                    <a href="#" class="project-link"><i class="fas fa-external-link-alt"></i></a>
                </div>
            </div>
            <div class="project-description">
                Task and project management application with drag & drop, notifications and team collaboration.
            </div>
            <div class="project-tech">
                <span class="tech-tag">Vue.js</span>
                <span class="tech-tag">Express</span>
                <span class="tech-tag">PostgreSQL</span>
                <span class="tech-tag">Socket.io</span>
            </div>
            <div class="code-preview">
                <div class="code-header">
                    <span class="code-title">TaskBoard.vue</span>
                    <button class="code-toggle"><i class="fas fa-code"></i></button>
                </div>
                <div class="code-content">
                    <pre><code>&lt;template&gt;
  &lt;div class="task-board"&gt;
    &lt;div v-for="column in columns" :key="column.id" 
         class="column"&gt;
      &lt;h3&gt;{{ column.title }}&lt;/h3&gt;
      &lt;draggable v-model="column.tasks" 
                 @change="updateTask"&gt;
        &lt;task-card v-for="task in column.tasks" 
                   :key="task.id" :task="task" /&gt;
      &lt;/draggable&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
                </div>
            </div>
        </div>
    </div>
</div>`;
        
        this.loadDynamicContent(projectsContent);
        this.setupCodeToggle();
    }

    loadWebAppsSection() {
        this.addToTerminal('Loading web apps section...', 'info');
        
        const webAppsContent = this.currentLang === 'it' ? `
<div class="section-content web-apps-section">
    <h2>💻 Sviluppi App Web</h2>
    <div class="web-apps-grid">
        <div class="app-card">
            <div class="app-header">
                <div class="app-icon"><i class="fas fa-shopping-cart"></i></div>
                <div class="app-status">
                    <span class="status-badge live">Live</span>
                </div>
            </div>
            <div class="app-content">
                <h3>ShopMaster Pro</h3>
                <p class="app-description">
                    Piattaforma e-commerce avanzata con gestione inventario, analytics e multi-vendor support.
                </p>
                <div class="app-tech">
                    <span class="tech-tag">React</span>
                    <span class="tech-tag">Node.js</span>
                    <span class="tech-tag">PostgreSQL</span>
                    <span class="tech-tag">Redis</span>
                </div>
                <div class="app-links">
                    <a href="#" class="app-link">
                        <i class="fas fa-external-link-alt"></i>
                        Demo Live
                    </a>
                    <a href="#" class="app-link">
                        <i class="fab fa-github"></i>
                        Repository
                    </a>
                </div>
            </div>
        </div>
        <div class="app-card">
            <div class="app-header">
                <div class="app-icon"><i class="fas fa-tasks"></i></div>
                <div class="app-status">
                    <span class="status-badge live">Live</span>
                </div>
            </div>
            <div class="app-content">
                <h3>TaskFlow</h3>
                <p class="app-description">
                    Sistema di gestione progetti con Kanban board, time tracking e reporting avanzato.
                </p>
                <div class="app-tech">
                    <span class="tech-tag">Vue.js</span>
                    <span class="tech-tag">Express</span>
                    <span class="tech-tag">MongoDB</span>
                    <span class="tech-tag">Socket.io</span>
                </div>
                <div class="app-links">
                    <a href="#" class="app-link">
                        <i class="fas fa-external-link-alt"></i>
                        Demo Live
                    </a>
                    <a href="#" class="app-link">
                        <i class="fab fa-github"></i>
                        Repository
                    </a>
                </div>
            </div>
        </div>
        <div class="app-card">
            <div class="app-header">
                <div class="app-icon"><i class="fas fa-chart-line"></i></div>
                <div class="app-status">
                    <span class="status-badge development">In Sviluppo</span>
                </div>
            </div>
            <div class="app-content">
                <h3>Analytics Dashboard</h3>
                <p class="app-description">
                    Dashboard interattiva per visualizzazione dati con grafici real-time e export personalizzati.
                </p>
                <div class="app-tech">
                    <span class="tech-tag">React</span>
                    <span class="tech-tag">D3.js</span>
                    <span class="tech-tag">Python</span>
                    <span class="tech-tag">FastAPI</span>
                </div>
                <div class="app-links">
                    <a href="#" class="app-link disabled">
                        <i class="fas fa-external-link-alt"></i>
                        Demo Live
                    </a>
                    <a href="#" class="app-link">
                        <i class="fab fa-github"></i>
                        Repository
                    </a>
                </div>
            </div>
        </div>
        <div class="app-card">
            <div class="app-header">
                <div class="app-icon"><i class="fas fa-comments"></i></div>
                <div class="app-status">
                    <span class="status-badge development">In Sviluppo</span>
                </div>
            </div>
            <div class="app-content">
                <h3>ChatApp Pro</h3>
                <p class="app-description">
                    Applicazione di messaggistica real-time con video chiamate, file sharing e crittografia end-to-end.
                </p>
                <div class="app-tech">
                    <span class="tech-tag">Next.js</span>
                    <span class="tech-tag">WebRTC</span>
                    <span class="tech-tag">Socket.io</span>
                    <span class="tech-tag">AWS</span>
                </div>
                <div class="app-links">
                    <a href="#" class="app-link disabled">
                        <i class="fas fa-external-link-alt"></i>
                        Demo Live
                    </a>
                    <a href="#" class="app-link">
                        <i class="fab fa-github"></i>
                        Repository
                    </a>
                </div>
            </div>
        </div>
        <div class="app-card">
            <div class="app-header">
                <div class="app-icon"><i class="fas fa-brain"></i></div>
                <div class="app-status">
                    <span class="status-badge planned">Pianificato</span>
                </div>
            </div>
            <div class="app-content">
                <h3>AI Content Generator</h3>
                <p class="app-description">
                    Piattaforma per generazione automatica di contenuti usando AI, con editor avanzato e templates.
                </p>
                <div class="app-tech">
                    <span class="tech-tag">React</span>
                    <span class="tech-tag">OpenAI API</span>
                    <span class="tech-tag">Node.js</span>
                    <span class="tech-tag">PostgreSQL</span>
                </div>
                <div class="app-links">
                    <a href="#" class="app-link disabled">
                        <i class="fas fa-external-link-alt"></i>
                        Demo Live
                    </a>
                    <a href="#" class="app-link disabled">
                        <i class="fab fa-github"></i>
                        Repository
                    </a>
                </div>
            </div>
        </div>
        <div class="app-card">
            <div class="app-header">
                <div class="app-icon"><i class="fas fa-mobile-alt"></i></div>
                <div class="app-status">
                    <span class="status-badge planned">Pianificato</span>
                </div>
            </div>
            <div class="app-content">
                <h3>Fitness Tracker PWA</h3>
                <p class="app-description">
                    Progressive Web App per tracking fitness con sincronizzazione wearables e social features.
                </p>
                <div class="app-tech">
                    <span class="tech-tag">PWA</span>
                    <span class="tech-tag">Vue.js</span>
                    <span class="tech-tag">Firebase</span>
                    <span class="tech-tag">Web APIs</span>
                </div>
                <div class="app-links">
                    <a href="#" class="app-link disabled">
                        <i class="fas fa-external-link-alt"></i>
                        Demo Live
                    </a>
                    <a href="#" class="app-link disabled">
                        <i class="fab fa-github"></i>
                        Repository
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>` : `
<div class="section-content web-apps-section">
    <h2>💻 Web App Developments</h2>
    <div class="web-apps-grid">
        <div class="app-card">
            <div class="app-header">
                <div class="app-icon"><i class="fas fa-shopping-cart"></i></div>
                <div class="app-status">
                    <span class="status-badge live">Live</span>
                </div>
            </div>
            <div class="app-content">
                <h3>ShopMaster Pro</h3>
                <p class="app-description">
                    Advanced e-commerce platform with inventory management, analytics and multi-vendor support.
                </p>
                <div class="app-tech">
                    <span class="tech-tag">React</span>
                    <span class="tech-tag">Node.js</span>
                    <span class="tech-tag">PostgreSQL</span>
                    <span class="tech-tag">Redis</span>
                </div>
                <div class="app-links">
                    <a href="#" class="app-link">
                        <i class="fas fa-external-link-alt"></i>
                        Live Demo
                    </a>
                    <a href="#" class="app-link">
                        <i class="fab fa-github"></i>
                        Repository
                    </a>
                </div>
            </div>
        </div>
        <div class="app-card">
            <div class="app-header">
                <div class="app-icon"><i class="fas fa-tasks"></i></div>
                <div class="app-status">
                    <span class="status-badge live">Live</span>
                </div>
            </div>
            <div class="app-content">
                <h3>TaskFlow</h3>
                <p class="app-description">
                    Project management system with Kanban boards, time tracking and advanced reporting.
                </p>
                <div class="app-tech">
                    <span class="tech-tag">Vue.js</span>
                    <span class="tech-tag">Express</span>
                    <span class="tech-tag">MongoDB</span>
                    <span class="tech-tag">Socket.io</span>
                </div>
                <div class="app-links">
                    <a href="#" class="app-link">
                        <i class="fas fa-external-link-alt"></i>
                        Live Demo
                    </a>
                    <a href="#" class="app-link">
                        <i class="fab fa-github"></i>
                        Repository
                    </a>
                </div>
            </div>
        </div>
        <div class="app-card">
            <div class="app-header">
                <div class="app-icon"><i class="fas fa-chart-line"></i></div>
                <div class="app-status">
                    <span class="status-badge development">In Development</span>
                </div>
            </div>
            <div class="app-content">
                <h3>Analytics Dashboard</h3>
                <p class="app-description">
                    Interactive dashboard for data visualization with real-time charts and custom exports.
                </p>
                <div class="app-tech">
                    <span class="tech-tag">React</span>
                    <span class="tech-tag">D3.js</span>
                    <span class="tech-tag">Python</span>
                    <span class="tech-tag">FastAPI</span>
                </div>
                <div class="app-links">
                    <a href="#" class="app-link disabled">
                        <i class="fas fa-external-link-alt"></i>
                        Live Demo
                    </a>
                    <a href="#" class="app-link">
                        <i class="fab fa-github"></i>
                        Repository
                    </a>
                </div>
            </div>
        </div>
        <div class="app-card">
            <div class="app-header">
                <div class="app-icon"><i class="fas fa-comments"></i></div>
                <div class="app-status">
                    <span class="status-badge development">In Development</span>
                </div>
            </div>
            <div class="app-content">
                <h3>ChatApp Pro</h3>
                <p class="app-description">
                    Real-time messaging application with video calls, file sharing and end-to-end encryption.
                </p>
                <div class="app-tech">
                    <span class="tech-tag">Next.js</span>
                    <span class="tech-tag">WebRTC</span>
                    <span class="tech-tag">Socket.io</span>
                    <span class="tech-tag">AWS</span>
                </div>
                <div class="app-links">
                    <a href="#" class="app-link disabled">
                        <i class="fas fa-external-link-alt"></i>
                        Live Demo
                    </a>
                    <a href="#" class="app-link">
                        <i class="fab fa-github"></i>
                        Repository
                    </a>
                </div>
            </div>
        </div>
        <div class="app-card">
            <div class="app-header">
                <div class="app-icon"><i class="fas fa-brain"></i></div>
                <div class="app-status">
                    <span class="status-badge planned">Planned</span>
                </div>
            </div>
            <div class="app-content">
                <h3>AI Content Generator</h3>
                <p class="app-description">
                    Platform for automatic content generation using AI, with advanced editor and templates.
                </p>
                <div class="app-tech">
                    <span class="tech-tag">React</span>
                    <span class="tech-tag">OpenAI API</span>
                    <span class="tech-tag">Node.js</span>
                    <span class="tech-tag">PostgreSQL</span>
                </div>
                <div class="app-links">
                    <a href="#" class="app-link disabled">
                        <i class="fas fa-external-link-alt"></i>
                        Live Demo
                    </a>
                    <a href="#" class="app-link disabled">
                        <i class="fab fa-github"></i>
                        Repository
                    </a>
                </div>
            </div>
        </div>
        <div class="app-card">
            <div class="app-header">
                <div class="app-icon"><i class="fas fa-mobile-alt"></i></div>
                <div class="app-status">
                    <span class="status-badge planned">Planned</span>
                </div>
            </div>
            <div class="app-content">
                <h3>Fitness Tracker PWA</h3>
                <p class="app-description">
                    Progressive Web App for fitness tracking with wearables sync and social features.
                </p>
                <div class="app-tech">
                    <span class="tech-tag">PWA</span>
                    <span class="tech-tag">Vue.js</span>
                    <span class="tech-tag">Firebase</span>
                    <span class="tech-tag">Web APIs</span>
                </div>
                <div class="app-links">
                    <a href="#" class="app-link disabled">
                        <i class="fas fa-external-link-alt"></i>
                        Live Demo
                    </a>
                    <a href="#" class="app-link disabled">
                        <i class="fab fa-github"></i>
                        Repository
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>`;
        
        this.loadDynamicContent(webAppsContent);
    }

    loadContactSection() {
        this.addToTerminal('Loading contact section...', 'info');
        
        const contactContent = this.currentLang === 'it' ? `
<div class="section-content contact-section">
    <h2>📧 Contatti</h2>
    <div class="contact-grid">
        <div class="contact-info">
            <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <div>
                    <h4>Email</h4>
                    <p>marco.rossi@example.com</p>
                </div>
            </div>
            <div class="contact-item">
                <i class="fas fa-phone"></i>
                <div>
                    <h4>Telefono</h4>
                    <p>+39 123 456 7890</p>
                </div>
            </div>
            <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                    <h4>Posizione</h4>
                    <p>Milano, Italia</p>
                </div>
            </div>
            <div class="contact-item">
                <i class="fab fa-linkedin"></i>
                <div>
                    <h4>LinkedIn</h4>
                    <p>linkedin.com/in/marcorossi</p>
                </div>
            </div>
            <div class="contact-item">
                <i class="fab fa-github"></i>
                <div>
                    <h4>GitHub</h4>
                    <p>github.com/marcorossi</p>
                </div>
            </div>
        </div>
        <div class="contact-form">
            <h3>Invia un messaggio</h3>
            <form id="contactForm">
                <div class="form-group">
                    <label for="name">Nome</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="subject">Oggetto</label>
                    <input type="text" id="subject" name="subject" required>
                </div>
                <div class="form-group">
                    <label for="message">Messaggio</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Invia Messaggio</button>
            </form>
        </div>
    </div>
</div>` : `
<div class="section-content contact-section">
    <h2>📧 Contact</h2>
    <div class="contact-grid">
        <div class="contact-info">
            <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <div>
                    <h4>Email</h4>
                    <p>marco.rossi@example.com</p>
                </div>
            </div>
            <div class="contact-item">
                <i class="fas fa-phone"></i>
                <div>
                    <h4>Phone</h4>
                    <p>+39 123 456 7890</p>
                </div>
            </div>
            <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                    <h4>Location</h4>
                    <p>Milano, Italy</p>
                </div>
            </div>
            <div class="contact-item">
                <i class="fab fa-linkedin"></i>
                <div>
                    <h4>LinkedIn</h4>
                    <p>linkedin.com/in/marcorossi</p>
                </div>
            </div>
            <div class="contact-item">
                <i class="fab fa-github"></i>
                <div>
                    <h4>GitHub</h4>
                    <p>github.com/marcorossi</p>
                </div>
            </div>
        </div>
        <div class="contact-form">
            <h3>Send a message</h3>
            <form id="contactForm">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="subject">Subject</label>
                    <input type="text" id="subject" name="subject" required>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
        </div>
    </div>
</div>`;
        
        this.loadDynamicContent(contactContent);
        this.setupContactForm();
    }

    showHistory() {
        if (this.commandHistory.length === 0) {
            this.addToTerminal(this.currentLang === 'it' ? 'Nessun comando nella cronologia.' : 'No commands in history.', 'info');
            return;
        }
        
        const historyText = this.commandHistory
            .slice(0, 10)
            .map((cmd, index) => `${this.commandHistory.length - index}: ${cmd}`)
            .join('\n');
        
        this.addToTerminal(`<pre>${historyText}</pre>`, 'output');
    }

    exit() {
        this.addToTerminal(this.currentLang === 'it' ? 'Arrivederci! 👋' : 'Goodbye! 👋', 'info');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }

    // Utility methods
    loadDynamicContent(content) {
        const dynamicContent = document.getElementById('dynamicContent');
        dynamicContent.innerHTML = content;
        dynamicContent.scrollIntoView({ behavior: 'smooth' });
    }

    animateSkillBars() {
        setTimeout(() => {
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const progress = bar.dataset.progress;
                bar.style.width = progress + '%';
            });
        }, 500);
    }

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

    setupContactForm() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addToTerminal(
                    this.currentLang === 'it' 
                        ? '✅ Messaggio inviato con successo!' 
                        : '✅ Message sent successfully!',
                    'success'
                );
                form.reset();
            });
        }
    }

    autoComplete(input) {
        const value = input.value.toLowerCase();
        const commands = Object.keys(this.commands);
        const matches = commands.filter(cmd => cmd.startsWith(value));
        
        if (matches.length === 1) {
            input.value = matches[0];
        } else if (matches.length > 1) {
            this.addToTerminal(matches.join('  '), 'info');
        }
    }

    clearTerminal() {
        const terminalBody = document.getElementById('terminalBody');
        const dynamicContent = document.getElementById('dynamicContent');
        
        // Seleziona solo gli elementi da rimuovere (escludendo welcome e input line)
        const elementsToRemove = Array.from(terminalBody.children).filter(child => {
            return !child.classList.contains('terminal-welcome') && 
                   !child.classList.contains('terminal-input-line');
        });
        
        // Aggiungi animazione di fade out
        elementsToRemove.forEach(el => {
            el.style.transition = 'opacity 0.3s ease';
            el.style.opacity = '0';
        });
        
        // Rimuovi dopo l'animazione
        setTimeout(() => {
            elementsToRemove.forEach(el => {
                if (el.parentNode) el.parentNode.removeChild(el);
            });
            
            if (dynamicContent) {
                dynamicContent.innerHTML = '';
            }
            
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }, 300);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        this.addToTerminal(`Theme switched to ${newTheme} mode`, 'info');
    }

    switchLanguage(lang) {
        if (lang === 'it' || lang === 'en') {
            const langBtn = document.querySelector(`[data-lang="${lang}"]`);
            if (langBtn) {
                langBtn.click();
                this.addToTerminal(`Language switched to ${lang === 'it' ? 'Italian' : 'English'}`, 'info');
            }
        } else {
            this.addToTerminal('Usage: lang [it|en]', 'error');
        }
    }

    // Theme and language management
    setupLanguageSwitch() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.switchLanguageUI(lang);
                
                // Update active button
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }


    
    switchLanguageUI(lang) {
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
        
        localStorage.setItem('language', lang);
    }

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

    setupTerminalActions() {
        const clearBtn = document.getElementById('clearTerminal');
        const fullscreenBtn = document.getElementById('fullscreenTerminal');
        
        clearBtn.addEventListener('click', () => {
            this.clearTerminal();
        });
        
        fullscreenBtn.addEventListener('click', () => {
            this.toggleFullscreen();
        });
    }

    toggleFullscreen() {
        const terminal = document.querySelector('.main-terminal');
        const icon = document.querySelector('#fullscreenTerminal i');
        
        if (!this.isFullscreen) {
            terminal.classList.add('fullscreen');
            icon.className = 'fas fa-compress';
            this.isFullscreen = true;
        } else {
            terminal.classList.remove('fullscreen');
            icon.className = 'fas fa-expand';
            this.isFullscreen = false;
        }
    }

    loadSavedPreferences() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        const savedLang = localStorage.getItem('language') || 'it';
        
        this.setTheme(savedTheme);
        this.switchLanguageUI(savedLang);
        
        // Update active language button
        const langBtn = document.querySelector(`[data-lang="${savedLang}"]`);
        if (langBtn) {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            langBtn.classList.add('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    
    if (mobileToggle) {
      mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
      });
      
      // Chiudi il menu quando si clicca fuori
      document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target)) {
          mobileToggle.classList.remove('active');
        }
      });
    }
    
    // Versione compatta per schermi medi (opzionale)
    function checkCompactNav() {
      if (window.innerWidth <= 992 && window.innerWidth > 768) {
        navContainer.classList.add('compact');
      } else {
        navContainer.classList.remove('compact');
      }
    }
    
    window.addEventListener('resize', checkCompactNav);
    checkCompactNav();
  });

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const terminal = new TerminalPortafolio();
    
    // Focus input on page load
    const input = document.getElementById('terminalInput');
    input.focus();
    
    // Keep focus on input when clicking anywhere in terminal
    document.querySelector('.terminal-body').addEventListener('click', () => {
        input.focus();
    });
    
    console.log('🚀 Terminal Portafolio loaded successfully!');
    console.log('💡 Type "help" to see available commands');
});
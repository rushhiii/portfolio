// Modern Portfolio Website JavaScript - 2025
class PortfolioApp {
    constructor() {
        this.projects = [];
        this.categories = [];
        this.currentFilter = 'all';
        this.isMenuOpen = false;
        this.isDarkTheme = true;
        this.loadingProgress = 0;

        this.initLoading();
    }

    initLoading() {
        // Add loading class to body
        document.body.classList.add('loading');

        // Wait for all resources to load
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 2000); // Reduced from 3000ms to 1500ms (1.5 seconds)
        });
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const body = document.body;

        if (loadingScreen) {
            // Initialize the app early so all elements are ready
            setTimeout(() => {
                this.init();
            }, 500);

            // Start hero section animations right after welcome animation completes (~1.4s)
            // Welcome animation: last word starts at 0.75s + 0.6s duration = completes at 1.35s
            setTimeout(() => {
                body.classList.remove('loading'); // Make hero section visible
                this.delayLandingAnimations(); // Start hero animations
            }, 1400); // Start at 1.4s, right after welcome completes

            // Add fade-out class to loading screen slightly after hero starts
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');

                // Remove loading screen from DOM after transition
                setTimeout(() => {
                    loadingScreen.remove();
                }, 600);
            }, 1600); // Start fading at 1.6s
        } else {
            // Fallback if loading screen element not found
            body.classList.remove('loading');
            this.init();
        }
    }

    delayLandingAnimations() {
        // Start hero animations immediately with faster sequence
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-actions, .hero-image');

        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Faster transitions

            // Trigger animation with shorter delays
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100); // Reduced from 200ms to 100ms between elements
        });

        // Start floating cards animation earlier
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            card.style.animationDelay = `${0.3 + (index * 0.2)}s`; // Start much earlier
        });

        // Show scroll indicator earlier
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateY(20px) translateX(-50%)'; // X-50% centered
            scrollIndicator.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

            setTimeout(() => {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.transform = 'translateY(0) translateX(-50%)';

            }, 800); // Reduced from 2000ms to 800ms
        }
    }

    async init() {
        this.setupEventListeners();
        this.initTheme();
        this.initTypingEffect();
        this.initScrollAnimations();
        this.initParallax();
        this.initActiveNavigation();
        // this.init3DCardEffects();
        this.init3DEffects();
        this.initAdvancedFeatures();
        this.setCurrentYear();
        await this.loadProjects();
        this.renderFilterButtons();
        this.renderProjects();

        // Initialize EmailJS
        this.initializeEmailJS();
    }

    setupEventListeners() {
        // Navigation
        document.addEventListener('click', (e) => {
            if (e.target.matches('[href^="#"]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);

                // Close mobile menu if it's open when a nav link is clicked
                if (this.isMenuOpen) {
                    this.toggleMobileMenu();
                }

                // Special handling for home link - scroll to top
                if (targetId === 'home') {
                    this.scrollToTop();
                } else {
                    this.scrollToSection(targetId);
                }
            }
        });

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Project filters
        document.addEventListener('click', (e) => {
            if (e.target.matches('.filter-btn')) {
                this.setActiveFilter(e.target);
                this.filterProjects(e.target.dataset.filter);
            }
        });

        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
        }

        // Scroll events
        window.addEventListener('scroll', () => {
            this.updateNavbar();
            this.updateParallax();
            this.updateActiveNavigation();
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    scrollToSection(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight - 20;

            // Update active nav link immediately
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));

            const activeLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    scrollToTop() {
        // Update active nav link to home immediately
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));

        const homeLink = document.querySelector('.nav-link[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }

        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.isDarkTheme = savedTheme === 'dark';
        } else {
            // Check system preference
            this.isDarkTheme = !window.matchMedia('(prefers-color-scheme: light)').matches;
        }

        this.applyTheme();
    }

    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        this.applyTheme();
    }

    applyTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const profileImage = document.querySelector('.profile-image');
        
        if (this.isDarkTheme) {
            document.documentElement.removeAttribute('data-theme');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
            // Set dark theme profile picture with smooth transition
            if (profileImage) {
                this.switchProfileImage(profileImage, './assets/ele/profile_pic.png', 'Tirth Patel - Developer Illustration (Dark Theme)', 'brightness(0.7) contrast(1.1) hue-rotate(0) saturate(1)');
                // this.switchProfileImage(profileImage, './assets/ele/profile1.jpg', 'Tirth Patel - Developer Illustration (Dark Theme)', 'brightness(0.7) contrast(1.1) hue-rotate(0) saturate(1)');
                // this.switchProfileImage(profileImage, './assets/ele/profile_pic.jpg', 'Tirth Patel - Developer Illustration (Dark Theme)', 'none');

            }
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
            // Set light theme profile picture with smooth transition
            if (profileImage) {
                // this.switchProfileImage(profileImage, './assets/ele/profile_graba1.jpg', 'Tirth Patel - Developer Illustration (Light Theme)', 'none');
                this.switchProfileImage(profileImage, './assets/ele/profile2.jpg', 'Tirth Patel - Developer Illustration (Light Theme)', 'none');
            }
        }
        
        // Store theme preference
        localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    }

    switchProfileImage(imageElement, newSrc, newAlt, filterStyle = 'none') {
        // Create a smooth cross-fade effect
        imageElement.style.opacity = '0.3';
        
        // Pre-load the new image to ensure smooth transition
        const newImage = new Image();
        newImage.onload = () => {
            // Change the source, alt text, and filter
            imageElement.src = newSrc;
            imageElement.alt = newAlt;
            imageElement.style.filter = filterStyle;
            
            // Fade back in
            setTimeout(() => {
                imageElement.style.opacity = '1';
            }, 150);
        };
        
        newImage.onerror = () => {
            // Fallback: if image fails to load, just fade back to original
            console.warn(`Failed to load profile image: ${newSrc}`);
            setTimeout(() => {
                imageElement.style.opacity = '1';
            }, 150);
        };
        
        // Start loading the new image
        newImage.src = newSrc;
    }

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');

        if (navMenu && mobileMenuToggle) {
            if (this.isMenuOpen) {
                navMenu.style.display = 'flex';
                mobileMenuToggle.classList.add('active');
            } else {
                navMenu.style.display = 'none';
                mobileMenuToggle.classList.remove('active');
            }
        }
    }

    initTypingEffect() {
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;

        const roles = [
            'Full Stack Developer',
            // 'Computer Science Student',
            'AI Enthusiast',
            'Problem Solver',
            'Creative Thinker',
            'Tech Explorer'
        ];

        let currentRole = 0;
        let currentChar = 0;
        let isDeleting = false;
        let isPaused = false;

        const typeRole = () => {
            const current = roles[currentRole];

            if (isPaused) {
                isPaused = false;
                setTimeout(typeRole, 1000);
                return;
            }

            if (isDeleting) {
                typingText.textContent = current.substring(0, currentChar - 1);
                currentChar--;
            } else {
                typingText.textContent = current.substring(0, currentChar + 1);
                currentChar++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && currentChar === current.length) {
                isPaused = true;
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentRole = (currentRole + 1) % roles.length;
                typeSpeed = 300;
            }

            setTimeout(typeRole, typeSpeed);
        };

        // Start typing effect after a delay
        setTimeout(typeRole, 1000);
    }

    initScrollAnimations() {
        // Enhanced Intersection Observer for scroll animations (one-time only)
        const scrollObserverOptions = {
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
            rootMargin: '0px 0px -100px 0px'
        };

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const element = entry.target;
                const intersectionRatio = entry.intersectionRatio;

                if (entry.isIntersecting && intersectionRatio > 0.1) {
                    // Add revealed class with staggered timing (one-time only)
                    setTimeout(() => {
                        element.classList.add('revealed', 'in-view', 'animation-completed');

                        // Trigger cascading animations for child elements
                        this.animateChildElements(element);

                        // Add floating animation to specific elements
                        if (element.classList.contains('float-on-scroll')) {
                            element.classList.add('in-view');
                        }

                        // Trigger glow border animation
                        if (element.classList.contains('glow-border')) {
                            element.classList.add('in-view');
                        }

                        // Stop observing this element after animation is triggered
                        scrollObserver.unobserve(element);

                    }, this.getAnimationDelay(element));
                }
                // Removed reset logic - animations only trigger once
            });
        }, scrollObserverOptions);

        // Observe all scroll animation elements (excluding already animated ones)
        const scrollElements = document.querySelectorAll(`
            .scroll-reveal:not(.animation-completed),
            .scroll-reveal-left:not(.animation-completed),
            .scroll-reveal-right:not(.animation-completed),
            .scroll-reveal-scale:not(.animation-completed),
            .scroll-reveal-rotate:not(.animation-completed),
            .float-on-scroll:not(.animation-completed),
            .glow-border:not(.animation-completed),
            .enhanced-hover:not(.animation-completed)
        `);

        scrollElements.forEach(element => {
            scrollObserver.observe(element);
        });

        // Parallax effect observer
        this.initParallaxScrollEffects();

        // Progressive project card animations
        this.initProjectCardAnimations();
    }

    animateChildElements(parent) {
        // Animate tech badges, stats, and other child elements with stagger (one-time only)
        const children = parent.querySelectorAll('.tech-badge, .stat, .contact-card, .bento-card');
        children.forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('revealed', 'in-view', 'animation-completed');
            }, index * 100);
        });
    }

    getAnimationDelay(element) {
        // Extract delay from stagger classes
        const staggerClasses = ['scroll-stagger-1', 'scroll-stagger-2', 'scroll-stagger-3',
            'scroll-stagger-4', 'scroll-stagger-5', 'scroll-stagger-6'];

        for (let i = 0; i < staggerClasses.length; i++) {
            if (element.classList.contains(staggerClasses[i])) {
                return (i + 1) * 150; // 150ms between each staggered element
            }
        }
        return 0;
    }

    initParallaxScrollEffects() {
        // Enhanced parallax effects
        const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium, .parallax-fast');

        const parallaxObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    window.addEventListener('scroll', () => this.updateParallaxElement(entry.target));
                }
            });
        }, { rootMargin: '0px 0px -100px 0px' });

        parallaxElements.forEach(element => {
            parallaxObserver.observe(element);
        });
    }

    updateParallaxElement(element) {
        const rect = element.getBoundingClientRect();
        const speed = this.getParallaxSpeed(element);
        const yPos = rect.top * speed;

        // Apply transform with GPU acceleration
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    }

    getParallaxSpeed(element) {
        if (element.classList.contains('parallax-slow')) return -0.2;
        if (element.classList.contains('parallax-medium')) return -0.4;
        if (element.classList.contains('parallax-fast')) return -0.6;
        return 0;
    }

    initProjectCardAnimations() {
        // Enhanced project card animations that trigger when cards are rendered (one-time only)
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed', 'enhanced-hover', 'animation-completed');

                        // Add advanced hover effects
                        this.addAdvancedCardEffects(entry.target);

                        // Stop observing this card after animation is triggered
                        projectObserver.unobserve(entry.target);
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Re-observe project cards when they're dynamically added (excluding already animated ones)
        this.observeProjectCards = () => {
            setTimeout(() => {
                const projectCards = document.querySelectorAll('.project-card:not(.animation-completed)');
                projectCards.forEach(card => {
                    if (!card.hasAttribute('data-observed')) {
                        projectObserver.observe(card);
                        card.setAttribute('data-observed', 'true');
                    }
                });
            }, 100);
        };
    }

    addAdvancedCardEffects(card) {
        // Removed conflicting 3D effects - now handled by init3DEffects()
        // Only keep shimmer effect
        // card.addEventListener('mouseenter', () => {
        //     this.addShimmerEffect(card);
        // });
    }

    addShimmerEffect(element) {
        const shimmer = document.createElement('div');
        shimmer.className = 'shimmer-effect';
        shimmer.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.6s ease;
            pointer-events: none;
            z-index: 1;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(shimmer);

        // Animate shimmer
        setTimeout(() => {
            shimmer.style.left = '100%';
        }, 50);

        // Remove shimmer after animation
        setTimeout(() => {
            if (shimmer.parentNode) {
                shimmer.remove();
            }
        }, 700);
    }

    initAdvancedFeatures() {
        // Add magnetic hover effects to buttons
        // this.initMagneticHover();

        // Initialize scroll-triggered counter animations
        this.initCounterAnimations();

        // Add morphing backgrounds
        this.initMorphingBackgrounds();
    }

    initMagneticHover() {
        const magneticElements = document.querySelectorAll('.btn, .tech-badge, .contact-card');

        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                if (window.innerWidth > 960) {
                    const rect = element.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    const moveX = x * 0.15;
                    const moveY = y * 0.15;

                    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    initCounterAnimations() {
        const statNumbers = document.querySelectorAll('.stat-number');

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;

                    // Animate only numeric values
                    if (!isNaN(parseInt(finalValue))) {
                        this.animateCounter(target, parseInt(finalValue));
                    }

                    target.parentElement.classList.add('counter-animate');
                }
            });
        }, { threshold: 0.7 });

        statNumbers.forEach(stat => {
            counterObserver.observe(stat);
        });
    }

    animateCounter(element, finalValue) {
        let currentValue = 0;
        const increment = finalValue / 30; // 30 frames for smooth animation
        const duration = 1000; // 1 second
        const frameRate = duration / 30;

        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                element.textContent = finalValue + (element.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(currentValue) + (element.textContent.includes('+') ? '+' : '');
            }
        }, frameRate);
    }

    initMorphingBackgrounds() {
        const morphElements = document.querySelectorAll('.bento-card, .contact-card');

        morphElements.forEach(element => {
            element.classList.add('morph-bg');
        });
    }

    initParallax() {
        this.floatingElements = document.querySelectorAll('.floating-card');
    }

    updateParallax() {
        if (!this.floatingElements) return;

        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        this.floatingElements.forEach((element) => {
            const speed = element.dataset.speed || 1;
            const yPos = -(scrolled * speed * 0.1);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    updateNavbar() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        if (window.scrollY > 500) {
            // navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            // navbar.style.backdropFilter = 'blur(20px)';
            navbar.classList.add('scrolled');


        } else {
            // navbar.style.background = 'rgba(255, 255, 255, 0.05)';
            // navbar.style.backdropFilter = 'blur(20px)';
            navbar.classList.remove('scrolled');

        }
    }

    initActiveNavigation() {
        // Set initial active state
        this.updateActiveNavigation();
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        if (sections.length === 0 || navLinks.length === 0) return;

        const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
        const scrollPosition = window.scrollY + navHeight + 50;

        let activeSection = null;

        // Check each section to find which one is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSection = section;
            }
        });

        // If we're at the very top, default to home
        if (window.scrollY < 100) {
            const homeSection = document.getElementById('home');
            if (homeSection) {
                activeSection = homeSection;
            }
        }

        // Update active nav link
        if (activeSection) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${activeSection.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    setInitialActiveNav() {
        // This method is now handled by updateActiveNavigation
        this.updateActiveNavigation();
    }

    init3DCardEffects() {
        // Check if device supports hover (desktop) to avoid issues on mobile
        if (!window.matchMedia('(hover: hover)').matches) {
            return; // Skip 3D effects on touch devices
        }

        // Add 3D hover effects to project cards
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            // Mouse move handler for 3D tilt effect
            const handleMouseMove = (e) => {
                const cardRect = card.getBoundingClientRect();
                const cardWidth = cardRect.width;
                const cardHeight = cardRect.height;

                // Calculate cursor position relative to card center
                const centerX = cardRect.left + cardWidth / 2;
                const centerY = cardRect.top + cardHeight / 2;

                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;

                // Calculate rotation values (max 15 degrees)
                const rotateX = (mouseY / cardHeight) * -15;
                const rotateY = (mouseX / cardWidth) * 15;

                // Calculate scale (slight zoom on hover)
                const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
                const maxDistance = Math.sqrt(cardWidth * cardWidth + cardHeight * cardHeight) / 2;
                const scale = 1 + (1 - distance / maxDistance) * 0.03;

                // Calculate mouse position as percentage for lighting effect
                const mouseXPercent = ((e.clientX - cardRect.left) / cardWidth) * 100;
                const mouseYPercent = ((e.clientY - cardRect.top) / cardHeight) * 100;

                // Apply transforms with CSS custom properties
                card.style.setProperty('--rotateX', `${rotateX}deg`);
                card.style.setProperty('--rotateY', `${rotateY}deg`);
                card.style.setProperty('--scale', scale);
                card.style.setProperty('--mouse-x', `${mouseXPercent}%`);
                card.style.setProperty('--mouse-y', `${mouseYPercent}%`);

                // Add faster transition for mouse movement
                card.style.transition = 'all 0.1s ease-out';
            };

            // Mouse enter handler
            const handleMouseEnter = (e) => {
                card.style.transition = 'all 0.1s ease-out';
            };

            // Mouse leave handler
            const handleMouseLeave = (e) => {
                // Reset transforms with smooth transition
                card.style.setProperty('--rotateX', '0deg');
                card.style.setProperty('--rotateY', '0deg');
                card.style.setProperty('--scale', '1');
                card.style.setProperty('--mouse-x', '50%');
                card.style.setProperty('--mouse-y', '50%');
                card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            };

            // Add event listeners
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseenter', handleMouseEnter);
            card.addEventListener('mouseleave', handleMouseLeave);
        });

        // Re-initialize when new projects are loaded
        this.reinit3DEffects = () => {
            // Remove existing listeners to prevent duplicates
            document.querySelectorAll('.project-card').forEach(card => {
                const newCard = card.cloneNode(true);
                card.parentNode.replaceChild(newCard, card);
            });

            // Re-run initialization
            // setTimeout(() => this.init3DCardEffects(), 100);
            setTimeout(() => this.init3DEffects(), 100);

        };
    }

    async loadProjects() {
        try {
            const response = await fetch('./assets/config/projects.json');
            const data = await response.json();
            this.projects = data.projects;
            this.categories = data.categories || [
                { id: "all", name: "All", icon: "fas fa-th-large", visible: true },
                { id: "web", name: "Web Dev", icon: "fas fa-globe", visible: true },
                { id: "automation", name: "Automation", icon: "fas fa-robot", visible: true }
            ];
        } catch (error) {
            console.error('Error loading projects:', error);
            // Fallback projects and categories
            this.projects = [
                {
                    id: 1,
                    title: "Modern Portfolio Website",
                    description: "A responsive personal website showcasing projects with modern design patterns and animations.",
                    technologies: ["HTML5", "CSS3", "JavaScript", "Modern Design"],
                    category: "web",
                    githubUrl: "https://github.com/rushhiii/portfolio",
                    liveUrl: "#",
                    featured: true
                },
                {
                    id: 2,
                    title: "Task Management System",
                    description: "Full-stack web application for task management with real-time updates and user authentication.",
                    technologies: ["React", "Node.js", "MongoDB", "Express"],
                    category: "web",
                    githubUrl: "https://github.com/rushhiii/task-manager",
                    liveUrl: "#",
                    featured: true
                },
                {
                    id: 3,
                    title: "AI Chatbot Assistant",
                    description: "Intelligent chatbot using natural language processing for automated customer support.",
                    technologies: ["Python", "Machine Learning", "NLP", "TensorFlow"],
                    category: "ai",
                    githubUrl: "https://github.com/rushhiii/ai-chatbot",
                    liveUrl: "#",
                    featured: true
                }
            ];
            this.categories = [
                { id: "all", name: "All", icon: "fas fa-th-large", visible: true },
                { id: "web", name: "Web Dev", icon: "fas fa-globe", visible: true },
                { id: "automation", name: "Automation", icon: "fas fa-robot", visible: true }
            ];
        }
    }

    renderFilterButtons() {
        const filterContainer = document.querySelector('.project-filters');
        if (!filterContainer) return;

        filterContainer.innerHTML = '';

        this.categories
            .filter(category => category.visible !== false) // Only show visible categories
            .forEach(category => {
                const button = document.createElement('button');
                button.className = `filter-btn ${category.id === 'all' ? 'active' : ''}`;
                button.setAttribute('data-filter', category.id);

                if (category.icon) {
                    button.innerHTML = `<i class="${category.icon}"></i> ${category.name}`;
                } else {
                    button.textContent = category.name;
                }

                button.addEventListener('click', (e) => {
                    // Remove active class from all buttons
                    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    e.target.classList.add('active');
                    // Filter projects
                    this.filterProjects(category.id);
                });

                filterContainer.appendChild(button);
            });
    }

    renderProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = '';

        // Filter projects by category and displayCard option
        let filteredProjects = this.projects.filter(project => {
            // First check if card should be displayed
            if (project.displayCard === false) {
                return false;
            }

            // Then check category filter
            return this.currentFilter === 'all' || project.category === this.currentFilter;
        });

        filteredProjects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project, index);
            projectsGrid.appendChild(projectCard);
        });

        // Re-initialize enhanced scroll effects and 3D card effects
        setTimeout(() => {
            // this.init3DCardEffects();
            this.init3DEffects();
            if (this.observeProjectCards) {
                this.observeProjectCards();
            }
        }, 500); // Increased delay to ensure cards are fully rendered
    }

    createProjectCard(project, index = 0) {
        const card = document.createElement('div');
        card.className = 'project-card scroll-reveal enhanced-hover';

        // Add staggered animation class
        const staggerClass = `scroll-stagger-${Math.min(index % 6 + 1, 6)}`;
        card.classList.add(staggerClass);

        const techStack = project.technologies.map(tech =>
            `<span class="tag">${tech}</span>`
        ).join('');

        // Default image if none provided
        const projectImage = project.image || 'assets/default-project.png';

        // Generate buttons based on project configuration
        const buttons = this.generateProjectButtons(project);

        card.innerHTML = `
            <img src="${projectImage}" alt="${project.title}" class="project-image parallax-slow" loading="lazy" 
                 onerror="this.src='https://via.placeholder.com/400x200/1a1a2e/6366f1?text=${encodeURIComponent(project.title)}'">
            <div class="project-content">
                <div class="project-header">
                    <h3>${project.title}</h3>
                    ${project.featured ? '<span class="featured-badge">Featured</span>' : ''}
                </div>
                <p class="project-description">${project.description}</p>
                <div class="tech-stack">
                    ${techStack}
                </div>
                <div class="project-links">
                    ${buttons}
                </div>
            </div>
        `;

        return card;
    }

    generateProjectButtons(project) {
        let buttons = [];

        // Always show GitHub/Code button (first button)
        const codeLabel = project.codeLabel || 'Code';
        const codeIcon = project.codeIcon || 'fab fa-github';
        buttons.push(`
            <a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn btn-outline">
                <i class="${codeIcon}"></i>
                <span>${codeLabel}</span>
            </a>
        `);

        // Second button logic
        if (project.liveUrl && project.liveUrl !== '#' && project.liveUrl !== null) {
            // Has live demo
            const liveLabel = project.liveLabel || 'Live Demo';
            const liveIcon = project.liveIcon || 'fas fa-external-link-alt';
            buttons.push(`
                <a href="${project.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary">
                    <i class="${liveIcon}"></i>
                    <span>${liveLabel}</span>
                </a>
            `);
        } else if (project.secondButton !== false) {
            // Show fallback second button only if not explicitly disabled
            const fallbackLabel = project.fallbackLabel || 'View Project';
            const fallbackIcon = project.fallbackIcon || 'fas fa-eye';
            buttons.push(`
                <a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn btn-primary">
                    <i class="${fallbackIcon}"></i>
                    <span>${fallbackLabel}</span>
                </a>
            `);
        }

        return buttons.join('');
    }

    setActiveFilter(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    filterProjects(filter) {
        this.currentFilter = filter;

        // Count how many projects will be displayed with this filter
        let filteredProjects = this.projects.filter(project => {
            // First check if card should be displayed
            if (project.displayCard === false) {
                return false;
            }
            // Then check category filter
            return filter === 'all' || project.category === filter;
        });

        // Get the projects grid element
        const projectsGrid = document.getElementById('projectsGrid');

        // Add or remove the 'few-cards' class based on project count and filter
        if (projectsGrid) {
            if (filter !== 'all' && filteredProjects.length < 3) {
                projectsGrid.classList.add('few-cards');
            } else {
                projectsGrid.classList.remove('few-cards');
            }
        }

        this.renderProjects();
    }

    handleContactForm(e) {
        e.preventDefault();

        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Prepare form data for Netlify
        const formData = new FormData(e.target);
        const data = new URLSearchParams();

        // Add form-name for Netlify
        data.append('form-name', 'portfolio-contact');

        // Add all form fields
        for (const [key, value] of formData.entries()) {
            data.append(key, value);
        }

        // Submit to Netlify
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data.toString()
        })
            .then(response => {
                if (response.ok) {
                    this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    e.target.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch((error) => {
                console.error('Form submission failed:', error);
                this.showNotification('❌ Failed to send message. Please try emailing me directly at rushiofficial1205@gmail.com', 'error');
            })
            .finally(() => {
                // Restore button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    }

    // Remove EmailJS initialization since we're using Netlify forms
    initializeEmailJS() {
        // No longer needed with Netlify forms
        console.log('Using Netlify forms for contact form submission');
    }

    showNotification(message, type = 'info') {
        // Remove old notifications first to prevent stacking issues
        const existingNotifications = document.querySelectorAll('.notification');
        if (existingNotifications.length >= 3) {
            // Remove oldest notifications if we have too many
            existingNotifications[0].remove();
        }

        // Recalculate after cleanup
        const currentNotifications = document.querySelectorAll('.notification');
        const notificationHeight = 85; // Height + margin
        const topOffset = 20 + (currentNotifications.length * notificationHeight);

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        // Always start at a reasonable top position (max 3 notifications visible)
        const maxTop = 20 + (2 * notificationHeight); // Max 3 notifications
        const finalTop = Math.min(topOffset, maxTop);
        notification.style.top = `${finalTop}px`;

        // Set initial transform for animation (start above screen)
        if (window.innerWidth <= 960) {
            // Mobile: full width, start above screen
            notification.style.transform = 'translateY(-120px)';
        } else {
            // Desktop: centered, start above screen  
            notification.style.transform = 'translateX(-50%) translateY(-120px)';
        }

        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-circle';

        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // Animate in with enhanced easing
        setTimeout(() => {
            if (window.innerWidth <= 960) {
                // Mobile: slide down from above
                notification.style.transform = 'translateY(0)';
            } else {
                // Desktop: slide down from above
                notification.style.transform = 'translateX(-50%) translateY(0)';
            }
            notification.style.opacity = '1';
        }, 150);

        // Remove after longer delay (8 seconds instead of 4)
        const dismissTimer = setTimeout(() => {
            this.dismissNotification(notification);
        }, 8000);

        // Add click to dismiss functionality
        notification.addEventListener('click', () => {
            clearTimeout(dismissTimer);
            this.dismissNotification(notification);
        });

        // Add hover effect to pause auto-dismiss
        notification.addEventListener('mouseenter', () => {
            clearTimeout(dismissTimer);
        });

        notification.addEventListener('mouseleave', () => {
            setTimeout(() => {
                this.dismissNotification(notification);
            }, 8000);
        });
    }

    dismissNotification(notification) {
        if (!notification || !notification.parentNode) return;

        // Animate out based on screen size
        if (window.innerWidth <= 960) {
            // Mobile: slide up
            notification.style.transform = 'translateY(-120px)';
        } else {
            // Desktop: slide up
            notification.style.transform = 'translateX(-50%) translateY(-120px)';
        }
        notification.style.opacity = '0';

        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
                // Reposition remaining notifications
                this.repositionNotifications();
                // Clean up any orphaned notifications
                this.cleanupNotifications();
            }
        }, 400);
    }

    cleanupNotifications() {
        // Remove any notifications that might be stuck or invisible
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            if (notification.style.opacity === '0' ||
                getComputedStyle(notification).opacity === '0') {
                notification.remove();
            }
        });
    }

    repositionNotifications() {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach((notification, index) => {
            const notificationHeight = 85;
            const newTop = 20 + (index * notificationHeight);

            // Ensure notifications stay in the top area (max 3 visible)
            const maxTop = 20 + (2 * notificationHeight);
            const finalTop = Math.min(newTop, maxTop);

            notification.style.top = `${finalTop}px`;

            // Ensure proper transform for current screen size
            if (window.innerWidth <= 960) {
                // Mobile: full width
                if (notification.style.opacity === '1') {
                    notification.style.transform = 'translateY(0)';
                }
            } else {
                // Desktop: centered
                if (notification.style.opacity === '1') {
                    notification.style.transform = 'translateX(-50%) translateY(0)';
                }
            }
        });
    }

    setCurrentYear() {
        const currentYearElement = document.getElementById('currentYear');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }
    }

    handleResize() {
        // Handle responsive behavior
        if (window.innerWidth > 960 && this.isMenuOpen) {
            this.toggleMobileMenu();
        }

        // Reposition notifications on screen size change
        this.repositionNotifications();
    }

    init3DEffects() {
        // Check if device supports hover (desktop) to avoid issues on mobile
        if (!window.matchMedia('(hover: hover)').matches) {
            console.log('Skipping 3D effects - touch device detected');
            return; // Skip 3D effects on touch devices
        }

        const cards = document.querySelectorAll('.project-card');
        console.log(`Initializing 3D effects for ${cards.length} project cards`);

        cards.forEach((card, index) => {
            // Remove any existing event listeners to prevent conflicts
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            
            // Add event listeners to the new card
            newCard.addEventListener('mouseenter', () => {
                newCard.style.transition = 'transform all 400ms ease-in-out';
                console.log(`Mouse enter on card ${index}`);
            });

            newCard.addEventListener('mouseleave', () => {
                newCard.style.transition = 'transform all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                newCard.style.setProperty('transform', 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)');
                console.log(`Mouse leave on card ${index}`);
            });

            newCard.addEventListener('mousemove', (e) => {
                const cardRect = newCard.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;

                const deltaX = e.clientX - cardCenterX;
                const deltaY = e.clientY - cardCenterY;

                const rotateX = (deltaY / cardRect.height) * 15;
                const rotateY = (deltaX / cardRect.width) * -15;

                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                const maxDistance = Math.sqrt(cardRect.width * cardRect.width + cardRect.height * cardRect.height) / 2;
                const proximity = 1 - Math.min(distance / maxDistance, 1);

                const scale = (1 + (proximity * 0.03));
                // const scale = ( (proximity * 0.));
                const translateZ = proximity * 10;

                // Apply transform with !important equivalent (direct style setting takes precedence)
                const transformValue = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`;
                newCard.style.setProperty('transform', transformValue, 'important');

                // Log for debugging (remove after testing)
                if (Math.random() < 0.01) { // Log only 1% of the time to avoid spam
                    console.log(`Card ${index}: rotateX=${rotateX.toFixed(1)}, rotateY=${rotateY.toFixed(1)}, scale=${scale.toFixed(2)}`);
                    console.log(`Transform applied: ${transformValue}`);
                }
            });
        });
    }

}

// Enhanced notification styles
const notificationStyles = `
    .notification {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(
            135deg,
            var(--bg-primary) 0%,
            var(--bg-secondary) 50%,
            var(--bg-primary) 100%
        );
        /* Retro slant stripes background */
        background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 8px,
            rgba(99, 102, 241, 0.1) 8px,
            rgba(99, 102, 241, 0.1) 16px
        );
        backdrop-filter: blur(25px);
        border: 2px solid transparent;
        background-clip: padding-box;
        border-radius: 16px;
        padding: 18px 24px;
        color: var(--text-primary);
        display: flex;
        align-items: center;
        gap: 16px;
        z-index: 10000;
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 8px 16px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        min-width: 350px;
        max-width: 500px;
        font-weight: 500;
        overflow: hidden;
        /* Start above screen and animate down */
        transform: translateX(-50%) translateY(-120px);
    }

    .notification::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
        );
        transition: left 0.6s ease;
    }

    .notification:hover::before {
        left: 100%;
    }
    
    .notification.success {
        border-color: rgba(34, 197, 94, 0.5);
        background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 8px,
            rgba(34, 197, 94, 0.15) 8px,
            rgba(34, 197, 94, 0.15) 16px
        );
        box-shadow: 
            0 20px 40px rgba(34, 197, 94, 0.2),
            0 8px 16px rgba(34, 197, 94, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    .notification.error {
        border-color: rgba(239, 68, 68, 0.5);
        background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 8px,
            rgba(239, 68, 68, 0.15) 8px,
            rgba(239, 68, 68, 0.15) 16px
        );
        box-shadow: 
            0 20px 40px rgba(239, 68, 68, 0.2),
            0 8px 16px rgba(239, 68, 68, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    .notification.info {
        border-color: rgba(99, 102, 241, 0.5);
        background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 8px,
            rgba(99, 102, 241, 0.15) 8px,
            rgba(99, 102, 241, 0.15) 16px
        );
        box-shadow: 
            0 20px 40px rgba(99, 102, 241, 0.2),
            0 8px 16px rgba(99, 102, 241, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }
    
    .notification i {
        font-size: 24px;
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        animation: notificationIconPulse 0.6s ease-out;
    }

    .notification.success i {
        color: #22c55e;
        background: rgba(34, 197, 94, 0.2);
        animation: successBounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .notification.error i {
        color: #ef4444;
        background: rgba(239, 68, 68, 0.2);
        animation: errorShake 0.5s ease-in-out;
    }

    .notification.info i {
        color: #6366f1;
        background: rgba(99, 102, 241, 0.2);
        animation: infoPulse 0.6s ease-out;
    }

    .notification span {
        flex: 1;
        font-size: 16px;
        line-height: 1.4;
        font-weight: 500;
    }

    @keyframes notificationIconPulse {
        0% { transform: scale(0.8); opacity: 0.5; }
        50% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
    }

    @keyframes successBounce {
        0% { transform: scale(0.3) rotate(-10deg); }
        50% { transform: scale(1.2) rotate(5deg); }
        100% { transform: scale(1) rotate(0deg); }
    }

    @keyframes errorShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-4px) rotate(-2deg); }
        75% { transform: translateX(4px) rotate(2deg); }
    }

    @keyframes infoPulse {
        0% { transform: scale(0.8); opacity: 0.6; }
        50% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
    }

    /* Mobile responsive */
    @media (max-width: 960px) {
        .notification {
            left: 16px;
            right: 16px;
            transform: translateY(-120px);
            min-width: auto;
            max-width: none;
            padding: 16px 20px;
        }

        .notification span {
            font-size: 14px;
        }

        .notification i {
            width: 28px;
            height: 28px;
            font-size: 20px;
        }
    }
`;

// Add notification styles to head
const style = document.createElement('style');
style.textContent = notificationStyles;
document.head.appendChild(style);

// Initialize the portfolio app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Add some enhanced features
class EnhancedFeatures {
    constructor() {
        this.initCursorEffects();
        this.initKeyboardNavigation();
        this.initAccessibility();
    }

    initCursorEffects() {
        // Custom cursor for interactive elements
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.opacity = '1';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        // Scale cursor on interactive elements
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('a, button, .btn, .filter-btn, .project-card')) {
                cursor.style.transform = 'scale(1.5)';
            } else {
                cursor.style.transform = 'scale(1)';
            }
        });
    }

    initKeyboardNavigation() {
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }

            if (e.key === 'Escape') {
                // Close any open modals or menus
                const mobileMenu = document.querySelector('.nav-menu');
                if (mobileMenu && window.getComputedStyle(mobileMenu).display !== 'none') {
                    // Close mobile menu
                    const app = window.portfolioApp;
                    if (app && app.isMenuOpen) {
                        app.toggleMobileMenu();
                    }
                }
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    initAccessibility() {
        // Add skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = '';
        skipLink.style.cssText = `
           
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content ID
        const heroSection = document.getElementById('home');
        if (heroSection) {
            heroSection.id = 'main-content';
        }

        // Improved focus indicators
        const focusStyles = `
            .keyboard-navigation *:focus {
                outline: 2px solid var(--primary);
                outline-offset: 2px;
            }
        `;

        const style = document.createElement('style');
        style.textContent = focusStyles;
        document.head.appendChild(style);
    }

}




// Initialize enhanced features
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedFeatures();
});




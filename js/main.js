// ============================================
// LUMEN LAB - JAVASCRIPT PRINCIPAL
// Gestion du robot 3D, animations et interactions
// ============================================

// ===== Navigation Mobile =====
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // Toggle menu mobile
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fermer le menu lors du clic sur un lien
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Fermer le menu lors du clic en dehors
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Effet scroll sur la navbar
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ===== Initialisation du Robot 3D (Page d'accueil) =====
    const robotContainer = document.getElementById('robot-container');
    if (robotContainer) {
        initRobot3D();
    }

    // ===== Animation des barres de compétences (Page Vision) =====
    const skillItems = document.querySelectorAll('.skill-item');
    if (skillItems.length > 0) {
        initSkillsAnimation();
    }

    // ===== Animations au scroll =====
    initScrollAnimations();
});

// ===== Robot 3D avec Three.js =====
function initRobot3D() {
    const container = document.getElementById('robot-container');
    if (!container || typeof THREE === 'undefined') return;

    // Variables globales pour le suivi de la souris
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    // Configuration de la scène
    const scene = new THREE.Scene();
    
    // Caméra
    const camera = new THREE.PerspectiveCamera(
        45, 
        container.offsetWidth / container.offsetHeight, 
        0.1, 
        1000
    );
    camera.position.z = 10;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
    });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6bb6ff, 2, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3d8bd4, 1.5, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Variables pour stocker les parties du robot
    let robotModel = null;
    let head = null;
    let leftEye = null;
    let rightEye = null;
    let body = null;
    let antennaBall = null;
    let leftArm = null;
    let rightArm = null;

    // ===== Chargement du modèle GLTF =====
    const loader = new THREE.GLTFLoader();
    
    loader.load(
        'assets/robot/robot.gltf',
        function(gltf) {
            robotModel = gltf.scene;
            scene.add(robotModel);

            // Récupérer les parties du robot par leur nom
            robotModel.traverse((child) => {
                if (child.name === 'Head') head = child;
                if (child.name === 'LeftEye') leftEye = child;
                if (child.name === 'RightEye') rightEye = child;
                if (child.name === 'Body') body = child;
                if (child.name === 'AntennaBall') antennaBall = child;
                if (child.name === 'LeftArm') leftArm = child;
                if (child.name === 'RightArm') rightArm = child;
            });

            // Démarrer l'animation une fois le modèle chargé
            animate();
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% chargé');
        },
        function(error) {
            console.error('Erreur de chargement du robot:', error);
            console.log('Utilisation du robot de secours...');
            createFallbackRobot();
            animate();
        }
    );

    // Robot de secours en cas d'erreur de chargement
    function createFallbackRobot() {
        const robotGroup = new THREE.Group();
        scene.add(robotGroup);

        // Corps
        const bodyGeometry = new THREE.CylinderGeometry(1, 1.2, 2.5, 32);
        const bodyMaterial = new THREE.MeshPhongMaterial({
            color: 0x2a2a3e,
            shininess: 80,
            specular: 0x6bb6ff
        });
        body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0;
        robotGroup.add(body);

        // Tête
        const headGeometry = new THREE.SphereGeometry(0.8, 32, 32);
        const headMaterial = new THREE.MeshPhongMaterial({
            color: 0x3a3a4e,
            shininess: 100,
            specular: 0x6bb6ff
        });
        head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 2;
        robotGroup.add(head);

        // Yeux
        const eyeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const eyeMaterial = new THREE.MeshPhongMaterial({
            color: 0x6bb6ff,
            emissive: 0x6bb6ff,
            emissiveIntensity: 0.8
        });

        leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.3, 2.1, 0.6);
        robotGroup.add(leftEye);

        rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.3, 2.1, 0.6);
        robotGroup.add(rightEye);

        // Antenne
        const antennaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8);
        const antennaMaterial = new THREE.MeshPhongMaterial({ color: 0x2a2a3e });
        const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
        antenna.position.y = 2.8;
        robotGroup.add(antenna);

        const antennaBallGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const antennaBallMaterial = new THREE.MeshPhongMaterial({
            color: 0x6bb6ff,
            emissive: 0x6bb6ff,
            emissiveIntensity: 1
        });
        antennaBall = new THREE.Mesh(antennaBallGeometry, antennaBallMaterial);
        antennaBall.position.y = 3.2;
        robotGroup.add(antennaBall);

        // Bras
        const armGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 16);
        const armMaterial = new THREE.MeshPhongMaterial({ color: 0x2a2a3e });
        
        leftArm = new THREE.Mesh(armGeometry, armMaterial);
        leftArm.position.set(-1.3, 0.3, 0);
        leftArm.rotation.z = Math.PI / 6;
        robotGroup.add(leftArm);

        rightArm = new THREE.Mesh(armGeometry, armMaterial);
        rightArm.position.set(1.3, 0.3, 0);
        rightArm.rotation.z = -Math.PI / 6;
        robotGroup.add(rightArm);

        // Mains
        const handGeometry = new THREE.SphereGeometry(0.25, 16, 16);
        const handMaterial = new THREE.MeshPhongMaterial({ color: 0x3a3a4e });
        
        const leftHand = new THREE.Mesh(handGeometry, handMaterial);
        leftHand.position.set(-1.6, -0.5, 0);
        robotGroup.add(leftHand);

        const rightHand = new THREE.Mesh(handGeometry, handMaterial);
        rightHand.position.set(1.6, -0.5, 0);
        robotGroup.add(rightHand);

        robotGroup.position.y = -1;
        robotModel = robotGroup;
    }

    // ===== Suivi de la souris =====
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // ===== Animation =====
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        if (!robotModel) return;

        // Rotation douce du robot entier
        if (robotModel) {
            robotModel.rotation.y = Math.sin(time * 0.3) * 0.1;
        }

        // Respiration du corps
        if (body) {
            const breathScale = 1 + Math.sin(time * 0.5) * 0.02;
            body.scale.y = breathScale;
        }

        // Animation de l'antenne
        if (antennaBall) {
            const baseY = antennaBall.userData.baseY || 3.2;
            antennaBall.position.y = baseY + Math.sin(time * 2) * 0.1;
        }
        
        // Pulsation des yeux
        if (leftEye && rightEye) {
            const eyeScale = 1 + Math.sin(time * 2) * 0.1;
            leftEye.scale.set(eyeScale, eyeScale, eyeScale);
            rightEye.scale.set(eyeScale, eyeScale, eyeScale);
        }

        // Suivi de la souris pour la tête et les yeux (smooth)
        targetX += (mouseX * 0.5 - targetX) * 0.05;
        targetY += (mouseY * 0.3 - targetY) * 0.05;

        if (head) {
            head.rotation.y = targetX * 0.5;
            head.rotation.x = targetY * 0.3;
        }

        if (leftEye) {
            const baseLeftX = leftEye.userData.baseX || -0.3;
            const baseY = leftEye.userData.baseY || 2.1;
            leftEye.position.x = baseLeftX + targetX * 0.1;
            leftEye.position.y = baseY + targetY * 0.1;
        }
        
        if (rightEye) {
            const baseRightX = rightEye.userData.baseX || 0.3;
            const baseY = rightEye.userData.baseY || 2.1;
            rightEye.position.x = baseRightX + targetX * 0.1;
            rightEye.position.y = baseY + targetY * 0.1;
        }

        // Balancement des bras
        if (leftArm) {
            leftArm.rotation.z = Math.PI / 6 + Math.sin(time) * 0.1;
        }
        if (rightArm) {
            rightArm.rotation.z = -Math.PI / 6 - Math.sin(time) * 0.1;
        }

        renderer.render(scene, camera);
    }

    // ===== Responsive =====
    window.addEventListener('resize', () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}

// ===== Animation des barres de compétences =====
function initSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    
                    // Animer la barre de progression
                    const progressBar = entry.target.querySelector('.skill-progress');
                    const targetProgress = progressBar.getAttribute('data-progress');
                    
                    setTimeout(() => {
                        progressBar.style.width = targetProgress + '%';
                    }, 100);
                }, index * 150);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillItems.forEach(item => observer.observe(item));
}

// ===== Animations au scroll générales =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .social-link');
    
    if (animatedElements.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// ===== Smooth Scroll pour les ancres =====
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

// ===== Effet de particules sur le curseur (optionnel, subtil) =====
if (window.innerWidth > 768) {
    let particles = [];
    const maxParticles = 30;

    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.9) {
            createParticle(e.clientX, e.clientY);
        }
    });

    function createParticle(x, y) {
        if (particles.length >= maxParticles) {
            const oldParticle = particles.shift();
            if (oldParticle && oldParticle.parentNode) {
                oldParticle.parentNode.removeChild(oldParticle);
            }
        }

        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(107, 182, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
            animation: particleFade 1s ease-out forwards;
        `;

        document.body.appendChild(particle);
        particles.push(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }

    // Ajouter l'animation CSS dynamiquement
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFade {
            0% {
                opacity: 1;
                transform: translate(0, 0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(
                    ${Math.random() * 40 - 20}px,
                    ${Math.random() * 40 - 20}px
                ) scale(0);
            }
        }
    `;
    document.head.appendChild(style);
}

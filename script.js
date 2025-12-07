let currentStep = 1;
const totalSteps = 4;
let userName = "My Love";

document.addEventListener('DOMContentLoaded', function () {
    showStep(currentStep);
    createPetals();
    setCountdown();
});

function showStep(step) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step${step}`).classList.add('active');

    const progress = ((step - 1) / (totalSteps - 1)) * 100;
    gsap.to("#progressBar", { width: `${progress}%`, duration: 1 });

    switch(step) {
        case 1:
            break;

        case 2:
            gsap.from(".name-input", {
                scale: 0.5,
                opacity: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)"
            });
            break;

        case 3: // Old step 4
            typeMessage();
            gsap.from(".photo-frame", {
                y: 50,
                opacity: 0,
                rotation: -10,
                duration: 1
            });
            break;

        case 4: // Old step 6
            createFireworks();
            break;
    }
}

function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
    }
}

function saveName() {
    const input = document.getElementById("nameInput").value.trim();
    if (!input) {
        alert("Please enter your beautiful name 😊");
        return;
    }
    userName = input;
    document.getElementById("finalName").textContent = userName;
    nextStep();
}

// Function to create floating hearts
function createHearts() {
    const container = document.getElementById('floatingHearts');
    const colors = ['#ff4081', '#f06292', '#f8bbd0', '#d81b60', '#ff80ab'];
    
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.animationDuration = `${3 + Math.random() * 3}s`;
        heart.style.fontSize = `${20 + Math.random() * 25}px`;
        heart.style.top = `${60 + Math.random() * 30}%`;
        
        container.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 4000);
    }
    
    // Animate heart click
    gsap.to("#interactiveHeart", {
        scale: 1.3,
        duration: 0.3,
        yoyo: true,
        repeat: 1
    });
}

// Function to create falling petals
function createPetals() {
    const container = document.getElementById('petalsContainer');
    const petalColors = ['#ffcdd2', '#f8bbd0', '#fce4ec', '#f48fb1'];
    
    for (let i = 0; i < 15; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Random petal shape
        const petalType = Math.floor(Math.random() * 3);
        let petalShape;
        switch(petalType) {
            case 0:
                petalShape = "M50,0 C60,15 60,30 50,45 C40,30 40,15 50,0";
                break;
            case 1:
                petalShape = "M50,0 C70,20 70,40 50,50 C30,40 30,20 50,0";
                break;
            case 2:
                petalShape = "M50,0 C55,10 55,25 50,35 C45,25 45,10 50,0";
                break;
        }
        
        petal.style.width = `${10 + Math.random() * 20}px`;
        petal.style.height = `${10 + Math.random() * 20}px`;
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.top = `-20px`;
        petal.style.fill = petalColors[Math.floor(Math.random() * petalColors.length)];
        petal.style.opacity = 0.7 + Math.random() * 0.3;
        
        // Create SVG for petal
        petal.innerHTML = `
            <svg viewBox="0 0 100 50" width="100%" height="100%">
                <path d="${petalShape}" fill="${petalColors[Math.floor(Math.random() * petalColors.length)]}" />
            </svg>
        `;
        
        container.appendChild(petal);
        
        // Animate petal falling
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 15;
        const sway = 50 + Math.random() * 100;
        
        gsap.to(petal, {
            y: window.innerHeight + 50,
            x: `+=${sway}`,
            rotation: 360,
            duration: duration,
            delay: delay,
            ease: "none",
            onComplete: () => {
                // Reset petal to top
                petal.style.top = `-20px`;
                petal.style.left = `${Math.random() * 100}%`;
                // Repeat animation
                gsap.to(petal, {
                    y: window.innerHeight + 50,
                    x: `+=${sway}`,
                    rotation: 360,
                    duration: duration,
                    ease: "none",
                    onComplete: () => {
                        petal.remove();
                    }
                });
            }
        });
    }
}

// Function to type out message
function typeMessage() {
    const messages = [
        `Hey ${userName},`,
        "Just wanted to wish you a really nice birthday.",
        "Hope your day is full of smiles and good moments.",
        "Wishing you success and happiness in the year ahead.",
        "Stay happy, stay yourself — and enjoy your day!",
        "Happy Birthday! 🎉"
    ];

    
    const typingText = document.getElementById('typingText');
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentMessage = messages[messageIndex];
        
        if (isDeleting) {
            typingText.innerHTML = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.innerHTML = currentMessage.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentMessage.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of message
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            typingSpeed = 500; // Pause before next message
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing after a short delay
    setTimeout(() => {
        document.getElementById('typedMessage').classList.add('show');
        type();
    }, 500);
}

// Function to create fireworks
function createFireworks() {
    // Create initial fireworks
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createFirework();
        }, i * 800);
    }
    
    // Continue with occasional fireworks
    setInterval(() => {
        if (Math.random() > 0.7) {
            createFirework();
        }
    }, 2000);
}

function createFirework() {
    const colors = ['#ff4081', '#f06292', '#f8bbd0', '#d81b60', '#ff80ab', '#ffcdd2'];
    
    // Create firework center
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.color = colors[Math.floor(Math.random() * colors.length)];
    firework.style.setProperty('--x', `${Math.random() * window.innerWidth}px`);
    firework.style.setProperty('--y', `${Math.random() * window.innerHeight * 0.8}px`);
    firework.style.setProperty('--x-end', `${(Math.random() - 0.5) * 20}px`);
    firework.style.setProperty('--y-end', `${(Math.random() - 0.5) * 20}px`);
    
    document.body.appendChild(firework);
    
    // Create particles
    setTimeout(() => {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('firework-particle');
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.left = firework.style.getPropertyValue('--x');
            particle.style.top = firework.style.getPropertyValue('--y');
            particle.style.setProperty('--tx', `${Math.cos(i * 0.2) * 100}px`);
            particle.style.setProperty('--ty', `${Math.sin(i * 0.2) * 100}px`);
            
            document.body.appendChild(particle);
            
            // Remove after animation
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
        
        firework.remove();
    }, 1000);
}

// Function to set countdown
function setCountdown() {
    // Set target date (next 24 hours from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 1);
    
    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;
        
        if (diff <= 0) {
            document.getElementById('countdown').innerHTML = "<span>Happy Birthday!</span>";
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}



// Function to share on social media
function shareOnSocial(platform) {
    let url = '';
    const text = `Check out this beautiful birthday wish for ${userName}! ${window.location.href}`;
    
    switch(platform) {
        case 'facebook':
            url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
            break;
        case 'twitter':
            url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
            break;
        case 'whatsapp':
            url = `https://wa.me/?text=${encodeURIComponent(text)}`;
            break;
    }
    
    window.open(url, '_blank', 'width=600,height=400');
    
    // Animate share button
    gsap.to(`.social-icon:nth-child(${['facebook', 'twitter', 'whatsapp'].indexOf(platform) + 1})`, {
        scale: 1.3,
        duration: 0.3,
        yoyo: true,
        repeat: 1
    });
}

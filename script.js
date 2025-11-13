feather.replace();

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

document.getElementById('year').textContent = new Date().getFullYear();

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('glassmorphism');
    } else {
        header.classList.remove('glassmorphism');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});

const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalThumbnails = document.getElementById('modal-thumbnails');

const fullscreenModal = document.getElementById('fullscreen-modal');
const fullscreenOverlay = document.getElementById('fullscreen-overlay');
const fullscreenImage = document.getElementById('fullscreen-image');
const fullscreenCloseBtn = document.getElementById('fullscreen-close-btn');
const fullscreenPrevBtn = document.getElementById('fullscreen-prev-btn');
const fullscreenNextBtn = document.getElementById('fullscreen-next-btn');

let currentProjectImages = [];
let currentFullscreenIndex = 0;
let isAnimating = false;

const openModal = (card) => {
    modalTitle.textContent = card.dataset.modalTitle;
    
    const mainImage = card.dataset.modalImage;
    const allImagesAttr = card.dataset.modalImages;
    currentProjectImages = allImagesAttr ? allImagesAttr.split(',').map(s => s.trim()) : [mainImage];

    modalImage.src = currentProjectImages[0];
    modalThumbnails.innerHTML = '';

    if (currentProjectImages.length > 1) {
        currentProjectImages.forEach((imgSrc, index) => {
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.alt = `Thumbnail ${index + 1}`;
            thumb.classList.add('w-16', 'h-16', 'object-cover', 'rounded', 'cursor-pointer', 'border-2', 'border-transparent', 'hover:border-sky-400');
            
            if (index === 0) thumb.classList.add('border-sky-500');

            thumb.addEventListener('click', () => {
                modalImage.src = imgSrc;
                document.querySelectorAll('#modal-thumbnails img').forEach(t => t.classList.remove('border-sky-500'));
                thumb.classList.add('border-sky-500');
            });
            modalThumbnails.appendChild(thumb);
        });
        modalThumbnails.classList.remove('hidden');
    } else {
        modalThumbnails.classList.add('hidden');
    }

    const rawDescription = card.dataset.modalDescription;
    const formattedDescription = rawDescription.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    modalDescription.innerHTML = formattedDescription;

    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    feather.replace();
};

const closeModal = () => {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    modalThumbnails.innerHTML = '';
    currentProjectImages = [];
};

const openFullscreen = () => {
    if (currentProjectImages.length === 0) return;
    currentFullscreenIndex = currentProjectImages.findIndex(src => modalImage.src.includes(src));
    fullscreenImage.src = currentProjectImages[currentFullscreenIndex];

    if (currentProjectImages.length > 1) {
        fullscreenPrevBtn.classList.remove('hidden');
        fullscreenNextBtn.classList.remove('hidden');
    } else {
        fullscreenPrevBtn.classList.add('hidden');
        fullscreenNextBtn.classList.add('hidden');
    }
    fullscreenModal.classList.remove('hidden');
    feather.replace(); 
};

const closeFullscreen = () => {
    fullscreenModal.classList.add('hidden');
    fullscreenImage.src = '';
    fullscreenImage.className = 'max-w-full max-h-full object-contain relative z-20';
};

const changeFullscreenImage = (direction) => {
    if (isAnimating || currentProjectImages.length <= 1) return;
    isAnimating = true;

    let newIndex = currentFullscreenIndex + direction;
    if (newIndex >= currentProjectImages.length) newIndex = 0;
    if (newIndex < 0) newIndex = currentProjectImages.length - 1;

    fullscreenImage.classList.add(direction > 0 ? 'image-exit-left' : 'image-exit-right');
    
    setTimeout(() => {
        currentFullscreenIndex = newIndex;
        fullscreenImage.src = currentProjectImages[currentFullscreenIndex];
        
        fullscreenImage.className = 'max-w-full max-h-full object-contain relative z-20';
        fullscreenImage.classList.add(direction > 0 ? 'image-enter-right' : 'image-enter-left');
        
        setTimeout(() => { isAnimating = false; }, 250);
    }, 250);
};

projectCards.forEach(card => card.addEventListener('click', () => openModal(card)));
modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

modalImage.addEventListener('click', () => { if (modalImage.src) openFullscreen(); });

fullscreenCloseBtn.addEventListener('click', closeFullscreen);
fullscreenOverlay.addEventListener('click', closeFullscreen);
fullscreenNextBtn.addEventListener('click', () => changeFullscreenImage(1));
fullscreenPrevBtn.addEventListener('click', () => changeFullscreenImage(-1));

document.addEventListener('keydown', (e) => {
    if (fullscreenModal.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeFullscreen();
    if (e.key === 'ArrowRight') changeFullscreenImage(1);
    if (e.key === 'ArrowLeft') changeFullscreenImage(-1);
});


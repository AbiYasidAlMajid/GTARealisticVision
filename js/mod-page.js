function handleAnimateOnScroll() {
    const observerOptions = {
        threshold: 0.25
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    const animScroll = document.querySelectorAll('.anim-scroll');
    animScroll.forEach(el => observer.observe(el));
}

function isMobile() {
    return window.innerWidth < 600;
}

document.querySelectorAll('.drop-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.id.replace('drop-', '') + '-page';
        const targetPage = document.getElementById(targetId);
        const arrow = btn.querySelector('.drop-arrow');

        const isActive = btn.classList.contains('active');

        if (isMobile()) {
            btn.classList.toggle('active');
            arrow?.classList.toggle('rotated');
            targetPage.style.padding = isActive ? '0 1rem' : '1rem';
            targetPage.style.opacity = isActive ? '0' : '1';
            targetPage.style.height = isActive ? '0' : (32 + targetPage.scrollHeight) + "px";
        } else {
            document.querySelectorAll('.drop-btn.active').forEach(activeBtn => {
                activeBtn.classList.remove('active');
                activeBtn.querySelector('.drop-arrow')?.classList.remove('rotated');
            });

            document.querySelectorAll('.drop-page').forEach(page => {
                page.style.padding = '0 1rem';
                page.style.height = '0';
                page.style.opacity = '0';
            });

            if (!isActive) {
                btn.classList.add('active');
                arrow?.classList.add('rotated');
                targetPage.style.padding = '1rem';
                targetPage.style.opacity = '1';
                targetPage.style.height = (32 + targetPage.scrollHeight) + "px";
            }
        }
    });
});

const galleryImageElements = document.querySelectorAll('.gallery-img img, .gallery-img-full img');
const popupOverlay = document.getElementById('popup-overlay');
const popupImg = document.getElementById('popup-img');
const popupCloseBtn = document.querySelector('.popup-close');
const popupArrowLeft = document.querySelector('.popup-arrow-left');
const popupArrowRight = document.querySelector('.popup-arrow-right');

let currentImageIndex = 0;
let isChangingImage = false;
const allGalleryImages = Array.from(galleryImageElements).map(img => ({
    src: img.src,
    alt: img.alt
}));

function updatePopupImage(isFirstImage = false) {
    if (allGalleryImages.length === 0) return;

    const imageData = allGalleryImages[currentImageIndex];

    if (isFirstImage) {
        popupImg.src = imageData.src;
        popupImg.alt = imageData.alt;
        return;
    }

    if (isChangingImage) return;
    isChangingImage = true;

    popupImg.style.opacity = '0';

    setTimeout(() => {
        popupImg.src = imageData.src;
        popupImg.alt = imageData.alt;

        popupImg.style.opacity = '1';

        setTimeout(() => {
            isChangingImage = false;
        }, 300);

    }, 150);
}

function showPreviousImage() {
    if (isChangingImage) return;
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = allGalleryImages.length - 1;
    }
    updatePopupImage();
}

function showNextImage() {
    if (isChangingImage) return;
    currentImageIndex++;
    if (currentImageIndex >= allGalleryImages.length) {
        currentImageIndex = 0;
    }
    updatePopupImage();
}

galleryImageElements.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentImageIndex = index;
        updatePopupImage(true);
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

popupCloseBtn.addEventListener('click', () => {
    popupOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

popupArrowLeft.addEventListener('click', showPreviousImage);
popupArrowRight.addEventListener('click', showNextImage);

popupOverlay.addEventListener('click', (event) => {
    if (event.target === popupOverlay) {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('keydown', (event) => {
    if (popupOverlay.classList.contains('active')) {
        if (event.key === 'ArrowLeft') {
            showPreviousImage();
        } else if (event.key === 'ArrowRight') {
            showNextImage();
        } else if (event.key === 'Escape') {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

handleAnimateOnScroll();
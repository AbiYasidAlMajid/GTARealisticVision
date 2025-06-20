const loader = document.querySelector(".loader");
const nav = document.querySelector("nav");
const introVideo = document.querySelector(".intro");
const introArrow = document.querySelector(".intro-arrow");

document.body.style.overflow = 'hidden';

window.addEventListener("load", () => {
    if (loader) {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
    }
    document.body.style.overflow = 'auto';

    handleScrollEffects();
    handleAnimateOnScroll();
    setIntroVideoSource();
});

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

function handleScrollEffects() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    if (introVideo) {
        introVideo.style.transform = `translateY(${scrollY * 0.5}px)`;
    }

    if (nav) {
        nav.style.background = scrollY > viewportHeight ? "var(--color-2)" : "transparent";
    }

    if (introArrow) {
        introArrow.style.opacity = scrollY > viewportHeight * 0.25 ? "0" : "1";
    }
}

function setIntroVideoSource() {
    const isMobile = window.innerWidth < 600;
    const newSrc = isMobile
        ? "assets/videos/rv-intro-alt.mp4"
        : "assets/videos/rv-intro.mp4";

    if (introVideo && introVideo.getAttribute("src") !== newSrc) {
        introVideo.setAttribute("src", newSrc);
        introVideo.load();
    }
}

window.addEventListener("scroll", () => {
    handleScrollEffects();
});

window.addEventListener("resize", () => {
    setIntroVideoSource();
});

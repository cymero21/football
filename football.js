document.addEventListener('DOMContentLoaded', () => {
    const heroWrapper = document.querySelector('.heroWrapper');
    const bg1 = document.getElementById('bg1');
    const bg2 = document.getElementById('bg2');

    // hero background rotation: only initialize when hero elements exist on the page
    if (heroWrapper && bg1 && bg2) {
        let current = 0;
        const imgSources = [
            'images/three.jpg',
            'images/one.jpg',
            'images/five.jpg',
        ];

        // preload images
        imgSources.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        // initialize layers
        bg1.style.backgroundImage = `url(${imgSources[0]})`;
        bg1.classList.add('visible');
        bg2.style.backgroundImage = '';
        let showingFirst = true;

        function changeImageBackground() {
            if (imgSources.length === 0) return;
            current = (current + 1) % imgSources.length;
            const nextSrc = imgSources[current];

            const topLayer = showingFirst ? bg2 : bg1;
            const bottomLayer = showingFirst ? bg1 : bg2;

            topLayer.style.backgroundImage = `url(${nextSrc})`;
            // bring top layer into view
            topLayer.classList.add('visible');
            // after transition, hide bottom layer
            bottomLayer.classList.remove('visible');

            showingFirst = !showingFirst;
        }

        const intervalId = setInterval(changeImageBackground, 5000);
        window.__heroBgInterval = intervalId;
    }

    // --- Responsive nav: hamburger toggle, ARIA, and keyboard support ---
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    function closeMenu() {
        if (navLinks) navLinks.classList.remove('open');
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    }
    function openMenu() {
        if (navLinks) navLinks.classList.add('open');
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    }

    if (menuBtn && navLinks) {
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            // move focus into menu for keyboard users (first link)
            if (isOpen) {
                const firstLink = navLinks.querySelector('a');
                firstLink && firstLink.focus();
            }
        });

        // Close menu on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });
    }

    // Mobile dropdown toggles: tap to open/close when narrow
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(drop => {
        const trigger = drop.querySelector(':scope > a');
        trigger && trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                drop.classList.toggle('open');
            }
        });
    });
});

// image slider: only initialize if slider elements exist on the page
(function initImageSlider() {
    const container = document.querySelector('.image-container');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    if (!container) return; // nothing to do on pages without the slider

    let index = 0;

    function updateSlide() {
        const firstImg = container.querySelector('img');
        if (!firstImg) return;
        const imageWidth = firstImg.clientWidth; // width in pixels
        container.style.transform = `translateX(${-imageWidth * index}px)`;
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            index++;
            const total = container.querySelectorAll('img').length;
            const firstImgLocal = container.querySelector('img');
            const visibleImages = firstImgLocal ? Math.floor(container.clientWidth / firstImgLocal.clientWidth) : 1;
            if (index > total - visibleImages) index = 0;
            updateSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            index--;
            const total = container.querySelectorAll('img').length;
            const firstImgLocal = container.querySelector('img');
            const visibleImages = firstImgLocal ? Math.floor(container.clientWidth / firstImgLocal.clientWidth) : 1;
            if (index < 0) index = total - visibleImages;
            updateSlide();
        });
    }

    window.addEventListener('resize', updateSlide); // handle responsiveness
    // initial layout
    updateSlide();
})();

document.querySelectorAll('.faq-question').forEach( question => {
    question.addEventListener('click', ()=> {
        question.classList.toggle('active');
    })
})

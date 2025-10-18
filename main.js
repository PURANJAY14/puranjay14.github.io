document.addEventListener('DOMContentLoaded', function () {
    const themeSwitcher = document.querySelector('.switch input');
    const body = document.querySelector('body');

    themeSwitcher.addEventListener('change', function () {
        if (this.checked) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    });

    const navLinks = document.querySelectorAll('.sidebar nav a');

    function updateActiveLink() {
        const currentPath = window.location.pathname;
        const hash = window.location.hash;

        navLinks.forEach(link => {
            const linkUrl = new URL(link.href);
            const linkPath = linkUrl.pathname;
            const linkHash = linkUrl.hash;

            link.classList.remove('active');

            // Handle CV page
            if (currentPath.includes('cv.html') && linkPath.includes('cv.html')) {
                link.classList.add('active');
                return;
            }

            // Handle index page with hashes
            if (currentPath.includes('index.html') || currentPath === '/') {
                if (hash && hash === linkHash) {
                    link.classList.add('active');
                } else if ((!hash || hash === '#') && (linkPath.includes('index.html') && !linkHash)) {
                    link.classList.add('active');
                }
            }
        });
    }

    // Update on page load
    updateActiveLink();

    // Update on hash change
    window.addEventListener('hashchange', updateActiveLink);

    // Update on click as a fallback
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(updateActiveLink, 0);
        });
    });
});
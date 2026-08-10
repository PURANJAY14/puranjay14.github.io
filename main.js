document.addEventListener('DOMContentLoaded', function () {
    const themeSwitcher = document.querySelector('.switch input');
    const body = document.querySelector('body');

    // Dark is the default; an explicit choice is remembered across pages and
    // visits. The inline script at the top of each <body> applies the class
    // before first paint so there is no flash of the wrong theme.
    let stored = null;
    try {
        stored = localStorage.getItem('theme');
    } catch (e) {
        /* storage blocked — fall back to the default */
    }

    const isDark = stored ? stored === 'dark' : true;
    body.classList.toggle('dark-mode', isDark);
    themeSwitcher.checked = isDark;

    themeSwitcher.addEventListener('change', function () {
        body.classList.toggle('dark-mode', this.checked);
        try {
            localStorage.setItem('theme', this.checked ? 'dark' : 'light');
        } catch (e) {
            /* nothing to persist to */
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

            // Handle standalone pages (CV, Resources, ...)
            const standalonePages = ['cv.html', 'resources.html', 'projects.html'];
            const currentPage = standalonePages.find(page => currentPath.includes(page));
            if (currentPage) {
                if (linkPath.includes(currentPage)) {
                    link.classList.add('active');
                }
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
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const primaryNav = document.getElementById('primaryNav');

    hamburgerBtn.addEventListener('click', () => {
        primaryNav.classList.toggle('open');
        
        const isOpen = primaryNav.classList.contains('open');
        hamburgerBtn.innerHTML = isOpen ? '&times;' : '&#9776;';
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            primaryNav.classList.remove('open');
            hamburgerBtn.innerHTML = '&#9776;';
        }
    });

    const navItems = document.querySelectorAll('nav ul li');
    const currentPage = window.location.pathname.split('/').pop();

    navItems.forEach(item => {
        const link = item.querySelector('a');
        const linkHref = link.getAttribute('href');
        
        if ((currentPage === '' || currentPage === 'index.html') && linkHref === '#') {
            item.classList.add('active');
        } else if (linkHref !== '#' && linkHref.includes(currentPage)) {
            item.classList.add('active');
        }
    });
});
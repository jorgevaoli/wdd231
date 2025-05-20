function getCurrentYear() {
    const currentDate = new Date();
    document.getElementById('current-year').textContent = currentDate.getFullYear();
}

function getLastModified() {
    document.getElementById('last-modified').textContent = document.lastModified;
}

document.addEventListener('DOMContentLoaded', function() {
    getCurrentYear();
    getLastModified();
    
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const primaryNav = document.getElementById('primary-nav');
    
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            primaryNav.classList.toggle('responsive');
        });
    }
});
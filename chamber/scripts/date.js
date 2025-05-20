// date.js - For handling dates in the site

// Function to get the current year for copyright
function getCurrentYear() {
    const currentDate = new Date();
    document.getElementById('current-year').textContent = currentDate.getFullYear();
}

// Function to display last modified date
function getLastModified() {
    document.getElementById('last-modified').textContent = document.lastModified;
}

// Run date functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    getCurrentYear();
    getLastModified();
    
    // Toggle menu for mobile view
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const primaryNav = document.getElementById('primary-nav');
    
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            primaryNav.classList.toggle('responsive');
        });
    }
});
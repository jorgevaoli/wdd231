document.addEventListener('DOMContentLoaded', () => {
    const currentYearSpan = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;
    
    const lastModifiedParagraph = document.getElementById('lastModified');
    const lastModified = document.lastModified;
    lastModifiedParagraph.textContent = `Last Update: ${lastModified}`;
});
// Fetch attractions data
async function fetchAttractionsData() {
    try {
        const response = await fetch('data/attractions.json');
        if (!response.ok) {
            throw new Error('Failed to fetch attractions data');
        }
        const data = await response.json();
        return data.attractions;
    } catch (error) {
        console.error('Error loading attractions data:', error);
        document.getElementById('attractions-grid').innerHTML =
            '<p class="error">Error loading attractions. Please try again later.</p>';
        return null;
    }
}

// Display attractions cards
function displayAttractions(attractions) {
    const attractionsGrid = document.getElementById('attractions-grid');

    if (!attractionsGrid || !attractions) return;

    attractionsGrid.innerHTML = '';

    attractions.forEach((attraction, index) => {
        const attractionCard = document.createElement('div');
        attractionCard.className = 'attraction-card';
        attractionCard.style.gridArea = `area${index + 1}`;

        attractionCard.innerHTML = `
            <h2>${attraction.name}</h2>
            <figure>
                <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
            </figure>
            <address>${attraction.address}</address>
            <p>${attraction.description}</p>
            <button class="learn-more-btn" onclick="learnMore('${attraction.name}')">Learn More</button>
        `;

        attractionsGrid.appendChild(attractionCard);
    });
}

// Learn more button functionality
function learnMore(attractionName) {
    alert(`More information about ${attractionName} would be displayed here. This could link to a detailed page or open a modal with additional content.`);
}

// Visit tracking functionality
function trackVisit() {
    const now = Date.now();
    const lastVisit = localStorage.getItem('lastVisit');
    const visitMessageElement = document.getElementById('visit-text');

    if (!visitMessageElement) return;

    if (!lastVisit) {
        // First visit
        visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = parseInt(lastVisit);
        const timeDifference = now - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference < 1) {
            // Less than a day
            visitMessageElement.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            // Exactly 1 day
            visitMessageElement.textContent = "You last visited 1 day ago.";
        } else {
            // More than 1 day
            visitMessageElement.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }

    // Store current visit date
    localStorage.setItem('lastVisit', now.toString());
}

// Lazy loading images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async function () {
    // Track visit
    trackVisit();

    // Load and display attractions
    const attractions = await fetchAttractionsData();
    if (attractions) {
        displayAttractions(attractions);
        setupLazyLoading();
    }
});
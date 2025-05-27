async function fetchMembersData() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Failed to fetch members data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading members data:', error);
        document.getElementById('spotlight-container').innerHTML =
            '<p class="error">Error loading member spotlights. Please try again later.</p>';
        return null;
    }
}

function getRandomSpotlights(members) {
    // Filter gold and silver members only
    const goldSilverMembers = members.filter(member => member.membership === 3 || member.membership === 2);

    // Shuffle the array and take 3 random members
    const shuffled = goldSilverMembers.sort(() => 0.5 - Math.random());
    const numberOfSpotlights = Math.random() > 0.5 ? 3 : 3;

    return shuffled.slice(0, numberOfSpotlights);
}

function displaySpotlights(spotlights) {
    const spotlightContainer = document.getElementById('spotlight-container');

    if (!spotlightContainer || !spotlights) return;

    spotlightContainer.innerHTML = '';

    spotlights.forEach(member => {
        const spotlightCard = document.createElement('div');
        spotlightCard.className = 'spotlight-card';

        // Determine membership level text
        const membershipLevel = member.membership === 3 ? 'Gold Member' : 'Silver Member';
        const membershipClass = member.membership === 3 ? 'gold-member' : 'silver-member';

        spotlightCard.innerHTML = `
            <div class="spotlight-header ${membershipClass}">
                <img src="images/${member.image}" alt="${member.name} Logo">
                <div class="spotlight-info">
                    <h4>${member.name}</h4>
                    <p class="tagline">${member.tagline}</p>
                    <p class="membership-level">${membershipLevel}</p>
                </div>
            </div>
            <div class="spotlight-details">
                <p><strong>EMAIL:</strong> info@${member.name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.com</p>
                <p><strong>PHONE:</strong> ${member.phone}</p>
                <p><strong>ADDRESS:</strong> ${member.address}</p>
                <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            </div>
        `;

        spotlightContainer.appendChild(spotlightCard);
    });
}

document.addEventListener('DOMContentLoaded', async function () {
    const members = await fetchMembersData();
    if (members) {
        const spotlights = getRandomSpotlights(members);
        displaySpotlights(spotlights);
    }
});
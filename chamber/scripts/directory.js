function setupViewToggle() {
    const gridBtn = document.getElementById('grid-btn');
    const listBtn = document.getElementById('list-btn');
    const directoryContainer = document.getElementById('directory-container');

    if (gridBtn && listBtn) {
        gridBtn.addEventListener('click', () => {
            directoryContainer.className = 'grid-view';
            gridBtn.classList.add('selected');
            listBtn.classList.remove('selected');
        });

        listBtn.addEventListener('click', () => {
            directoryContainer.className = 'list-view';
            listBtn.classList.add('selected');
            gridBtn.classList.remove('selected');
        });
    }
}


async function fetchDirectoryData() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading directory data:', error);
        document.getElementById('directory-container').innerHTML =
            '<p class="error">Error loading directory data. Please try again later.</p>';
        return null;
    }
}

function displayDirectoryData(members) {
    const directoryContainer = document.getElementById('directory-container');

    directoryContainer.innerHTML = '';

    if (!directoryContainer || !members) return;

    members.forEach(member => {
        const card = document.createElement('div');

        if (directoryContainer.className === 'grid-view') {
            card.className = 'directory-card';
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} Logo">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">${member.website}</a></p>
            `;
        } else {
            card.className = 'list-item';
            card.innerHTML = `
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">Website</a></p>
            `;
        }

        if (member.membershipLevel === 3) {
            card.classList.add('gold-member');
        } else if (member.membershipLevel === 2) {
            card.classList.add('silver-member');
        }

        directoryContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', async function () {
    setupViewToggle();

    const members = await fetchDirectoryData();
    if (members) {
        displayDirectoryData(members);

        const gridBtn = document.getElementById('grid-btn');
        const listBtn = document.getElementById('list-btn');
        const directoryContainer = document.getElementById('directory-container');

        if (gridBtn && listBtn) {
            gridBtn.addEventListener('click', () => {
                displayDirectoryData(members);
            });

            listBtn.addEventListener('click', () => {
                displayDirectoryData(members);
            });
        }
    }
});
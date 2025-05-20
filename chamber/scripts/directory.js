// directory.js - For handling the business directory

// Function to toggle between grid and list view
function setupViewToggle() {
    const gridBtn = document.getElementById('grid-btn');
    const listBtn = document.getElementById('list-btn');
    const directoryContainer = document.getElementById('directory-container');
    
    if (gridBtn && listBtn) {
        // Grid view button click event
        gridBtn.addEventListener('click', () => {
            directoryContainer.className = 'grid-view';
            gridBtn.classList.add('selected');
            listBtn.classList.remove('selected');
        });
        
        // List view button click event
        listBtn.addEventListener('click', () => {
            directoryContainer.className = 'list-view';
            listBtn.classList.add('selected');
            gridBtn.classList.remove('selected');
        });
    }
}

// Function to fetch directory data from the JSON file
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

// Function to display directory data
function displayDirectoryData(members) {
    const directoryContainer = document.getElementById('directory-container');
    
    // Clear loading message
    directoryContainer.innerHTML = '';
    
    // Check if container exists and has data
    if (!directoryContainer || !members) return;
    
    // Create HTML for each member
    members.forEach(member => {
        // Create grid card view
        const card = document.createElement('div');
        
        // Different HTML structure based on current view
        if (directoryContainer.className === 'grid-view') {
            // Grid view
            card.className = 'directory-card';
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} Logo">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">${member.website}</a></p>
            `;
        } else {
            // List view
            card.className = 'list-item';
            card.innerHTML = `
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">Website</a></p>
            `;
        }
        
        // Add special class for gold/silver members if needed
        if (member.membershipLevel === 3) {
            card.classList.add('gold-member');
        } else if (member.membershipLevel === 2) {
            card.classList.add('silver-member');
        }
        
        // Add the card to the container
        directoryContainer.appendChild(card);
    });
}

// Initialize directory functionality
document.addEventListener('DOMContentLoaded', async function() {
    // Setup view toggle functionality
    setupViewToggle();
    
    // Fetch and display directory data
    const members = await fetchDirectoryData();
    if (members) {
        displayDirectoryData(members);
        
        // Reattach event listeners for view toggling
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
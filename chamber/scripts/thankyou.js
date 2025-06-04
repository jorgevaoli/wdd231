document.addEventListener('DOMContentLoaded', function () {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Display form data
    const firstName = urlParams.get('firstName');
    const lastName = urlParams.get('lastName');
    const email = urlParams.get('email');
    const mobile = urlParams.get('mobile');
    const organization = urlParams.get('organization');
    const timestamp = urlParams.get('timestamp');

    // Update DOM elements with form data
    document.getElementById('display-firstName').textContent = firstName || 'Not provided';
    document.getElementById('display-lastName').textContent = lastName || 'Not provided';
    document.getElementById('display-email').textContent = email || 'Not provided';
    document.getElementById('display-mobile').textContent = mobile || 'Not provided';
    document.getElementById('display-organization').textContent = organization || 'Not provided';

    // Format timestamp
    if (timestamp) {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        document.getElementById('display-timestamp').textContent = formattedDate;
    } else {
        document.getElementById('display-timestamp').textContent = 'Not available';
    }

    // Add animation to the thank you content
    const thankyouContent = document.querySelector('.thankyou-content');
    if (thankyouContent) {
        thankyouContent.style.opacity = '0';
        thankyouContent.style.transform = 'translateY(20px)';

        setTimeout(() => {
            thankyouContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            thankyouContent.style.opacity = '1';
            thankyouContent.style.transform = 'translateY(0)';
        }, 100);
    }
});
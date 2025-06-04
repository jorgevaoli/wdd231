document.addEventListener('DOMContentLoaded', function () {
    // Set timestamp when form loads
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toISOString();
    }

    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    const closeBtns = document.querySelectorAll('.close');

    // Open modal
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                // Prevent body scroll when modal is open
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal when clicking X
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function (event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    // Form validation enhancement
    const form = document.querySelector('.membership-form');
    if (form) {
        form.addEventListener('submit', function (event) {
            const requiredFields = form.querySelectorAll('input[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff0000';
                } else {
                    field.style.borderColor = '';
                }
            });

            if (!isValid) {
                event.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    }

    // Real-time validation feedback
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (!this.value.trim()) {
                this.style.borderColor = '#ff0000';
            } else {
                this.style.borderColor = '';
            }
        });

        input.addEventListener('input', function () {
            if (this.value.trim()) {
                this.style.borderColor = '';
            }
        });
    });

    // Organization title pattern validation
    const orgTitleInput = document.getElementById('org-title');
    if (orgTitleInput) {
        orgTitleInput.addEventListener('input', function () {
            const pattern = /^[A-Za-z\s\-]{7,}$/;
            if (this.value && !pattern.test(this.value)) {
                this.setCustomValidity('Must be at least 7 characters and contain only letters, spaces, and hyphens');
            } else {
                this.setCustomValidity('');
            }
        });
    }
});
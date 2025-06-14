// Modal Handler Module - Manages modal dialogs
export class ModalHandler {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.modalBody = this.modal?.querySelector('#modal-body');
        this.closeBtn = this.modal?.querySelector('.close');
        
        this.init();
    }

    init() {
        if (!this.modal) return;

        // Close modal when clicking the close button
        this.closeBtn?.addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside of it
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.closeModal();
            }
        });
    }

    openModal() {
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    setContent(content) {
        if (this.modalBody) {
            this.modalBody.innerHTML = content;
        }
    }

    // Generate service detail modal content
    generateServiceModalContent(service) {
        const featuresHTML = service.features.map(feature => `<li>${feature}</li>`).join('');
        
        return `
            <div class="modal-service-content">
                <div class="modal-service-header">
                    <div class="service-icon-large">${service.icon}</div>
                    <h2>${service.title}</h2>
                </div>
                <div class="modal-service-body">
                    <p class="service-description">${service.description}</p>
                    <div class="service-details">
                        <div class="detail-item">
                            <h4>Features Included:</h4>
                            <ul class="feature-list">
                                ${featuresHTML}
                            </ul>
                        </div>
                        <div class="detail-item">
                            <h4>Pricing:</h4>
                            <p class="price-large">${service.price.display}</p>
                        </div>
                        <div class="detail-item">
                            <h4>Timeline:</h4>
                            <p>${service.duration}</p>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <a href="contact.html" class="cta-button">Get Started</a>
                        <button class="secondary-button" onclick="modal.closeModal()">Close</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Generate pricing plan modal content
    generatePlanModalContent(plan) {
        const featuresHTML = plan.features.map(feature => `<li>${feature}</li>`).join('');
        
        return `
            <div class="modal-plan-content">
                <div class="modal-plan-header">
                    <h2>${plan.name} Plan</h2>
                    ${plan.popular ? '<span class="popular-badge">Most Popular</span>' : ''}
                </div>
                <div class="modal-plan-body">
                    <p class="plan-description">${plan.description}</p>
                    <div class="plan-price-large">${plan.price.display}</div>
                    <div class="plan-details">
                        <h4>Everything included:</h4>
                        <ul class="feature-list">
                            ${featuresHTML}
                        </ul>
                    </div>
                    <div class="modal-actions">
                        <a href="contact.html" class="cta-button">${plan.buttonText}</a>
                        <button class="secondary-button" onclick="planModal.closeModal()">Close</button>
                    </div>
                </div>
            </div>
        `;
    }
}
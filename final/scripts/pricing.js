
import { DataHandler } from './data-handler.js';
import { UIComponents } from './ui-components.js';
import { ModalHandler } from './modal-handler.js';
import { StorageHandler } from './storage-handler.js';

class PricingApp {
    constructor() {
        this.dataHandler = new DataHandler();
        this.modal = new ModalHandler('plan-modal');
        this.init();
    }

    async init() {
        try {
            // Load data from JSON file
            await this.dataHandler.fetchData();
            
            // Render all content
            this.renderPricingPlans();
            this.renderAdditionalServices();
            this.renderFAQ();
            this.renderContactInfo();
            
            // Setup event listeners
            this.setupEventListeners();
            this.setupNavigation();
            this.setupFAQ();
            
        } catch (error) {
            console.error('Failed to initialize pricing app:', error);
            this.showErrorMessage();
        }
    }

    renderPricingPlans() {
        const pricingContainer = document.getElementById('pricing-container');
        if (!pricingContainer) return;

        const plans = this.dataHandler.getPricingPlans();
        
        // Generate pricing cards using array methods
        const plansHTML = plans.map(plan => 
            UIComponents.generatePricingCard(plan)
        ).join('');
        
        pricingContainer.innerHTML = plansHTML;
    }

    renderAdditionalServices() {
        const servicesContainer = document.getElementById('additional-services-container');
        if (!servicesContainer) return;

        const services = this.dataHandler.getAdditionalServices();
        
        const servicesHTML = services.map(service => 
            UIComponents.generateAdditionalServiceCard(service)
        ).join('');
        
        servicesContainer.innerHTML = servicesHTML;
    }

    renderFAQ() {
        const faqContainer = document.getElementById('faq-container');
        if (!faqContainer) return;

        const faqs = this.dataHandler.getFAQ();
        
        // Use forEach array method to render FAQ items
        const faqHTML = faqs.map((faq, index) => 
            UIComponents.generateFAQItem(faq, index)
        ).join('');
        
        faqContainer.innerHTML = faqHTML;
    }

    renderContactInfo() {
        const contactInfoContainer = document.getElementById('contact-info');
        if (!contactInfoContainer) return;

        const contactMethods = this.dataHandler.getContactMethods();
        const contactHTML = UIComponents.generateContactInfo(contactMethods);
        
        contactInfoContainer.innerHTML = contactHTML;
    }

    setupEventListeners() {
        // Plan button click handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('plan-btn')) {
                const planId = e.target.getAttribute('data-plan-id');
                this.showPlanModal(planId);
            }
        });

        // Save plan preferences when user interacts with plans
        document.querySelectorAll('.pricing-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const planBtn = card.querySelector('.plan-btn');
                if (planBtn) {
                    const planId = planBtn.getAttribute('data-plan-id');
                    this.savePlanInteraction(planId);
                }
            });
        });
    }

    setupNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Close menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
        }
    }

    setupFAQ() {
        // FAQ toggle functionality with DOM manipulation
        document.addEventListener('click', (e) => {
            if (e.target.closest('.faq-question')) {
                const question = e.target.closest('.faq-question');
                const faqItem = question.parentElement;
                const answer = faqItem.querySelector('.faq-answer');
                const toggle = question.querySelector('.faq-toggle');
                
                // Toggle active state
                faqItem.classList.toggle('active');
                
                // Update toggle symbol
                toggle.textContent = faqItem.classList.contains('active') ? '-' : '+';
                
                // Save FAQ interaction
                const faqIndex = question.getAttribute('data-faq-index');
                this.saveFAQInteraction(faqIndex);
            }
        });
    }

    showPlanModal(planId) {
        const plan = this.dataHandler.getPricingPlans().find(p => p.id === planId);
        if (plan && this.modal) {
            const modalContent = this.modal.generatePlanModalContent(plan);
            this.modal.setContent(modalContent);
            this.modal.openModal();
        }
    }

    savePlanInteraction(planId) {
        const interactions = StorageHandler.loadData('planInteractions') || [];
        const timestamp = new Date().toISOString();
        
        interactions.push({
            planId,
            timestamp,
            action: 'view'
        });
        
        StorageHandler.saveData('planInteractions', interactions);
    }

    saveFAQInteraction(faqIndex) {
        const interactions = StorageHandler.loadData('faqInteractions') || [];
        const timestamp = new Date().toISOString();
        
        interactions.push({
            faqIndex,
            timestamp,
            action: 'toggle'
        });
        
        StorageHandler.saveData('faqInteractions', interactions);
    }

    showErrorMessage() {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="error-message">
                    <div class="container">
                        <h2>Sorry, we're experiencing technical difficulties</h2>
                        <p>Please try refreshing the page or contact us directly.</p>
                        <a href="contact.html" class="cta-button">Contact Us</a>
                    </div>
                </div>
            `;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pricingApp = new PricingApp();
});

// Make modal available globally for close buttons
window.planModal = null;
document.addEventListener('DOMContentLoaded', () => {
    window.planModal = new ModalHandler('plan-modal');
});
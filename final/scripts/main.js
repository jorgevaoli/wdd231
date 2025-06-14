
import { DataHandler } from './data-handler.js';
import { UIComponents } from './ui-components.js';
import { ModalHandler } from './modal-handler.js';
import { StorageHandler } from './storage-handler.js';

// Initialize the application
class HomeApp {
    constructor() {
        this.dataHandler = new DataHandler();
        this.modal = new ModalHandler('service-modal');
        this.init();
    }

    async init() {
        try {
            // Load data from JSON file
            await this.dataHandler.fetchData();
            
            // Update last visit
            StorageHandler.updateLastVisit();
            
            // Render all content
            this.renderServices();
            this.renderProjects();
            this.renderTestimonials();
            this.renderProcessSteps();
            this.renderContactInfo();
            
            // Setup event listeners
            this.setupEventListeners();
            this.setupNavigation();
            
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showErrorMessage();
        }
    }

    renderServices() {
        const servicesContainer = document.getElementById('services-container');
        if (!servicesContainer) return;

        const services = this.dataHandler.getServices();
        
        // Use array method to generate HTML for all services
        const servicesHTML = services.map(service => 
            UIComponents.generateServiceCard(service)
        ).join('');
        
        servicesContainer.innerHTML = servicesHTML;
    }

    renderProjects() {
        const projectsContainer = document.getElementById('projects-container');
        if (!projectsContainer) return;

        const projects = this.dataHandler.getProjects();
        
        // Generate project cards using template literals
        const projectsHTML = projects.map(project => 
            UIComponents.generateProjectCard(project)
        ).join('');
        
        projectsContainer.innerHTML = projectsHTML;
    }

    renderTestimonials() {
        const testimonialsContainer = document.getElementById('testimonials-container');
        if (!testimonialsContainer) return;

        const testimonials = this.dataHandler.getTestimonials();
        
        const testimonialsHTML = testimonials.map(testimonial => 
            UIComponents.generateTestimonialCard(testimonial)
        ).join('');
        
        testimonialsContainer.innerHTML = testimonialsHTML;
    }

    renderProcessSteps() {
        const processContainer = document.getElementById('process-container');
        if (!processContainer) return;

        const steps = this.dataHandler.getProcessSteps();
        
        const stepsHTML = steps.map(step => 
            UIComponents.generateProcessStep(step)
        ).join('');
        
        processContainer.innerHTML = stepsHTML;
    }

    renderContactInfo() {
        const contactInfoContainer = document.getElementById('contact-info');
        if (!contactInfoContainer) return;

        const contactMethods = this.dataHandler.getContactMethods();
        const contactHTML = UIComponents.generateContactInfo(contactMethods);
        
        contactInfoContainer.innerHTML = contactHTML;
    }

    setupEventListeners() {
        // Service card click handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('service-btn')) {
                const serviceId = e.target.getAttribute('data-service-id');
                this.showServiceModal(serviceId);
            }
        });

        // Track service views for analytics
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const serviceId = card.getAttribute('data-service-id');
                StorageHandler.saveViewedService(serviceId);
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

    showServiceModal(serviceId) {
        const service = this.dataHandler.findServiceById(serviceId);
        if (service && this.modal) {
            const modalContent = this.modal.generateServiceModalContent(service);
            this.modal.setContent(modalContent);
            this.modal.openModal();
        }
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
    window.homeApp = new HomeApp();
});

// Make modal available globally for close buttons
window.modal = null;
document.addEventListener('DOMContentLoaded', () => {
    window.modal = new ModalHandler('service-modal');
});
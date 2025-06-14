
import { DataHandler } from './data-handler.js';
import { UIComponents } from './ui-components.js';
import { StorageHandler } from './storage-handler.js';

class FormResponseApp {
    constructor() {
        this.dataHandler = new DataHandler();
        this.init();
    }

    async init() {
        try {
            // Load data from JSON file
            await this.dataHandler.fetchData();

            // Display form data that was submitted
            this.displayFormData();

            // Render process steps
            this.renderNextSteps();

            // Render contact info
            this.renderContactInfo();

            // Setup navigation
            this.setupNavigation();

            // Clear draft data since form was submitted
            this.clearDraftData();

        } catch (error) {
            console.error('Failed to initialize form response app:', error);
        }
    }

    displayFormData() {
        const formDataContainer = document.getElementById('form-data-display');
        if (!formDataContainer) return;

        // Get submitted form data from localStorage
        const formData = StorageHandler.loadFormData();

        if (!formData) {
            formDataContainer.innerHTML = '<p>No form data found.</p>';
            return;
        }

        // Create HTML to display submitted data
        const submissionHTML = this.generateSubmissionHTML(formData);
        formDataContainer.innerHTML = submissionHTML;
    }

    generateSubmissionHTML(data) {
        const fieldLabels = {
            name: 'Full Name',
            email: 'Email Address',
            phone: 'Phone Number',
            company: 'Company Name',
            service: 'Service Interest',
            budget: 'Project Budget',
            timeline: 'Project Timeline',
            message: 'Project Details',
            newsletter: 'Newsletter Subscription'
        };

        // Filter out empty fields and format data
        const displayData = Object.entries(data)
            .filter(([key, value]) => value && key !== 'submittedAt')
            .map(([key, value]) => {
                const label = fieldLabels[key] || key;
                let displayValue = value;

                // Format specific fields
                if (key === 'service') {
                    displayValue = this.formatServiceName(value);
                } else if (key === 'budget') {
                    displayValue = this.formatBudgetRange(value);
                } else if (key === 'timeline') {
                    displayValue = this.formatTimeline(value);
                } else if (key === 'newsletter') {
                    displayValue = value === 'yes' ? 'Yes, subscribed' : 'No';
                }

                return `
                    <div class="data-item">
                        <span class="data-label">${label}:</span>
                        <span class="data-value">${displayValue}</span>
                    </div>
                `;
            }).join('');

        // Add submission timestamp
        const submissionTime = data.submittedAt ?
            new Date(data.submittedAt).toLocaleString() :
            'Unknown';

        return `
            <div class="submission-data">
                ${displayData}
                <div class="data-item">
                    <span class="data-label">Submitted:</span>
                    <span class="data-value">${submissionTime}</span>
                </div>
            </div>
        `;
    }

    formatServiceName(serviceValue) {
        const serviceNames = {
            'web-design': 'Custom Website Design',
            'ecommerce': 'E-commerce Solutions',
            'maintenance': 'Website Maintenance',
            'starter': 'Starter Package',
            'professional': 'Professional Package',
            'enterprise': 'Enterprise Package',
            'other': 'Other Services'
        };
        return serviceNames[serviceValue] || serviceValue;
    }

    formatBudgetRange(budgetValue) {
        const budgetRanges = {
            'under-300': 'Under $300',
            '300-500': '$300 - $500',
            '500-1000': '$500 - $1,000',
            'over-1000': 'Over $1,000'
        };
        return budgetRanges[budgetValue] || budgetValue;
    }

    formatTimeline(timelineValue) {
        const timelines = {
            'asap': 'As soon as possible',
            '1-month': 'Within a month',
            '2-3-months': '2-3 months',
            'flexible': 'Flexible timeline'
        };
        return timelines[timelineValue] || timelineValue;
    }

    renderNextSteps() {
        const stepsContainer = document.getElementById('next-steps-container');
        if (!stepsContainer) return;

        const steps = this.dataHandler.getProcessSteps();

        const stepsHTML = steps.map(step =>
            UIComponents.generateProcessStep(step)
        ).join('');

        stepsContainer.innerHTML = stepsHTML;
    }

    renderContactInfo() {
        const contactInfoContainer = document.getElementById('contact-info');
        if (!contactInfoContainer) return;

        const contactMethods = this.dataHandler.getContactMethods();
        const contactHTML = UIComponents.generateContactInfo(contactMethods);

        contactInfoContainer.innerHTML = contactHTML;
    }

    clearDraftData() {
        // Clear the draft form data since the form was successfully submitted
        StorageHandler.removeData('draftFormData');
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
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.formResponseApp = new FormResponseApp();
});
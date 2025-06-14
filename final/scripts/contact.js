
import { DataHandler } from './data-handler.js';
import { UIComponents } from './ui-components.js';
import { StorageHandler } from './storage-handler.js';

class ContactApp {
    constructor() {
        this.dataHandler = new DataHandler();
        this.form = document.getElementById('contact-form');
        this.init();
    }

    async init() {
        try {
            // Load data from JSON file
            await this.dataHandler.fetchData();

            // Render content
            this.renderContactMethods();
            this.renderContactInfo();

            // Setup form handling
            this.setupFormHandling();
            this.setupNavigation();
            this.loadSavedFormData();

        } catch (error) {
            console.error('Failed to initialize contact app:', error);
            this.showErrorMessage();
        }
    }

    renderContactMethods() {
        const methodsContainer = document.getElementById('contact-methods-container');
        if (!methodsContainer) return;

        const methods = this.dataHandler.getContactMethods();

        const methodsHTML = methods.map(method =>
            UIComponents.generateContactMethodCard(method)
        ).join('');

        methodsContainer.innerHTML = methodsHTML;
    }

    renderContactInfo() {
        const contactInfoContainer = document.getElementById('contact-info');
        if (!contactInfoContainer) return;

        const contactMethods = this.dataHandler.getContactMethods();
        const contactHTML = UIComponents.generateContactInfo(contactMethods);

        contactInfoContainer.innerHTML = contactHTML;
    }

    setupFormHandling() {
        if (!this.form) return;

        // Form submission handler
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });

        // Auto-save form data as user types
        const formInputs = this.form.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                this.autoSaveFormData();
            });
        });

        // Form validation
        this.setupFormValidation();
    }

    setupFormValidation() {
        const requiredFields = this.form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
        });

        // Email validation
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('input', () => {
                this.validateEmail(emailField);
            });
        }
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldContainer = field.closest('.form-group');

        // Remove existing error message
        const existingError = fieldContainer.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        if (!value && field.hasAttribute('required')) {
            this.showFieldError(field, 'This field is required');
            return false;
        }

        fieldContainer.classList.remove('error');
        return true;
    }

    validateEmail(field) {
        const email = field.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const fieldContainer = field.closest('.form-group');

        // Primero remover cualquier error existente
        const existingError = fieldContainer.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        fieldContainer.classList.remove('error');

        // Solo mostrar error si hay texto y no es válido
        if (email && !emailRegex.test(email)) {
            this.showFieldError(field, 'Please enter a valid email address');
            return false;
        }

        return true;
    }

    showFieldError(field, message) {
        const fieldContainer = field.closest('.form-group');

        // Remover error existente primero
        const existingError = fieldContainer.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        fieldContainer.classList.add('error');

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        fieldContainer.appendChild(errorDiv);
    }

    handleFormSubmission() {
        // Validate all required fields
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Validate email specifically
        const emailField = document.getElementById('email');
        if (emailField && !this.validateEmail(emailField)) {
            isValid = false;
        }

        if (!isValid) {
            this.showFormError('Please correct the errors above and try again.');
            return;
        }

        // Collect form data
        const formData = this.collectFormData();

        // Save form data to localStorage
        StorageHandler.saveFormData(formData);

        // Submit the form
        this.form.submit();
    }

    collectFormData() {
        const formData = new FormData(this.form);
        const data = {};

        // Convert FormData to regular object
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        return data;
    }

    autoSaveFormData() {
        const formData = this.collectFormData();
        StorageHandler.saveData('draftFormData', formData);
    }

    loadSavedFormData() {
        const savedData = StorageHandler.loadData('draftFormData');
        if (!savedData) return;

        // Fill form with saved data
        Object.keys(savedData).forEach(key => {
            const field = this.form.querySelector(`[name="${key}"]`);
            if (field) {
                if (field.type === 'checkbox') {
                    field.checked = savedData[key] === 'yes';
                } else {
                    field.value = savedData[key];
                }
            }
        });
    }

    showFormError(message) {
        // Remove existing error message
        const existingError = this.form.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }

        // Create and show new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;

        const submitButton = this.form.querySelector('.submit-button');
        submitButton.parentNode.insertBefore(errorDiv, submitButton);
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

    showErrorMessage() {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="error-message">
                    <div class="container">
                        <h2>Sorry, we're experiencing technical difficulties</h2>
                        <p>Please try refreshing the page or contact us directly.</p>
                        <a href="mailto:info@azzelera.com" class="cta-button">Email Us</a>
                    </div>
                </div>
            `;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.contactApp = new ContactApp();
});
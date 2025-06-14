// Data Handler Module - Manages all data operations
export class DataHandler {
    constructor() {
        this.data = null;
        this.dataUrl = 'data/data.json';
    }

    // Fetch data from JSON file with error handling
    async fetchData() {
        try {
            const response = await fetch(this.dataUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.data = await response.json();
            return this.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    // Get services data
    getServices() {
        return this.data?.services || [];
    }

    // Get projects data
    getProjects() {
        return this.data?.projects || [];
    }

    // Get testimonials data
    getTestimonials() {
        return this.data?.testimonials || [];
    }

    // Get pricing plans data
    getPricingPlans() {
        return this.data?.pricingPlans || [];
    }

    // Get additional services data
    getAdditionalServices() {
        return this.data?.additionalServices || [];
    }

    // Get FAQ data
    getFAQ() {
        return this.data?.faq || [];
    }

    // Get contact methods data
    getContactMethods() {
        return this.data?.contactMethods || [];
    }

    // Get process steps data
    getProcessSteps() {
        return this.data?.processSteps || [];
    }

    // Filter data using array methods
    filterServicesByPrice(maxPrice) {
        return this.getServices().filter(service => service.price.amount <= maxPrice);
    }

    // Find service by ID
    findServiceById(id) {
        return this.getServices().find(service => service.id === id);
    }

    // Get popular pricing plan
    getPopularPlan() {
        return this.getPricingPlans().find(plan => plan.popular === true);
    }
}
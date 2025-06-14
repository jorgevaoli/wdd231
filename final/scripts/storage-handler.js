// Storage Handler Module - Manages local storage operations
export class StorageHandler {
    
    // Save data to localStorage
    static saveData(key, data) {
        try {
            const jsonData = JSON.stringify(data);
            localStorage.setItem(key, jsonData);
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }

    // Load data from localStorage
    static loadData(key) {
        try {
            const jsonData = localStorage.getItem(key);
            return jsonData ? JSON.parse(jsonData) : null;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return null;
        }
    }

    // Remove data from localStorage
    static removeData(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }

    // Save form data
    static saveFormData(formData) {
        const timestamp = new Date().toISOString();
        const dataWithTimestamp = {
            ...formData,
            submittedAt: timestamp
        };
        return this.saveData('contactFormData', dataWithTimestamp);
    }

    // Load form data
    static loadFormData() {
        return this.loadData('contactFormData');
    }

    // Save user preferences
    static saveUserPreferences(preferences) {
        return this.saveData('userPreferences', preferences);
    }

    // Load user preferences
    static loadUserPreferences() {
        return this.loadData('userPreferences') || {
            theme: 'light',
            newsletter: false,
            lastVisit: null
        };
    }

    // Update last visit timestamp
    static updateLastVisit() {
        const preferences = this.loadUserPreferences();
        preferences.lastVisit = new Date().toISOString();
        return this.saveUserPreferences(preferences);
    }

    // Save viewed services for analytics
    static saveViewedService(serviceId) {
        const viewed = this.loadData('viewedServices') || [];
        if (!viewed.includes(serviceId)) {
            viewed.push(serviceId);
            this.saveData('viewedServices', viewed);
        }
    }

    // Get viewed services
    static getViewedServices() {
        return this.loadData('viewedServices') || [];
    }

    // Clear all stored data
    static clearAllData() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
}
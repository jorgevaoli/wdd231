// UI Components Module - Handles dynamic content generation
export class UIComponents {
    
    // Generate service cards using template literals
    static generateServiceCard(service) {
        const featuresHTML = service.features.map(feature => `<li>${feature}</li>`).join('');
        
        return `
            <div class="service-card" data-service-id="${service.id}">
                <div class="service-icon">${service.icon}</div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <ul class="service-features">
                    ${featuresHTML}
                </ul>
                <div class="service-price">${service.price.display}</div>
                <div class="service-duration">Duration: ${service.duration}</div>
                <button class="service-btn" data-service-id="${service.id}">Learn More</button>
            </div>
        `;
    }

    // Generate project cards
    static generateProjectCard(project) {
        const techHTML = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
        
        return `
            <div class="project-card">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${techHTML}
                    </div>
                    <div class="project-meta">
                        <span class="project-date">Completed: ${new Date(project.completionDate).toLocaleDateString()}</span>
                        <a href="${project.url}" target="_blank" class="project-link">View Live Site</a>
                    </div>
                </div>
            </div>
        `;
    }

    // Generate testimonial cards
    static generateTestimonialCard(testimonial) {
        const stars = '★'.repeat(testimonial.rating);
        
        return `
            <div class="testimonial-card">
                <div class="testimonial-header">
                    <img src="${testimonial.image}" alt="${testimonial.name}" loading="lazy">
                    <div class="testimonial-info">
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.position} at ${testimonial.company}</p>
                        <div class="rating">${stars}</div>
                    </div>
                </div>
                <div class="testimonial-content">
                    <p>"${testimonial.content}"</p>
                </div>
                <div class="testimonial-date">${new Date(testimonial.date).toLocaleDateString()}</div>
            </div>
        `;
    }

    // Generate pricing plan cards
    static generatePricingCard(plan) {
        const featuresHTML = plan.features.map(feature => `<li>${feature}</li>`).join('');
        const popularBadge = plan.popular ? '<div class="popular-badge">Most Popular</div>' : '';
        
        return `
            <div class="pricing-card ${plan.popular ? 'popular' : ''}">
                ${popularBadge}
                <div class="plan-header">
                    <h3>${plan.name}</h3>
                    <p>${plan.description}</p>
                    <div class="plan-price">${plan.price.display}</div>
                </div>
                <ul class="plan-features">
                    ${featuresHTML}
                </ul>
                <button class="plan-btn" data-plan-id="${plan.id}">${plan.buttonText}</button>
            </div>
        `;
    }

    // Generate additional service cards
    static generateAdditionalServiceCard(service) {
        const featuresHTML = service.features.map(feature => `<li>${feature}</li>`).join('');
        
        return `
            <div class="additional-service-card">
                <h4>${service.name}</h4>
                <p>${service.description}</p>
                <ul class="service-features">
                    ${featuresHTML}
                </ul>
                <div class="service-meta">
                    <span class="service-price">${service.price.display}</span>
                    <span class="service-duration">${service.duration}</span>
                </div>
            </div>
        `;
    }

    // Generate FAQ items
    static generateFAQItem(faq, index) {
        return `
            <div class="faq-item">
                <div class="faq-question" data-faq-index="${index}">
                    <h3>${faq.question}</h3>
                    <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                    <p>${faq.answer}</p>
                </div>
            </div>
        `;
    }

    // Generate contact method cards
    static generateContactMethodCard(method) {
        return `
            <div class="contact-method-card">
                <div class="contact-icon">${method.icon}</div>
                <h3>${method.type}</h3>
                <p>${method.description}</p>
                <div class="contact-value">${method.value}</div>
                <div class="response-time">Response time: ${method.responseTime}</div>
            </div>
        `;
    }

    // Generate process step cards
    static generateProcessStep(step) {
        return `
            <div class="process-step">
                <div class="step-icon">${step.icon}</div>
                <div class="step-number">${step.number}</div>
                <h3>${step.title}</h3>
                <p>${step.description}</p>
                <div class="step-duration">${step.duration}</div>
            </div>
        `;
    }

    // Generate contact info for footer
    static generateContactInfo(contactMethods) {
        return contactMethods.map(method => `
            <div class="contact-item">
                <span>${method.icon}</span>
                <span>${method.value}</span>
            </div>
        `).join('');
    }
}
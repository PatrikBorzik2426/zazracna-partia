// Function to load content from JSON and populate HTML elements for services page
async function loadServicesContent() {
    try {
        // Use the cache manager utility for fetching JSON
        const data = await fetchJSON('./json/services.json');
        
        // Load simple text content
        const textElements = ['services_title', 'services_description', 'pricing_title', 'gallery_title', 'gallery_description'];
        textElements.forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.innerHTML = data[key];
                console.log(`Content loaded for element: ${key}`);
            } else {
                console.warn(`Element with ID '${key}' not found in the DOM`);
            }
        });
        
        // Load pricing cards
        const pricingContainer = document.getElementById('pricing_container');
        if (pricingContainer && data.pricing) {
            pricingContainer.innerHTML = data.pricing.map((service, index) => `
                <div class="border-2 border-primary rounded-lg p-6 bg-secondary/5 hover:bg-primary/10 transition-colors animate-fade-up animate-delay-${(index + 1) * 200}">
                    <h3 class="text-2xl font-cherry text-primary mb-2">${service.name}</h3>
                    <p class="text-secondary font-bold text-xl mb-4">${service.price}</p>
                    <p class="text-primary">${service.description}</p>
                </div>
            `).join('');
            console.log('Pricing cards loaded');
        }
        
        // Load gallery images
        const galleryContainer = document.getElementById('gallery_container');
        if (galleryContainer && data.gallery_images) {
            galleryContainer.innerHTML = data.gallery_images.map((image, index) => `
                <div class="relative group animate-fade-up animate-delay-${(index + 1) * 200}">
                    <img src="${image.src}" alt="${image.alt}" class="w-full h-64 object-cover rounded-lg border-2 border-primary" loading="lazy">
                    <div class="absolute inset-0 bg-primary opacity-0 group-hover:opacity-95 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                        <p class="text-white text-center px-4 font-cherry text-xl">${image.caption}</p>
                    </div>
                </div>
            `).join('');
            console.log('Gallery images loaded');
        }
        
        console.log('All services content loaded successfully');
        
    } catch (error) {
        console.error('Error loading services content:', error);
    }
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadServicesContent);
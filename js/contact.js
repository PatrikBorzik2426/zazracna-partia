// Function to load content from JSON and populate HTML elements for contact page
async function loadContactContent() {
    try {
        // Use the cache manager utility for fetching JSON
        const data = await fetchJSON('./json/contact.json');
        
        // Iterate through each key-value pair in the JSON
        Object.keys(data).forEach(key => {
            // Find the element with the matching ID
            const element = document.getElementById(key);
            
            // If element exists, set its innerHTML to the corresponding value
            if (element) {
                element.innerHTML = data[key];
                console.log(`Content loaded for element: ${key}`);
            } else {
                console.warn(`Element with ID '${key}' not found in the DOM`);
            }
        });
        
        console.log('Contact content loaded successfully');
        
    } catch (error) {
        console.error('Error loading contact content:', error);
    }
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadContactContent);
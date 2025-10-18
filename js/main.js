// Function to load content from JSON and populate HTML elements
async function loadContent() {
    try {
        // Fetch the JSON file
        const response = await fetch('./json/main.json');
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse the JSON data
        const data = await response.json();
        
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
        
        console.log('All content loaded successfully');
        
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadContent);

// Alternative: You can also call it manually
// loadContent();
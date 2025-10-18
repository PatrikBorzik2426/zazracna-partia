// Function to load events from JSON and populate the events container
async function loadEvents() {
    try {
        // Fetch the events JSON file
        const response = await fetch('./json/event.json');
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse the JSON data
        const data = await response.json();
        
        // Find the events container element
        const eventsContainer = document.getElementById('events_container');
        
        if (!eventsContainer) {
            console.error('Events container element not found');
            return;
        }
        
        // Clear existing content
        eventsContainer.innerHTML = '';
        
        // Get current date for filtering
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set to start of day for comparison
        
        // Filter events to show only upcoming ones (from today onwards)
        const upcomingEvents = data.events.filter(event => {
            // Parse the date from DD.MM.YYYY format
            const [day, month, year] = event.date.split('.');
            const eventDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            eventDate.setHours(0, 0, 0, 0); // Set to start of day for comparison
            
            // Return true if event date is today or in the future
            return eventDate >= currentDate;
        });
        
        // Sort upcoming events by date (earliest first)
        upcomingEvents.sort((a, b) => {
            const [dayA, monthA, yearA] = a.date.split('.');
            const [dayB, monthB, yearB] = b.date.split('.');
            const dateA = new Date(parseInt(yearA), parseInt(monthA) - 1, parseInt(dayA));
            const dateB = new Date(parseInt(yearB), parseInt(monthB) - 1, parseInt(dayB));
            return dateA - dateB;
        });
        
        // Check if there are any upcoming events
        if (upcomingEvents.length === 0) {
            eventsContainer.innerHTML = `
                <div class="text-center text-primary p-8">
                    <p class="text-xl font-cherry">Momentálne nemáme naplánované žiadne verejné akcie.</p>
                    <p class="mt-2">Sledujte nás pre najnovšie informácie o nadchádzajúcich podujatiach!</p>
                </div>
            `;
            console.log('No upcoming events found');
            return;
        }
        
        // Generate HTML for each upcoming event
        upcomingEvents.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'flex flex-col gap-2 border-2 border-primary rounded-md p-4 mx-auto';
            
            // Generate activities HTML
            const activitiesHTML = event.activities.map(activity => 
                `<div class="flex items-center justify-center mt-2 text-primary text-md">
                    <img src="./img/check.svg" alt="check icon" class="inline w-4 h-4 mr-2">
                    <p class="font-bold">${activity}</p>
                </div>`
            ).join('');
            
            // Create the complete event card HTML
            eventDiv.innerHTML = `
                <h3 class="font-cherry text-primary text-3xl">${event.title}</h3>
                <p class="font-bold text-secondary">${event.place}</p>
                <p class="font-bold text-secondary">${event.date}</p>
                <p class="my-2">
                    ${event.description}
                </p>
                ${activitiesHTML}
                <a href="${event.link}" class="mt-6 bg-primary text-white px-8 py-2 rounded-full w-fit mx-auto hover:bg-secondary transition-colors duration-200">
                    Viac o akcií
                </a>
            `;
            
            // Append to container
            eventsContainer.appendChild(eventDiv);
        });
        
        console.log(`Successfully loaded ${upcomingEvents.length} upcoming events out of ${data.events.length} total events`);
        
    } catch (error) {
        console.error('Error loading events:', error);
        
        // Show fallback message if loading fails
        const eventsContainer = document.getElementById('events_container');
        if (eventsContainer) {
            eventsContainer.innerHTML = `
                <div class="text-center text-red-600 p-4">
                    <p>Chyba pri načítavaní udalostí. Skúste to neskôr.</p>
                </div>
            `;
        }
    }
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadEvents);
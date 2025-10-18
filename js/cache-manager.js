// Cache management utility
class CacheManager {
    constructor() {
        this.version = null;
    }
    
    // Load version info for cache-busting
    async getVersion() {
        if (this.version) return this.version;
        
        try {
            // Always fetch version file fresh (use timestamp cache-buster)
            const response = await fetch(`./json/version.json?t=${Date.now()}`, {
                cache: 'no-store'
            });
            
            if (response.ok) {
                this.version = await response.json();
                return this.version;
            }
        } catch (error) {
            console.warn('Could not load version info, using timestamp fallback');
        }
        
        // Fallback to current timestamp
        return { cacheBuster: Date.now() };
    }
    
    // Get cache-busted URL
    async getCacheBustedUrl(url) {
        const version = await this.getVersion();
        return `${url}?v=${version.cacheBuster}`;
    }
    
    // Force refresh version (call this when you update JSON files)
    refreshVersion() {
        this.version = null;
    }
}

// Create global cache manager instance
window.cacheManager = new CacheManager();

// Utility function to fetch JSON with cache-busting
async function fetchJSON(url) {
    const cacheBustedUrl = await window.cacheManager.getCacheBustedUrl(url);
    
    const response = await fetch(cacheBustedUrl, {
        cache: 'no-store',
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        }
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
}
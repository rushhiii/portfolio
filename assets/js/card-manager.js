/**
 * Nexus Card Manager
 * A powerful configuration manager for the dynamic portfolio card
 */

class NexusCardManager {
    constructor() {
        this.config = {};
        this.isInitialized = false;
        this.observers = [];
    }

    /**
     * Initialize the card manager
     */
    async init() {
        try {
            await this.loadConfig();
            this.isInitialized = true;
            this.notifyObservers('init', this.config);
            return true;
        } catch (error) {
            console.error('Failed to initialize card manager:', error);
            return false;
        }
    }

    /**
     * Load configuration from JSON file
     */
    async loadConfig(configPath = './assets/config/card-config.json') {
        try {
            const response = await fetch(configPath);
            if (!response.ok) {
                throw new Error(`Failed to load config: ${response.status}`);
            }
            this.config = await response.json();
            return this.config;
        } catch (error) {
            console.error('Error loading configuration:', error);
            throw error;
        }
    }

    /**
     * Update configuration
     */
    updateConfig(updates, save = false) {
        this.config = this.deepMerge(this.config, updates);
        this.notifyObservers('update', this.config);
        
        if (save) {
            this.saveConfig();
        }
        
        return this.config;
    }

    /**
     * Get current configuration
     */
    getConfig() {
        return { ...this.config };
    }

    /**
     * Update profile information
     */
    updateProfile(profileData) {
        return this.updateConfig({ profile: profileData });
    }

    /**
     * Update skills
     */
    updateSkills(skills) {
        return this.updateConfig({ skills });
    }

    /**
     * Add a social link
     */
    addSocialLink(socialLink) {
        const currentLinks = this.config.socialLinks || [];
        currentLinks.push(socialLink);
        return this.updateConfig({ socialLinks: currentLinks });
    }

    /**
     * Remove a social link
     */
    removeSocialLink(platform) {
        const currentLinks = this.config.socialLinks || [];
        const filteredLinks = currentLinks.filter(link => link.platform !== platform);
        return this.updateConfig({ socialLinks: filteredLinks });
    }

    /**
     * Update social link
     */
    updateSocialLink(platform, updates) {
        const currentLinks = this.config.socialLinks || [];
        const linkIndex = currentLinks.findIndex(link => link.platform === platform);
        
        if (linkIndex !== -1) {
            currentLinks[linkIndex] = { ...currentLinks[linkIndex], ...updates };
            return this.updateConfig({ socialLinks: currentLinks });
        }
        
        return this.config;
    }

    /**
     * Update theme colors
     */
    updateTheme(themeData) {
        const currentProfile = this.config.profile || {};
        const currentCustomization = this.config.customization || {};
        
        return this.updateConfig({
            profile: { ...currentProfile, themeColor: themeData.themeColor },
            customization: { ...currentCustomization, ...themeData }
        });
    }

    /**
     * Enable/disable animations
     */
    updateAnimations(animationSettings) {
        return this.updateConfig({ animations: animationSettings });
    }

    /**
     * Save configuration to localStorage (since we can't write files from browser)
     */
    saveConfig() {
        try {
            localStorage.setItem('nexusCardConfig', JSON.stringify(this.config));
            this.notifyObservers('save', this.config);
            return true;
        } catch (error) {
            console.error('Failed to save configuration:', error);
            return false;
        }
    }

    /**
     * Load configuration from localStorage
     */
    loadFromStorage() {
        try {
            const stored = localStorage.getItem('nexusCardConfig');
            if (stored) {
                this.config = JSON.parse(stored);
                this.notifyObservers('load', this.config);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Failed to load from storage:', error);
            return false;
        }
    }

    /**
     * Export configuration as JSON string
     */
    exportConfig() {
        return JSON.stringify(this.config, null, 2);
    }

    /**
     * Import configuration from JSON string
     */
    importConfig(configString) {
        try {
            const newConfig = JSON.parse(configString);
            this.config = newConfig;
            this.notifyObservers('import', this.config);
            return true;
        } catch (error) {
            console.error('Failed to import configuration:', error);
            return false;
        }
    }

    /**
     * Reset to default configuration
     */
    resetToDefault() {
        this.config = this.getDefaultConfig();
        this.notifyObservers('reset', this.config);
        return this.config;
    }

    /**
     * Get default configuration
     */
    getDefaultConfig() {
        return {
            profile: {
                name: "Your Name",
                location: "Your Location",
                bannerImage: "./assets/ele/repo_banner.png",
                profileImage: "./assets/ele/profile_pic.png",
                themeColor: "#306dcb"
            },
            skills: ["Skill 1", "Skill 2"],
            socialLinks: [
                {
                    platform: "GitHub",
                    url: "https://github.com/yourusername",
                    icon: "github",
                    tooltip: "GitHub Profile"
                }
            ],
            footer: {
                text: "Made by You",
                url: "https://your-website.com",
                showHeart: true
            },
            animations: {
                enableHover3D: true,
                enableRippleEffect: true,
                enableParallax: true
            },
            customization: {
                cardWidth: "430px",
                cardBorderRadius: "24px",
                glowIntensity: "20px",
                backgroundType: "solid",
                backgroundColor: "#0a0a0a"
            }
        };
    }

    /**
     * Validate configuration
     */
    validateConfig(config = this.config) {
        const errors = [];

        // Validate profile
        if (!config.profile) {
            errors.push("Profile section is required");
        } else {
            if (!config.profile.name) errors.push("Profile name is required");
            if (!config.profile.themeColor) errors.push("Theme color is required");
        }

        // Validate social links
        if (config.socialLinks && Array.isArray(config.socialLinks)) {
            config.socialLinks.forEach((link, index) => {
                if (!link.platform) errors.push(`Social link ${index + 1}: platform is required`);
                if (!link.url) errors.push(`Social link ${index + 1}: URL is required`);
                if (!link.icon) errors.push(`Social link ${index + 1}: icon is required`);
            });
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Add observer for configuration changes
     */
    addObserver(callback) {
        this.observers.push(callback);
    }

    /**
     * Remove observer
     */
    removeObserver(callback) {
        const index = this.observers.indexOf(callback);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    /**
     * Notify all observers of changes
     */
    notifyObservers(event, data) {
        this.observers.forEach(callback => {
            try {
                callback(event, data);
            } catch (error) {
                console.error('Observer callback error:', error);
            }
        });
    }

    /**
     * Deep merge utility
     */
    deepMerge(target, source) {
        const output = { ...target };
        
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (this.isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, { [key]: source[key] });
                    } else {
                        output[key] = this.deepMerge(target[key], source[key]);
                    }
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        
        return output;
    }

    /**
     * Check if value is object
     */
    isObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    }

    /**
     * Generate preview URL for the card
     */
    generatePreviewUrl() {
        const baseUrl = window.location.origin + window.location.pathname;
        return baseUrl.replace('nexus_card.html', '') + 'nexus_card.html';
    }

    /**
     * Get available themes
     */
    getAvailableThemes() {
        return {
            'blue': { color: '#306dcb', name: 'Ocean Blue' },
            'purple': { color: '#8b5cf6', name: 'Royal Purple' },
            'green': { color: '#10b981', name: 'Emerald Green' },
            'red': { color: '#ef4444', name: 'Crimson Red' },
            'orange': { color: '#f97316', name: 'Sunset Orange' },
            'pink': { color: '#ec4899', name: 'Cherry Pink' },
            'teal': { color: '#14b8a6', name: 'Teal' },
            'indigo': { color: '#6366f1', name: 'Indigo' }
        };
    }

    /**
     * Apply predefined theme
     */
    applyTheme(themeName) {
        const themes = this.getAvailableThemes();
        const theme = themes[themeName];
        
        if (theme) {
            return this.updateTheme({
                themeColor: theme.color
            });
        }
        
        return this.config;
    }

    /**
     * Get social platform templates
     */
    getSocialPlatforms() {
        return [
            { platform: 'GitHub', icon: 'github', baseUrl: 'https://github.com/' },
            { platform: 'LinkedIn', icon: 'linkedin', baseUrl: 'https://linkedin.com/in/' },
            { platform: 'Twitter', icon: 'twitter', baseUrl: 'https://twitter.com/' },
            { platform: 'Discord', icon: 'discord', baseUrl: 'https://discord.gg/' },
            { platform: 'YouTube', icon: 'youtube', baseUrl: 'https://youtube.com/' },
            { platform: 'Spotify', icon: 'spotify', baseUrl: 'https://open.spotify.com/user/' },
            { platform: 'Steam', icon: 'steam', baseUrl: 'https://steamcommunity.com/id/' },
            { platform: 'Email', icon: 'email', baseUrl: 'mailto:' }
        ];
    }
}

// Create global instance
const nexusCardManager = new NexusCardManager();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NexusCardManager;
}

// Make available globally
window.NexusCardManager = NexusCardManager;
window.nexusCardManager = nexusCardManager;

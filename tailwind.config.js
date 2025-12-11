/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                aqi: {
                    good: '#00E400',
                    moderate: '#FFFF00',
                    unhealthy_sensitive: '#FF7E00',
                    unhealthy: '#FF0000',
                    very_unhealthy: '#8F3F97',
                    hazardous: '#7E0023',
                },
                // Environmental theme colors
                primary: '#2d6a4f',        // Forest green
                secondary: '#52b788',      // Light green
                accent: '#74c69d',         // Mint green
                earth: '#8b7355',          // Earth brown
                sky: '#a8dadc',            // Sky blue
                background: '#f1faee',     // Off-white with green tint
                card: '#ffffff',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
            backgroundImage: {
                'nature-gradient': 'linear-gradient(135deg, #f1faee 0%, #a8dadc 50%, #52b788 100%)',
                'earth-gradient': 'linear-gradient(135deg, #2d6a4f 0%, #52b788 100%)',
            },
        },
    },
    plugins: [],
}

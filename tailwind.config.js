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
                primary: '#667eea',
                secondary: '#764ba2',
                background: '#f5f7fa',
                card: '#ffffff',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
}

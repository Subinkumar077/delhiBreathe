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
                    good: '#4CAF50',
                    adequate: '#8BC34A',
                    moderate: '#FFC107',
                    poor: '#FF5722',
                    verypoor: '#F44336',
                    severe: '#9C27B0',
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

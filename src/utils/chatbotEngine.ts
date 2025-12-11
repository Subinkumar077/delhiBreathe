import { chatbotFAQs, greetings } from '../data/chatbotKnowledge';
import type { FAQItem } from '../types/chatbot';
import type { SensorReading } from '../types/sensor';

// Helper function to get AQI category
function getAQICategory(aqi: number): string {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
}

export class ChatbotEngine {
    private faqs: FAQItem[];
    private sensorData: SensorReading | null = null;
    private askedQuestions: Set<string> = new Set();

    constructor() {
        this.faqs = chatbotFAQs;
    }

    // Update sensor data from Firebase
    public updateSensorData(data: SensorReading) {
        this.sensorData = data;
    }

    // Track asked questions
    public markQuestionAsked(question: string) {
        this.askedQuestions.add(question.toLowerCase());
    }

    // Get suggested questions based on context, excluding already asked ones
    private getSuggestedQuestions(context: string): string[] {
        const suggestions: string[] = [];
        const contextLower = context.toLowerCase();

        // Context-based suggestions
        if (contextLower.includes('aqi') && contextLower.includes('current')) {
            suggestions.push(
                "What should I do when AQI is high?",
                "Show me current pollutants",
                "How can I reduce PM2.5?"
            );
        } else if (contextLower.includes('pollutant') && contextLower.includes('current')) {
            suggestions.push(
                "How can I reduce PM2.5?",
                "Do air purifiers work?",
                "What are the health effects?"
            );
        } else if (contextLower.includes('pm2.5')) {
            suggestions.push(
                "What is PM10?",
                "How can I reduce PM2.5?",
                "Do air purifiers work?"
            );
        } else if (contextLower.includes('pm10')) {
            suggestions.push(
                "What is PM2.5?",
                "How can I reduce PM10?",
                "Should I wear a mask?"
            );
        } else if (contextLower.includes('carbon monoxide') || contextLower.includes('co')) {
            suggestions.push(
                "How can I reduce Carbon Monoxide?",
                "What is NO2?",
                "What are the health effects?"
            );
        } else if (contextLower.includes('nitrogen dioxide') || contextLower.includes('no2')) {
            suggestions.push(
                "How can I reduce Nitrogen Dioxide?",
                "What is CO?",
                "Is it safe to exercise outdoors?"
            );
        } else if (contextLower.includes('ammonia') || contextLower.includes('nh3')) {
            suggestions.push(
                "How can I reduce Ammonia?",
                "What causes air pollution?",
                "Can indoor plants help?"
            );
        } else if (contextLower.includes('health')) {
            suggestions.push(
                "Who is most vulnerable?",
                "Should I wear a mask?",
                "How can I protect my children?"
            );
        } else if (contextLower.includes('reduce') || contextLower.includes('lower')) {
            suggestions.push(
                "Do air purifiers work?",
                "Can indoor plants help?",
                "What are the long-term solutions?"
            );
        } else if (contextLower.includes('air purifier')) {
            suggestions.push(
                "How can I reduce PM2.5?",
                "Can indoor plants help?",
                "What should I do when AQI is high?"
            );
        } else if (contextLower.includes('mask')) {
            suggestions.push(
                "What should I do when AQI is high?",
                "Is it safe to exercise outdoors?",
                "How can I protect my children?"
            );
        } else if (contextLower.includes('exercise') || contextLower.includes('outdoor')) {
            suggestions.push(
                "What is the current AQI?",
                "Should I wear a mask?",
                "What are the health effects?"
            );
        } else if (contextLower.includes('children') || contextLower.includes('kids')) {
            suggestions.push(
                "What should I do when AQI is high?",
                "Should I wear a mask?",
                "Do air purifiers work?"
            );
        } else {
            // Default suggestions
            suggestions.push(
                "What is the current AQI?",
                "Show me current pollutants",
                "What are the health effects?",
                "How can I reduce PM2.5?"
            );
        }

        // Filter out already asked questions
        return suggestions
            .filter(q => !this.askedQuestions.has(q.toLowerCase()))
            .slice(0, 3);
    }

    // Format suggestions as text
    private formatSuggestions(suggestions: string[]): string {
        if (suggestions.length === 0) return '';
        return '\n\n━━━━━━━━━━━━━━━━━━━━━━\nYou might also want to ask:\n' + 
               suggestions.map((q, i) => `${i + 1}. ${q}`).join('\n');
    }

    // Calculate similarity score between user input and FAQ keywords
    private calculateSimilarity(userInput: string, faq: FAQItem): number {
        const input = userInput.toLowerCase();
        let score = 0;

        // Check for keyword matches
        for (const keyword of faq.keywords) {
            if (input.includes(keyword.toLowerCase())) {
                score += 10;
            }
        }

        // Check for question similarity
        const questionWords = faq.question.toLowerCase().split(' ');
        for (const word of questionWords) {
            if (word.length > 3 && input.includes(word)) {
                score += 5;
            }
        }

        return score;
    }

    // Find best matching FAQ
    private findBestMatch(userInput: string): FAQItem | null {
        let bestMatch: FAQItem | null = null;
        let highestScore = 0;

        for (const faq of this.faqs) {
            const score = this.calculateSimilarity(userInput, faq);
            if (score > highestScore) {
                highestScore = score;
                bestMatch = faq;
            }
        }

        // Return match only if score is above threshold
        return highestScore >= 10 ? bestMatch : null;
    }

    // Check if input is a greeting
    private isGreeting(input: string): boolean {
        const greetingWords = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
        const lowerInput = input.toLowerCase();
        return greetingWords.some(word => lowerInput.includes(word));
    }

    // Check if input is asking about current AQI
    private isAskingCurrentAQI(input: string): boolean {
        const aqiKeywords = ['current', 'now', 'today', 'real-time', 'live', 'present', 'what is the', 'show me'];
        const lowerInput = input.toLowerCase();
        return lowerInput.includes('aqi') && aqiKeywords.some(word => lowerInput.includes(word));
    }

    // Check if asking about current pollutants
    private isAskingCurrentPollutants(input: string): boolean {
        const pollutantKeywords = ['pollutant', 'pm2.5', 'pm10', 'co', 'no2', 'nh3', 'carbon monoxide', 'nitrogen dioxide', 'ammonia'];
        const currentKeywords = ['current', 'now', 'today', 'real-time', 'live', 'present', 'what is the', 'show me'];
        const lowerInput = input.toLowerCase();
        return pollutantKeywords.some(p => lowerInput.includes(p)) && currentKeywords.some(c => lowerInput.includes(c));
    }

    // Check if asking about specific pollutant value
    private isAskingSpecificPollutant(input: string): string | null {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('pm2.5') || lowerInput.includes('pm 2.5')) return 'PM2.5';
        if (lowerInput.includes('pm10') || lowerInput.includes('pm 10')) return 'PM10';
        if (lowerInput.includes('co') || lowerInput.includes('carbon monoxide')) return 'CO';
        if (lowerInput.includes('no2') || lowerInput.includes('nitrogen dioxide')) return 'NO2';
        if (lowerInput.includes('nh3') || lowerInput.includes('ammonia')) return 'NH3';
        return null;
    }

    // Generate current AQI response with real data
    private getCurrentAQIResponse(): string {
        if (!this.sensorData) {
            return "I don't have access to real-time data right now. Please check the dashboard for current AQI values.";
        }

        const { aqi, aqiCategory } = this.sensorData;
        const category = getAQICategory(aqi);
        
        let healthAdvice = '';
        if (aqi <= 50) {
            healthAdvice = 'Air quality is excellent! Perfect for all outdoor activities.';
        } else if (aqi <= 100) {
            healthAdvice = 'Air quality is acceptable. Sensitive individuals should consider limiting prolonged outdoor exertion.';
        } else if (aqi <= 150) {
            healthAdvice = 'Unhealthy for sensitive groups. Children, elderly, and people with respiratory conditions should reduce outdoor activities.';
        } else if (aqi <= 200) {
            healthAdvice = 'Unhealthy air quality. Everyone should reduce prolonged outdoor exertion. Wear N95 masks if going outside.';
        } else if (aqi <= 300) {
            healthAdvice = 'Very unhealthy! Avoid all outdoor activities. Keep windows closed and use air purifiers indoors.';
        } else {
            healthAdvice = 'HAZARDOUS conditions! Stay indoors with air purifiers. Avoid all outdoor exposure. This is a health emergency.';
        }

        const response = `📊 Current Air Quality Index (AQI)\n\n` +
               `AQI: ${aqi}\n` +
               `Category: ${category}\n` +
               `Status: ${aqiCategory}\n\n` +
               `${healthAdvice}\n\n` +
               `Last updated: ${new Date(this.sensorData.timestamp).toLocaleString()}`;

        const suggestions = this.getSuggestedQuestions(response);
        return response + this.formatSuggestions(suggestions);
    }

    // Generate current pollutants response
    private getCurrentPollutantsResponse(): string {
        if (!this.sensorData) {
            return "I don't have access to real-time data right now. Please check the dashboard for current pollutant values.";
        }

        const { pm25, pm10, gas1_ppm, gas2_ppm, gas3_ppm } = this.sensorData;
        const co_mg = (gas1_ppm * 1.145).toFixed(2);

        const response = `🌫️ Current Major Air Pollutants\n\n` +
               `• PM2.5: ${pm25} µg/m³\n` +
               `• PM10: ${pm10} µg/m³\n` +
               `• CO (Carbon Monoxide): ${co_mg} mg/m³\n` +
               `• NO2 (Nitrogen Dioxide): ${gas2_ppm} ppm\n` +
               `• NH3 (Ammonia): ${gas3_ppm} ppm\n\n` +
               `These values are updated in real-time from our sensor network.`;

        const suggestions = this.getSuggestedQuestions(response);
        return response + this.formatSuggestions(suggestions);
    }

    // Generate specific pollutant response
    private getSpecificPollutantResponse(pollutant: string): string {
        if (!this.sensorData) {
            return `I don't have access to real-time ${pollutant} data right now. Please check the dashboard.`;
        }

        const { pm25, pm10, gas1_ppm, gas2_ppm, gas3_ppm } = this.sensorData;
        let response = '';
        
        switch (pollutant) {
            case 'PM2.5':
                response = `📊 Current PM2.5 Level\n\n` +
                       `Value: ${pm25} µg/m³\n\n` +
                       `PM2.5 are fine particles that can penetrate deep into your lungs. ` +
                       `Safe level is below 30 µg/m³. ${pm25 > 30 ? 'Current level is elevated. Use HEPA air purifiers and avoid outdoor activities.' : 'Current level is acceptable.'}`;
                break;
            
            case 'PM10':
                response = `📊 Current PM10 Level\n\n` +
                       `Value: ${pm10} µg/m³\n\n` +
                       `PM10 are coarse particles that can irritate your airways. ` +
                       `Safe level is below 50 µg/m³. ${pm10 > 50 ? 'Current level is elevated. Keep windows closed and use air purifiers.' : 'Current level is acceptable.'}`;
                break;
            
            case 'CO':
                const co_mg = (gas1_ppm * 1.145).toFixed(2);
                response = `📊 Current CO (Carbon Monoxide) Level\n\n` +
                       `Value: ${co_mg} mg/m³\n\n` +
                       `CO is a colorless, odorless gas that reduces oxygen delivery to your organs. ` +
                       `Safe level is below 2 mg/m³. ${parseFloat(co_mg) > 2 ? 'Current level is elevated. Ensure proper ventilation and check gas appliances.' : 'Current level is safe.'}`;
                break;
            
            case 'NO2':
                response = `📊 Current NO2 (Nitrogen Dioxide) Level\n\n` +
                       `Value: ${gas2_ppm} ppm\n\n` +
                       `NO2 irritates airways and can aggravate asthma. ` +
                       `Safe level is below 0.05 ppm. ${gas2_ppm > 0.05 ? 'Current level is elevated. Improve kitchen ventilation and avoid idling vehicles.' : 'Current level is acceptable.'}`;
                break;
            
            case 'NH3':
                response = `📊 Current NH3 (Ammonia) Level\n\n` +
                       `Value: ${gas3_ppm} ppm\n\n` +
                       `NH3 has a strong odor and irritates eyes, nose, and throat. ` +
                       `Safe level is below 0.2 ppm. ${gas3_ppm > 0.2 ? 'Current level is elevated. Ensure proper ventilation when using cleaning products.' : 'Current level is safe.'}`;
                break;
            
            default:
                return this.getCurrentPollutantsResponse();
        }

        const suggestions = this.getSuggestedQuestions(response);
        return response + this.formatSuggestions(suggestions);
    }

    // Generate response based on user input
    public generateResponse(userInput: string): string {
        // Track this question
        this.markQuestionAsked(userInput);

        // Handle empty input
        if (!userInput.trim()) {
            return "I didn't catch that. Could you please ask your question again?";
        }

        // Handle greetings
        if (this.isGreeting(userInput)) {
            const greeting = greetings[Math.floor(Math.random() * greetings.length)];
            const suggestions = this.getSuggestedQuestions('greeting');
            return greeting + this.formatSuggestions(suggestions);
        }

        // Handle current AQI queries with real data
        if (this.isAskingCurrentAQI(userInput)) {
            return this.getCurrentAQIResponse();
        }

        // Handle current pollutants queries
        if (this.isAskingCurrentPollutants(userInput)) {
            return this.getCurrentPollutantsResponse();
        }

        // Handle specific pollutant queries
        const specificPollutant = this.isAskingSpecificPollutant(userInput);
        if (specificPollutant) {
            const currentKeywords = ['current', 'now', 'today', 'real-time', 'live', 'present', 'what is the', 'show me'];
            if (currentKeywords.some(k => userInput.toLowerCase().includes(k))) {
                return this.getSpecificPollutantResponse(specificPollutant);
            }
        }

        // Find best matching FAQ
        const match = this.findBestMatch(userInput);
        
        if (match) {
            const suggestions = this.getSuggestedQuestions(match.answer);
            return match.answer + this.formatSuggestions(suggestions);
        }

        // Default response when no match found
        const defaultResponse = "I'm not sure about that specific question. I can help you with:\n\n• Current AQI and pollutant levels (real-time data)\n• Understanding AQI and pollutants (PM2.5, PM10, CO, NO2, NH3)\n• Health effects of air pollution\n• How to reduce indoor pollution\n• Protective measures during high AQI\n• Air purifier recommendations\n• Mask usage guidelines";
        
        const suggestions = this.getSuggestedQuestions('default');
        return defaultResponse + this.formatSuggestions(suggestions);
    }

    // Get all FAQs for display
    public getAllFAQs(): FAQItem[] {
        return this.faqs;
    }

    // Get random greeting
    public getGreeting(): string {
        return greetings[Math.floor(Math.random() * greetings.length)];
    }
}

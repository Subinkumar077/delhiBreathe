import type { FAQItem } from '../types/chatbot';

export const chatbotFAQs: FAQItem[] = [
    {
        question: "What is AQI?",
        answer: "AQI stands for Air Quality Index. It's a number used to communicate how polluted the air currently is or how polluted it is forecast to become. The AQI scale ranges from 0-500, where higher values indicate greater levels of air pollution and greater health concerns.",
        keywords: ["aqi", "air quality index", "what is", "meaning", "definition"]
    },
    {
        question: "What are the AQI categories?",
        answer: "AQI is divided into 6 categories:\n• Good (0-50): Air quality is satisfactory\n• Moderate (51-100): Acceptable for most people\n• Unhealthy for Sensitive Groups (101-150): May affect children, elderly, and people with respiratory conditions\n• Unhealthy (151-200): Everyone may experience health effects\n• Very Unhealthy (201-300): Health alert, everyone may experience serious effects\n• Hazardous (301-500): Emergency conditions, entire population affected",
        keywords: ["categories", "levels", "ranges", "scale", "classification"]
    },
    {
        question: "What is PM2.5?",
        answer: "PM2.5 refers to fine particulate matter with a diameter of 2.5 micrometers or smaller. These tiny particles can penetrate deep into your lungs and even enter your bloodstream. Major sources include vehicle emissions, industrial processes, construction dust, biomass burning, and cooking smoke. PM2.5 is one of the most dangerous air pollutants.",
        keywords: ["pm2.5", "pm 2.5", "particulate matter", "fine particles", "dust"]
    },
    {
        question: "What is PM10?",
        answer: "PM10 refers to coarse particulate matter with a diameter of 10 micrometers or smaller. These particles can irritate your eyes, nose, and throat. Common sources include road dust, construction activities, industrial emissions, pollen, and mold spores. While larger than PM2.5, PM10 can still cause respiratory problems.",
        keywords: ["pm10", "pm 10", "coarse particles", "dust particles"]
    },
    {
        question: "What is Carbon Monoxide (CO)?",
        answer: "Carbon Monoxide (CO) is a colorless, odorless gas produced by incomplete combustion of fuels. It reduces oxygen delivery to your body's organs and tissues. Sources include vehicle exhaust, gas stoves, furnaces, water heaters, and tobacco smoke. High levels can be life-threatening.",
        keywords: ["co", "carbon monoxide", "gas", "colorless", "odorless"]
    },
    {
        question: "What is Nitrogen Dioxide (NO2)?",
        answer: "Nitrogen Dioxide (NO2) is a reddish-brown gas with a pungent odor. It irritates airways and can aggravate respiratory diseases like asthma. Major sources include gas stoves, vehicle exhaust, power plants, and industrial facilities. Indoor NO2 from gas cooking is a significant health concern.",
        keywords: ["no2", "nitrogen dioxide", "gas stoves", "vehicle exhaust"]
    },
    {
        question: "What is Ammonia (NH3)?",
        answer: "Ammonia (NH3) is a colorless gas with a strong, pungent odor. It irritates the eyes, nose, and throat. Common sources include cleaning products, fertilizers, pet waste, and decomposing organic matter. Always use ammonia-based cleaners in well-ventilated areas.",
        keywords: ["nh3", "ammonia", "cleaning products", "smell", "odor"]
    },
    {
        question: "How can I reduce PM2.5 in my home?",
        answer: "To reduce PM2.5:\n• Use HEPA air purifiers (99.97% filtration)\n• Avoid indoor smoking completely\n• Use proper kitchen ventilation while cooking\n• Wet mop instead of dry sweeping\n• Seal windows during high outdoor pollution (AQI > 150)\n• Avoid burning candles or incense\n• Keep indoor plants for natural air purification",
        keywords: ["reduce pm2.5", "lower pm2.5", "decrease pollution", "air purifier", "hepa"]
    },
    {
        question: "How can I reduce PM10 in my home?",
        answer: "To reduce PM10:\n• Regular dusting with damp cloths\n• Remove shoes at entry points\n• Use doormats inside and outside\n• Minimize construction dust with barriers\n• Use air purifiers with pre-filters\n• Vacuum with HEPA filters\n• Keep windows closed during dusty conditions",
        keywords: ["reduce pm10", "lower pm10", "dust control", "cleaning"]
    },
    {
        question: "How can I reduce Carbon Monoxide?",
        answer: "To reduce CO:\n• Install CO detectors near sleeping areas\n• Service gas appliances annually\n• Never idle vehicles in garage\n• Ventilate when using gas appliances\n• Never use generators or grills indoors\n• Ensure proper chimney ventilation\n• Check for yellow flames on gas stoves (indicates incomplete combustion)",
        keywords: ["reduce co", "carbon monoxide safety", "co detector", "gas safety"]
    },
    {
        question: "How can I reduce Nitrogen Dioxide?",
        answer: "To reduce NO2:\n• Switch to electric or induction cooktops\n• Improve kitchen ventilation with external venting\n• Avoid idling vehicles near windows\n• Use air purifiers with activated carbon filters\n• Maintain gas appliances properly\n• Ensure blue flames on gas stoves (not yellow)\n• Open windows while cooking",
        keywords: ["reduce no2", "nitrogen dioxide reduction", "gas stove safety"]
    },
    {
        question: "How can I reduce Ammonia?",
        answer: "To reduce NH3:\n• Store cleaning products in sealed containers\n• Switch to natural cleaners (vinegar, baking soda)\n• Ventilate well during cleaning\n• Never mix ammonia with bleach\n• Maintain plumbing to prevent leaks\n• Clean pet litter boxes daily\n• Use odor-absorbing litter",
        keywords: ["reduce ammonia", "nh3 reduction", "cleaning safety", "natural cleaners"]
    },
    {
        question: "What should I do when AQI is high?",
        answer: "When AQI is high (>150):\n• Stay indoors as much as possible\n• Keep windows and doors closed\n• Run air purifiers continuously\n• Avoid outdoor exercise\n• Wear N95 masks if you must go outside\n• Monitor AQI levels regularly\n• Limit physical exertion\n• Stay hydrated\n• Consult a doctor if you have respiratory symptoms",
        keywords: ["high aqi", "bad air quality", "pollution day", "what to do", "precautions"]
    },
    {
        question: "What are the health effects of air pollution?",
        answer: "Air pollution can cause:\n• Short-term: Eye irritation, coughing, wheezing, shortness of breath, headaches, fatigue\n• Long-term: Reduced lung function, chronic respiratory diseases (asthma, COPD), cardiovascular diseases, increased risk of lung cancer, premature death\n• Vulnerable groups (children, elderly, pregnant women, people with existing conditions) face higher risks",
        keywords: ["health effects", "health impacts", "symptoms", "diseases", "risks"]
    },
    {
        question: "Who is most vulnerable to air pollution?",
        answer: "Most vulnerable groups include:\n• Children (developing lungs)\n• Elderly people (weakened immune systems)\n• Pregnant women (affects fetal development)\n• People with asthma or COPD\n• People with heart disease\n• Outdoor workers\n• Athletes and active individuals\nThese groups should take extra precautions during high pollution days.",
        keywords: ["vulnerable", "sensitive groups", "at risk", "children", "elderly"]
    },
    {
        question: "Do air purifiers really work?",
        answer: "Yes! HEPA air purifiers are highly effective:\n• Remove 99.97% of particles 0.3 microns or larger\n• Significantly reduce PM2.5 and PM10 indoors\n• Best results in sealed rooms\n• Choose appropriate size for your room\n• Run continuously for best results\n• Replace filters as recommended\n• Combine with activated carbon filters for gases (NO2, NH3)",
        keywords: ["air purifier", "hepa", "effective", "work", "filter"]
    },
    {
        question: "What is a good AQI level?",
        answer: "A good AQI level is between 0-50. At this level:\n• Air quality is satisfactory\n• Air pollution poses little or no risk\n• Safe for all outdoor activities\n• No health precautions needed\n• Ideal conditions for everyone including sensitive groups\nAim to keep indoor AQI below 50 for optimal health.",
        keywords: ["good aqi", "safe level", "healthy air", "target aqi"]
    },
    {
        question: "How often should I check AQI?",
        answer: "Check AQI:\n• Daily in the morning to plan your day\n• Before outdoor activities or exercise\n• When you notice haze or smell smoke\n• During pollution season (winter in Delhi)\n• If you have respiratory conditions, check multiple times daily\n• Use our real-time monitoring dashboard for live updates\n• Set up alerts for when AQI exceeds safe levels",
        keywords: ["check aqi", "monitor", "how often", "frequency", "when"]
    },
    {
        question: "Can indoor plants improve air quality?",
        answer: "Yes, but with limitations:\n• Plants can absorb some pollutants (CO2, VOCs)\n• NASA study showed certain plants filter air\n• Best plants: Snake plant, Spider plant, Peace lily, Aloe vera\n• Need many plants for significant effect (1 plant per 100 sq ft)\n• Not a replacement for air purifiers\n• Provide oxygen and psychological benefits\n• Avoid overwatering (can cause mold)",
        keywords: ["plants", "indoor plants", "natural purification", "green"]
    },
    {
        question: "What causes air pollution in Delhi?",
        answer: "Major causes in Delhi:\n• Vehicle emissions (largest contributor)\n• Industrial pollution\n• Construction dust\n• Crop burning in neighboring states (seasonal)\n• Firecrackers during festivals\n• Garbage burning\n• Power plants\n• Dust storms\n• Weather conditions (winter inversion traps pollutants)",
        keywords: ["causes", "sources", "delhi pollution", "why polluted", "reasons"]
    },
    {
        question: "Is it safe to exercise outdoors?",
        answer: "It depends on AQI:\n• AQI 0-50: Safe for all activities\n• AQI 51-100: Generally safe, sensitive groups should monitor symptoms\n• AQI 101-150: Reduce prolonged outdoor exertion\n• AQI 151-200: Avoid outdoor exercise\n• AQI >200: Stay indoors, no outdoor activities\nConsider indoor exercise alternatives during high pollution days. Exercise increases breathing rate, leading to more pollutant intake.",
        keywords: ["exercise", "outdoor activities", "running", "sports", "workout"]
    },
    {
        question: "What is the current AQI?",
        answer: "I can show you the current AQI with real-time data from our sensors. Just ask 'What is the current AQI?' or 'Show me current AQI' and I'll provide the exact value with health recommendations.",
        keywords: ["current aqi", "now", "today", "real-time", "live", "present aqi", "show aqi"]
    },
    {
        question: "What are the current pollutant levels?",
        answer: "I can show you real-time values for all major pollutants: PM2.5, PM10, CO, NO2, and NH3. Just ask 'Show me current pollutants' or 'What are current pollutant levels?' for exact measurements from our sensor network.",
        keywords: ["current pollutants", "pollutant levels", "current levels", "show pollutants", "live pollutants", "pollutant values"]
    },
    {
        question: "How does weather affect air quality?",
        answer: "Weather significantly impacts AQI:\n• Wind: Disperses pollutants (improves AQI)\n• Rain: Washes out particles (improves AQI)\n• Temperature inversion: Traps pollutants near ground (worsens AQI in winter)\n• Humidity: Can increase particle formation\n• Stagnant air: Allows pollutant accumulation\n• Sunlight: Creates secondary pollutants (ozone)\nWinter months typically have worst AQI due to temperature inversion.",
        keywords: ["weather", "temperature", "rain", "wind", "winter", "season"]
    },
    {
        question: "Should I wear a mask?",
        answer: "Mask recommendations by AQI:\n• AQI 0-100: Not necessary\n• AQI 101-150: Consider for sensitive groups\n• AQI 151-200: Recommended for everyone outdoors\n• AQI >200: Essential - use N95 or N99 masks\n\nMask tips:\n• N95/N99 masks filter 95-99% of particles\n• Ensure proper fit (no gaps)\n• Replace when breathing becomes difficult\n• Surgical masks don't protect against PM2.5",
        keywords: ["mask", "n95", "protection", "wear mask", "face mask"]
    },
    {
        question: "How can I protect my children?",
        answer: "Protect children from air pollution:\n• Keep them indoors during high AQI days\n• Use air purifiers in their rooms\n• Avoid outdoor play when AQI >100\n• Ensure school has air quality measures\n• Teach them about air pollution\n• Regular health checkups\n• Nutritious diet (antioxidants help)\n• Keep them hydrated\n• Monitor for respiratory symptoms\nChildren are more vulnerable as they breathe faster and their lungs are still developing.",
        keywords: ["children", "kids", "protect children", "school", "babies"]
    },
    {
        question: "What are the long-term solutions?",
        answer: "Long-term solutions require collective action:\n• Transition to electric vehicles\n• Improve public transportation\n• Stricter industrial emission controls\n• Ban crop burning, provide alternatives\n• Increase green cover (trees, parks)\n• Clean energy adoption (solar, wind)\n• Better urban planning\n• Waste management systems\n• Public awareness campaigns\n• Government policy enforcement\nIndividual actions matter, but systemic change is crucial.",
        keywords: ["solutions", "long-term", "fix pollution", "government", "policy"]
    }
];

export const quickReplies = [
    "Current AQI",
    "Current pollutants",
    "What is AQI?",
    "How to reduce PM2.5?",
    "Health effects",
    "Air purifier tips"
];

export const greetings = [
    "Hello! I'm your AQI assistant. Ask me anything about air quality, pollution levels, or how to protect yourself.",
    "Hi there! I can help you understand AQI, pollutants, and preventive measures. What would you like to know?",
    "Welcome! I'm here to answer your questions about air quality and health. How can I assist you today?"
];

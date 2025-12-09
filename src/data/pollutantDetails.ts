export interface PollutantDetail {
    id: string;
    name: string;
    fullName: string;
    reductionMethods: {
        title: string;
        description: string;
        effectiveness: 'High' | 'Medium' | 'Low';
    }[];
    healthImpacts: {
        range: string;
        level: string;
        effects: string[];
    }[];
    sources: string[];
}

export const pollutantDetails: Record<string, PollutantDetail> = {
    PM2_5: {
        id: 'PM2_5',
        name: 'PM2.5',
        fullName: 'Fine Particulate Matter (PM2.5)',
        reductionMethods: [
            {
                title: 'Use HEPA Air Purifiers',
                description: 'HEPA filters capture 99.97% of particles 0.3 microns or larger. Run continuously in bedrooms and living areas.',
                effectiveness: 'High'
            },
            {
                title: 'Avoid Indoor Smoking',
                description: 'Cigarette smoke is a major source of PM2.5. Maintain a strict no-smoking policy indoors.',
                effectiveness: 'High'
            },
            {
                title: 'Proper Kitchen Ventilation',
                description: 'Use exhaust fans while cooking and for 10 minutes after. Indian cooking (frying, tarka) releases significant PM2.5.',
                effectiveness: 'High'
            },
            {
                title: 'Wet Mopping Instead of Sweeping',
                description: 'Dry sweeping kicks dust into the air. Use wet mops or HEPA vacuums to trap particles.',
                effectiveness: 'Medium'
            },
            {
                title: 'Seal Windows During High Pollution',
                description: 'Keep windows closed when outdoor AQI exceeds 150. Use weather stripping to prevent infiltration.',
                effectiveness: 'Medium'
            }
        ],
        healthImpacts: [
            {
                range: '0-30 µg/m³',
                level: 'Good',
                effects: ['Minimal health risk', 'Safe for all groups', 'Normal outdoor activities recommended']
            },
            {
                range: '31-60 µg/m³',
                level: 'Satisfactory',
                effects: ['Minor breathing discomfort for sensitive individuals', 'Generally acceptable air quality']
            },
            {
                range: '61-90 µg/m³',
                level: 'Moderate',
                effects: ['Breathing discomfort for people with lung/heart disease', 'Reduced stamina during physical activity']
            },
            {
                range: '91-120 µg/m³',
                level: 'Poor',
                effects: ['Breathing discomfort for most people', 'Increased respiratory symptoms', 'Avoid prolonged outdoor exertion']
            },
            {
                range: '121-250 µg/m³',
                level: 'Very Poor',
                effects: ['Respiratory illness on prolonged exposure', 'Aggravation of heart and lung diseases', 'Stay indoors with air purifiers']
            },
            {
                range: '>250 µg/m³',
                level: 'Severe',
                effects: ['Serious health effects for everyone', 'Emergency conditions', 'Avoid all outdoor activities', 'Use N95 masks if you must go out']
            }
        ],
        sources: ['Vehicle emissions', 'Industrial processes', 'Construction dust', 'Biomass burning', 'Cooking smoke']
    },
    PM10: {
        id: 'PM10',
        name: 'PM10',
        fullName: 'Coarse Particulate Matter (PM10)',
        reductionMethods: [
            {
                title: 'Regular Dusting and Cleaning',
                description: 'Dust surfaces with damp cloths weekly. PM10 settles on surfaces and can be resuspended.',
                effectiveness: 'High'
            },
            {
                title: 'Remove Shoes at Entry',
                description: 'Outdoor dust on shoes is a major PM10 source. Keep a shoe rack at the entrance.',
                effectiveness: 'Medium'
            },
            {
                title: 'Use Doormats',
                description: 'Place doormats both outside and inside entrances to trap dust and dirt.',
                effectiveness: 'Medium'
            },
            {
                title: 'Minimize Construction Dust',
                description: 'If renovating, seal off work areas and use dust barriers. Clean thoroughly after work.',
                effectiveness: 'High'
            },
            {
                title: 'Air Purifiers with Pre-filters',
                description: 'Pre-filters capture larger PM10 particles before they reach HEPA filters, extending filter life.',
                effectiveness: 'High'
            }
        ],
        healthImpacts: [
            {
                range: '0-50 µg/m³',
                level: 'Good',
                effects: ['No health implications', 'Air quality is satisfactory']
            },
            {
                range: '51-100 µg/m³',
                level: 'Satisfactory',
                effects: ['Minor breathing discomfort for sensitive people', 'Acceptable air quality']
            },
            {
                range: '101-250 µg/m³',
                level: 'Moderate',
                effects: ['Breathing discomfort for people with lung disease', 'Throat irritation', 'Eye irritation']
            },
            {
                range: '251-350 µg/m³',
                level: 'Poor',
                effects: ['Breathing discomfort for most people', 'Coughing and wheezing', 'Reduced lung function']
            },
            {
                range: '351-430 µg/m³',
                level: 'Very Poor',
                effects: ['Respiratory illness on prolonged exposure', 'Aggravation of asthma', 'Cardiovascular stress']
            },
            {
                range: '>430 µg/m³',
                level: 'Severe',
                effects: ['Serious respiratory effects', 'Increased hospital admissions', 'Avoid all outdoor exposure']
            }
        ],
        sources: ['Road dust', 'Construction activities', 'Industrial emissions', 'Pollen', 'Mold spores']
    },
    CO: {
        id: 'CO',
        name: 'CO',
        fullName: 'Carbon Monoxide',
        reductionMethods: [
            {
                title: 'Install CO Detectors',
                description: 'Place CO detectors near sleeping areas and fuel-burning appliances. Replace batteries annually.',
                effectiveness: 'High'
            },
            {
                title: 'Proper Appliance Maintenance',
                description: 'Service gas stoves, water heaters, and furnaces annually. Ensure complete combustion.',
                effectiveness: 'High'
            },
            {
                title: 'Never Idle Vehicles in Garage',
                description: 'Even with garage door open, CO can seep into living spaces. Always move vehicles outside.',
                effectiveness: 'High'
            },
            {
                title: 'Ventilate When Using Gas Appliances',
                description: 'Open windows when using gas stoves. Ensure kitchen exhaust fans vent outside, not recirculate.',
                effectiveness: 'Medium'
            },
            {
                title: 'Avoid Portable Generators Indoors',
                description: 'Never use generators, grills, or camp stoves inside homes, garages, or near windows.',
                effectiveness: 'High'
            }
        ],
        healthImpacts: [
            {
                range: '0-1 mg/m³',
                level: 'Good',
                effects: ['No health effects', 'Normal oxygen delivery to organs']
            },
            {
                range: '1.1-2 mg/m³',
                level: 'Satisfactory',
                effects: ['Minimal effects', 'Safe for healthy individuals']
            },
            {
                range: '2.1-10 mg/m³',
                level: 'Moderate',
                effects: ['Reduced oxygen to heart', 'Mild headaches in sensitive individuals', 'Fatigue']
            },
            {
                range: '10.1-17 mg/m³',
                level: 'Poor',
                effects: ['Headaches', 'Dizziness', 'Nausea', 'Impaired judgment', 'Chest pain for heart patients']
            },
            {
                range: '17.1-34 mg/m³',
                level: 'Very Poor',
                effects: ['Severe headaches', 'Confusion', 'Visual disturbances', 'Cardiovascular stress', 'Seek fresh air immediately']
            },
            {
                range: '>34 mg/m³',
                level: 'Severe',
                effects: ['Loss of consciousness', 'Life-threatening', 'Permanent brain damage possible', 'Evacuate immediately']
            }
        ],
        sources: ['Vehicle exhaust', 'Gas stoves', 'Furnaces', 'Water heaters', 'Tobacco smoke', 'Generators']
    },
    NO2: {
        id: 'NO2',
        name: 'NO2',
        fullName: 'Nitrogen Dioxide',
        reductionMethods: [
            {
                title: 'Switch to Electric Appliances',
                description: 'Replace gas stoves with electric or induction cooktops. Gas combustion is a major indoor NO2 source.',
                effectiveness: 'High'
            },
            {
                title: 'Improve Kitchen Ventilation',
                description: 'Use range hoods that vent outside (not recirculating). Run during and after cooking.',
                effectiveness: 'High'
            },
            {
                title: 'Avoid Idling Near Windows',
                description: 'Vehicle exhaust contains high NO2. Don\'t idle cars near open windows or air intakes.',
                effectiveness: 'Medium'
            },
            {
                title: 'Use Air Purifiers with Activated Carbon',
                description: 'Activated carbon filters can absorb gaseous pollutants like NO2. Combine with HEPA filtration.',
                effectiveness: 'Medium'
            },
            {
                title: 'Maintain Gas Appliances',
                description: 'Ensure proper combustion with annual servicing. Blue flames indicate complete combustion; yellow flames indicate problems.',
                effectiveness: 'High'
            }
        ],
        healthImpacts: [
            {
                range: '0-40 µg/m³',
                level: 'Good',
                effects: ['No health effects', 'Normal respiratory function']
            },
            {
                range: '41-80 µg/m³',
                level: 'Satisfactory',
                effects: ['Minor irritation for very sensitive individuals', 'Generally safe']
            },
            {
                range: '81-180 µg/m³',
                level: 'Moderate',
                effects: ['Breathing discomfort for asthmatics', 'Reduced lung function', 'Increased airway inflammation']
            },
            {
                range: '181-280 µg/m³',
                level: 'Poor',
                effects: ['Breathing difficulties', 'Coughing and wheezing', 'Increased susceptibility to respiratory infections']
            },
            {
                range: '281-400 µg/m³',
                level: 'Very Poor',
                effects: ['Severe respiratory symptoms', 'Aggravation of asthma and COPD', 'Reduced immunity to lung infections']
            },
            {
                range: '>400 µg/m³',
                level: 'Severe',
                effects: ['Acute respiratory distress', 'Severe asthma attacks', 'Increased hospital admissions', 'Avoid all exposure']
            }
        ],
        sources: ['Gas stoves', 'Vehicle exhaust', 'Power plants', 'Industrial facilities', 'Kerosene heaters']
    },
    NH3: {
        id: 'NH3',
        name: 'NH3',
        fullName: 'Ammonia',
        reductionMethods: [
            {
                title: 'Proper Cleaning Product Storage',
                description: 'Store ammonia-based cleaners in sealed containers away from living areas. Use in well-ventilated spaces only.',
                effectiveness: 'High'
            },
            {
                title: 'Switch to Natural Cleaners',
                description: 'Use vinegar, baking soda, or plant-based cleaners instead of ammonia-based products.',
                effectiveness: 'High'
            },
            {
                title: 'Ventilate During Cleaning',
                description: 'Open windows and use fans when cleaning. Never mix ammonia with bleach (creates toxic gas).',
                effectiveness: 'High'
            },
            {
                title: 'Maintain Plumbing',
                description: 'Fix leaky pipes and ensure proper drainage. Stagnant water can release ammonia from decomposing organic matter.',
                effectiveness: 'Medium'
            },
            {
                title: 'Control Pet Waste',
                description: 'Clean litter boxes daily. Urine decomposition releases ammonia. Use odor-absorbing litter.',
                effectiveness: 'Medium'
            }
        ],
        healthImpacts: [
            {
                range: '0-200 ppb',
                level: 'Good',
                effects: ['No health effects', 'Odor may be detectable above 50 ppb']
            },
            {
                range: '200-400 ppb',
                level: 'Moderate',
                effects: ['Eye irritation', 'Throat irritation', 'Mild respiratory discomfort']
            },
            {
                range: '400-700 ppb',
                level: 'Poor',
                effects: ['Coughing', 'Burning sensation in nose and throat', 'Chest tightness', 'Difficulty breathing']
            },
            {
                range: '>700 ppb',
                level: 'Severe',
                effects: ['Severe respiratory irritation', 'Chemical burns to airways', 'Pulmonary edema', 'Evacuate and seek medical attention']
            }
        ],
        sources: ['Cleaning products', 'Fertilizers', 'Pet waste', 'Decomposing organic matter', 'Industrial emissions']
    }
};

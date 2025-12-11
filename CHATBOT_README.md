# AQI Chatbot Documentation 🤖

## Overview
AI-powered chatbot assistant that provides real-time AQI data, pollutant information, and health recommendations through voice and text interfaces.

## Features

### 💬 Text & Voice Input
- Type questions naturally or use voice input (Chrome/Edge)
- Automatic speech-to-text conversion
- Visual indicator when listening

### 📊 Real-Time Data
- Current AQI values from live sensors
- Exact pollutant levels (PM2.5, PM10, CO, NO2, NH3)
- Health recommendations based on current conditions
- Last update timestamp

### 🎯 Smart Suggestions
- Context-aware follow-up questions after each response
- Tracks asked questions to avoid repetition
- Clickable suggestion buttons for easy interaction

### 🧠 Knowledge Base
25+ FAQs covering:
- AQI basics and categories
- All pollutants and their effects
- Health impacts and vulnerable groups
- Reduction methods for each pollutant
- Protective measures and safety guidelines
- Air purifiers, masks, and equipment

## Quick Start

### Opening the Chatbot
Click the green floating button in the bottom-right corner of any page.

### Asking Questions

**Text Input:**
- Type your question and press Enter or click Send

**Voice Input:**
- Click microphone icon
- Speak clearly when icon turns red
- Question appears automatically

**Quick Replies:**
- Click any suggested question button

## Example Questions

### Real-Time Data
- "What is the current AQI?"
- "Show me current pollutants"
- "What is the current PM2.5?"

### General Information
- "What is AQI?"
- "How can I reduce PM2.5?"
- "What should I do when AQI is high?"
- "Do air purifiers work?"
- "Should I wear a mask?"

## Smart Suggestions

After each response, the bot suggests 3 relevant follow-up questions:

**Example:**
```
User: "What is the current AQI?"

Bot: 📊 Current Air Quality Index (AQI)
     AQI: 156
     Category: Unhealthy for Sensitive Groups
     ...
     
     You might also want to ask:
     [What should I do when AQI is high?]
     [Show me current pollutants]
     [How can I reduce PM2.5?]
```

Suggestions are context-aware and never repeat questions you've already asked.

## Technical Details

### Files
```
src/
├── components/chatbot/
│   ├── Chatbot.tsx           - Main interface
│   ├── ChatMessage.tsx       - Message display with suggestions
│   ├── QuickReply.tsx        - Quick reply buttons
│   └── TypingIndicator.tsx   - Typing animation
├── utils/chatbotEngine.ts    - AI response generation
├── data/chatbotKnowledge.ts  - 25+ FAQs
└── types/chatbot.ts          - TypeScript types
```

### Data Flow
```
Firebase → useFirebaseData → Chatbot → ChatbotEngine → Real-time Responses
```

### Browser Support
| Feature | Chrome | Edge | Firefox | Safari |
|---------|--------|------|---------|--------|
| Text Input | ✅ | ✅ | ✅ | ✅ |
| Voice Input | ✅ | ✅ | ❌ | ❌ |
| Real-time Data | ✅ | ✅ | ✅ | ✅ |
| Suggestions | ✅ | ✅ | ✅ | ✅ |

## Customization

### Adding FAQs
Edit `src/data/chatbotKnowledge.ts`:
```typescript
{
    question: "Your question?",
    answer: "Your answer...",
    keywords: ["keyword1", "keyword2"]
}
```

### Styling
Modify colors in component files to match your theme.

### Quick Replies
Update `quickReplies` array in `chatbotKnowledge.ts`.

## Troubleshooting

**Voice input not working?**
- Use Chrome or Edge browser
- Allow microphone permissions
- Check device microphone

**No real-time data?**
- Check Firebase connection
- Verify sensor data is available
- Refresh the page

## Summary

The chatbot provides:
- ✅ Real-time AQI and pollutant data
- ✅ Voice and text input
- ✅ Smart, context-aware suggestions
- ✅ No repeated questions
- ✅ 25+ comprehensive FAQs
- ✅ Clean, readable responses
- ✅ Mobile responsive design

Perfect for quick air quality checks and learning about pollution!

import type { Message } from '../../types/chatbot';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
    message: Message;
}

interface ChatMessageProps {
    message: Message;
    onSuggestionClick?: (suggestion: string) => void;
}

export default function ChatMessage({ message, onSuggestionClick }: ChatMessageProps) {
    const isBot = message.sender === 'bot';

    // Extract suggestions from message text
    const extractSuggestions = (text: string): { mainText: string; suggestions: string[] } => {
        const parts = text.split('━━━━━━━━━━━━━━━━━━━━━━\nYou might also want to ask:\n');
        if (parts.length === 1) {
            return { mainText: text, suggestions: [] };
        }
        
        const mainText = parts[0].trim();
        const suggestionsText = parts[1];
        const suggestions = suggestionsText
            .split('\n')
            .map(line => line.replace(/^\d+\.\s*/, '').trim())
            .filter(s => s.length > 0);
        
        return { mainText, suggestions };
    };

    const { mainText, suggestions } = extractSuggestions(message.text);

    return (
        <div className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
            {isBot && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                </div>
            )}
            
            <div className={`max-w-[75%] ${isBot ? '' : 'flex flex-col items-end'}`}>
                <div
                    className={`rounded-2xl px-4 py-2 ${
                        isBot
                            ? 'bg-white text-gray-800 shadow-sm border border-gray-100'
                            : 'bg-gradient-to-r from-primary to-secondary text-white'
                    }`}
                >
                    <p className="text-sm whitespace-pre-line leading-relaxed">{mainText}</p>
                    <p className={`text-xs mt-1 ${isBot ? 'text-gray-400' : 'text-white/70'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>

                {/* Suggested Questions */}
                {isBot && suggestions.length > 0 && onSuggestionClick && (
                    <div className="mt-2 space-y-1.5 w-full">
                        <p className="text-xs text-gray-500 px-1">You might also want to ask:</p>
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => onSuggestionClick(suggestion)}
                                className="w-full text-left px-3 py-2 text-xs bg-gray-50 hover:bg-primary/10 border border-gray-200 hover:border-primary/30 rounded-lg transition-colors text-gray-700 hover:text-primary"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {!isBot && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                </div>
            )}
        </div>
    );
}

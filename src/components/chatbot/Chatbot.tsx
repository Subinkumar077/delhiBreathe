import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, MicOff } from 'lucide-react';
import type { Message } from '../../types/chatbot';
import { ChatbotEngine } from '../../utils/chatbotEngine';
import { quickReplies } from '../../data/chatbotKnowledge';
import { useFirebaseData } from '../../hooks/useFirebaseData';
import ChatMessage from './ChatMessage.tsx';
import QuickReply from './QuickReply.tsx';
import TypingIndicator from './TypingIndicator.tsx';

const chatbotEngine = new ChatbotEngine();

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);
    const { data: sensorData } = useFirebaseData();

    // Update chatbot engine with real-time data
    useEffect(() => {
        if (sensorData) {
            chatbotEngine.updateSensorData(sensorData);
        }
    }, [sensorData]);

    // Initialize speech recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInputText(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = () => {
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Send initial greeting when chatbot opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const greeting = chatbotEngine.getGreeting();
            addBotMessage(greeting);
        }
    }, [isOpen]);

    const addBotMessage = (text: string) => {
        const botMessage: Message = {
            id: Date.now().toString(),
            text,
            sender: 'bot',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
    };

    const addUserMessage = (text: string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
    };

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        // Add user message
        addUserMessage(inputText);
        const userQuery = inputText;
        setInputText('');

        // Show typing indicator
        setIsTyping(true);

        // Generate bot response with realistic delay
        setTimeout(() => {
            const response = chatbotEngine.generateResponse(userQuery);
            setIsTyping(false);
            addBotMessage(response);
        }, 800);
    };

    const handleQuickReply = (reply: string) => {
        // Add user message
        addUserMessage(reply);
        
        // Show typing indicator
        setIsTyping(true);
        
        // Auto-send after a brief delay
        setTimeout(() => {
            const response = chatbotEngine.generateResponse(reply);
            setIsTyping(false);
            addBotMessage(response);
        }, 800);
    };

    const toggleVoiceInput = () => {
        if (!recognitionRef.current) {
            alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };



    return (
        <>
            {/* Chatbot Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50 group"
                    aria-label="Open chatbot"
                >
                    <MessageCircle className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                    <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Ask about AQI
                    </div>
                </button>
            )}

            {/* Chatbot Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 sm:w-96 sm:h-[600px]">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-t-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <MessageCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">AQI Assistant</h3>
                                <p className="text-xs text-white/80">Always here to help</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/20 rounded-full p-1 transition-colors"
                            aria-label="Close chatbot"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((message) => (
                            <ChatMessage 
                                key={message.id} 
                                message={message}
                                onSuggestionClick={handleQuickReply}
                            />
                        ))}
                        {isTyping && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Replies */}
                    {messages.length <= 1 && (
                        <div className="px-4 py-2 border-t border-gray-200 bg-white">
                            <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                            <div className="flex flex-wrap gap-2">
                                {quickReplies.slice(0, 3).map((reply, index) => (
                                    <QuickReply
                                        key={index}
                                        text={reply}
                                        onClick={() => handleQuickReply(reply)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                        <div className="flex items-center gap-2">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Ask about AQI, pollutants..."
                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                />
                                {isListening && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Voice Input Button */}
                            <button
                                onClick={toggleVoiceInput}
                                className={`p-2 rounded-full transition-colors ${
                                    isListening
                                        ? 'bg-red-500 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                                aria-label={isListening ? 'Stop listening' : 'Start voice input'}
                                title={isListening ? 'Stop listening' : 'Voice input'}
                            >
                                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                            </button>

                            {/* Send Button */}
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputText.trim()}
                                className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                aria-label="Send message"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-center">
                            Powered by AI • Real-time data
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export interface FAQItem {
    question: string;
    answer: string;
    keywords: string[];
}

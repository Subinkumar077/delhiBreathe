interface QuickReplyProps {
    text: string;
    onClick: () => void;
}

export default function QuickReply({ text, onClick }: QuickReplyProps) {
    return (
        <button
            onClick={onClick}
            className="px-3 py-1.5 text-xs bg-white border border-primary/30 text-primary rounded-full hover:bg-primary/10 transition-colors"
        >
            {text}
        </button>
    );
}

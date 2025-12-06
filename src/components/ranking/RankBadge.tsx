interface RankBadgeProps {
    rank: number;
}

export default function RankBadge({ rank }: RankBadgeProps) {
    if (rank === 1) {
        return <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center font-bold border-2 border-yellow-200">🥇</div>;
    }
    if (rank === 2) {
        return <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-bold border-2 border-gray-200">🥈</div>;
    }
    if (rank === 3) {
        return <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold border-2 border-orange-200">🥉</div>;
    }
    return <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center font-bold border border-gray-100">{rank}</div>;
}

import { getAqiColor } from '../../utils/aqiColors';

interface RankingCardProps {
    data: any;
    rank: number;
}

export default function RankingCard({ data, rank }: RankingCardProps) {
    return (
        <div className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-3">
            <div className="mr-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                    {rank}
                </div>
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-gray-900">{data.name}</h4>
                <p className="text-sm text-gray-500">{data.category}</p>
            </div>
            <div className="text-right">
                <div
                    className="text-lg font-bold px-3 py-1 rounded-lg text-white shadow-sm inline-block"
                    style={{ backgroundColor: getAqiColor(data.aqi) }}
                >
                    {data.aqi}
                </div>
            </div>
        </div>
    );
}

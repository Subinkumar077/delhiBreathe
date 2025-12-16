import { useState, useEffect } from "react";
import {
  TrendingUp,
  Calendar,
  Clock,
  BarChart3,
  AlertCircle,
  RefreshCw,
  Brain,
} from "lucide-react";

interface PredictionData {
  date?: string;
  day?: string;
  week?: number;
  start_date?: string;
  end_date?: string;
  month?: string;
  year?: number;
  aqi: number;
  confidence: {
    prediction: number;
    lower_bound: number;
    upper_bound: number;
  };
  category: string;
  color: string;
  description: string;
}

interface Predictions {
  daily: PredictionData[];
  weekly: PredictionData[];
  monthly: PredictionData[];
}

interface AQIPredictionCardProps {
  currentAQI: number;
}

export default function AQIPredictionCard({}: AQIPredictionCardProps) {
  const [predictions, setPredictions] = useState<Predictions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchPredictions = async () => {
    setLoading(true);
    setError(null);

    try {
      // --- CHANGE START: Call your local Python Backend ---
      const response = await fetch("http://localhost:8000/predict");

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("🔥 Data received from Python:", data); // Check console to show Judges!

      if (data.success || data.predictions) {
        // Handle structure variation (data.predictions or just data)
        const preds = data.predictions || data;
        setPredictions(preds);
        setLastUpdated(new Date());
      } else {
        throw new Error("Invalid data format from backend");
      }
      // --- CHANGE END ---
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Is the Python server running?"
      );
      console.error("Prediction error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();

    // Refresh predictions every 30 minutes
    const interval = setInterval(fetchPredictions, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const renderDailyPredictions = () => {
    if (!predictions?.daily) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {predictions.daily.map((pred, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border-2 hover:shadow-lg transition-all hover:-translate-y-1"
            style={{ borderColor: pred.color }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-gray-500 font-medium">{pred.day}</p>
                <p className="text-sm font-semibold text-gray-700">
                  {pred.date}
                </p>
              </div>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>

            <div className="mb-3">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-3xl font-bold"
                  style={{ color: pred.color }}
                >
                  {Math.round(pred.aqi)}
                </span>
                <span className="text-xs text-gray-500">AQI</span>
              </div>
              <span
                className="inline-block text-xs font-semibold text-white px-2 py-1 rounded-md mt-2"
                style={{ backgroundColor: pred.color }}
              >
                {pred.category}
              </span>
            </div>

            <div className="text-xs text-gray-600 mb-2">{pred.description}</div>

            <div className="text-xs text-gray-500 bg-gray-100 rounded-lg p-2">
              <div className="flex justify-between">
                <span>Range:</span>
                <span className="font-semibold">
                  {pred.confidence.lower_bound.toFixed(0)} -{" "}
                  {pred.confidence.upper_bound.toFixed(0)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderWeeklyPredictions = () => {
    if (!predictions?.weekly) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {predictions.weekly.map((pred, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 border-2 hover:shadow-lg transition-all"
            style={{ borderColor: pred.color }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Week {pred.week}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {pred.start_date} to {pred.end_date}
                </p>
              </div>
              <BarChart3 className="w-6 h-6 text-gray-400" />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-2">
                  <span
                    className="text-4xl font-bold"
                    style={{ color: pred.color }}
                  >
                    {Math.round(pred.aqi)}
                  </span>
                  <span className="text-sm text-gray-500">avg AQI</span>
                </div>
                <span
                  className="inline-block text-xs font-semibold text-white px-3 py-1 rounded-md"
                  style={{ backgroundColor: pred.color }}
                >
                  {pred.category}
                </span>
              </div>

              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${pred.color}20` }}
              >
                <TrendingUp
                  className="w-10 h-10"
                  style={{ color: pred.color }}
                />
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-3">{pred.description}</p>

            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Confidence Range</span>
                <span className="font-semibold">
                  {pred.confidence.lower_bound.toFixed(0)} -{" "}
                  {pred.confidence.upper_bound.toFixed(0)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${(pred.aqi / 500) * 100}%`,
                    backgroundColor: pred.color,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderMonthlyPredictions = () => {
    if (!predictions?.monthly) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {predictions.monthly.map((pred, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 hover:shadow-lg transition-all"
            style={{ borderColor: pred.color }}
          >
            <div className="text-center mb-4">
              <p className="text-2xl font-bold text-gray-800">{pred.month}</p>
              <p className="text-sm text-gray-500">{pred.year}</p>
            </div>

            <div className="flex flex-col items-center mb-4">
              <div
                className="w-32 h-32 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: `${pred.color}20` }}
              >
                <div className="text-center">
                  <span
                    className="text-4xl font-bold block"
                    style={{ color: pred.color }}
                  >
                    {Math.round(pred.aqi)}
                  </span>
                  <span className="text-xs text-gray-500">AQI</span>
                </div>
              </div>

              <span
                className="inline-block text-sm font-semibold text-white px-4 py-1.5 rounded-lg"
                style={{ backgroundColor: pred.color }}
              >
                {pred.category}
              </span>
            </div>

            <p className="text-sm text-gray-600 text-center mb-4">
              {pred.description}
            </p>

            <div className="bg-gray-100 rounded-lg p-3">
              <p className="text-xs text-gray-500 text-center mb-2">
                Confidence Range
              </p>
              <p className="text-sm font-semibold text-gray-700 text-center">
                {pred.confidence.lower_bound.toFixed(0)} -{" "}
                {pred.confidence.upper_bound.toFixed(0)}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="flex flex-col items-center justify-center py-12">
          <Brain className="w-16 h-16 text-primary animate-pulse mb-4" />
          <p className="text-lg font-semibold text-gray-700">
            Connecting to Neural Network...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Calling Python LSTM Model
          </p>
          <p className="text-xs text-blue-500 mt-4 animate-bounce">
            Waiting for localhost:8000...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-red-200 p-8">
        <div className="flex flex-col items-center justify-center py-8">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <p className="text-lg font-semibold text-gray-700">
            Connection Failed
          </p>
          <p className="text-sm text-red-500 mt-2">{error}</p>
          <p className="text-xs text-gray-400 mt-4">
            Make sure python main.py is running!
          </p>
          <button
            onClick={fetchPredictions}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                AI-Powered AQI Predictions
              </h2>
              <p className="text-sm text-white/90 mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Live from Python Backend • Updated{" "}
                {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
          </div>

          <button
            onClick={fetchPredictions}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
            title="Refresh predictions"
          >
            <RefreshCw className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex">
          <button
            onClick={() => setActiveTab("daily")}
            className={`flex-1 px-6 py-4 font-semibold transition-all ${
              activeTab === "daily"
                ? "text-primary border-b-3 border-primary bg-white"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Daily (7 Days)</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("weekly")}
            className={`flex-1 px-6 py-4 font-semibold transition-all ${
              activeTab === "weekly"
                ? "text-primary border-b-3 border-primary bg-white"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Weekly (4 Weeks)</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("monthly")}
            className={`flex-1 px-6 py-4 font-semibold transition-all ${
              activeTab === "monthly"
                ? "text-primary border-b-3 border-primary bg-white"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <BarChart3 className="w-5 h-5" />
              <span>Monthly (3 Months)</span>
            </div>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "daily" && renderDailyPredictions()}
        {activeTab === "weekly" && renderWeeklyPredictions()}
        {activeTab === "monthly" && renderMonthlyPredictions()}
      </div>

      {/* Footer Info */}
      <div className="px-6 pb-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <Brain className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">
                Real-time LSTM Model
              </p>
              <p className="text-xs text-blue-700 leading-relaxed">
                This data is coming directly from your local Python server
                running at <strong>localhost:8000</strong>. The LSTM neural
                network processes historical data to generate these confidence
                intervals dynamically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

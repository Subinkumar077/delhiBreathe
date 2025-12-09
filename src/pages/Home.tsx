import { useFirebaseData } from '../hooks/useFirebaseData';
import HomeMain from '../components/home/main';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ErrorBoundary from '../components/shared/ErrorBoundary';

export default function Home() {
    const { data, loading, error, connected } = useFirebaseData();

    if (loading) return <LoadingSpinner />;
    if (error || !data) return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-700">Unable to load data</h2>
            <p className="text-gray-500">Please check your connection or database configuration.</p>
        </div>
    );

    return (
        <ErrorBoundary>
            <HomeMain data={data} connected={connected} />
        </ErrorBoundary>
    );
}

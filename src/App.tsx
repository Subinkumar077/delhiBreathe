import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import AirPollutionMap from './pages/AirPollutionMap';
import Comparison from './pages/Comparison';
import Ranking from './pages/Ranking';
import Chatbot from './components/chatbot/Chatbot';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<AirPollutionMap />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/ranking" element={<Ranking />} />
        </Routes>
      </Layout>
      <Chatbot />
    </BrowserRouter>
  );
}

export default App;

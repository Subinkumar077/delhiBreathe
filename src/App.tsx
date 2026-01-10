import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import Home from './pages/Home';
import About from './pages/About';
import AirPollutionMap from './pages/AirPollutionMap';
import Comparison from './pages/Comparison';
import Ranking from './pages/Ranking';
import PollutantDetail from './pages/PollutantDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Chatbot from './components/chatbot/Chatbot';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page without Layout (has its own footer/nav) */}
        <Route path="/" element={<Landing />} />
        
        {/* About page without Layout */}
        <Route path="/about" element={<About />} />
        
        {/* Checkout pages without Layout */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        
        {/* Legal pages without Layout */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        
        {/* Dashboard and other pages with Layout */}
        <Route path="/dashboard" element={
          <Layout>
            <Home />
            <Chatbot />
          </Layout>
        } />
        <Route path="/map" element={
          <Layout>
            <AirPollutionMap />
            <Chatbot />
          </Layout>
        } />
        <Route path="/comparison" element={
          <Layout>
            <Comparison />
            <Chatbot />
          </Layout>
        } />
        <Route path="/ranking" element={
          <Layout>
            <Ranking />
            <Chatbot />
          </Layout>
        } />
        <Route path="/pollutant/:pollutantId" element={
          <Layout>
            <PollutantDetail />
            <Chatbot />
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

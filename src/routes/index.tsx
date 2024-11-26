import { Routes, Route } from 'react-router-dom';
import { GoalsPage } from '../pages/GoalsPage';
import { BurnoutPage } from '../pages/BurnoutPage';
import { TimePage } from '../pages/TimePage';
import { EthicsPage } from '../pages/EthicsPage';
import { WellbeingPage } from '../pages/WellbeingPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GoalsPage />} />
      <Route path="/burnout" element={<BurnoutPage />} />
      <Route path="/time" element={<TimePage />} />
      <Route path="/ethics" element={<EthicsPage />} />
      <Route path="/wellbeing" element={<WellbeingPage />} />
    </Routes>
  );
}
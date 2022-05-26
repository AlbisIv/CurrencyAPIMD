// npm i axios
// npm install react-router-dom@6
// npm install @reduxjs/toolkit react-redux
// createAPI middleware
import './App.scss';
import {
  BrowserRouter as Router, Route, Routes, NavLink,
} from 'react-router-dom';
import CurrenciesPage from './pages/CurrenciesPage/CurrenciesPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<CurrenciesPage />} />
      {/* <Route path="/pokemon/:name" element={<PokemonPage />} /> */}
      {/* <Route path="*" element={<Page404 />} /> */}
    </Routes>
  </Router>
);

export default App;

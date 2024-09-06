import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import TermUse from './Pages/FooterPages/TermUse';
import TermSales from './Pages/FooterPages/TermSales';
import TermCondition from './Pages/FooterPages/TermCondition';
import PrivacyPolicy from './Pages/FooterPages/PrivacyPolicy';
import ScrollToTop from "./UI/ScrollToTop/ScrollToTop"
import Blog from './Pages/Blogs/Blog';
import BlogDetail from './Pages/Blogs/BlogDetail/BlogDetail';
import CancellationPolicy from './Pages/FooterPages/CancellationPolicy';
import ReturnPolicy from './Pages/FooterPages/ReturnPolicy';


function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path='/term-use' element={<TermUse />} />
        <Route path='/term-sales' element={<TermSales />} />
        <Route path='/term-condition' element={<TermCondition />} />
        <Route path='/cancellation-policy' element={<CancellationPolicy />} />
        <Route path='/return-policy' element={<ReturnPolicy />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blogs/details/:id' element={<BlogDetail />} />
      </Routes>
    </div>
  );
}


export default App;

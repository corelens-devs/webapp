import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar/Navbar';
import LandingPage from './Pages/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import TermUse from './Pages/FooterPages/TermUse';
import TermSales from './Pages/FooterPages/TermSales';
import TermCondition from './Pages/FooterPages/TermCondition';
import PrivacyPolicy from './Pages/FooterPages/PrivacyPolicy';
import Layout from './UI/Layout/Layout';
import ScrollToTop from "./UI/ScrollToTop/ScrollToTop"
import Blog from './Pages/Blogs/Blog';
import BlogDetail from './Pages/Blogs/BlogDetail/BlogDetail';


function App() {
  return (
    <div className="App">
            <ScrollToTop />
      
{/* <Layout> */}
<Routes>
  <Route  exact path="/" element={<LandingPage/>}/>
  <Route path='/term-use' element={<TermUse/>} />
  <Route path='/term-sales' element={<TermSales/>} />
  <Route path='/term-condition' element={<TermCondition/>} />
  <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
  <Route path='/blog' element={<Blog/>} />
  <Route path='/blogs/details/:id' element={<BlogDetail/>} />

  </Routes>
  {/* </Layout> */}
    </div>
  );
}

export default App;

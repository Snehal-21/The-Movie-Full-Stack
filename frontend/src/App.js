
import './App.css';
import {Routes,Route} from "react-router-dom";
import PageNotFound from './Components/PageNotFound';
import Home from './Components/Home';
import Navbar from './Global/Navbar';
import Popular from './Components/Popular';
import Upcoming from './Components/Upcoming';
import TopRated from './Components/TopRated';


function App() {
  return (
   <>
   <Navbar />
    <Routes>
      <Route exact path="*" element={<PageNotFound />}/>
      <Route exact path="/" element={<Home />}/>
      <Route exact path="/popular" element={<Popular />} />
      <Route exact path="/upcoming" element={<Upcoming />} />
      <Route exact path="/toprated" element={<TopRated />} />
    </Routes>
   </>
  );
}

export default App;

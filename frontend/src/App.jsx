import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Comingsoon";
import Detail from "./components/Detail";
import Navbar from "./components/Navbar";
import ThreeCarouselLayout from "./components/ThreeCarouselLayout";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ThreeCarouselLayout />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Comingsoon";
import Detail from "./components/Detail";
import Navbar from "./components/Navbar";
import ThreeCarouselLayout from "./components/ThreeCarouselLayout";
import HomePage from "./pages/HomePage";
import MembacaPage from "./pages/MembacaPage";
import BookReader from "./pages/BookReader";
import ChatPage from "./pages/ChatPage";
import ImageGeneratorPage from "./pages/ImageGeneratorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/membaca" element={<MembacaPage />} />
        <Route path="/membaca/:id" element={<BookReader />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/imagegenerator" element={<ImageGeneratorPage />} />
        <Route path="/legacy" element={<ThreeCarouselLayout />} />
      </Routes>
    </Router>
  );
}

export default App;

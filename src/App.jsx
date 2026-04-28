import { BrowserRouter, Routes, Route } from "react-router-dom";
import Selection from "./components/Selection";
import VideoNavbar from "./components/VideoNavbar";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Selection />} />
        <Route path="/video" element={<VideoNavbar />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
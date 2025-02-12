import { Routes, BrowserRouter, Route } from "react-router-dom";

function App() {
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  </BrowserRouter>
}

export default App
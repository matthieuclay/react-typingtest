import { BrowserRouter, Routes, Route } from "react-router-dom";
import TypingTest from "./components/TypingTest";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Scoreboard from "./components/Scoreboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TypingTest />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

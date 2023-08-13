import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import VideoDetail from "./views/VideoDetail/VideoDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="detail" element={<VideoDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

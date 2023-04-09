import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Schedule from "./components/Schedule";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/enroll' element={<Form />} />
          <Route path='/schedule' element={<Schedule />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

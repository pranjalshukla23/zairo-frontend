import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/enroll' element={<Form />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

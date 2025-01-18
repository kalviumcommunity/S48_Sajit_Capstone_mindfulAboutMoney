import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;

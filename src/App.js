import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SearchDetail from "./searchdetail/routes/SearchDetail";
import Finance from "./finance/routes/Finance";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/enterprises"                 element={<SearchDetail />} />
        <Route exact path="/enterprises/:eno/finance"    element={<Finance />} />
      </Routes>
    </Router>
  );
}

export default App;

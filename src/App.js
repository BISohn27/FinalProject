import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SearchDetail from "./searchdetail/routes/SearchDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/businesses" element={
          <SearchDetail/>
        }
        />
      </Routes>
    </Router>
  );
}

export default App;

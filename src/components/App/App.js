import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./Navbar";
import PokemonGrid from "./PokemonGrid";
import Searchbar from "./Searchbar";
import PokemonDetails from "pages/PokemonDetails";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Searchbar />
              <PokemonGrid />
            </>
          }
          />
          <Route path="/description" element={<PokemonDetails />}
          />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;

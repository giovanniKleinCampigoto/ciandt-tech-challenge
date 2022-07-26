import Navbar from "./Navbar";
import PokemonGrid from "./PokemonGrid";
import Searchbar from "./Searchbar";

function App() {
  return (
    <div className="container">
      <Navbar />
      <Searchbar />
      <PokemonGrid />
    </div>
  );
}

export default App;

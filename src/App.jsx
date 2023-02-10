import React, { useState, useCallback } from "react";
import debounce from "just-debounce-it";
import "./App.css";
import useMovies from "./hooks/useMovies";
import useSearch from "./hooks/useSearch";
//import withoutResults from "../mocks/no-result.json";
import { Movies } from "./components/Movies";

function App() {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });
  // const inputRef = useRef();

  const debounceGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 300),
    [getMovies]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({ search });
    //javascript
    //forma no controlada
    //const fields = Object.fromEntries(new FormData(e.target));
    // const data = e.target.result

    // const inputValue = inputRef.current.value;
  };

  const handleChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    debounceGetMovies({ search: newSearch });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div>
      <header>
        <h1>Buscador de Películas</h1>
        <form
          className="form"
          onSubmit={handleSubmit}
        >
          <input
            onChange={handleChange}
            value={search}
            name="query"
            type="text"
            placeholder="Avengers, Start Wars...."
            // ref={inputRef}
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
          />
          <input
            type="checkbox"
            name="check"
            onChange={handleSort}
            checked={sort}
          />
          <button type="submit">Buscar</button>
        </form>
        {error && <p className="error">{error}</p>}
      </header>

      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;

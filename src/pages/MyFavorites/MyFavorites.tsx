import { useEffect, useState } from "react";
import { MovieCard } from "components/MovieCard";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";
import { MoviesContainer } from "./styles";

const Favorites = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [showNoFavorites, setShowNoFavorites] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getFavorites = () => {
    const jsonData = localStorage.getItem("movies");
    const favorites = JSON.parse(jsonData!);

    if (!favorites) return;

    setMovies(favorites);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowNoFavorites(movies.length === 0);
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [movies]);

  return (
    <Box sx={{ margin: "100px 50px 0px 50px" }}>
      <h1
        style={{
          fontSize: "50px",
          fontWeight: 700,
          margin: "0px 0px 20px 35px",
          textTransform: "uppercase",
        }}
      >
        My Favorites
      </h1>

      <MoviesContainer>
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : movies?.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              path={movie.poster}
              title={movie.title}
              voteAverage={movie.rating}
              genreId={movie.genre}
              movieId={movie.id}
            />
          ))
        ) : showNoFavorites ? (
          <div>No favorites found</div>
        ) : (
          <div>Loading...</div>
        )}
      </MoviesContainer>
    </Box>
  );
};

export default Favorites;

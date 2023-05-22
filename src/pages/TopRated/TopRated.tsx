import { Box, Typography } from "@mui/material";
import { MovieCard } from "components/MovieCard";
import React, { useEffect, useState } from "react";
import { getPopular, getRated } from "services";
import { CSSTransition } from "react-transition-group";

const TopRated = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getRatedMovies = async () => {
    await getRated()
      .then((res) => {
        if (res && res.data) {
          setMovies(res.data.results);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  useEffect(() => {
    getRatedMovies();
  }, []);

  return (
    <CSSTransition in={isLoaded} timeout={5000} classNames="fade" unmountOnExit>
      <Box sx={{ margin: "50px 0px 0px 200px" }}>
        <Typography
          variant="h1"
          component="div"
          sx={{
            flexGrow: 1,
            display: {
              xs: "none",
              sm: "block",
              fontWeight: 700,
              color: "black",
              fontSize: "50px",
              padding: "50px 0px 50px 0px",
            },
          }}
        >
          TOP RATED
        </Typography>
        {movies?.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              path={movie.poster_path}
              title={movie.title}
              voteAverage={movie.vote_average}
              genreId={movie.genre_ids[0]}
              movieId={movie.id}
            />
          ))
        ) : (
          <div>Cargando</div>
        )}
      </Box>
    </CSSTransition>
  );
};

export default TopRated;
function setIsLoaded(arg0: boolean) {
  throw new Error("Function not implemented.");
}


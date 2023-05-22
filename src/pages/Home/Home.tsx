import React, { useEffect, useState } from "react";
import { MovieCard } from "components/MovieCard";
import { movies } from "constants/moviesMock";
import { Box, Typography } from "@mui/material";
import { getPlaying, getPopular, getRated } from "services";
import { GridScroll, ScrollContainer } from "./styles";
import { CSSTransition } from "react-transition-group";

const Home = () => {
  const [playing, setPlaying] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getNowPlaying = async () => {
    await getPlaying()
      .then((res) => {
        if (res && res.data) {
          setPlaying(res.data.results);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  useEffect(() => {
    getNowPlaying();
  }, []);

  const [popular, setPopular] = useState<any[]>([]);

  const getPopularMovies = async () => {
    await getPopular()
      .then((res) => {
        if (res && res.data) {
          setPopular(res.data.results);
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  const [rated, setRated] = useState<any[]>([]);

  const getRatedMovies = async () => {
    await getRated()
      .then((res) => {
        if (res && res.data) {
          setRated(res.data.results);
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
      <Box sx={{ margin: "100px 50px 0px 50px" }}>
        <h1
          style={{
            fontSize: "50px",
            fontWeight: 700,
            margin: "30px 0",
            textTransform: "uppercase",
          }}
        >
          Popular
        </h1>
        <ScrollContainer>
          <GridScroll>
            {popular?.length > 0 ? (
              popular.map((movie) => (
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
          </GridScroll>
        </ScrollContainer>

        <h1
          style={{
            fontSize: "50px",
            fontWeight: 700,
            margin: "30px 0",
            textTransform: "uppercase",
          }}
        >
          Top Rated
        </h1>
        <ScrollContainer>
          <GridScroll>
            {rated?.length > 0 ? (
              rated.map((movie) => (
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
          </GridScroll>
        </ScrollContainer>

        <h1
          style={{
            fontSize: "50px",
            fontWeight: 700,
            margin: "30px 0",
            textTransform: "uppercase",
          }}
        >
          Now Playing
        </h1>
        <ScrollContainer>
          <GridScroll>
            {playing?.length > 0 ? (
              playing.map((movie) => (
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
          </GridScroll>
        </ScrollContainer>
      </Box>
    </CSSTransition>
  );
};

export default Home;

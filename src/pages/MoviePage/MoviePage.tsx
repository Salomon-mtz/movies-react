import { Box, Button, Grid, Typography, CircularProgress } from "@mui/material";
import { MovieCard } from "components/MovieCard";
import React, { useEffect, useState } from "react";
import { getMovieId } from "services/movies/getMovieId";
import { useParams } from "react-router-dom";
import { IMAGE_SOURCE } from "constants/moviesMock";
import {
    FavoriteButton,
  FavoritesBox,
  GridScroll,
  ImageContainer,
  Overview,
  PillContainer,
  ScrollContainer,
  Tag,
  Text,
  Title,
} from "./styles";
import GroupsIcon from "@mui/icons-material/Groups";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarIcon from "@mui/icons-material/Star";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import { Pill } from "components/Pill";
import { getRecommendation } from "services/movies/getRecommendation";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CSSTransition } from "react-transition-group";

import "./styles.css";
import { Favorite, HeartBroken } from "@mui/icons-material";

const MoviePage = () => {
  const [movie, setMovie] = useState<any>();
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para el cargador
  const [isMovieFavorite, setIsMovieFavorite] = useState<boolean>(true);
  const { movieId } = useParams();
  const poster = IMAGE_SOURCE;

  const getMovies = async () => {
    try {
      const res = await getMovieId(movieId!);
      console.log(res, "movieId");
      if (res && res.data) {
        setMovie(res.data);
        setLoading(false); // Se establece el estado de cargador a falso cuando se obtienen los datos
      }
    } catch (err) {
      console.log(err, "err");
    }
  };

  const getRecommendations = async () => {
    try {
      const res = await getRecommendation(movieId!);
      console.log(res, "movieId");
      if (res && res.data) {
        setMovies(res.data.results);
      }
    } catch (err) {
      console.log(err, "err");
    }
  };

  const addMovieToFavorite = () => {
    setIsMovieFavorite(false);

    const movies = JSON.parse(localStorage.getItem("movies") || "[]");
    const favorite = {
      movieId,
      title: movie.title,
      poster: movie.poster_path,
      rating: movie.vote_average,
      genre: movie.genres[0]?.id,
    };

    const isMovieInFavorite = movies.find((movie: any) => movie.id === movieId);

    if (!isMovieInFavorite) {
      movies.push(favorite);
      localStorage.setItem("movies", JSON.stringify(movies));
    } else {
      alert("Movie already in favorites");
    }

    console.log(movies);
  };

  const removeMovieFromFavorite = () => {
    setIsMovieFavorite(true);

    const movies = JSON.parse(localStorage.getItem("movies") || "[]");

    const isMovieInFavoriteIndex = movies.findIndex(
      (movie: any) => movie.id === movieId
    );
    if (isMovieInFavoriteIndex !== -1) {
      movies.splice(isMovieInFavoriteIndex, 1);
      localStorage.setItem("movies", JSON.stringify(movies));
    }

    console.log(movies);
  };

  const checkIfMovieIsFavorite = () => {
    const movies = JSON.parse(localStorage.getItem("movies") || "[]");
    const isMovieInFavorite = movies.find((movie: any) => movie.id === movieId);

    if (isMovieInFavorite) {
      setIsMovieFavorite(false);
    }
  };

  useEffect(() => {
    getMovies();
    checkIfMovieIsFavorite();
  }, [movieId]);

  useEffect(() => {
    getRecommendations();
  }, [movieId]);

  const extractYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  interface Genre {
    id: number;
    name: string;
  }

  const [favorite, setFavorite] = useState(false);

  return (
    <>
      {movie ? (
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
          <Box sx={{ margin: "100px 50px 0px 50px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <ImageContainer>
                  <img
                    src={poster + movie.poster_path}
                    style={{ borderRadius: "20px" }}
                  />
                </ImageContainer>
              </Grid>
              <Grid item xs={12} sm={9}>
                <h1
                  style={{
                    fontSize: "50px",
                    fontWeight: 700,
                    margin: "30px 0",
                    textTransform: "uppercase",
                  }}
                >
                  {" "}
                  {movie.title}
                </h1>
                <Box style={{ display: "flex" }}>
                  <GroupsIcon fontSize="medium" sx={{ marginRight: "10px" }} />
                  <Text>18-</Text>
                  <WatchLaterIcon
                    fontSize="medium"
                    sx={{ marginRight: "10px" }}
                  />
                  <Text>{movie.runtime} min.</Text>
                  <CalendarMonthIcon
                    fontSize="medium"
                    sx={{ marginRight: "10px" }}
                  />
                  <Text>{extractYear(movie.release_date)}</Text>
                  <StarIcon fontSize="medium" sx={{ marginRight: "10px" }} />
                  <Text>{movie.vote_average}</Text>
                  <InsertChartIcon
                    fontSize="medium"
                    sx={{ marginRight: "10px" }}
                  />
                  <Text>{movie.vote_count}</Text>
                </Box>
                <Tag>"{movie.tagline}"</Tag>
                <Overview>{movie.overview}</Overview>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Title>Genres</Title>
                    <Box style={{ display: "flex" }}>
                      {movie.genres.map((genre: Genre) => (
                        <PillContainer>
                          <Pill
                            key={genre.id}
                            genre={genre.name}
                            pillColor="#5cb85c"
                            width="100px"
                            height="30px"
                          />
                        </PillContainer>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Title>Favorite</Title>
                    <FavoritesBox>
                      {isMovieFavorite ? (
                        <FavoriteButton onClick={addMovieToFavorite}>
                          <Favorite />
                          Add movie to favorites
                        </FavoriteButton>
                      ) : (
                        <FavoriteButton
                          onClick={removeMovieFromFavorite}
                          style={{ backgroundColor: "#ff0000" }}
                        >
                          <HeartBroken />
                          Remove favorite
                        </FavoriteButton>
                      )}
                    </FavoritesBox>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box sx={{ marginTop: "50px" }}>
              <h1
                style={{
                  fontSize: "50px",
                  fontWeight: 700,
                  margin: "30px 0",
                  textTransform: "uppercase",
                }}
              >
                Recommendations
              </h1>
              <ScrollContainer>
                <GridScroll>
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
                    <div>No hay recomendaciones disponibles</div>
                  )}
                </GridScroll>
              </ScrollContainer>
            </Box>
          </Box>
        </CSSTransition>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default MoviePage;

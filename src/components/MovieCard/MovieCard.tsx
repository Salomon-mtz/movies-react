import { IMAGE_SOURCE } from "constants/moviesMock";
import genres from "constants/genres.json";
import { MovieCardProp } from "./types";
import {
  ImageContainer,
  InfoShow,
  ShowBox,
  ShowCalification,
  ShowLabelTitle,
  ShowThumb,
  ShowTitle,
} from "./styles";
import { Pill } from "components/Pill";

import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes/constants";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MovieCard: React.FC<MovieCardProp> = ({
  path,
  title,
  voteAverage,
  genreId,
  movieId,
}) => {
  const poster = IMAGE_SOURCE + path;
  const [open, setOpen] = React.useState(false);

  const getGenre = (genreId: number) => {
    const key: any = Object.keys(genres.genres).find(
      (genre: any): boolean => genres.genres[genre].id === genreId
    );
    if (key) {
      return genres.genres[key].name;
    }
    return "Not Classified";
  };

  const getColor = (rating: number) => {
    if (rating >= 8) {
      return "#74B566";
    } else if (rating >= 7) {
      return "#efca54";
    }
  };
  const navigate = useNavigate();

  const navigateMovies = (id: number, movieName: string) => {
    navigate(`${ROUTES.MOVIE}/${id}`);
  };

  return (
    <div
      onClick={() => {
        navigateMovies(movieId, title);
      }}
    >
      <ShowBox>
        <ImageContainer>
          <ShowThumb src={poster} />
        </ImageContainer>
        <InfoShow>
          <ShowTitle>
            <Pill genre={getGenre(genreId)} pillColor={getColor(voteAverage)} />
            <ShowLabelTitle>{title}</ShowLabelTitle>
            <ShowCalification>* {voteAverage} / 10</ShowCalification>
          </ShowTitle>
        </InfoShow>
      </ShowBox>
    </div>
  );
};

export default MovieCard;

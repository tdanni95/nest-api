import { useEffect, useState } from "react";
import GameService from "../services/games.service";
import {
  Autocomplete,
  Card,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";
import GenreResponse from "../models/genreResponse";

export const Home = () => {
  const [genres, setGenres] = useState<GenreResponse[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponse | null>(
    null
  );

  useEffect(() => {
    GameService.genres().then((res) => {
      setGenres(res);
    });
  }, []);

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container columns={{ xs: 4 }}>
          <Grid xs={2}>
            <Autocomplete
              disablePortal
              value={selectedGenre}
              onChange={(_, newValue) => {
                setSelectedGenre(newValue);
              }}
              id="combo-box-demo"
              sx={{ width: 300 }}
              options={genres}
              autoHighlight
              getOptionLabel={(opt) => opt.name}
              renderInput={(params) => <TextField {...params} label="Genre" />}
            />
          </Grid>
          <Grid xs={2}>
            <h1>{selectedGenre?.id}</h1>
            <h1>{selectedGenre?.name}</h1>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

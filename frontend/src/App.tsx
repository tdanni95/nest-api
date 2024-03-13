import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import { RouterProvider } from "react-router-dom";
import router from "./components/Routes";

// https://react.dev/learn/scaling-up-with-reducer-and-context
// https://hackernoon.com/2-2-using-react-router-v6-for-private-and-public-routes-with-access-validation

// https://github.com/Efeglas/Racky/blob/main/src/App.js

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>
  );
};

export default App;

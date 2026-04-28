import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom"

import NavBar from "./components/header/NavBar"
import Router from "./components/router/Router"
import theme from "./theme/custom-theme"

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <main>
          <NavBar />
          <Router />
        </main>
      </BrowserRouter>
    </ThemeProvider>
  )
}


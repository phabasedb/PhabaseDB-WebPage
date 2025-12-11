// standard
import "./global.css";

// third party
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";

// local
import theme from "mui-config/theme";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import WebServiceProvider from "@/components/WebService/client/Provider";

export const metadata = {
  title: "PhabaseDB",
  description: "PhabaseDB description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
        rel="icon"
        type="image/png"
        href="/favicon/favicon-96x96.png"
        sizes="96x96"
      />
      <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <body>
        <WebServiceProvider>
          <ThemeProvider theme={theme}>
            <Box className="main-container">
              <Box className="background-box" />
              <NavBar />
              <Box sx={{ flex: 1 }}>{children}</Box>
              <Footer />
            </Box>
          </ThemeProvider>
        </WebServiceProvider>
      </body>
    </html>
  );
}

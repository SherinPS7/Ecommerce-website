"use client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ChatProvider } from "@/context/ChatContext"; 
const theme = createTheme({
  palette: {
    primary: { main: "#ff5722" }, // Custom orange theme
  },
});

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
      <ChatProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
        </ChatProvider>
        
   </body>
</html>
  );
}

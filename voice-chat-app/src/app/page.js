"use client";
import { useState } from "react";
import { Box, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { productData } from "@/utils/productData";
import ChatbotComponent from "@/components/Chatbot";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleRemoveFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item !== product));
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <ShoppingCartIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ShopEase
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box textAlign="center" py={6} bgcolor="#ffe0b2" flexGrow={1}>
        <Typography variant="h3" gutterBottom>
          Welcome to ShopEase!
        </Typography>
        <Typography variant="h6">Your one-stop shop for amazing deals.</Typography>
        <Button variant="contained" color="primary">
          Explore Now
        </Button>
      </Box>

      {/* Featured Products */}
      <Box my={4} flexGrow={2} px={2}>
        <Typography variant="h5" gutterBottom>
          Featured Products
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {productData.map((product, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography color="textSecondary">{product.category}</Typography>
                  <Typography variant="body2">${product.price}</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2 }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Floating Chatbot Button */}
      <IconButton
        onClick={() => setChatOpen(!chatOpen)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          bgcolor: "#6200ea",
          color: "#fff",
          borderRadius: "50%",
          boxShadow: 2,
        }}
      >
        <ChatBubbleOutlineIcon />
      </IconButton>

      {/* Chatbot Component */}
      {chatOpen && <ChatbotComponent cart={cart} setCart={setCart} />}
    </Box>
  );
}

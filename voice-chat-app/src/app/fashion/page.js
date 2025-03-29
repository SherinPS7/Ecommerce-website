"use client";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Box,
  Badge,
  Container,
  TextField,
} from "@mui/material";
import {
  ShoppingCart,
  ChatBubbleOutline,
  AccountCircle,
  Search,
} from "@mui/icons-material";
import { productData } from "@/utils/productData";
import ChatbotComponent from "@/components/Chatbot";
import { motion } from "framer-motion";

export default function FashionPage() {
  const [cart, setCart] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);

  // Filter products by Fashion category
  const fashionProducts = productData.filter(
    (product) => product.category === "Fashion"
  );

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        bgcolor: "#121212",
        color: "white",
      }}
    >
      {/* Navbar */}
      <AppBar
        position="sticky"
        sx={{ bgcolor: "#1f1f1f", color: "white", boxShadow: 3 }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold", color: "#ff9800" }}
          >
            ShopEase
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search for products..."
            sx={{ bgcolor: "white", borderRadius: 1 }}
          />
          <IconButton sx={{ color: "#ff9800", ml: 1 }}>
            <Search />
          </IconButton>
          <IconButton sx={{ color: "#ff9800", ml: 2 }}>
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <IconButton sx={{ color: "#ff9800", ml: 2 }}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Fashion Collection Header */}
      <Container sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="#ff9800">
          Explore the Latest Fashion Trends
        </Typography>
      </Container>

      {/* Fashion Products Grid */}
      <Container>
        <Grid container spacing={3}>
          {fashionProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card
                  sx={{ borderRadius: 2, boxShadow: 3, bgcolor: "#1f1f1f" }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={product.image || "/placeholder.jpg"}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" color="white">
                      {product.name}
                    </Typography>
                    <Typography color="gray">{product.category}</Typography>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      mt={1}
                      color="white"
                    >
                      ${product.price}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ mt: 2, bgcolor: "#ff9800", color: "black" }}
                      onClick={() => setCart([...cart, product])}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Floating Chatbot Button */}
      <IconButton
        onClick={() => setChatOpen(!chatOpen)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          bgcolor: "#ff9800",
          color: "black",
          borderRadius: "50%",
          boxShadow: 4,
        }}
      >
        <ChatBubbleOutline />
      </IconButton>

      {chatOpen && <ChatbotComponent cart={cart} setCart={setCart} />}
    </Box>
  );
}

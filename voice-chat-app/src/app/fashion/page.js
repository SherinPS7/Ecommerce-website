"use client"; // Marking this file as a client component
import { useState } from "react";
import { Container, Typography, Grid, Card, CardContent, Button, IconButton } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatbotComponent from "@/components/Chatbot"; // Make sure the path is correct
import { productData } from "@/utils/productData"; // Import product data

export default function FashionPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [cart, setCart] = useState([]);

  // Filter products by category 'Fashion'
  const fashionProducts = productData.filter((product) => product.category === "Fashion");

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom>Fashion Collection</Typography>
      
      {/* Display Fashion products */}
      <Grid container spacing={3}>
        {fashionProducts.map((product) => (
          <Grid item xs={12} sm={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">{product.category}</Typography>
                <Typography variant="body2">Price: ${product.price}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 2 }}
                  onClick={() => setCart([...cart, product])}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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
    </Container>
  );
}

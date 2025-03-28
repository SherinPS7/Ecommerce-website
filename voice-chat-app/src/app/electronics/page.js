"use client"; // Marking this file as a client component
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import metadata from "@/data/metadata";
import { Container, Typography, Button, Grid, Card, CardContent, IconButton } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatbotComponent from "@/components/Chatbot"; // Make sure the path is correct
import { productData } from "@/utils/productData"; // Import product data

export default function ElectronicsPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const router = useRouter();
  const pageData = metadata.electronics; // Load metadata for this page

  useEffect(() => {
    document.title = pageData.title; // Set browser title dynamically
  }, [pageData]);

  // Filter products by category 'Electronics'
  const electronicsProducts = productData.filter((product) => product.category === "Electronics");

  return (
    <Container maxWidth="md">
      <Typography variant="h3">{pageData.title}</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {pageData.description}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={() => router.push("/")}
      >
        Back to Home
      </Button>

      {/* Display Electronics products */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {electronicsProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
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

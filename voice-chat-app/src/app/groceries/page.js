"use client";
import { Box, Typography, Grid, Card, CardContent, Button, IconButton } from "@mui/material";
import { productData } from "../utils/productData"; // Import product data
 // Adjusted import path
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useState } from "react";
import ChatbotComponent from "@/components/Chatbot"; // Ensure correct path
import { useChat } from "@/context/ChatContext"; // Import the context

export default function Groceries() {
  const { chatOpen, setChatOpen } = useChat(); // Access chat state from context

  // Filter products to only include "Fruits" and "Vegetables" categories
  const groceryProducts = productData.filter(
    (product) => product.category === "Fruits" || product.category === "Vegetables"
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Our Groceries</Typography>
      
      <Grid container spacing={3}>
        {groceryProducts.map((product) => (
          <Grid item xs={12} sm={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">{product.category}</Typography>
                <Typography variant="body2">Price: ${product.price}</Typography>
                <Button variant="contained" color="primary" href={product.url}>
                  View Product
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Floating Chatbot Button */}
      <IconButton
        onClick={() => setChatOpen(!chatOpen)} // Use context setter to toggle
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
      {chatOpen && <ChatbotComponent />}
    </Box>
  );
}

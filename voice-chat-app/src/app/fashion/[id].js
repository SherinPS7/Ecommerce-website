"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, Button } from "@mui/material";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.find(
          (p) => p.product_name.replace(/ /g, "-") === id
        );
        setProduct(foundProduct);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold">
        {product.product_name}
      </Typography>
      <Typography variant="h6" color="textSecondary">
        {product.brand}
      </Typography>
      <Typography variant="body1">
        ${product.price} - {product.discount} Off
      </Typography>
      <Typography variant="body2">
        Size: {product.size} | Color: {product.color}
      </Typography>
      <Typography variant="body2">Stock: {product.stock}</Typography>
      <Button
        variant="contained"
        sx={{ mt: 2, bgcolor: "#ff5722", color: "white" }}
      >
        Buy Now
      </Button>
    </Container>
  );
}

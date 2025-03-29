import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const router = useRouter();

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="200"
        image="/placeholder.jpg" // Replace with actual product image if available
        alt={product.product_name}
      />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {product.product_name}
        </Typography>
        <Typography color="textSecondary">{product.brand}</Typography>
        <Typography variant="body2" fontWeight="bold" mt={1}>
          ${product.price}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2, bgcolor: "#ff5722", color: "white" }}
          onClick={() =>
            router.push(`/fashion/${product.product_name.replace(/ /g, "-")}`)
          }
        >
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );
}

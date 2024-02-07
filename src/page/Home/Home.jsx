import {
  Alert,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  styled,
} from "@mui/material";
import "./Home.css";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { useGetproductByNameQuery } from "../../Redux/productApi";

import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../Redux/productsSlice";
import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {},
}));

const Home = () => {
    const navigate =  useNavigate()
  const { selectProducts, selectProductsID } = useSelector(
    // @ts-ignore
    (state) => state.counter
  );
  const dispatch = useDispatch();

  const productQuantity = (itemApi) => {
    let myProduct = selectProducts.find((item) => {
      return item.id === itemApi.id;
    });
    return myProduct.quantity;
  };

  const { data, error, isLoading } = useGetproductByNameQuery();
  if (error) {
    return <Alert severity="error">This is an error alert </Alert>;
  }
  if (isLoading) {
    return <Alert severity="error">This is an Loading alert </Alert>;
  }
  if (data) {
    return (
      <Box component={"main"}>
        <Container>
          <Stack
            direction={"row"}
            sx={{ flexWrap: "wrap", justifyContent: "space-between" }}
          >
            {data.map((item) => {
              return (
                <Card key={item.id} sx={{ maxWidth: 277, my: 2 }}>
                  <CardMedia
                    onClick={() => {
                      navigate(`/products/${item.id}`)
                    }}
                    component="img"
                    image={item.imageLink[0]}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {item.productName}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ justifyContent: "space-between" }}
                    disableSpacing
                  >
                    {selectProductsID.includes(item.id) ? (
                      <div
                        dir="rtl"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <IconButton
                          onClick={() => {
                            dispatch(increaseQuantity(item));
                          }}
                          color="primary"
                          sx={{ ml: "10px" }}
                        >
                          <Add fontSize="small" />
                        </IconButton>

                        <StyledBadge
                          badgeContent={productQuantity(item)}
                          color="primary"
                        />

                        <IconButton
                          onClick={() => {
                            dispatch(decreaseQuantity(item));
                          }}
                          color="primary"
                          sx={{ mr: "10px" }}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          dispatch(addToCart(item));
                        }}
                        variant="contained"
                      >
                        Add to cart
                      </Button>
                    )}

                    <Typography variant="h6" color="error">
                      ${item.price}
                    </Typography>
                  </CardActions>
                </Card>
              );
            })}
          </Stack>
        </Container>
      </Box>
    );
  }
};

export default Home;

import { Badge, Box, Button, IconButton, Paper, styled, Typography } from "@mui/material";
import "./Cart.css";
import { Add, Remove } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity, remove } from "../../Redux/productsSlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#1976d2",
    color: "#fff",
  },
}));

const Cart = () => {
  // @ts-ignore
  const { selectProducts } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  let totalPrice = 0
  return (
    <Box>
      {selectProducts.map((item) => {
        totalPrice += item.price * item.quantity
        return (
          <Paper key={item.id} dir="rtl" className="item-container">
            <div className="img-title-parent">
              <img src={item.imageLink[0]} alt="" />
              <p className="product-name">{item.productName}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                sx={{ color: "#1976d2", ml: "10px" }}
                onClick={() => {
                  dispatch(increaseQuantity(item));
                }}
              >
                <Add />
              </IconButton>

              <StyledBadge badgeContent={item.quantity} color="secondary" />

              <IconButton
                sx={{ color: "#1976d2", mr: "10px" }}
                onClick={() => {
                  dispatch(decreaseQuantity(item));
                }}
              >
                <Remove />
              </IconButton>
            </div>

            <div className="price">${item.price}</div>

            <Button
              onClick={() => {
                dispatch(remove(item));
              }}
              variant="text"
              color="error"
            >
              delete
            </Button>
          </Paper>
        );
      })}

    <Box sx={{display:"flex" , justifyContent:'center',}}>
        <Paper sx={{width:'280px' , p:2}}>
          <Typography variant="h5">
            Total Price $ {totalPrice}
          </Typography>
        </Paper>
    </Box>
    </Box>
  );
};

export default Cart;

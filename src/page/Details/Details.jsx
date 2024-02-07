import "./Details.css";
import { useGetproductDetailsByNameQuery } from "../../Redux/productApi";
import { useParams } from "react-router-dom";
import DetailsThumb from "./DetailsThumb";
import { useRef, useState } from "react";
import { Badge, Button, IconButton, styled } from "@mui/material";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../Redux/productsSlice";
import { Add, Remove } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {},
}));
const Details = () => {
  const id = useParams();

  const [index, setindex] = useState(0);
  const { data, error, isLoading } = useGetproductDetailsByNameQuery(id.id);
  const { selectProducts, selectProductsID } = useSelector(
    // @ts-ignore
    (state) => state.counter
  );
  const dispatch = useDispatch();

  const myRef = useRef(null);

  const handleTab = (index) => {
    setindex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };
  const productQuantity = (itemApi) => {
    let myProduct = selectProducts.find((item) => {
      return item.id === itemApi.id;
    });
    return myProduct.quantity;
  };

  if (data) {
    return (
      <div className="appp">
        <div className="details">
          <div className="big-img">
            <img src={data.imageLink[0]} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2>{data.productName}</h2>
              <span>${data.price}</span>
            </div>

            <p>{data.description}</p>

            <DetailsThumb
              images={data.imageLink}
              tab={handleTab}
              myRef={myRef}
            />

            {selectProductsID.includes(data.id) ? (
              <div dir="rtl" style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() => {
                    dispatch(increaseQuantity(data));
                  }}
                  color="primary"
                  sx={{ ml: "10px" }}
                >
                  <Add fontSize="small" />
                </IconButton>

                <StyledBadge
                  badgeContent={productQuantity(data)}
                  color="primary"
                />

                <IconButton
                  onClick={() => {
                    dispatch(decreaseQuantity(data));
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
                  dispatch(addToCart(data));
                }}
                variant="contained"
              >
                Add to cart
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Details;

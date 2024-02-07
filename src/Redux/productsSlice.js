import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectProducts:JSON.parse(localStorage.getItem("localProducts")) || [],
  selectProductsID: JSON.parse(localStorage.getItem("localProductsID")) || [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // state.value += action.payload
      let productWithQuantity = { ...action.payload, quantity: 1 };
      state.selectProducts.push(productWithQuantity);
      state.selectProductsID.push(productWithQuantity.id);
      localStorage.setItem("localProducts" , JSON.stringify(state.selectProducts))
      localStorage.setItem("localProductsID" , JSON.stringify(state.selectProductsID))
    },

    increaseQuantity: (state, action) => {
      let increaseProduct = state.selectProducts.find((item) => {
        return item.id === action.payload.id
      })
      increaseProduct.quantity += 1
      localStorage.setItem("localProducts" , JSON.stringify(state.selectProducts))

    },
    decreaseQuantity: (state, action) => {
      let decreaseProduct = state.selectProducts.find((item) => {
        return item.id === action.payload.id
      })
      decreaseProduct.quantity -= 1
      if (decreaseProduct.quantity === 0) {
        let newProduct = state.selectProducts.filter((item) => {
          return item.id !== action.payload.id
        })
        state.selectProducts = newProduct

        let newProductID = state.selectProductsID.filter((item) => {
          return item !== action.payload.id
        })
        state.selectProductsID = newProductID
        localStorage.setItem("localProductsID" , JSON.stringify(state.selectProductsID))

      }
      localStorage.setItem("localProducts" , JSON.stringify(state.selectProducts))

    },
    remove: (state, action) => {
      let removeProduct = state.selectProducts.filter((item) => {
        return item.id !== action.payload.id
      })
      state.selectProducts = removeProduct

      let removeProductID = state.selectProductsID.filter((item) => {
        return item !== action.payload.id
      })
      state.selectProductsID = removeProductID


      localStorage.setItem("localProductsID" , JSON.stringify(state.selectProductsID))
      localStorage.setItem("localProducts" , JSON.stringify(state.selectProducts))
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, increaseQuantity, decreaseQuantity , remove} =
  productSlice.actions;

export default productSlice.reducer;

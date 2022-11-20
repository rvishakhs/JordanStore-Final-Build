import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { products } from '../typings'
import { RootState } from './store'


export interface BasketState {
  items: products[]
}

const initialState: BasketState = {
  items : []
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket : (state: BasketState, action:PayloadAction<products>  ) => {
        state.items = [...state.items, action.payload] 
    },
    removeFromBasket : (state: BasketState, action: PayloadAction<{id: string}> ) => {
        const index = state.items.findIndex((item: products ) => item._id === action.payload.id);
        
        let newbasket = [...state.items]

        if (index >= 0) {
            newbasket.splice(index,1);
        } else {
            console.log(
                `Cant remove product (id: ${action.payload.id}) as its not in basket!`
              );
        }

        state.items = newbasket;

    }
  },
})  

// Action creators are generated for each case reducer function
export const { addToBasket , removeFromBasket } = basketSlice.actions;

// selectors 
export const selectBasketItems = (state: RootState) => state.basket.items
export const selectBasketItemsWithId = (state: RootState, id: string) => {
    state.basket.items.filter((item : products) => item._id === id);
}

export const selectBasketTotal = (state: RootState) =>
  state.basket.items.reduce(
    (total: number, item: products) => (total += item.price),
    0
  );

export default basketSlice.reducer
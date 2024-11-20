import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";
import { urlCart, get } from "./authVar";

axios.defaults.withCredentials = true;

const beUrl = import.meta.env.VITE_BACKEND_URL;

const API_CART_URL = import.meta.env.MODE === "development" ? beUrl+urlCart+get : urlCart+get;

const initialState = {
	loading: false,
	success: false,
	error: false,
	data: null,
	errorData: null,
  };

export const useCartStore = create(
persist(
	(set,get) => ({
	cartItems: [],
	...initialState,
	execute: async () => {
		set({ ...initialState, loading: true });
		try {
		  const res = await axios.post(API_CART_URL);
		  set({ ...initialState, success: true, data: res.data });
		} catch (err) {
		  console.error("Error in data fetch:", err);
		  set({ ...initialState, error: true, errorData: err.message });
		}
	  },
	addItemToCart: (item) => {
		const itemExists = get().cartItems.find(
		  (cartItem) => cartItem._id === item._id
		);
		delete item.description;
		delete item.category; 
		delete item.img;
		delete item.image;
		if (itemExists) {
		  if (typeof itemExists.quantity === "number") {
			itemExists.quantity++;
		  }
		  set({ cartItems: [...get().cartItems] });
		} else {
		  set({ cartItems: [...get().cartItems, { ...item, quantity: 1 }] });
		}
	  },
	  decreaseQuantity: (productId) => {
		const itemExists = get().cartItems.find(
		  (cartItem) => cartItem._id === productId
		);
	
		if (itemExists) {
		  if (typeof itemExists.quantity === "number") {
			if (itemExists.quantity === 1) {
			  const updatedCartItems = get().cartItems.filter(
				(item) => item._id !== productId
			  );
			  set({ cartItems: updatedCartItems });
			} else {
			  itemExists.quantity--;
			  set({ cartItems: [...get().cartItems] });
			}
		  }
		}
	  },
	  cartValues: 0,
	  totalPrice: () =>
		get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
	  getTotalCartAmount: (cartItems) => {
		let sumPrice = 0;
		cartItems.map(item=>{
			return sumPrice += item.price*item.quantity
		  })
		  set({ cartValues: sumPrice });
	},
	
}),
{
  name: "cartItems",
}));

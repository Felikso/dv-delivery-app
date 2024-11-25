import { create } from "zustand";
import axios from "axios";
import { pagesLinks, customErrors, api } from './authVar.js';

const beUrl = import.meta.env.VITE_BACKEND_URL;

const API_URL = import.meta.env.MODE === "development" ? beUrl+"/api/auth" : "/api/auth";


const API_ITEMS_URL =  import.meta.env.MODE === "development" ? beUrl+"/api/items" : "/api/items";

const API_CATEGORY_URL = import.meta.env.MODE === "development" ? beUrl+"/api/category" : "/api/category";


axios.defaults.withCredentials = true;

export const useAdminStore = create((set) => ({
	imgState: {
		item: false,
		cat: false,
		items: false
	},
	setImgState: (state) => ({
		item: state.item,
		cat: state.cat,
		items: state.items
	}),
	delateFocus: () =>{
		set({
			imgState: {
				item: false,
				cat: false,
				items: false
			}
		})
		
	  },
	  setItemTrue: (itemData) =>{
		set({
			imgState: {
				item: itemData,
				cat: false,
				items: false
			}
		})
	},
	setCatTrue: (catData) =>{
		set({
			imgState: {
				item: false,
				cat: catData,
				items: false
			}
		})
	},



	fetchCategoryList: async () => {
		try {
			const response = await axios.post(`${API_CATEGORY_URL}${api.list}`);
			return response
		} catch (error) {
			set({
				error: error.response?.data
			});
			throw error;
		}
	},
	removeCategory: async (itemId) => {
		try {
			const response = await axios.post(`${API_CATEGORY_URL}${api.remove}`,{id:itemId});
			set({ message: response.data.message });
			return response 
		} catch (error) {
			set({
				error: error.response
			});
			throw error;
		}
	},
	updateCategory: async (itemId,formData) => {
		try {

			let activity = itemId?'update':'add';
			const response = await axios.post(`${API_CATEGORY_URL}/${activity}`,formData);


			set({ message: response.data.message });
			return response
		} catch (error) {
			set({
				error: error.response
			});
			throw error;
		}
	},



	
}));

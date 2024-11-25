import { create } from "zustand";
import axios from "axios";
import { pagesLinks, customErrors, api } from './authVar.js';

const beUrl = import.meta.env.VITE_BACKEND_URL;

const API_URL = import.meta.env.MODE === "development" ? beUrl+"/api/auth" : "/api/auth";


const API_ITEMS_URL =  import.meta.env.MODE === "development" ? beUrl+"/api/items" : "/api/items";

const API_USERS_URL = import.meta.env.MODE === "development" ? beUrl+"/api/user" : "/api/user";

const API_RABAT_URL =  import.meta.env.MODE === "development" ? beUrl+"/api/rabat" : "/api/rabat";

const API_ORDER_URL =  import.meta.env.MODE === "development" ? beUrl+"/api/order" : "/api/order";

const API_CART_URL = import.meta.env.MODE === "development" ? beUrl+"/api/cart" : "/api/cart";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,
	checkAdmin: true,
	netErr: false,
	beUrl: import.meta.env.VITE_BACKEND_URL,

	signup: async (email, password, name) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}${pagesLinks.signup}`, { email, password, name });
	
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			console.log(error.response)
			set({ error:  customErrors.signup || error.response.data.message, isLoading: false });
			throw error;
		}
	},
	login: async (email, password, checkAdmin) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}${pagesLinks.login}`, { email, password, checkAdmin });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
				checkAdmin: true//response.data.user.isAdmin
			});
		} catch (error) {
			set({ error: error.response?.data?.message || customErrors.loginin, isLoading: false });
			throw error;
		}
	},

	logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}${pagesLinks.logout}`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: customErrors.logout, isLoading: false });
			throw error;
		}
	},
	verifyEmail: async (code) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}${pagesLinks.verifyEmail}`, { code });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
			return response.data;
		} catch (error) {
			set({ error: error.response.data.message || customErrors.verifyEmail, isLoading: false });
			throw error;
		}
	},
	checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}${pagesLinks.checkAuth}`);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},
	forgotPassword: async (email) => {
		try {
			const response = await axios.post(`${API_URL}${pagesLinks.forgotPass}`, { email });

			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			console.log(error);
			set({
				isLoading: false,
				error: error.response.data.message || customErrors.resetPassMail,
			});
			throw error;
		}
	},
	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}${pagesLinks.resetPass}/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || customErrors.resetPass,
			});
			throw error;
		}
	},
	removeAuthItem: async (itemId) => {
		try {
			const response = await axios.post(`${API_ITEMS_URL}${api.remove}`,{id:itemId});
			set({ message: response.data.message });
			return response 
		} catch (error) {
			set({
				error: error.response
			});
			throw error;
		}
	},
	updateAuthItem: async (itemId,formData) => {
		try {

			let activity = itemId?'update':'add';
			const response = await axios.post(`${API_ITEMS_URL}/${activity}`,formData);
			//const response = await axios.post(`${url}${newUrl}`, formData);
			set({ message: response.data.message });
			return response
		} catch (error) {
			set({
				error: error.response
			});
			throw error;
		}
	},
	fetchMailList: async (token) => {
		try {
			const response = await axios.get(`${API_USERS_URL}/emails`,	{ headers: { token: token } });
			return response
/* 			const response = await axios.get(`${API_USERS_URL}/emails`);
			return response */
		} catch (error) {
			set({
				error: error.response.data
			});
			throw error;
		}
	},

	setRabat: async (rabatValue, emailArr, rabatCodeExpiresAt) => {	
		try {
			const response = await axios.post(`${API_RABAT_URL}${pagesLinks.set}`,	{ rabatValue: rabatValue, emailArr:emailArr, rabatCodeExpiresAt:rabatCodeExpiresAt  });
			set({ message: response.data.message, rabatCode: response.data.rabatCode });
			return response
		} catch (error) {
			set({
				error: error.response.data
			});
			throw error;
		}
	},

	deleteRabat: async (rabatCode) => {	
		try {
			const response = await axios.post(`${API_RABAT_URL}${api.delete}`,	{ rabatCode: rabatCode });
			set({ message: response.data.message, rabatCode: rabatCode });
			return response
		} catch (error) {
			set({
				error: error.response
			});
			throw error;
		}
	},

	addItemToCart: async (itemId,userId) => {
		try {

			//let activity = itemId?'update': pagesLinks.add;
			const response = await axios.post(`${API_CART_URL}${pagesLinks.add}`,{itemId,userId});
			//const response = await axios.post(`${url}${newUrl}`, formData);
			set({ message: response.data.message });
			return response
		} catch (error) {
			set({
				error: error.response
			});
			throw error;
		}
	},
	verifyRabatCode: async (rabatCode,email,token) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_RABAT_URL}${pagesLinks.verifyRabat}`, { rabatCode: rabatCode, email:email  }, { headers: { token: token } });
			set({ rabatValue: response.data.rabatValue, isLoading: false });
			return response.data;
		} catch (error) {
			set({ error: error.response.data.message || customErrors.verifyRabat, isLoading: false });
			throw error;
		}
	},
	verifyOrderCode: async (verificationCode,_id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_ORDER_URL}${pagesLinks.verifyOrder}/${_id}`, { verificationCode: verificationCode, _id: _id  });
			console.log(response);
			
			set({ rabatValue: response.data.rabatValue, isLoading: false, verified:true  });
			return response.data;
		} catch (error) {
			set({ error: error.response.data.message || customErrors.verifyOrder, isLoading: false });
			throw error;
		}
	},



	
}));

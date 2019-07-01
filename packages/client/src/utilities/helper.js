import jwt from "jsonwebtoken";
import axios from "axios";

export const API_URL = "http://localhost:5000";

export function StoreToken(token) {
	localStorage.setItem("token-aui-cms", token);
}

export function VerifyLoginStaus() {
	if (GetTokenInfo(localStorage.getItem("token-aui-cms"))) return true;
	return false;
}

export function $axios() {
	const token = localStorage.getItem("token-aui-cms");
	return axios.create({
		baseURL: API_URL,
		timeout: 3000,
		headers: { Authorization: `Bearer ${token ? token : ""}` }
	});
}

export function DeleteToken() {
	localStorage.removeItem("token-aui-cms");
}

export function GetTokenInfo() {
	const data = jwt.decode(localStorage.getItem("token-aui-cms"));
	return data;
}

import jwt from "jsonwebtoken";
import axios from "axios";

export const API_URL = "http://localhost:5000";

export function StoreToken(token) {
	localStorage.setItem("token-aui-cms", token);
}

export function TransformData(data) {
	const arr = [];
	data.forEach(complaint => {
		const StaffName = complaint.Staff.Name;
		delete complaint.Staff;
		arr.push({
			...complaint,
			Staff: StaffName
		});
	});

	return arr;
}

export function handleError(error, props) {
	if (!error.response) {
		alert("Failed to reach endpoint!");
		return;
	}
	if (error.response.status === 401) {
		DeleteToken();
		props.history.push("/login"); /** Error here */
	} else alert(error.response.data);
}

export function VerifyLoginStaus() {
	if (GetTokenInfo(localStorage.getItem("token-aui-cms"))) return true;
	return false;
}

export function $axios() {
	const token = localStorage.getItem("token-aui-cms");
	return axios.create({
		baseURL: API_URL,
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

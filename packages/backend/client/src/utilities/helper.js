import jwt from 'jsonwebtoken';

export const API_URL = "http://localhost:5000";

export function StoreToken(token) {
    localStorage.setItem("token", token);
}

export function GetTokenInfo(token) {
    console.log(token);
    const data = jwt.decode(token);
    console.log(data);
    return data;
}

 import axios from "axios"

//to reduce the repeatative code

const api= axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    withCredentials:true
})

// Attach JWT token from localStorage to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})



//register api call
 export async function register({username,email,password}){
    const response= await api.post('/api/auth/register',{
        username, email, password
    })
    if(response.data.token){
        localStorage.setItem("token", response.data.token)
    }
    return response.data
 }

 //login api call
 export async function login({email,password}){
    const response= await api.post("/api/auth/login",{
        email, password
    })
    if(response.data.token){
        localStorage.setItem("token", response.data.token)
    }
    return response.data;
 }

 //logout api call 
 export async function logout(){
    const response = await api.get("/api/auth/logout")
    localStorage.removeItem("token")
    return response.data
 }//getMe api call

export async function getMe(){
    const response = await api.get("/api/auth/get-me")
    return response.data
}

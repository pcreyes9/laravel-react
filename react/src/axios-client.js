import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config)=> {
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

axiosClient.interceptors.response.use((response) =>{
    console.log("axios request fulfilled");
    return response;
}, (error) => {
    // console.log(error)
    try {
        const {response} = error;
        if (response.status === 401){ // the user is unauthorized 
            localStorage.removeItem('ACCESS_TOKEN')
        }
        else if (response.status === 404) {
            console.log("RESPONSE 404 from axios")
        }
        else{
            console.log("Error Unknown");
        }
    } catch (e) {
        console.error(e);
    }
    throw error;
})

export default axiosClient;

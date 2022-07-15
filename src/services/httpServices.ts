import axios from "axios";
import {getAuthToken} from "./authService";

const httpService = {
    get : axios.get,
    post : axios.post,
    put : axios.put,
    delete : axios.delete,
}

// HTTP Interceptor
axios.interceptors.request.use((config: any) => {
    const token = getAuthToken();
   if(token){
        config.headers.Authorization =  token;
   }

    return config;

})

export default httpService;
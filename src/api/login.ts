import httpService from "../services/httpServices";

const login = (email: string, password: string): Promise<any> => {
 return httpService.post('/login', {email, password})
}    
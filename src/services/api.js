import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cmncgsbc.azurewebsites.net/api'
})

export default api;
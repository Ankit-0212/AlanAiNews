import axios from "axios";

export function getNews(category) {
  const API_KEY = `a5b69c9c8af3410bb3ba631f9c8d6523`;
  const API_Endpoint = ` https://newsapi.org/v2/top-headlines?country=in&category=${category}`;

  return axios.get(`${API_Endpoint}&apiKey=${API_KEY}`)
  
}

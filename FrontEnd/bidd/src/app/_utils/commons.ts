import axios from "axios";

// const BASE_URL = "http://localhost:9090";
const BASE_URL = "https://k10c102.p.ssafy.io";

const PublicAxiosApi = () => {
  const instance = axios.create({
    baseURL: `${BASE_URL}`,
  });

  instance.defaults.headers.put["Content-Type"] = "application/json";
  return instance;
};

const ClientAxiosApi = () => {
  const instance = axios.create({
    baseURL: `${BASE_URL}/api`,
  });

  //const token = "";
  //instance.defaults.headers.common["Authorization"] = token;
  instance.defaults.headers.common["Authorization"] =
    "BearereyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoia245MDEyQG5hdmVyLmNvbSIsImlhdCI6MTcxNTE0NDA4NCwiZXhwIjoxNzE1MTQ3Njg0fQ.0LIE7oWR6C8nOhb-zykEZF3IEWecoSAyvkZiNG37fIY";

  instance.defaults.headers.post["Content-Type"] = "application/json";

  return instance;
};

export { PublicAxiosApi, ClientAxiosApi };

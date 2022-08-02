import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
  client_secret:"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",
//   client_id:"Iv1.ea2d65ab593c7b86"
});

export default api;
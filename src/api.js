import axios from "axios";
const API = axios.create({
  baseURL: "https://68ceda846dc3f35077802f63.mockapi.io",
  timeout: 5000,
});

// helper to get next id in front-end if needed (json-server auto increments)
export default {
  getFiles() {
    return API.get("/files");
  },
  getFile(id) {
    return API.get(`/files/${id}`);
  },
  createFile(payload) {
    return API.post("/files", payload);
  },
  patchFile(id, payload) {
    return API.patch(`/files/${id}`, payload);
  },
  deleteFile(id) {
    return API.delete(`/files/${id}`);
  },
  // full list with filter query support
  query(path) {
    return API.get(`/files${path}`);
  },
};

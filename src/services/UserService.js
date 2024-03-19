
import axios from "./customize-axios";
const fetchAllUser = (page) => {
return  axios.get(`/api/users?page=${page}`);
}
const postCreateUser = (name, job) => {
    return axios.post("/api/users",{name, job});
}
const putUpadateUser = (id) => {
    return axios.put(`/api/users/${id}`);
}
const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`);
}

export {fetchAllUser,postCreateUser, putUpadateUser,deleteUser};
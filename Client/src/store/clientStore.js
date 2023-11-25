import axios from "axios";
import { create } from "zustand";
import firebaseLogin from "../services/FirebaseLogin";
import firebaseCreateAccount from "../services/FirebaseCreateAccount";

const useClientStore = create((set) => ({
  clients: [],
  isLogged: false,
  user:"",
  getAllClients: async () => {
    try {
      const { data } = await axios.get("/client/clientsList");
      set({ clients: [...data] });
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  createClient: async (formdata) => {
    try {
      const { data } = await axios.post("/client/createClient", formdata);
      set((state) => ({ clients: [...state.clients, data] }));
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  deleteClient: async (id) => {
    try {
      const { data } = await axios.delete(`/client/deleteClient/${id}`);

      set((state) => ({
        clients: state.clients.filter((client) => client.id !== id),
      }));
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  updateClient: async (dataform) => {
    try {
      const { id } = dataform;
      const { data } = await axios.put(`client/updateClient/${id}`, dataform);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  setLoginStatus: (status) => {
    set({ isLogged: status });
  },
  loginUser: async (formdata) => {
    try {
      const user = await firebaseLogin(formdata);
      set({user: user})
      return user;
    } catch (error) {
      throw new Error(error);
    }
  },
  createUser: async (formdata) => {
    try {
      const user = await firebaseCreateAccount(formdata);
      set({user: user})
      return user;
    } catch (error) {
      throw new Error(error);
    }
  },
}));

export { useClientStore };

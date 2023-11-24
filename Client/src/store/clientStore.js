import axios from 'axios'
import { create } from 'zustand'


const useClientStore = create((set) => ({
  clients:[], 
  getAllClients: async () => {
    try {
      const {data} = await axios.get('/client/clientsList')
      set({clients:[...data]})
      
  } catch (error) {
    throw new Error(error.response.data.message);
  }
  },
  createClient: async (formdata) => {
    try {
      const {data} = await axios.post('/client/createClient',formdata)
      set( state => ({ clients :[...state.clients,data]}))
      
  } catch (error) {
    throw new Error(error.response.data.message);
  }
  },
  deleteClient: async (id) => {
    try {
      const {data} = await axios.delete(`/client/deleteClient/${id}`)
      console.log(data.message);
      set( state => ({clients: state.clients.filter((client) => client.id !== id)}))
    } catch (error) {
      throw new Error(error.response.data.message);;
    }
  },
  updateClient: async(dataform) => {
    try {   
      const {id} = dataform
      const {data} = await axios.put(`client/updateClient/${id}`,dataform)

    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
}))

export { useClientStore }
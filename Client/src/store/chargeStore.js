import axios from 'axios'
import { create } from 'zustand'


const useChargeStore = create((set) => ({
  createCharge: async (formdata) => {
    try {
      const { data } = await axios.post("/charges/createCharge", formdata);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
}));

export { useChargeStore }
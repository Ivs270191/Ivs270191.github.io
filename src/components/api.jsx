import axios from "axios";

axios.defaults.baseURL = "https://67222c072108960b9cc3333a.mockapi.io/";

export const getItems = async (url) => {
  try {
    const getItem = await axios.get(url);
    return getItem.data;
  } catch (error) {
    alert(error)
  }
};

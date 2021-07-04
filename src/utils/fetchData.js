import axios from "axios";

const fetchData = async (URL, params) => {
  try {
    const data = await axios.get(URL, { params });
    return { data: data.data };
  } catch (err) {
    return { error: "Failed to fetch data from API" };
  }
};

export default fetchData;

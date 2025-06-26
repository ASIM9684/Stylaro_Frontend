import axios from "axios";
import { showErrorToast, showSuccessToast } from "../utlis/toast";

const apikey = "http://localhost:8000";

async function addApi(data, route) {
  try {
    const response = await axios.post(`${apikey}/${route}`, data);

    if (response.status === 201) {
      showSuccessToast(response.data.message);
      return true;
    }
    if (response.status === 200) {
      showSuccessToast(response.data.message);
      return true;
    }
  } catch (error) {
    console.error("Error adding:", error);

    if (error.response && error.response.status === 400) {
      showErrorToast(error.response.data.message);
    } else {
      showErrorToast("Something went wrong");
    }

    return false;
  }
}
async function UpdateApi(data, route, id) {
  try {
    const response = await axios.put(`${apikey}/${route}/${id}`, data);

    if (response.status === 200) {
      showSuccessToast(response.data.message);
      return true;
    }
  } catch (error) {
    console.error("Error adding:", error);

    if (error.response && error.response.status === 400) {
      showErrorToast(error.response.data.message);
    } else {
      showErrorToast("Something went wrong");
    }

    return false;
  }
}

async function getApi(route, id) {
  try {
    const response = await axios.get(`${apikey}/${route}/${id}`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error adding:", error);

    if (error.response && error.response.status === 400) {
      showErrorToast(error.response.data.message);
    } else {
      showErrorToast("Something went wrong");
    }

    return false;
  }
}

async function authapi(route, data) {
  try {
    const response = await axios.post(`${apikey}/${route}`, data);
    if (response.status === 201 || response.status === 200) {
      showSuccessToast(response.data.message);
      localStorage.setItem("token", response.data.token);
      return true;
    }
  } catch (error) {
    console.error("Error for Auth:", error);

    if (error.response && error.response.status === 400) {
      showErrorToast(error.response.data.message);
    } else {
      showErrorToast("Something went wrong");
    }

    return false;
  }
}

export { addApi, UpdateApi, getApi,authapi };

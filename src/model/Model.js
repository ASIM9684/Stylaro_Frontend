import axios from "axios";
import { showErrorToast, showSuccessToast } from "../utlis/toast";
import { jwtDecode } from "jwt-decode";

const apikey = "http://192.168.18.15:8000";

async function addApi(data, route, navigate) {
  try {
    
    const response = await axios.post(`${apikey}/${route}`, data, {
      headers: getAuthHeader(),
    });

    if (response.status === 201 || response.status === 200) {
      showSuccessToast(response.data.message);
      return true;
    }
  } catch (error) {
    console.error("Error adding:", error);

    if (error.response?.status === 400) {
      showErrorToast(error.response.data.message);
    } else if (error.response?.status === 401) {
      showErrorToast(error.response.data.message);
      if (navigate) navigate("/");
    } else {
      showErrorToast("Something went wrong");
    }

    return false;
  }
}

async function UpdateApi(data, route, id, navigate) {
  try {
    const response = await axios.put(`${apikey}/${route}/${id}`, data, {
      headers: getAuthHeader(),
    });

    if (response.status === 200) {
      showSuccessToast(response.data.message);
      return true;
    }
  } catch (error) {
    console.error("Error adding:", error);

    if (error.response && error.response.status === 400) {
      showErrorToast(error.response.data.message);
    } else if (error.response?.status === 401) {
      showErrorToast(error.response.data.message);
      if (navigate) navigate("/");
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
    const response = await axios.post(`${apikey}/${route}`, data, {
      headers: getAuthHeader(),
    });

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

const getUserFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export { addApi, UpdateApi, getApi, authapi, getUserFromToken, getAuthHeader };

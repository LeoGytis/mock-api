import {
  ErrorResponse,
  RegisterUserProps,
  UserLoginProps,
} from "../utils/constants";
import apiRequest from "./apiService";

export interface RegisterUserResponse {
  id: string;
  name: string;
}

export interface LoginUserResponse {
  id: string;
  name: string;
  balance: number;
  currency: string;
  accessToken: string;
}

export const registerUser = ({
  name,
  email,
  password,
  confirmPassword,
}: RegisterUserProps): Promise<RegisterUserResponse> => {
  return apiRequest("/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, confirmPassword }),
  })
    .then((data) => {
      return data;
    })
    .catch((error: ErrorResponse) => {
      throw new Error(error.message || "Registration failed");
    });
};

export const loginUser = ({
  email,
  password,
}: UserLoginProps): Promise<LoginUserResponse> => {
  return apiRequest("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
    .then((data) => {
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("playerId", data.id);
      return data;
    })
    .catch((error: ErrorResponse) => {
      throw new Error(error.message || "Login failed");
    });
};

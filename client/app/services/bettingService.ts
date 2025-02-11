import { BetProps, ErrorResponse } from "../utils/constants";
import apiRequest from "./apiService";

interface PlaceBetResponse {
  transactionId: string;
  currency: string;
  balance: number | null;
  winAmount: number | null;
}

export const placeBet = (amount: number): Promise<PlaceBetResponse> => {
  return apiRequest("/bet", {
    method: "POST",
    body: JSON.stringify({ amount }),
  })
    .then((data) => {
      return data;
    })
    .catch((error: ErrorResponse) => {
      throw new Error(error.message || "Failed to bet");
    });
};

export const getBetsList = async (
  page: number = 1,
  status?: string,
  limit: number = 4,
  id?: string
): Promise<{
  data: BetProps[];
  total: number;
  page: number;
  limit: number;
}> => {
  let url = `/my-bets?page=${page}&limit=${limit}`;
  if (status) {
    url += `&status=${status}`;
  }

  if (id) {
    url += `&id=${id}`;
  }

  const response = await apiRequest(url);
  return {
    data: response.data,
    total: response.total,
    page: response.page,
    limit: response.limit,
  };
};

export const deleteBet = async (betId: string) => {
  const url = `/my-bet/${betId}`;

  return apiRequest(url, {
    method: "DELETE",
  })
    .then((data) => {
      return data;
    })
    .catch((error: ErrorResponse) => {
      throw new Error(error.message || "Failed to cancel bet");
    });
};

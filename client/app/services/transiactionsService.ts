import { TransactionProps } from "../utils/constants";
import apiRequest from "./apiService";

export const getMyTransactions = async (
  page: number = 1,
  type?: string,
  limit: number = 20,
  id?: string
): Promise<{
  data: TransactionProps[];
  total: number;
  page: number;
  limit: number;
}> => {
  let url = `/my-transactions?page=${page}&limit=${limit}`;

  if (type) {
    url += `&type=${type}`;
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

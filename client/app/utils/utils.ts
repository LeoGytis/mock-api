import moment from "moment";

export const formatDate = (date: string | Date) => {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
};

export const getUserName = (): string | null => {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  return token && userName ? userName : null;
};

export const formatAmount = (amount: number | null) => {
  if (amount === null) {
    return "";
  }
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
};

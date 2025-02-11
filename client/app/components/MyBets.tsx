import React, { useEffect, useState } from "react";
import { FaDice } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import useWebSocket from "../hooks/useWebSocket";
import { deleteBet, getBetsList } from "../services/bettingService";
import {
  BetProps,
  BetStatus,
  ErrorResponse,
  statusColor,
} from "../utils/constants";
import { formatAmount, formatDate } from "../utils/utils";

interface MyBetsProps {
  filters: { status?: string };
}

const MyBets: React.FC<MyBetsProps> = ({ filters }) => {
  const balance = useWebSocket();
  const [bets, setBets] = useState<BetProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const page = currentPage + 1;
    getBetsList(page, filters.status)
      .then((data) => {
        setBets(data.data);
        setTotalPages(Math.ceil(data.total / 2));
        setLoading(false);
      })
      .catch((error: ErrorResponse) => {
        setError(error.message);
        setLoading(false);
      });
  }, [filters, currentPage, balance]);

  const handleDelete = (betId: string) => {
    deleteBet(betId)
      .then(() => {
        setBets((prevBets) =>
          prevBets.map((bet) =>
            bet.id === betId ? { ...bet, status: BetStatus.Canceled } : bet
          )
        );
      })
      .catch((error: ErrorResponse) => {
        setError(error.message);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (bets.length === 0) {
    return <span className="text-xl text-primary mt-10">No bets to show</span>;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {bets.map((bet) => (
        <div
          key={bet.id}
          className="relative flex justify-between items-center bg-secondary border border-primary rounded p-4"
        >
          <div className="flex flex-col gap-2">
            <div
              className={`w-fit flex gap-2 capitalize border rounded p-2 py-0 ${
                statusColor[bet.status]
              }`}
            >
              {bet.status}

              {bet.status === BetStatus.Win ? (
                <p>{formatAmount(bet.winAmount)}!</p>
              ) : null}
            </div>
            <p>Bet: {formatAmount(bet.amount)}</p>
            <p>Date: {formatDate(bet.createdAt)}</p>
            <p>ID: {bet.id}</p>
          </div>
          <div className="absolute top-4 right-4 flex flex-col gap-2 items-center">
            <FaDice className="w-12 h-12 text-primary text-opacity-40" />
            {bet.status !== BetStatus.Canceled &&
              bet.status !== BetStatus.Win && (
                <button
                  onClick={() => handleDelete(bet.id)}
                  className="mt-auto text-red-500 border border-red-500 rounded hover:text-red-800 hover:border-red-800 px-3 py-1"
                >
                  Cancel
                </button>
              )}
          </div>
        </div>
      ))}
      <ReactPaginate
        pageCount={totalPages}
        onPageChange={(selected) => setCurrentPage(selected.selected)}
        containerClassName={"self-center flex gap-3 text-lg text-primary mt-2"}
        activeClassName={"bg-primary text-secondary px-2 rounded"}
        pageClassName={"text-primary"}
        previousLabel={<span>{"<"}</span>}
        nextLabel={<span>{">"}</span>}
        previousClassName={"mr-2"}
        nextClassName={"ml-2"}
      />
    </div>
  );
};

export default MyBets;

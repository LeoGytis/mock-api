"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { placeBet } from "../services/bettingService";
import { ErrorResponse } from "../utils/constants";
import { formatAmount } from "../utils/utils";

interface BetFormProps {
  amount: number;
}

const BetForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BetFormProps>({});

  const onSubmit = ({ amount }: BetFormProps) => {
    setLoading(true);
    setMessage("");
    placeBet(amount)
      .then(() => {
        setMessage(`You have made a bet of ${formatAmount(amount)}`);
      })
      .catch((error: ErrorResponse) => {
        setMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-2"
    >
      <h2 className="hidden lg:block text-center text-xl font-sembold text-primary mb-4">
        Place your bet
      </h2>

      <input
        id="amount"
        type="number"
        className="w-1/2 lg:w-full text-center border rounded px-4 py-2 "
        {...register("amount", {
          required: "Amount is required",
          min: { value: 1, message: "Minimum bet is 1" },
        })}
      />

      <button
        type="submit"
        className="w-1/2 lg:w-full text-foreground bg-primary border rounded hover:bg-transparent hover:text-primary px-4 py-2"
        disabled={loading}
      >
        BET
      </button>
      <div className="text-sm text-center text-red-500">
        {errors.amount && <p>{errors.amount.message} </p>}
        {message && <p>{message}</p>}
      </div>
    </form>
  );
};

export default BetForm;

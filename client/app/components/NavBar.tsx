"use client";
import { useRouter } from "next/navigation";
import { GiRollingDices } from "react-icons/gi";
import useWebSocket from "../hooks/useWebSocket";
import { formatAmount } from "../utils/utils";
import BetForm from "./BetForm";
import ThemeSwitch from "./ThemeSwitch";

interface NavBarProps {
  userName?: string | null;
}

const NavBar: React.FC<NavBarProps> = ({ userName }) => {
  const router = useRouter();
  const balance = useWebSocket();

  return (
    <div className="sticky top-0 lg:relative flex flex-col lg:flex-row justify-between items-center gap-2 text-primary font-medium border rounded bg-secondary p-4">
      <div className="w-full flex justify-evenly items-center gap-4">
        <div className="block lg:hidden">
          <BetForm />
        </div>
        <div className="lg:w-full flex flex-col lg:flex-row justify-between items-center gap-2">
          <div className="flex items-center">
            <GiRollingDices className="w-16 h-16" />
            <span className="hidden lg:block text-3xl">Betsy</span>
          </div>
          <div>{formatAmount(balance)}</div>

          {!userName ? (
            <div className="flex gap-2 text-lg text-primary">
              <button
                className="border rounded hover:text-foreground hover:bg-primary px-3 py-1"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
              <button
                className="border rounded hover:text-foreground hover:bg-primary px-3 py-1"
                onClick={() => router.push("/register")}
              >
                Register
              </button>
            </div>
          ) : (
            <span className="text-2xl font-medium">{userName}</span>
          )}
        </div>
      </div>

      <ThemeSwitch />
    </div>
  );
};

export default NavBar;

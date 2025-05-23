import { getCurrentUser } from "@/actions/loginAction";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export interface IUser {
  userId: string;
  email: string;
  role: "MEMBERS" | "ADMIN" | string;
  iat?: number;
  exp?: number;
}

interface AuthContextType {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

// Create the context with an initial empty value
const UserContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async () => {
    const userFromCookie = await getCurrentUser();
    setUser(userFromCookie);
    setIsLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [isLoading]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser Must be used within the UseProvider context");
  }
  return context;
};

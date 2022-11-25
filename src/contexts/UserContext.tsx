import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getUserInfo,
  loadIdToken,
  loginUser,
  registerUser,
  saveIdToken,
} from "../services";
import { LoginUser, RegisterUser, Team, User } from "../types";

interface UserContextValue {
  loading: boolean;
  login: (info: {}) => Promise<void>;
  register: (info: {}) => Promise<void>;
  user: User | undefined;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

function useUser() {
  const context = useContext(UserContext);
  if (typeof context === "undefined") {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

interface UserProviderProps {
  children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const loadUser = async () => {
    if (loadIdToken()) {
      setLoading(true);
      const res = await getUserInfo();
      if (res?.data?.user) {
        const { nickname, team } = res.data.user;
        const userTeam = new Team(team, true);
        setCurrentUser(new User(nickname, userTeam));
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (loginInfo: LoginUser) => {
    const idToken = await loginUser(loginInfo);
    saveIdToken(idToken);
    loadUser();
  };

  const register = async (registerInfo: RegisterUser) => {
    const idToken = await registerUser(registerInfo);
    saveIdToken(idToken);
    loadUser();
  };

  const value: UserContextValue = {
    loading,
    login,
    register,
    user: currentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { useUser };
export default UserProvider;

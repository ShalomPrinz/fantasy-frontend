import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { auth, getUserInfo, loadIdToken } from "../services";
import { Team, User } from "../types";

interface UserContextValue {
  loading: boolean;
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
        setCurrentUser(new User(nickname, new Team(team)));
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
    return auth.onAuthStateChanged(() => {
      loadUser();
    });
  }, []);

  const value: UserContextValue = {
    loading,
    user: currentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { useUser };
export default UserProvider;

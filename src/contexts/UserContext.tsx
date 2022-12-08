import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import {
  getUserInfo,
  loadIdToken,
  loginUser,
  logoutUser,
  registerUser,
  removeIdToken,
  saveIdToken,
} from "../services";
import { LoginUser, RegisterUser, Team, User } from "../types";

enum State {
  LOADING_USER,
  LOGGED_USER,
  NO_LOGGED_USER,
}

interface UserContextValue {
  loading: boolean;
  login: (info: {}) => Promise<void>;
  logout: () => Promise<void>;
  register: (info: {}) => Promise<void>;
  state: State;
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
  const state =
    typeof currentUser === "undefined"
      ? loading
        ? State.LOADING_USER
        : State.NO_LOGGED_USER
      : State.LOGGED_USER;

  const loadUser = async () => {
    if (loadIdToken()) {
      setLoading(true);
      const res = await getUserInfo().catch(({ response }) => {
        if (response.status === 401) {
          toast.error(
            "Your saved login info is outdated. Please Log In again",
            {
              toastId: "outdated",
            }
          );
          removeIdToken();
        }
      });
      if (res?.data?.user) {
        const { leagues, nickname, team } = res.data.user;
        const userTeam = new Team(team, true);
        const user = new User(leagues, nickname, userTeam);
        setCurrentUser(user);
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

  const logout = async () => {
    removeIdToken();
    setCurrentUser(undefined);
    await logoutUser();
  };

  const register = async (registerInfo: RegisterUser) => {
    const idToken = await registerUser(registerInfo);
    saveIdToken(idToken);
    loadUser();
  };

  const value: UserContextValue = {
    loading,
    login,
    logout,
    register,
    state,
    user: currentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { State, useUser };
export default UserProvider;

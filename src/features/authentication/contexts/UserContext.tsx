import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import type { User } from "../../../types";
import {
  getUserInfo,
  loadIdToken,
  loginUser,
  logoutUser,
  registerUser,
  removeIdToken,
  saveIdToken,
} from "../services";
import { parseUser } from "../types";
import type { LoginUser, RegisterUser } from "../types";

enum UserState {
  LOADING_USER,
  LOGGED_USER,
  NO_LOGGED_USER,
}

interface UserContextValue {
  invalidate: () => Promise<void>;
  loading: boolean;
  login: (info: {}) => Promise<void>;
  logout: () => Promise<void>;
  register: (info: {}) => Promise<void>;
  state: UserState;
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
        ? UserState.LOADING_USER
        : UserState.NO_LOGGED_USER
      : UserState.LOGGED_USER;

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
        const user = parseUser(res.data.user);
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
    invalidate: loadUser,
    loading,
    login,
    logout,
    register,
    state,
    user: currentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider, UserState, useUser };

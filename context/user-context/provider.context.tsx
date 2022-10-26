import Cookies from "js-cookie";
import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import supabase from "../../app/models/supabase/index";

import type { AuthContextType } from "./provider.types";
import { poster } from "./provider.functions";
import Router from "next/router";

const AuthContext = createContext<AuthContextType | null>(null);
const auth = supabase.auth;

interface UserContextProviderProps {
  children: ReactNode;
}

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [remember, setRemember] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const registerWithEmailAndPassword = (
    email: string,
    password: string,
    confirm_password: string,
    first_name: string,
    last_name: string,
    onSuccess?: (success?: any) => void,
    onError?: (error?: any) => void
  ) => {
    if (password !== confirm_password) {
      if (onError) onError("Passwords do not match");
      return;
    }

    poster("/api/auth/user", {
      email,
      password,
      first_name,
      last_name,
    }).then((data) => {
      if (data) {
        if (data.error) {
          if (onError) onError(data.error);
          return;
        }
        if (onSuccess) onSuccess(data);
        return;
      }
      if (onError) onError("Something went wrong");
      return;
    });
  };

  const signInWithEmailAndPassword = (
    email: string,
    password: string,
    remember_me: boolean,
    onSuccess?: (success?: any) => void,
    onError?: (error?: any) => any
  ) => {
    auth.signInWithPassword({ email, password }).then(({ data, error }) => {
      if (data.user) {
        setRemember(remember_me);
        onSuccess ? onSuccess(data) : undefined;
      }
      if (error) onError ? onError(error) : undefined;
    });
  };

  const signOut = async () => {
    const { error } = await auth.signOut();
    if (error) {
      console.log(error);
    }
  };

  const handleAuthStateChange = () => {
    console.log("Listing for event change...");
    auth.onAuthStateChange((event, session) => {
      const access_token = "auto-access-token";
      const refresh_token = "auto-refresh-token";
      console.log("AUTH STATE CHANGE: ", event);
      if (session && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED")) {
        console.log("Expires: ", session.expires_in);
        Cookies.set(refresh_token, session.refresh_token, {
          path: "/",
          expires: 365 * 24 * 100,
          sameSite: "Lax",
          secure: true,
        });
        Cookies.set(access_token, session.access_token, {
          path: "/",
          expires: 365 * 24 * 100,
          sameSite: "Lax",
          secure: true,
        });
        setAccessToken(session.access_token);
        setRefreshToken(session.refresh_token);
      } else if (event === "SIGNED_OUT" || event === "USER_DELETED") {
        Cookies.set(refresh_token, "", {
          path: "/",
          expires: 365 * 24 * 100,
          sameSite: "Lax",
          secure: true,
        });
        Cookies.set(access_token, "", {
          path: "/",
          expires: 365 * 24 * 100,
          sameSite: "Lax",
          secure: true,
        });
        setAccessToken(null);
        setRefreshToken(null);
      }
    });
  };

  const handleSetUser = async () => {
    if (accessToken) {
      const {
        data: { user },
        error,
      } = await auth.getUser(accessToken);
      console.log("User: ", accessToken);
      if (user) setUser(user);
      if (error) console.log(error);
      return;
    } else {
      setUser(null);
    }
  };

  const handleSetProfile = async () => {
    if (user) {
      console.log(user.id);
      const { data, error } = await supabase
        .from("Profile")
        .select("*")
        .filter("uid", "eq", user.id);

      console.log(data);
      if (data) {
        setProfile(data[0]);
        return;
      }
      if (error) console.log(error);
      setProfile(null);
    }
  };

  useEffect(() => {
    handleAuthStateChange();
    const accessToken = Cookies.get("auto-access-token");
    const refreshToken = Cookies.get("auto-refresh-token");

    console.log("Tokens; ", accessToken, refreshToken);
    accessToken
      ? accessToken !== ""
        ? setAccessToken(accessToken)
        : setAccessToken(null)
      : setAccessToken(null);
    refreshToken
      ? refreshToken !== ""
        ? setRefreshToken(refreshToken)
        : setRefreshToken(null)
      : setRefreshToken(null);
  }, []);

  useEffect(() => {
    console.log(accessToken);
    handleSetUser();
  }, [accessToken]);

  useEffect(() => {
    handleSetProfile();
  }, [user]);

  const value: AuthContextType = {
    profile,
    user,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    signOut,
  };

  return <AuthContext.Provider value={value} children={children} />;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Must be within User Context to use");
  return context;
};

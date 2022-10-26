export type User = {};


export type AuthContextType = {
  signInWithEmailAndPassword: (
    email: string,
    password: string,
    remember_me: boolean,
    onSuccess?: (success?: any) => void,
    onError?: (error?: any) => any
  ) => void;
  registerWithEmailAndPassword: (
    email: string,
    password: string,
    confirm_password: string,
    first_name: string,
    last_name: string,
    onSuccess?: (success?: any) => void,
    onError?: (error?: any) => void
  ) => void;
  signOut: () => Promise<void>;
  user: {[key:string]:any}
  profile: {[key:string]:any}
};
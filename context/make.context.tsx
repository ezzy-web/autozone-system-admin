import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  useContext,
} from "react";
import useMake from "../hooks/makes.hook";

export type MakeContextType = {
  makes: any[];
  filteredMakes: () => any[];
  onSearchStringChange: (searchString: string) => void;
  selectedMake: any;
  setSelectedMake: Dispatch<any>;
  searchString: string;
  createMake: (
    name: string,
    onSuccess?: (success?: any) => any,
    onError?: (error?: ErrorCallback) => void
  ) => void;
  updateMake: (
    id: number,
    updates: { [key: string]: any },
    onSuccess?: (success?: any) => any,
    onError?: (error?: ErrorCallback) => void
  ) => void;
  removeMake: (
    id: number,
    onSuccess?: (success?: any) => any,
    onError?: (error?: ErrorCallback) => void
  ) => void;
};

export const MakeContext = createContext<MakeContextType | null>(null);
interface MakeContextProviderProps {
  children: ReactNode;
}

export default function MakeContextProvider(props: MakeContextProviderProps) {
  const { children } = props;

  const { getAll, create, update, remove } = useMake();
  const [searchString, setSearchString] = useState("");
  const [makes, setMakes] = useState<any[]>([]);
  const [selectedMake, setSelectedMake] = useState<any>();

  const filteredMakes = () => {
    return makes.filter((make) =>
      make.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
    );
  };

  const onSearchStringChange = (searchString: string) => {
    setSearchString(searchString);
  };

  const handleGetAllMakes = () => {
    getAll()
      .then((makes) => {
        makes ? setMakes(makes) : null;
      })
      .catch((error) => console.error(error));
  };

  const createMake = (
    name: string,
    onSuccess?: (success?: any) => any,
    onError?: (error?: ErrorCallback) => void
  ) => {
    create(name)
      .then((make) => {
        if (onSuccess) onSuccess(make);
        handleGetAllMakes();
      })
      .catch((error) => {
        if (onError) onError(error);
      });
  };

  const updateMake = (
    id: number,
    updates: { [key: string]: any },
    onSuccess?: (success?: any) => any,
    onError?: (error?: ErrorCallback) => void
  ) => {
    update(id, updates)
      .then((model) => {
        if (onSuccess) onSuccess(model);
        handleGetAllMakes();
      })
      .catch((error) => {
        if (onError) onError(error);
      });
  };

  const removeMake = (
    id: number,
    onSuccess?: (success?: any) => any,
    onError?: (error?: ErrorCallback) => void
  ) => {
    remove(id)
      .then(() => {
        if (onSuccess) onSuccess();
        handleGetAllMakes();
      })
      .catch((error) => {
        if (onError) onError(error);
      });
  };

  useEffect(() => {
    handleGetAllMakes();
  }, []);

  const value: MakeContextType = {
    makes,
    filteredMakes,
    onSearchStringChange,
    selectedMake,
    setSelectedMake,
    createMake,
    updateMake,
    removeMake,
    searchString,
  };

  return <MakeContext.Provider value={value}>{children}</MakeContext.Provider>;
}

export const useMakeContext = () => {
  const context = useContext(MakeContext);
  if (!context) throw new Error("Must be within Make Context to use");
  return context;
};

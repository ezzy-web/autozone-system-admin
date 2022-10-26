import React from "react";
import { ReactNode, createContext, useEffect, useState, Dispatch } from "react";
import useModels from "../hooks/models.hook";

export type ModelContextType = {
  models: any[];
  filteredModels: () => any[];
  onSearchStringChange: (searchString: string) => void;
  selectedModel: any;
  setSelectedModel: Dispatch<any>;
  setMake: Dispatch<any>;
  searchString: string;
  createModel: (name: string, onSuccess?: (success?: any) => void, onError?: (error?: ErrorCallback) => void) => void
  updateModel: (id: number, updates: {[key:string]:any}, onSuccess?: (success?: any) => void, onError?: (error?: ErrorCallback) => void) => void
  removeModel: (id: number, onSuccess?: (success?: any) => void, onError?: (error?: ErrorCallback) => void) => void
  [key: string]: any;
};

export const ModelContext = createContext<ModelContextType | null>(null);

interface ModelContextProvider {
  children: ReactNode;
  value?: { [key: string]: any };
}

export default function ModelContextProvider(props: ModelContextProvider) {
  const { children } = props;

  const { getAll, create, update, remove } = useModels();
  const [models, setModels] = useState<any[]>([]);
  const [searchString, setSearchString] = useState("");
  const [selectedModel, setSelectedModel] = useState<any>();
  const [make, setMake] = useState<any>()

  const handleGetAllModels = () => {
    getAll(make.id)
      .then((models) => {
        models ? setModels(models) : null;
      })
      .catch((error) => console.error(error));
  };

  const filteredModels = () => {
    return models.filter((model) =>
      model.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
    );
  };

  const onSearchStringChange = (searchString: string) => {
    setSearchString(searchString);
  };


  const createModel = (name: string, onSuccess?: (success?: any) => void, onError?: (error?: ErrorCallback) => void) => {
    create(name, make)
    .then(model => {
      if (onSuccess) onSuccess(model)
      handleGetAllModels()
    })
    .catch( error => {
      if (onError) onError(error)
    })
  }

  const updateModel = (id: number, updates: {[key:string]:any}, onSuccess?: (success?: any) => void, onError?: (error?: ErrorCallback) => void) => {
    update(id, updates)
    .then( model => {
      if (onSuccess) onSuccess(model)
      handleGetAllModels()
    })
    .catch( error => {
      if (onError) onError(error)
    })
  }

  const removeModel = (id: number, onSuccess?: (success?: any) => void, onError?: (error?: ErrorCallback) => void) => {
    remove(id)
    .then( () => {
      if (onSuccess) onSuccess()
      handleGetAllModels()
    })
    .catch( error => {
      if (onError) onError(error)
    })
  }

  useEffect(() => {
    if (make) handleGetAllModels();
  }, [make]);

  return (
    <ModelContext.Provider
      value={{
        models,
        filteredModels,
        onSearchStringChange,
        selectedModel,
        setSelectedModel,
        setMake,
        createModel,
        updateModel,
        removeModel,
        searchString
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}

import { useEffect, useState, createContext, ReactNode, useContext } from 'react';
import useVehicle from "../hooks/vehicle.hook";
import { useBoolean } from "@chakra-ui/react";

export type VehicleContextType = {
  isChanged: boolean;
  vehicle: { [key: string]: any };
  change: (update: any) => void;
  update: (
    onSuccess?: (success?: any) => void,
    onError?: (error?: any) => void
  ) => void;
};

export const VehicleContext = createContext<VehicleContextType | null>(null);

interface VehicleContextProps {
  id: number;
  children: ReactNode;
}

export default function VehicleContextProvider(props: VehicleContextProps) {
  const { id, children } = props;
  const [vehicle, setVehicle] = useState<{[key: string]: any}>();
  const [data, setData] = useState({});
  const { getVehicle, updateVehicle } = useVehicle();
  const [isChanged, { on: onChange, off: offChange }] = useBoolean(false);

  const handleGetVehicle = () => {
    getVehicle(id)
      .then((vehicle) => setVehicle(vehicle))
      .catch((error) => console.error(error));
  };

  const change = (update: any) => {
    onChange();
    setData({ ...data, ...update });
  };

  const update = (
    onSuccess?: (success?: any) => void,
    onError?: (error?: ErrorCallback) => void
  ) => {
    if (!id) return;
    updateVehicle(id, data)
      .then((vehicle) => {
        offChange();
        setData({})
        setVehicle(vehicle);
        if (onSuccess) onSuccess();
      })
      .catch((error) => {
        if (onError) onError(error);
      });
  };

  useEffect(() => {
    if (!vehicle) return
    setVehicle({...vehicle, ...data});
    console.log("Updates: ", data)
  }, [data]);

  useEffect(() => {
    if (id) handleGetVehicle();
  }, [id]);

  return (
    <VehicleContext.Provider
      value={{ vehicle: vehicle ? vehicle : {}, isChanged, change, update }}
    >
      {children}
    </VehicleContext.Provider>
  );
}


export const useVehicleContext = () => {
  const context = useContext(VehicleContext)

  if (!context) throw new Error("Must be within Vehicle Context to use")
  return context
}

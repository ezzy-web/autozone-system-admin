import { useState, useEffect } from "react";
import supabase from "../app/models/supabase/index";

const db_vehicle = "Vehicle";

export default function useVehicle() {

  const createVehicle = async (vehicle_data: {
    chassis: string;
    engine_number: string;
    model: number;
    body: string;
    submodel: string;
  }) => {
    const { data, error } = await supabase
      .from(db_vehicle)
      .insert(vehicle_data)
      .select("*");

    return { data, error };
  };

  const getVehicle = async (id: number) => {
    const { data, error } = await supabase
      .from(db_vehicle)
      .select("*")
      .filter("id", "eq", id);

    if (data) return data[0];
    if (error) throw new Error(error.message);
  };

  const updateVehicle = async (id: number, vehicleUpdates: any) => {
    const { data, error } = await supabase
      .from(db_vehicle)
      .update(vehicleUpdates)
      .filter("id", "eq", vehicleUpdates)
      .select("*");

    if (data) return data[0];
    if (error) throw new Error(error.message) 
  };

  return {
    createVehicle,
    getVehicle,
    updateVehicle
  };
}

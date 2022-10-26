import { useState, useEffect } from "react";
import supabase from "../app/models/supabase/index";

const db_make = "Make";

interface MakeStructure {
  id: number;
  name: String;
}

export default function useMake() {
  const [searchString, setSearchString] = useState("");

  const getAll = async () => {
    const { data, error } = await supabase
    .from(db_make)
    .select("*")
    .order("name", { ascending: true });

  if (data) return data
  if (error) throw new Error(error.message)
  }

  const get = async (id: number) => {
    const { data, error } = await supabase.from(db_make).select("*").filter("id", "eq", id);

    if (data) return data[0]
    if (error) throw new Error(error.message)
  };

  const create = async (name: string) => {
    const { data, error } = await supabase
      .from(db_make)
      .insert({
        name,
      })
      .select("*");

    if (data) return data[0]
    if (error) throw new Error(error.message);
  };

  const update = async (id: number, updates: {[key: string]: any}) => {
    const { data, error } = await supabase
      .from(db_make)
      .update({ id, ...updates})
      .select("*");

      if (data) return data[0]
      if (error) throw new Error(error.message)
  }

  const remove = async (id: number) => {
    await supabase.from(db_make).delete().eq("id", id);
  }

  return { get, getAll, update, create, remove };
}

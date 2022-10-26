import supabase from "../app/models/supabase/index";

const db_model = "Model";

export default function useModels() {
  const getAll = async (make_id: number) => {
    const { data, error } = await supabase
      .from(db_model)
      .select("*")
      .filter("make", "eq", make_id);

    if (data) return data;
    if (error) throw new Error(error.message);
  };

  const get = async (id: number) => {
    const { data, error } = await supabase
      .from(db_model)
      .select("*")
      .filter("id", "eq", id);

    if (data) return data[0];
    if (error) throw new Error(error.message);
  };

  const create = async (name: string, make: any) => {
    const { data, error } = await supabase
      .from(db_model)
      .insert({
        name,
        make: make.id,
        make_name: make.name
      })
      .select("*");

    if (data) return data[0];
    if (error) throw new Error(error.message);
  };

  const update = async (id: number, updates: {[key: string]: any}) => {
    const { data, error } = await supabase
      .from(db_model)
      .update({id, ...updates})
      .select("*");

      if (data) return data[0]
      if (error) throw new Error(error.message)
  }

  const remove = async (id: number) => {
    await supabase.from(db_model).delete().eq("id", id);
  }

  return { getAll, get, remove, update, create };
}

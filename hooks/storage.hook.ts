import React from "react";
import supabase from "../app/models/supabase/index";

interface StorageProps {}

const useStorage = (props: StorageProps = {}) => {
  const public_bucket = "";
  const private_bucket = "";

  const uploadFile = async (
    path: string,
    file: File,
    isPrivate: boolean = false
  ) => {
    const { data, error } = await supabase.storage
      .from(isPrivate ? private_bucket : public_bucket)
      .upload(path, file);

    if (data) return data;
    if (error) throw new Error(error.message);
  };

  const downloadFile = async (path: string, isPrivate: boolean = false) => {
    const { data, error } = await supabase.storage
      .from(isPrivate ? private_bucket : public_bucket)
      .download(path);

    if (data) return data;
    if (error) throw new Error(error.message);
  };

  return { uploadFile, downloadFile };
};

export default useStorage;

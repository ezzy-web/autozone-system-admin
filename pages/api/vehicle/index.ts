import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../app/models";
import supabase from "../../../app/models/supabase";

// CREATE A VEHICLE

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  console.log(method);

  switch (method) {
    case "POST":
      const data = req.body;
      console.log(data);
      res.status(201);
      break;
    default:
      res.status(404);
      break;
  }
}

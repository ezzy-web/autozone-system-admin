import type { NextApiResponse, NextApiRequest } from "next";
import supabase_service from "../../../app/models/supabase/service";

const db = "Profile";

type Data = {
  error?: string | null;
  data?: { [key: string]: any } | null;
};

const createUserProfile = async (
  uid: string,
  first_name: string,
  last_name: string
) => {
  const { data, error } = await supabase_service.from(db).insert({
    uid,
    first_name,
    last_name,
  })
  .select('*');

  if (data) return data[0];
  if (error) throw new Error(error.message);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const method = req.method;

  switch (method) {
    case "POST":
      const data = JSON.parse(req.body);
      console.log(data)

      const { email, password, first_name, last_name } = data;

      try {
        const {
          data: { user },
          error,
        } = await supabase_service.auth.admin.createUser({
          email,
          password
        });
        if (!user) throw new Error(error?.message);
        const data = await createUserProfile(
          user.id,
          first_name,
          last_name
        ).catch((error: any) => {
          console.log(error)
          throw new Error(error?.message);
        });

        res.status(200).json({ data });
      } catch (error: any) {
        res.status(500).json({ error: error?.message });
      }

      break;
    default:
      res.status(405).json({ error: "Invalid Method" });
      break;
  }
}

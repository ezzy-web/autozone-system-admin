import db from "../../../app/models";


export default async function handler(
  req: any,
  res: { status: (arg0: number) => void }
) {
  const { method } = req;

  switch (method) {
    case "POST":

      const { data } = req.body
      console.log(data)



      break;
    default:
      res.status(404)
      break;
  }
}

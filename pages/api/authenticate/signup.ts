import db from '../../../lib/db';

interface Request {
  body: {
    [property: string]: string
  }
}

export default async (req: Request, res: Response | any): Promise<void> => {
  // Get credentials from JSON body
  const {username, email, password, role} = req.body;

  db.createUser(username, password, email, role)
      .then((result: any) => {
        res.send(JSON.stringify(result));
      }).catch((error: Error) => {
        res.send(JSON.stringify(error));
      });
};

import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello World" });
});

app.post("/courses", (req: Request, res: Response) => {
  const { name } = req.body;
  return res.json({ name });
});

app.listen(3333, () => console.log("Server is running!"));

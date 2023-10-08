import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      status: 200,
      message: "Express seems to be running. No issues here.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

export default router;

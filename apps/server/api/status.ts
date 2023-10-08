import * as express from 'express';

const router: express.Router = express.Router();

/**
 * GET product list.
 *
 * @return product list | empty.
 */
router.get("/", async (req:express.Request, res:express.Response) => {
  try {
    res.json({
      status: 200,
      message: "Express seems to be running. No issues here.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

export default router;

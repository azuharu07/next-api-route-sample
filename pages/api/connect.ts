import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(async (req, res, next) => {
  const start = Date.now()
  await next()
  const end = Date.now()
  console.log(`Request took ${end - start}ms`)
}).get((req, res) => {
  res.send({ message: "Hello world" })
})

export default router.handler({
  onError: (err, req, res) => {
    console.error(err);
    res.status(500).end("Something broke!")
  },
  onNoMatch: (req, res) => {
    res.status(400).end("Page is not found")
  }
})
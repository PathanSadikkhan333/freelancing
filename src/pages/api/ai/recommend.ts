import { NextApiRequest, NextApiResponse } from 'next'
import { recommendJobsForProfile } from '../../../lib/openai'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { userId } = req.query
  const user = await prisma.user.findUnique({ where: { id: String(userId) } })
  if (!user) return res.status(404).json({ error: 'user not found' })
  const rec = await recommendJobsForProfile(user)
  res.json({ recommendations: rec })
}
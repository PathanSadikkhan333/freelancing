/*
import { NextApiRequest,NextApiResponse } from "next";
import {prisma } from '../../lib/prisma'

export default function handler(req:NextApiRequest,res:NextApiResponse){
    if (req.method === 'GET'){
       const jobs = await prisma.job.findMany({include:{employer:true}})
       res.json(jobs)
       return
    }
    if(req.method === 'POST'){
        const {title,decription,bufgetMin,bufgetMax,skills,employerId} = req.body
        const job = await prisma.job.create({data:{title,description,budgetMax,skills,employerId}})
        res.status(201).json(job)
        return
    }
    res.status(405).end()
}
    */
   import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const jobs = await prisma.job.findMany({ include: { employer: true } });
      return res.json(jobs);
    } catch (error) {
      console.error("GET /api/jobs error:", error);
      return res.status(500).json({ error: "Failed to fetch jobs" });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, description, budgetMin, budgetMax, skills, employerId } = req.body;

      // Validate required fields (optional but recommended)
      if (!title || !description || !employerId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const job = await prisma.job.create({
        data: {
          title,
          description,
          budgetMin,
          budgetMax,
          skills,
          employerId,
        },
      });

      return res.status(201).json(job);
    } catch (error) {
      console.error("POST /api/jobs error:", error);
      return res.status(500).json({ error: "Failed to create job" });
    }
  }

  // Method not allowed
  return res.status(405).end();
}

/*
import { NextApiRequest,NextApiResponse } from "next";
import {prisma} from '../../lib/prisma'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'POST'){
       const {jobId,freelancerId,coverletter,price} =req.body
       const application = await prisma.application.create({data:{jobId,freelancerId,price}})
       return res.status(201).json(application)

    }
}
*/

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Destructure and validate input body parameters
      const { jobId, freelancerId, coverletter, price } = req.body;

      if (!jobId || !freelancerId || !price) {
        return res.status(400).json({ error: "Missing required fields: jobId, freelancerId, price" });
      }

      // Create application record in database
      const application = await prisma.application.create({
        data: {
          jobId,
          freelancerId,
          price,
          coverletter // add coverletter if it exists in your prisma schema
        }
      });

      // Explicitly set JSON content type header
      res.setHeader('Content-Type', 'application/json');
      
      // Respond with created application JSON and status 201
      return res.status(201).json(application);

    } catch (error) {
      console.error("Error creating application:", error);
      // Return JSON error response on failure
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Method not allowed handler for other HTTP methods
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}

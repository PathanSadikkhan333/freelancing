/*
import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'POST'){
        const {jobId,amount,currency}=req.body
        return res.json({ok:true,checkout:{provider:"razopay",orderId:"order_xxx"}})
    }
    res.status(405).end()
}

*/


import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { jobId, amount, currency } = req.body;

      // Add basic validation for required fields
      if (!jobId || !amount || !currency) {
        return res.status(400).json({ ok: false, error: 'Missing required fields' });
      }

      // Normally, you would call your payment provider API here
      // For example, generate an order and get an orderId

      // Mock response example
      const checkout = {
        provider: "razopay",
        orderId: "order_xxx"
      };

      // Send JSON response with appropriate Content-Type header
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json({ ok: true, checkout });

    } catch (error) {
      // Handle unexpected errors gracefully
      console.error('Payment API error:', error);
      return res.status(500).json({ ok: false, error: 'Internal Server Error' });
    }
  }

  // Method not allowed for non-POST requests
  res.setHeader('Allow', 'POST');
  return res.status(405).end('Method Not Allowed');
}

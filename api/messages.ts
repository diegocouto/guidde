import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body) {
    const { email, subject, message } = JSON.parse(req.body);

    /**
     *  --------------------------
     *  TODO Integrate with your preferred email service
     *  --------------------------
     */
  }

  res.json({ success: true });
};

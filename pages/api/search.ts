import { NextApiRequest, NextApiResponse } from 'next';

import Search from '../../utils/libs/search';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const term = req.query.term as string;
  const locale = req.query.locale as string;

  try {
    res.json(Search.find(term, locale));
  } catch (error) {
    console.error(error);

    res.json([]);
  }
};

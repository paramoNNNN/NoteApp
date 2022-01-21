import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../utils/supebaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = req.body;
  const notes = await (
    await supabase.from('notes').select().filter('user', 'eq', user)
  ).data;
  res.status(200).json(notes);
}

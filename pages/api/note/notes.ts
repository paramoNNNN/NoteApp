import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../utils/supebaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const notes = await (await supabase.from('notes').select()).data;
  res.status(200).json(notes);
}

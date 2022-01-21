import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../utils/supebaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, user } = req.query;
  const { note } = req.body;
  if (!id || !user) {
    res.status(400).json({ message: 'Bad Request' });
  }

  if (req.method === 'GET') {
    const notes = await (
      await supabase
        .from('notes')
        .select()
        .filter('user', 'eq', user)
        .filter('id', 'eq', id)
    ).data;

    res.status(200).json(notes);
  } else if (req.method === 'POST') {
    const notes = await (
      await supabase.from('notes').upsert({ ...note, user })
    ).data;
    return res.status(200).json(notes);
  } else if (req.method === 'DELETE') {
    const status = await (
      await supabase.from('notes').delete().match({ id, user })
    ).status;
    res.status(status);
  }

  res.status(400).json({ message: 'Bad Request' });
}

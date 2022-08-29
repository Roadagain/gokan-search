import { NextApiHandler } from 'next';
import { loadCharactersDataFromJson } from '../../../lib/load-data';

const handler: NextApiHandler = async (request, response) => {
  const { name } = request.query;
  if (typeof name !== 'string') {
    return response.status(400).json({ error: 'Name must be string' });
  }
  const fetchResult = await fetch(
    `${process.env.CHARACTERS_DATA_STORAGE_URL}/${name}.json?alt=media`
  );
  if (fetchResult.status === 404) {
    return response.status(404).json({ error: 'Not Found' });
  }
  const json = await fetchResult.json();
  const charactersData = loadCharactersDataFromJson(json);
  response.status(200).json(charactersData);
};

export default handler;

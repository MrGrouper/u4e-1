import OpenAI from 'openai';
import { config } from 'dotenv'
config()

const { OPENAI_API_KEY, OPENAI_VECTOR_STORE_ID, OPENAI_ASSISTANT_ID} = process.env


export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export const vectorStoreId = OPENAI_VECTOR_STORE_ID

export const assistantId = OPENAI_ASSISTANT_ID


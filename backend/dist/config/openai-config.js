import OpenAI from 'openai';
import { config } from 'dotenv';
config();
const { OPENAI_API_KEY } = process.env;
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});
export default openai;
//# sourceMappingURL=openai-config.js.map
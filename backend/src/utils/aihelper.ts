
import { openai } from "../config/openai-config.js";

export const assistantId = process.env.OPENAI_ASSISTANT_ID

export const runAiAssistant = async (threadId, content, role) => {
await openai.beta.threads.messages.create(threadId, {
    role: role,
    content: content
  });

  const runResponse = await openai.beta.threads.runs.create(
    threadId,
    {
      assistant_id: assistantId,
    }
  );
  let run = await openai.beta.threads.runs.retrieve(
    threadId,
    runResponse.id
  );

  // Polling mechanism to see if runStatus is completed
  while (run.status !== "completed") {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    run = await openai.beta.threads.runs.retrieve(
      threadId,
      runResponse.id
    );
  }
  const threadMessages = await openai.beta.threads.messages.list(threadId);

  const lastMessageForRun = threadMessages.data
  .filter(
    (message) => message.run_id === run.id && message.role === "assistant"
  )
  .pop();

  return lastMessageForRun
  }

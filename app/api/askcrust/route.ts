import { queryPineconeVectorStore } from "@/utils";
import { Pinecone } from "@pinecone-database/pinecone";
// import { Message, OpenAIStream, StreamData, StreamingTextResponse } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, Message, StreamData, streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 120;
// export const runtime = 'edge';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY ?? "",
});

const google = createGoogleGenerativeAI({
  baseURL: "https://generativelanguage.googleapis.com/v1beta",
  apiKey: process.env.GEMINI_API_KEY,
});

// gemini-1.5-pro-latest
// gemini-1.5-pro-exp-0801
const model = google("models/gemini-1.5-pro-latest", {
  safetySettings: [
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
  ],
});

export async function POST(req: Request, res: Response) {
  const reqBody = await req.json();
  console.log(reqBody);

  const messages: Message[] = reqBody.messages;
  const userQuestion = `${messages[messages.length - 1].content}`;

  const reportData: string = reqBody.data.reportData;
  //API docs
  const query = `Represent this for searching relevant passages: 
    Here is an API documentation excerpt: \n${reportData}.
    User's technical question: \n${userQuestion}`;

  const retrievals = await queryPineconeVectorStore(
    pinecone,
    "crustdata-api",
    "ns1",
    query
  );

  //api doc
  const finalPrompt = `
    Here is a summary of an API's documentation and a user query. 
    Review the documentation to answer the user's technical question.
    Ensure the response is factually accurate, concise, and actionable.
    Before answering, enrich your understanding by reviewing additional relevant documentation if required.

    \n\n**API Documentation Summary:** \n${reportData}.
    \n**End of API Documentation** 

    \n\n**User Query:** \n${userQuestion}
    \n**End of User Query** 

    \n\n**Retrieved Relevant Documentation:** 
    \n${retrievals}.
    \n**End of Retrieved Documentation** 

    \n\n**Answer:**`;

  const data = new StreamData();
  data.append({
    retrievals: retrievals,
  });

  const result = await streamText({
    model: model,
    prompt: finalPrompt,
    onFinish() {
      data.close();
    },
  });

  return result.toDataStreamResponse({ data });
}

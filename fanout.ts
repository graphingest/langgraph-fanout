/**
 * The same fan-out as langgraph_fanout.py, written in TypeScript.
 *
 * Five assistants work at a time inside one batch. A new batch may
 * start at most 20 times a minute, and at most five batches run together.
 *
 *   npm install
 *   npm run deploy
 *
 * Watch the run at https://www.graphingest.io/runs
 * Replace the sentence in `researcher` with your model when you are ready.
 */

import { node, graph, deploy } from "graphingest";

const researcher = node(
  { name: "researcher", maxRetries: 2, timeoutSeconds: 120 },
  async (question: string) => {
    const answer = `[gpt-4o-mini] notes on: ${question}`;
    return { question, answer };
  }
);

const researchFanout = graph(
  {
    name: "research-fanout",
    timeoutMs: 3_600_000,
    throttle: { limit: 20, periodSeconds: 60 },
    concurrency: { limit: 5, waitTimeoutSeconds: 180 },
  },
  async (queries: string[]) => {
    const width = 5;
    const results: { question: string; answer: string }[] = [];
    for (let start = 0; start < queries.length; start += width) {
      const batch = (await researcher.map(queries.slice(start, start + width))) as {
        question: string;
        answer: string;
      }[];
      results.push(...batch);
    }
    return results;
  }
);

await deploy();

const answers = await researchFanout([
  "What is durable execution?",
  "How do serverless function timeouts work?",
  "What is a sliding-window rate limit?",
]);
for (const answer of answers) {
  console.log(answer);
}

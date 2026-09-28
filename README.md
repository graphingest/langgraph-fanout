# Many research assistants, with a speed limit

You have a pile of questions. Each one deserves its own assistant: search, read, and write an answer. If you send all of them at the same moment, two things happen. The model provider tells you to slow down, and the bill for that minute is much larger than you planned.

This starter runs one assistant per question, and it refuses to start them all at once.

## When this fits

Use it when the work is “answer each of these on its own,” and a burst would be too fast or too expensive.

Everyday cases:

- A research team drops in fifty questions at the end of the day and wants a short brief on each.
- Support wants a first pass on a queue of customer tickets.
- A catalog needs a paragraph written for every new product, and the writing has to stay inside a budget.
- A founder wants five versions of the same brief, then a pause before the next five.

Inside one batch, five assistants work at the same time. When those five finish, the next five start. Across batches, at most twenty new batches may start in a minute, and at most five batches may be in progress together. A sixth batch waits up to three minutes for a free slot.

That is the whole point of the speed limit. The answers still get written. They just do not all hit the model in the same second.

## What you get in this folder

`langgraph_fanout.py` is a small, complete example. Each question becomes one assistant. The assistant in the file is a stand-in: it writes a sentence that includes the question. It does not call a paid model.

When you are ready to spend money on real answers, replace the `reason` step with your model. The fan-out and the speed limits stay as they are. You do not rebuild the queue.

Keep the stand-in while you are learning the shape of the job. Switch to a real model only when the list of questions and the limits look right on the dashboard.

## What you need

- A GraphIngest account.
- An API key from Settings. Put it in your environment as `GRAPHINGEST_API_KEY`. Leave it out of the file and out of git.

## How to run it

```bash
pip install -r requirements.txt
python langgraph_fanout.py
```

The script registers the job, then asks three sample questions. Open the dashboard and you will see one run, with one task per question. A question that fails can be tried again on its own. The questions that already succeeded stay finished.

Change the list at the bottom of the file to your own questions. Change `width = 5` if you want a different number of assistants in flight inside a single batch. The two policies near the top of the graph are the limits on the next batch: how often a new batch may start, and how many batches may run together.

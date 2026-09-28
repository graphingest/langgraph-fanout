# langgraph-fanout

One LangGraph agent per question, five at a time. The next batch waits on a throttle (20 starts per minute) and a concurrency slot (5 runs in flight).

## Run

```bash
pip install -r requirements.txt
python langgraph_fanout.py
```

`reason` is a stand-in. Swap it for `ChatOpenAI` when you want real tokens. The fan-out and the limits stay the same.

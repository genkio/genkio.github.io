# On Pausing and Rewinding Time

Last week, I shared some thoughts on LLMs and time — it got a bit philosophical toward the end, sorry about that. This week, I'd like to continue the topic, but with something more concrete.

First, my setup. Neovim and tmux are my go-to combo for writing code these days. Every time I work on a task, I open a new tmux window and split it into left and right panes. The right pane runs neovim for code or using lazygit to watch the changes. The left pane I break into multiple horizontal panes, each running a separate Claude instance — planner, executor, reviewer, depends on who I need involved for that task, switch between them as I progress. This is essentially my poor man's version of multi-agent orchestration: the kind where I'm the one taking the lead, and the kind I can actually keep up with.

Back to how it relates to time, there are two things I love most when working with LLMs: the ability to pause time, and the ability to travel back in time.

As for pausing time. Going back to my setup — each task lives in its own tmux window. Whenever something else comes up, like a code review, or a new task cause the current one is pending on something, I just open a new window for it. Once I'm done, I go back and pick up the conversations like I never left.

And for travelling back in time. That's the forking function I shared at the happy coding session. The Pi agent — which Frank also mentioned last week — actually has a nicer implementation of this. When you fork, it lets you pick an exact point in the timeline to branch from. With Claude, by contrast, you have to fork the entire conversation and then manually rewind to a previous point in the new fork. It's a bit more clunky, but it gets the job done.

That's it from me today.

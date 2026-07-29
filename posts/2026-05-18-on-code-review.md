# On Code Review

This week's sharing involves a confession and something I learned about myself.

Start with the confession: I was not a good code reviewer. I did much less code review than I should have, and I never really dug into why, because from my point of view, I was hired to write code, and that's what I enjoyed doing. That's all that mattered.

We now live in different times. The other day, I was working with Claude to plan something, it came back with a plan and said it would take 15 working days. I gave it my blessing, and less than 15 minutes later, it was done. Last week, probably you all saw the news, Bun, the JavaScript runtime, has been rewritten in Rust, one million lines of code written in a week, if I read correctly. There's lots of debate around it, porting is different from creating from scratch, and also, Anthropic owns Bun, still, what an achievement.

I realized my job, or at least the expectation of me, has probably shifted. Reviewing code will most likely trump writing code, and it will take up most of working hours going forward, for as long as there still is a job. So I started forcing myself to do more.

While doing so, I started learning my shortcomings and coming up with solutions for them.

I have this theory: good programmers, like you all are, can rebuild deep layers of stack in your head just by looking at the diff. That's hard for me. I have to break up the diff, go back to the editor, trace through the logic, build up the stack brick by brick. That takes a lot of time, and more time spent reading others' code means less time writing and contributing my own. That's where my first roadblock came from.

Secondly, most of the time when I do find something, the first thing that pops into my head is self-doubt. Maybe I'm reading it wrong, or missed something. Posting questions instead of solid findings is probably fine, but I never felt good about it. Obviously, that's a personality flaw on my part.

Anyhow, after identifying these shortcomings, I built Slop Review, the tool I demonstrated last week. Some of the features were built specifically for myself, like reviewed marks, peeking ahead at later changes to the same code block, or running multiple rounds of questioning and double-checking with the agents before posting my actual feedback. It worked out great, as far as I can tell. Code review started to feel much less daunting, and I actually start looking forward to them a little.

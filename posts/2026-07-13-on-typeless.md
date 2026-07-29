# On Typeless

I've been having some trouble reading recently, there's just too much text to read. 

You ask an agent for a plan: bang, wall of text. 

Then when it's finished, it gives you the summary: bang, wall of text. 

You turn around from the terminal to the browser: every pull request description, wall of text. 

You scroll down, each code review comment. Not exactly a wall of text per se, but the intensity, is basically at the same level. 

I have this eye doctor visit once every two month, turns out my eyesight has actually dropped in the last half year, so the trouble is real, and it needs to be addressed.

The first thing I tried was what Jeremie also suggested the other week: having the agent produce more visually appealing and easy-to-read HTML. It is better, but issue remains.

Next, I tried having the agent output in Chinese instead. I thought that while English works better for me when it comes to writing, reading in Chinese might lower my cognitive burden a little. However, the output was completely unacceptable. Even Claude, which is supposed to be good at writing, its Chinese output is basically a direct translation of the English. I had to go back and read the English version again, ended up doubled the reading amount, jokes on me.

The third thing I tried was the "caveman skills" which I believe both Guillaume and Aditi shared in the channel before. It sounded like a gimmick, well, if there's a slim chance, I was willing to give it a shot. Actually, that worked out the best because it forces the agent to be much more straightforward and produces much less text. 

I now have this loaded as one of my de facto skills every time. Sometimes, I would even ask specifically: "Respond to me short and precise, caveman style."

At the same time, I'm also digging in and trying to understand why this is happening. 

One of my theories, actually, is because AI outputs text so effortlessly. Somewhere deep down, my lazy-ass brain is telling me those text are not worth reading. I know it sounds like crazy talk, my brains work in strange ways.

Fast forward two weeks ago, I started using Typeless, the speech to text app, there is also an AI middle layer running locally that formalizes what you said. It seems to be one of the best of its kind, it is very popular in the "vibe coder" community because, well, you cannot just sit there and type like a nerd, right? You have to speak out loud. I never thought I would use it, but since I am alone in the house these days, I figured, why not?

Not only that, I actually built myself a whole pipeline. Basically, I speak my thoughts out loud using Typeless. Then, on every reply from Claude, there is a hook handler that summarizes Claude's response using a local text to speech model, respond out aloud. So basically, it is a back-and-forth verbal conversation between me and Claude.

I was looking into a new task after setting up that pipeline last weekend. And I tried the "Grill Me" skill. As the name suggests, it has a turn-by-turn interview style to help you to flush out your thoughts into something concrete, the whole conversation took roughly the whole afternoon.

After the session finished, I was reading the output, well, still wall of text, but, I found myself, have a much easier time to read and digest. And after I came to the office, I pleasently found the effect lasted on me. It's like a miracle. 

As crazy as it sounds, I think, the back-and-forth verbal conversation gave Claude a kind of personality that unlocked the mental block I had earlier.

I was trying to put together the pieces in order to understand this.

First, the audio speaking portion definitely helped. It adds a different layer to the interaction. 

Second, is the "Grill Me" skill. Speaking of that skill, it was created by a guy called Matt, who used to be known as the TypeScript wizard. I learned a lot of advanced techniques from him back when everyone still hand-coded. He is a very good instructor. A lot of coding instructors are having a hard time nowadays because fewer people are learning to code from scratch, and their viewership has dropped a lot. But Matt really turned it around; he has a bunch of skills that are incredibly well-received in the developer community.

Back to what I'm saying: the "Grill Me" skill feels different. Instead of the cold, hard, robotic questions I used to get using the out-of-the-box Claude interview slash command, it has a genuine human touch. With the progression turns after turns, I got this constant feeling of someone who cares and understands sitting across me, that's why I was willing to go along with it for that long.

My language is not good enough to elaborate better what I had experienced, here is a one way to put it: when you work in a big company, you often have email communication with someone you never met before, there's always someone sounds like a total jerk over the email, reading this someone's email would most likely ruin your day. But then, one day, this someone visits the office. Turns out he or she is the nicest guy or gal you have ever met. After that face to face encounter, your communications goes much smoother, you still want to punch this someone on the face time to time, but, it's managable.

I think that's what happened here. I have finally crossed that mental bridge. Did that fix the problem once for all? probably not, the wall of text are still out there, new times, new problems, have to deal with them one at a time I guess.
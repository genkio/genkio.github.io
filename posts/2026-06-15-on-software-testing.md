# On Software Testing

Last week, the creator of Redis wrote a blog post titled "A New Era for Software Testing." Allow me to start by quoting the beginning and the end paragraph.

Traditionally software is tested using test suites that are composed of locally-scoped tests and integration tests. And then by QA passes that are usually manually executed, and that can capture holes in the runnable test suite. It is a known fact that covering all the lines of the code does not mean covering all the possible states. Moreover integration testing is structurally hard: there are a number of timing issues, setups, and certain quality outputs that can only be visually inspected and not automatically checked that leave a lot of testing opportunities not really exploited because of time or logistic constraints.

LLMs offer a new way to do QA on top of the existing testing methodologies. The idea is to create a markdown file where an AI agent is asked to work as a QA engineer, performing a number of manual testings on the new release. I have the feeling that the introduction of automatic QA may raise the bar of quality for new releases of software, and maybe partially compensate for the lower quality of the code produced at high speed with the use of automatic programming.

End of quote. This is something I strongly agree with, based on my recent personal experience.

Earlier, I started a sandbox script that uses loopback IPs to create standalone environments for our services. Gradually, it turned into a full-blown skill: the sandbox script, plus instructions on how to sign up, sign in, and interact with our services as browser, MCP client, as well as a CLI.

With that, take one of my recent tasks, the client requests monitoring dashboard, for example. It went through a few iterations, all based on actual simulated data. Each time, I basically told Claude to fire as many requests as possible, good and evil, from all clients, measure the requests we captured, and improve the implementation for better security and performance.

Since all of this happens inside the sandbox, I can leave it alone and work on something else. I've been adopting this development pattern more and more. After the task introduction, I would tell Claude something like, "the sandbox environment is at your disposal, you have all the freedom to do whatever you want with it, full autonomy". If AI agent can figure out what it's doing and evaluate whether what it has done is working or not, then it can almost always figure things out, lesson I learned while playing around with other agents.

That said, I was quite pleased with all the tasks it had done last week. It's either my workflow was working, or Fable was just that good. Since we've kissed Fable goodbye now, we'll see what happens next.

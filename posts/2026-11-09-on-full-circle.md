# On Full Circle

Recently, there has been a lot of talk about security issues, hacks, and everything. I would like to share something related to hacking, and things I learned along the way, to add a little bit of positivity among all the dreadful news we’ve been hearing.

I don’t really consider myself a gamer. Yes, this is game-related, and there are professional game developers among us, so what I’m about to say will most likely sound pretty naive. Please bear with me. There are only a handful of games I’ve played, and one of them is Diablo.

I was first introduced to it after I graduated from high school, and I just got hooked. Starting that summer, for the next year or so, I spent all the time I could find playing that game. I skipped classes, I stayed up overnight for it. By the end of the first semester of college, I realized I had to stop, this was just not healthy. Then one day, just like that, I gave it up. I’ll get to the reason by the end of the story.

Then came the second time. Yes, there were actually multiple times I got hooked by that same game. The second time was when I started working. I got my own laptop, I had to try the laptop gameplay experience, so I did. That run lasted a couple of months.

The third time was a couple of years ago, when Diablo II got a revamp with shiny new graphics and everything, called Diablo II: Resurrected, not only on PC but also on console this time, Switch included. I just couldn’t resist the temptation of being able to play this game on a mobile device, so I bought a Switch and bought the game. That’s when we were still at the old office. Back then, I still went out for lunch from time to time, so I’d bring my Switch to the KFC across the street, finish my chicken as fast as I could, then play a little.

That run didn’t last very long either, a couple of months again, and then I quit once more.

Third time’s the charm, right? That should have been the very last time for me. Still, I keep up with the news, and whenever something about Diablo pops up, I look into it. The game hacking scene has been busy lately, mostly around decrypting games and porting them to different platforms. One project that showed up on GitHub about two weeks ago really caught my eye: someone managed to find a way to port the Switch version of Diablo directly from Switch to iOS.

Switch emulation itself is nothing new, it has been around for years. But traditional emulation relies on a just-in-time (JIT) compiler to translate the game in real time so you can run it on a different CPU architecture, like a Windows PC. On iOS, that approach has always been practically impossible. There are a few projects that pulled it off, like Eden, but enabling JIT on iOS is such a pain. You have to jump through so many hoops just to get it working, so it never gained real popularity.

This project is completely different, which is the first thing I learned when I looked into it. It turns out the Switch shares the same ARM CPU architecture as iOS.

At a very high level, a Switch game consists of three main parts:

The game code itself, which runs natively on ARM.
The OS interfaces that let the game communicate with the operating system (Horizon OS on the Switch).
The graphics layer that actually renders the game.

Because the Switch and iOS share the same CPU architecture, barely any changes are needed for the game code itself: no JIT compiler required, and it can run natively on iOS. The OS interfaces also don’t require a large amount of work. The truly massive lift comes from the graphics layer, translating everything to Apple’s Metal graphics API.

Normally, nobody would ever take this approach. Who would want to put in that massive amount of manual work for just a single game? Standard emulators are built the way they are because they want broad compatibility: once any Switch game is dumped, the emulator can run it across different platforms, at the cost of performance.

Thanks to LLMs, the developer of that project had coding agents rewrite all the interfaces between the game and the graphics layer, basically rewriting the entire rendering pipeline to use Metal. It is an incredible amount of work, but clearly nothing is impossible for coding agents now.

Because the technical approach was so fascinating, I had to dig into it. The repository only provides the transpiling code, it does not ship with any copyrighted game code, of course. You have to dump your own legally owned game files and use the tool to transpile them into an iOS installer.

I had to try it out. And it worked, it ran right on my iPhone. It felt truly magical. Just hearing the opening music play natively gave me goosebumps.

After getting it to run, I only played a little bit, but just figuring it out, learning how it worked, and getting it to run was already so much fun. Little did I know, the fun was just getting started.

In order to transpile the game, the Switch game dump needs to be decrypted first, which gave me the chance to really look inside it.

That game is something special for another reason: it is the only game I played with my wife 20 years ago. It wasn’t for long, but it’s still the only game we ever played together. So I wondered, would it be possible to play it together across two Apple devices, two iPhones? Could we install it on both our phones and turn it into a co-op game? In the original Diablo II, you could do that as long as the computers were on the same LAN. But they removed LAN mode because everything moved online.

With that thought in mind, I fired up DeepSeek and looked into the game implementation. The second thing I learned is how the game is structured around a client-server architecture:

The server is basically the core engine logic that computes all the data. It manages the entire state: whether you click somewhere or move your controller, the engine translates and tracks that state.
The client handles input controls. It translates your actions into state updates, passes them to the server, and then a graphics layer renders everything on the screen once the state updates.

Once I understood that, the rest was pretty straightforward. Another device is just another client. To have that client communicate and send state back and forth, I just needed a communication layer. DeepSeek wrote me a TCP communication module, which I injected into the game code and recompiled, and it worked. I think I was in heaven at that moment.

Unfortunately, my wife is back in China this month (which is actually how I managed to spend so much time hacking on this), so I didn’t get the chance to see if she’s still interested in playing.

That got me thinking, what else could I do? If it can take input from another device on the same local network, what about over the internet? And I don’t mean playing with someone else over the internet, I mean playing with AI. Models like Jev or OpenAI’s decision APIs can make decisions and return responses very quickly. What if I just send the current state of the game world, the surroundings, environment, player stats, and enemies, to the model, and have it control how the character should act?

I swapped out that middle layer and created a bot layer instead, and it worked. By the end of the experiment, I had eight characters in the game: I was controlling one, and the other seven were bots. My mind was completely blown.

If I could travel back in time and tell this to the 20-year-younger version of me, he would just pass out from joy. Of course, if that happened, you wouldn’t be seeing me here, because there’d be no chance I’d graduate. I’d be a Diablo master by now, living happily with my parents.

Yesterday, I finally reached a level I had never reached before. Of course, I was playing alongside seven bots, so our team was completely unbeatable. We explored every single corner of the game and nothing could stop us. Honestly, I don’t think I’ll even ask my wife to play with me when she gets back, because compared to my bots, she’d be such a lousy player.

There is so much I learned along the way.

Let me end the story with a callback, on how I managed to pull myself out the first time. That time around, I played the game entirely single-player. We didn’t have computers in our dorms, so I had to go to the campus computer lab to play. I carried a USB drive everywhere, and whenever I finished a session, I would copy my save and progress files onto the drive. I did that back and forth for about a year and a half.

Then one day, after pulling yet another all-nighter on the game, I was completely exhausted walking back to my dorm, and I dropped my USB stick. In that moment, I was like, OMG, did I just kill my characters just like that?

Then it hit me. All the effort I had spent over that year and a half amounted to nothing. It was just data on a USB drive. It didn’t reflect on my grades, and nobody could even see how awesome my characters were, because they only existed on that crappy USB drive. Realizing it was all just data was my wake-up call. That’s how I walked away.

The funny thing is, that’s exactly what makes it so interesting this time around. It is just data, but now it’s data that I control. I know exactly how the data flows in and out. Out of all the times I’ve played this game, this has been the most enjoyable, because I have full control over it. I can tweak it and hack it however I want. What drove me away the first time is the exact thing making it fun and worthwhile now. It has come full circle.

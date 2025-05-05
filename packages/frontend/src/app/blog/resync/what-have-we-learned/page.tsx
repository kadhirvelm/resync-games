import { BlogEntry } from "@/components/blog/BlogEntry";
import { BlogText, PlainBlogText } from "@/lib/resync-components/BlogText";

export default function WhatHaveWeLearned() {
  return (
    <BlogEntry>
      <BlogText>
        The issue with bringing a phone into this mix is that people can get
        easily distracted. You have messages coming, the allure of Instagram,
        Slack, and the 101 other things you could do instead of playing this
        game. And it's so easy - it's right there if you want it. You can
        isolate yourself from the rest of the group with just a button click.
      </BlogText>
      <PlainBlogText>
        <p>
          That's what we're fighting against. It gets in the way of that feeling
          of togetherness. To counteract that, we think we've learned:
        </p>
        <ul>
          <li>
            Everyone's focus has to be on the same thing
            <ul>
              <li>Ideally, either the TV or someone else in the group</li>
            </ul>
          </li>
          <li>
            The more active attention the game requires from you, the harder it
            is to get distracted
            <ul>
              <li>We've found real-time games to be helpful</li>
            </ul>
          </li>
          <li>
            The game has to be simple to figure out
            <ul>
              <li>
                {" "}
                Otherwise, people won't get through the activation energy to
                understand
              </li>
            </ul>
          </li>
        </ul>
        <p>
          The operating word there is “think.” As we keep exploring and reading,
          we'll probably revisit these concepts and find new ones, but that's
          where the fun is!
        </p>
      </PlainBlogText>
      <BlogText>
        Then there's another hard problem we constantly think about: I want to
        play these games with my colleagues at work.
      </BlogText>
      <BlogText>
        For many of us, much of our weekly socialization comes from work. It's
        also an easy opportunity to get a group of people together for 30
        minutes. It'd be great to share meaningful experiences with the people I
        see the most in a given week. Experiences that help me get along with my
        colleagues better. I've found work a lot more tolerable when I like the
        people I'm around.
      </BlogText>
      <BlogText>
        But I also care a lot about inclusion. The tech industry I belong to is
        incredibly male-dominated. I don't want to introduce yet more activities
        into the mix that bias toward making women feel more excluded. I want
        games that everyone can enjoy, regardless of their existing
        predisposition toward games.
      </BlogText>
      <PlainBlogText>
        <p>
          Perhaps that's impossible, but I'm unwilling to give up. So far, we've
          been exploring:
        </p>
        <ul>
          <li>
            Games that grow with the players (think chess)
            <ul>
              <li>These are generally more competitive</li>
            </ul>
          </li>
          <li>
            Games that are simple to understand and that balance luck with skill
            (think Camel Up)
            <ul>
              <li>So new players and experienced players can have fun</li>
            </ul>
          </li>
          <li>
            Games that rely on player-generated content (think Fishbowl)
            <ul>
              <li>Maximizing inside jokes within the group</li>
            </ul>
          </li>
        </ul>
      </PlainBlogText>
      <BlogText>
        I'm not sure if any of this exploration will lead anywhere, but as we
        continue play testing, experimenting, and reading, I'm sure there will
        be more blog posts.
      </BlogText>
    </BlogEntry>
  );
}

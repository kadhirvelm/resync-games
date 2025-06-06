import { BlogEntry } from "@/components/blog/BlogEntry";
import { BlogText, PlainBlogText } from "@/lib/resync-components/BlogText";

export default function MonorepoCulture() {
  return (
    <BlogEntry>
      <BlogText>
        At this point, I've read many articles debating between polyrepos and
        monorepos<sup>1</sup>. I've also worked in both setups, many of which
        I've helped put together.
      </BlogText>
      <BlogText>
        I've seen what happens when the polyrepo setup gets pushed to the
        extreme, where every little API and service is in its own repo,
        inevitably resulting in dependency hell <sup>2</sup>. But I've also seen
        what happens when a monorepo gets so overburdened that the average
        developer has difficulty making the tools work. All day-to-day
        development slows down a ton. The tooling to make a monorepo work once
        you've got even a dozen developers in there is no joke.
      </BlogText>
      <BlogText>
        Lots of great discussions on the technical trade-offs between these two
        setups <sup>3,</sup>
        <sup>4,</sup>
        <sup>5,</sup>
        <sup>6</sup>.
      </BlogText>
      <BlogText>
        Honestly though, in my experience, the decision between a polyrepo and a
        monorepo isn't technical; it's cultural. Inevitably, both lead down sort
        of miserable paths, but I think that's because getting a lot of
        engineers to collaborate is hard. No getting around that.
      </BlogText>
      <BlogText>
        Instead, I've been thinking about the cultural implications of each
        setup and have come to love a monorepo culture. Specifically, one where:
      </BlogText>
      <PlainBlogText>
        <ul>
          <li>Development tools are standardized</li>
          <li>There is one release cycle for the entire repo</li>
          <li>Everyone is responsible for keeping main working</li>
        </ul>
      </PlainBlogText>
      <BlogText>
        So much incredible good happens when those three things are true. And
        for me, it's all about that feeling of being together, which I've always
        felt on high-functioning teams. That feeling that our team is working
        together toward the same shared goals.
      </BlogText>
      <BlogText>
        Let's dive into some specific aspects of good that I particularly love.
      </BlogText>
      <BlogText>
        <br />
        <b>Engineers can move between projects with less downtime</b>
      </BlogText>
      <BlogText>
        The standardized toolkits allow engineers to move between projects
        without learning a new set of development practices. This results in
        fewer blockers for management and ICs to cross-pollinate between
        projects.
      </BlogText>
      <BlogText>
        When team members can contribute to many initiatives, it's a massive win
        in my books. I think that feels more like the team is doing something
        valuable rather than a specific individual within the team, even if in
        practice that's true.
      </BlogText>
      <BlogText>
        In other words, I think the best teams are those where it's tough to
        identify where a good idea came from. Rather, the idea came about from
        many interactions and conversations. When engineers can easily
        contribute to many projects, I think they're more likely to have
        interaction patterns that result in natural collaboration.
      </BlogText>
      <BlogText>
        <br />
        <b>Everyone is invested in the development experience</b>
      </BlogText>
      <BlogText>
        I have often found the work to improve everyone's dev-x is
        underappreciated, but in a setup where everyone shares the experience,
        it's much easier to understand the impact of such work. May not fix the
        appreciation problem, but hey, at least people can understand better.
      </BlogText>
      <BlogText>
        In many ways, this aspect feels like having a shared meal. While
        everyone eating together is excellent, eating together and eating the
        same foods is even better. That's an authentic shared experience!
      </BlogText>
      <BlogText>
        <br />
        <b>It's nice to see all the changes in one place</b>
      </BlogText>
      <BlogText>
        Seeing all the commits roll in and the systems continually update can be
        energizing, especially if those changes reflect in your day-to-day,
        local development experience. You can see how everyone's work is coming
        together and how it's (ideally) getting better daily, without having to
        go out of your way.
      </BlogText>
      <BlogText>
        But more than that, I can point to a concrete, singular code artifact
        and say I'm a part of that. That's my team, both past and present,
        represented in code. That's a community I belong to.
      </BlogText>
      <BlogText>
        <br />
        <b>
          Breaking changes are the responsibility of the author to land safely
        </b>
      </BlogText>
      <BlogText>
        This is the most significant cultural impact for me. In a polyrepo
        world, I can accidentally write a breaking change and publish a minor
        version bump without knowing better. Then, it's on the consumers when
        they upgrade to address the breaking changes. As the consumer, that's
        such a frustrating experience. Now I'm mad at the author for putting me
        in this situation! Not good for team camaraderie.
      </BlogText>
      <BlogText>
        In the monorepo world, it is my responsibility as the writer to ensure
        that my breaking change lands safely and does not break main. I have a
        vested interest in either doing the migration myself or getting help
        from everyone to land my change. Specifically, the onus of completing
        the migration of the breaking change has moved from the consumer to the
        author.
      </BlogText>
      <BlogText>
        Let's go on a tangent for a second and discuss breaking changes that
        explicitly require consumers to update their code somehow.
      </BlogText>
      <BlogText>
        Migrating code sucks, especially when you didn't write the breaking
        change, and even more so when you do not understand why the breaks were
        necessary. I cannot tell you the number of times I have dreaded a major
        version upgrade of React, ESLint, Prisma, Postgres, etc. The old thing
        worked great, so do I have to change it?
      </BlogText>
      <BlogText>
        Well, those changes are necessary for continued improvement. Someone is
        working to map out a vision for where these things need to go, and
        they've determined this breaking change is needed. They've done the
        emotional labor <sup>7</sup> of figuring out what needs to happen so we
        can all benefit.
      </BlogText>
      <BlogText>
        You know what would be even better? If the authors of those breaking
        changes went around and upgraded everyone! That way, when they come to
        upgrade my package, I can ask them questions. Now let's tie this back
        into our monorepo culture.
      </BlogText>
      <BlogText>
        When an author creates a breaking change, they can go around upgrading
        all the consumers. When they come to upgrade my package, as a consumer,
        I can understand why the change is necessary and know what direction
        they're heading in. I can make sure my continued usage aligns with where
        they're heading. And just as importantly, the author can know how I'm
        using their package so they can continue to stay aligned to what I need.
        They're forced to stay close to their customers.
      </BlogText>
      <BlogText>
        That's a fantastic team interaction right there! It results in better
        long alignment between authors and consumers. Way less frustrating than
        having something perceived as semi-random, tossed over a fence. I love
        this, this is an interaction that we can force in a monorepo world.
      </BlogText>
      <BlogText>
        <br />
        This is all to say that when debating between polyrepos and monorepos, I
        have often found much healthier engineering cultures in the monorepo
        world that better result in feeling like a team.
      </BlogText>
      <PlainBlogText>
        <br />
        <ol>
          <li>
            <a href="https://en.wikipedia.org/wiki/Monorepo" target="_blank">
              Monorepo - Wikipedia
            </a>
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Dependency_hell"
              target="_blank"
            >
              Dependency hell - Wikipedia
            </a>
          </li>
          <li>
            <a
              href="https://github.com/joelparkerhenderson/monorepo-vs-polyrepo"
              target="_blank"
            >
              Monorepo vs. polyrepo - joelparkerhenderson
            </a>
          </li>
          <li>
            <a
              href="https://medium.com/@cfryerdev/monorepo-vs-polyrepo-the-great-debate-7b71068e005c"
              target="_blank"
            >
              Monorepo vs Polyrepo: The great debate - Chris Fryer
            </a>
          </li>
          <li>
            <a
              href="https://graphite.dev/guides/monorepo-vs-polyrepo-pros-cons-tools"
              target="_blank"
            >
              Monorepo vs. polyrepo pros, cons, and tools - Greg Foster
              (Graphite)
            </a>
          </li>
          <li>
            <a
              href="https://earthly.dev/blog/monorepo-vs-polyrepo/"
              target="_blank"
            >
              Monorepo vs Polyrepo - Vlad A. Ionescu (Earthly)
            </a>
          </li>
          <li>
            <a
              href="https://greatergood.berkeley.edu/article/item/what_is_emotional_labor_and_why_does_it_matter"
              target="_blank"
            >
              What Is Emotional Labor, and Why Does It Matter? - Hope Reese
            </a>
          </li>
        </ol>
      </PlainBlogText>
    </BlogEntry>
  );
}

import { BlogEntry } from "@/components/blog/BlogEntry";
import { BlogText, PlainBlogText } from "@/lib/resync-components/BlogText";

export default function ToxicTeams() {
  return (
    <BlogEntry>
      <BlogText>
        I've been on a few engineering teams that turned toxic, some over time,
        and some from the start. While on these teams, I:
      </BlogText>
      <PlainBlogText>
        <ul>
          <li>
            Felt anxious and stressed, all the time
            <ul>
              <li>
                I was not good at compartmentalizing, so I allowed the bad work
                situation to affect my personal life.
              </li>
            </ul>
          </li>
          <li>
            Obsessed with the technical work
            <ul>
              <li>
                As a defense mechanism against the difficult people situation
              </li>
            </ul>
          </li>
          <li>
            Fluctuated between anger and sadness
            <ul>
              <li>
                I felt disempowered to effect change, which affected my
                wellbeing differently day to day.
              </li>
            </ul>
          </li>
        </ul>
      </PlainBlogText>
      <BlogText>
        These were not pleasant experiences, but in retrospect, they shaped who
        I am today. I've spent a lot of time reflecting on what caused those
        experiences to turn so sour. So here's what I've got. I believe any of
        the following will eventually result in a toxic team:
      </BlogText>
      <PlainBlogText>
        <ul>
          <li>
            A single toxic individual who asserts strong opinions and inserts
            themselves everywhere
            <ul>
              <li>
                It causes the toxic disease to spread because if I want my
                opinions heard, I have to compete with this individual, so I
                inevitably become toxic too.
              </li>
            </ul>
          </li>
          <li>
            Not enough work to go around
            <ul>
              <li>
                We need to compete with each other for the “good” projects,
                resulting in tense relationships between people who should be
                collaborating.
              </li>
              <li>
                And it results in a lot of downtime, which, given the existing
                tense relationships, leads to bickering.
              </li>
            </ul>
          </li>
          <li>
            Visionless management, which is also opinionated
            <ul>
              <li>
                As a motivated team member, I must constantly guess at what
                management wants us to build, which may or may not align with
                what our users need.
              </li>
              <li>
                And when we ask for clarification, we don’t get anything
                actionable or concrete because management does not know what it
                wants.
              </li>
              <li>
                However, since management knows what it does not want, it shuts
                projects down, resulting in a few individuals becoming
                demotivated as they watch their work crumble.
              </li>
              <li>
                This inevitably spreads to the rest of the team during the
                myriad ranting sessions between team members.
              </li>
            </ul>
          </li>
        </ul>
      </PlainBlogText>
      <BlogText>
        In these circumstances, earned authority engineers will have a tough
        time turning the ship around. These are complex people issues, and I
        believe this is exactly what management is paid to deal with. They need
        to step in and remedy the situation:
      </BlogText>
      <PlainBlogText>
        <ul>
          <li>
            Toxic individual
            <ul>
              <li>
                A behavior performance conversation, followed by requests for
                actionable changes, leading to either a change or termination
              </li>
            </ul>
          </li>
          <li>
            Not enough work to go around
            <ul>
              <li>
                Either working with the team to create new scope, a higher level
                of ambition given the resourcing, or a reduction in the team’s
                size
              </li>
            </ul>
          </li>
          <li>
            Visionless management
            <ul>
              Either stop having opinions and let the team guide in a bottom-up
              approach, or come in with a stronger vision - you can’t have both
            </ul>
          </li>
        </ul>
      </PlainBlogText>
      <PlainBlogText>
        <ol>
          <li>
            <a
              href="https://news.ycombinator.com/item?id=36882767"
              target="_blank"
            >
              Hacker news: how to build toxic software teams
            </a>
          </li>
          <li>
            <a href="https://uplevelteam.com/blog/toxic-engineering-culture">
              Uplevel, 15 symptoms of a toxic engineering culture
            </a>
          </li>
          <li>
            <a
              href="https://medium.com/@jameskip/how-toxic-engineering-cultures-undermine-innovation-and-growth-68a79334f4d7"
              target="_blank"
            >
              James Kip, how toxic engineering cultures undermine innovation and
              growth
            </a>
          </li>
          <li>
            <a
              href="https://www.reddit.com/r/Accounting/comments/ed5mnc/stories_of_toxic_coworkersteams/"
              target="_blank"
            >
              Reddit, stories of toxic coworkers/teams
            </a>
          </li>
        </ol>
      </PlainBlogText>
    </BlogEntry>
  );
}

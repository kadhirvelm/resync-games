import { BlogEntry } from "@/components/blog/BlogEntry";
import { BlogText, PlainBlogText } from "@/lib/resync-components/BlogText";

export default function LLMsAsCompiler() {
  return (
    <BlogEntry>
      <BlogText>
        So far, I've only used LLMs as an assistant, where I'm doing something,
        and an LLM helps me along the way. Code autocomplete feels like a great
        example of how useful it can be when it gets it right. I don't doubt
        that over time this will improve, but I'm excited to see a more
        significant transition from this assistant mode to a compiler mode, at
        least for coding.
      </BlogText>
      <BlogText>
        It will be exciting when we focus solely on the context we fed the LLM,
        then test the features it generates rather than the code. And
        importantly, we let the LLM handle integrating new features into the
        existing codebase. That means we no longer examine the code. Our time as
        engineers will be spent handling context, testing features, and
        iterating on them.
      </BlogText>
      <BlogText>The consequence of that seems to be:</BlogText>
      <PlainBlogText>
        <ul>
          <li>
            Democratize access to engineering
            <ul>
              <li>
                You don't need as specialized skillsets to build complex apps,
                you just need to know how to put context together and iterate
              </li>
            </ul>
          </li>
          <li>
            Increase the velocity of feature development
            <ul>
              <li>
                My gut says dealing with context will result in a better ratio
                of engineering time into features shipped than dealing with code
                directly
              </li>
            </ul>
          </li>
        </ul>
      </PlainBlogText>
      <BlogText>
        The obvious pushback here is, well, compilers are provable. There's a
        straightforward mapping between inputs and outputs, and we can prove the
        outputs are the same each time. We can also write tests to ensure the
        outputs are optimized.
      </BlogText>
      <BlogText>
        But if we squint, a compiler transforms an input into an output. If we
        treat the code as an intermediate layer, viewing the input as context
        and the output as features, then we can demonstrate that the compiler is
        reliable through evaluations and testing. And importantly, we don't have
        to get the output right in the first go, we can let it iterate over and
        over until it gets it right. A new kind of compiler.
      </BlogText>
      <BlogText>
        So I propose that if we get LLM-as-a-compiler, as a software engineer, I
        will go through this cycle:
      </BlogText>
      <PlainBlogText>
        <ol>
          <li>
            Put together the context
            <ol type="a">
              <li>
                Which includes a series of tests for the final behavior (perhaps
                I use an LLM for this)
              </li>
            </ol>
          </li>
          <li>
            I put it through the LLM compiler
            <ol type="a">
              <li>Which is probably a system composed of several things</li>
            </ol>
          </li>
          <li>
            Which continually iterates on the output until all the tests pass
            <ol type="a">
              <li>
                Ideally, as the LLM compiler gets better, the latency gets lower
                and lower
              </li>
            </ol>
          </li>
          <li>We cache the output (code) for performance improvements</li>
          <li>
            I decide how I need to edit the context, and go back to step 1
          </li>
        </ol>
      </PlainBlogText>
      <BlogText>
        SWE agents feel like they're the right abstraction on this path; they
        convert context into features, iterating in the background. They feel
        like they'll be an integral part of the LLM compiler system, which I
        think will have the following pieces:
      </BlogText>
      <PlainBlogText>
        <ul>
          <li>
            A way to specify the context of my app
            <ul>
              <li>And a way to specify which part of my context to focus on</li>
            </ul>
          </li>
          <li>Mechanism for specifying my reward signal (my tests)</li>
          <li>
            A system for monitoring the changes happening
            <ul>
              <li>
                And a way to redirect parts of the compiler if it's not doing
                what I expect
              </li>
              <li>
                Over time, I'd expect this part to evolve and the need to see
                the code to reduce
              </li>
            </ul>
          </li>
        </ul>
      </PlainBlogText>
      <BlogText>Resources</BlogText>
      <PlainBlogText>
        <ol>
          <li>
            <a href="https://vivekhaldar.com/articles/llms-are-compilers/">
              Vivek Haldar - LLMs are compilers
            </a>
          </li>
          <li>
            <a href="https://medium.com/redsquirrel-tech/llm-as-compiler-2a2f79d30f0b">
              Dave Hoover - LLM as Compiler
            </a>
          </li>
          <li>
            <a href="https://avikdas.com/2025/05/05/llms-are-like-compilers-sort-of.html">
              Avik Das - LLMs are like compilers, sort of
            </a>
          </li>
        </ol>
      </PlainBlogText>
    </BlogEntry>
  );
}

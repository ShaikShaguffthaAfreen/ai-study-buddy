import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f5ed] text-[#19372f]">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <header className="flex items-center justify-between border-b border-[#d9dfd2] py-5">
          <Link href="/" className="flex items-center gap-3" aria-label="Study Buddy home">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#193f35] text-sm font-bold text-[#e9f06b]">SB</span>
            <span className="text-sm font-bold uppercase tracking-[0.12em]">Study Buddy</span>
          </Link>
          <nav className="flex items-center gap-5 text-sm font-medium text-[#53645b] sm:gap-8">
            <Link href="/progress" className="hover:text-[#19372f]">Progress</Link>
            <Link href="/learn" className="hover:text-[#18342d]">Learn</Link>
            <Link href="/settings" className="hover:text-[#18342d]">Settings</Link>
          </nav>
        </header>

        <section className="relative grid items-center gap-12 py-14 md:grid-cols-[0.95fr_1.05fr] md:gap-16 md:py-20">
          <div className="relative z-10">
            <p className="mb-6 inline-flex items-center gap-2 rounded-sm bg-[#e9efdb] px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#4f712f]">
              <span className="h-2 w-2 rounded-full bg-[#d56f4e]" /> A calmer way to study
            </p>
            <h1 className="max-w-xl text-5xl font-bold leading-[1.04] text-[#19372f] md:text-7xl">
              Turn notes into <span className="text-[#668b36]">knowledge.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[#58685e]">
              A focused study space that finds the big ideas, then helps you remember them for real.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/upload" className="inline-flex items-center gap-3 rounded-md bg-[#193f35] px-6 py-4 font-semibold text-white transition-colors hover:bg-[#285a49]">
                Start studying <span aria-hidden="true">↗</span>
              </Link>
              <span className="text-sm text-[#68776c]">PDF, DOCX, or TXT</span>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#d9dfd2] pt-5 text-sm text-[#58685e]">
              <span><strong className="text-[#19372f]">Private</strong> by default</span>
              <span><strong className="text-[#18342d]">Works offline</strong></span>
              <span><strong className="text-[#18342d]">Your material</strong>, your pace</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl py-5 sm:px-5">
            <div className="absolute right-0 top-0 h-28 w-28 rounded-full border-[18px] border-[#e4aa74]/50" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-[#dce8bf]" aria-hidden="true" />
            <div className="relative rounded-lg bg-[#193f35] p-6 text-white shadow-xl sm:p-8">
              <div className="flex items-start justify-between border-b border-white/20 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e8efaa]">Your study desk</p>
                  <p className="mt-2 text-2xl font-semibold">Ready when you are.</p>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#e9efdb] text-xl text-[#193f35]" aria-hidden="true">✳</span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-md bg-[#f7f5ed] p-5 text-[#19372f]">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.1em] text-[#64746a]">
                    <span>Quick recall</span><span>01 / 05</span>
                  </div>
                  <h2 className="mt-6 text-xl font-bold leading-snug">What is the big idea?</h2>
                  <div className="mt-5 h-2 rounded-full bg-[#dce2d5]"><div className="h-2 w-1/3 rounded-full bg-[#d56f4e]" /></div>
                  <p className="mt-3 text-sm text-[#6b786e]">Flip a card. Find what sticks.</p>
                </div>
                <div className="flex flex-col justify-between rounded-md bg-[#e9efdb] p-5 text-[#19372f]">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#607449]">Made from your notes</p>
                    <p className="mt-3 text-3xl font-bold">3 ways</p>
                    <p className="mt-1 text-sm text-[#5c6d60]">to learn every topic</p>
                  </div>
                  <div className="mt-6 flex gap-2" aria-label="Summaries, flashcards, and quizzes">
                    <span className="h-2 flex-1 rounded-full bg-[#d56f4e]" />
                    <span className="h-2 flex-1 rounded-full bg-[#668b36]" />
                    <span className="h-2 flex-1 rounded-full bg-[#7193a0]" />
                  </div>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-5 text-sm text-white/75">
                <span>Summary <span className="px-1 text-[#e8efaa]">/</span> Flashcards <span className="px-1 text-[#e8efaa]">/</span> Quiz</span>
                <span className="font-semibold text-[#e8efaa]">One topic, in sync</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#d9dfd2] py-10 md:py-12">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#a85e42]">Your material, made memorable</p>
              <h2 className="text-2xl font-bold">A better rhythm for learning</h2>
            </div>
            <Link href="/upload" className="text-sm font-semibold text-[#54752b] hover:text-[#193f35]">Start with a document →</Link>
          </div>
          <div className="grid gap-7 pb-12 sm:grid-cols-3 sm:gap-10">
            <div className="border-t-2 border-[#688b32] pt-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#688b32]">01 / Understand</p>
              <h3 className="mt-3 text-lg font-semibold">Clear summaries</h3>
              <p className="mt-2 text-sm leading-6 text-[#617168]">Find the central ideas and key terms in your material.</p>
            </div>
            <div className="border-t-2 border-[#d98460] pt-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#a85639]">02 / Remember</p>
              <h3 className="mt-3 text-lg font-semibold">Useful practice</h3>
              <p className="mt-2 text-sm leading-6 text-[#617168]">Review with flashcards and topic-focused questions that change each round.</p>
            </div>
            <div className="border-t-2 border-[#708fa1] pt-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#527183]">03 / Improve</p>
              <h3 className="mt-3 text-lg font-semibold">Visible progress</h3>
              <p className="mt-2 text-sm leading-6 text-[#617168]">Keep track of completed quizzes and your study momentum.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

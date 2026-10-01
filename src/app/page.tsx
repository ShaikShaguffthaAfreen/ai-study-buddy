import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f7f1] text-[#18342d]">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <header className="flex items-center justify-between border-b border-[#dce2d6] py-5">
          <Link href="/" className="flex items-center gap-3" aria-label="Study Buddy home">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#183f36] text-sm font-bold text-[#e6f26a]">SB</span>
            <span className="text-sm font-bold uppercase tracking-[0.12em]">Study Buddy</span>
          </Link>
          <nav className="flex items-center gap-5 text-sm font-medium text-[#52655c] sm:gap-8">
            <Link href="/progress" className="hover:text-[#18342d]">Progress</Link>
            <Link href="/learn" className="hover:text-[#18342d]">Learn</Link>
            <Link href="/settings" className="hover:text-[#18342d]">Settings</Link>
          </nav>
        </header>

        <section className="grid items-center gap-12 py-14 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:py-20">
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.16em] text-[#638338]">A calmer way to study</p>
            <h1 className="max-w-xl text-5xl font-bold leading-[1.08] text-[#18342d] md:text-6xl">
              Make your<br />notes <span className="text-[#688b32]">stick.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[#52655c]">
              Turn your notes into focused summaries, flashcards, and fresh quizzes built around the main topic.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/upload" className="inline-flex items-center gap-3 rounded-md bg-[#183f36] px-6 py-4 font-semibold text-white transition-colors hover:bg-[#24594b]">
                Upload study material <span aria-hidden="true">→</span>
              </Link>
              <span className="text-sm text-[#687970]">PDF, DOCX, or TXT</span>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#dce2d6] pt-5 text-sm text-[#52655c]">
              <span><strong className="text-[#18342d]">Private</strong> by default</span>
              <span><strong className="text-[#18342d]">Works offline</strong></span>
              <span><strong className="text-[#18342d]">Your material</strong>, your pace</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -right-4 -top-4 h-full w-full rounded-lg border border-[#b8c39f]" aria-hidden="true" />
            <div className="relative rounded-lg bg-[#183f36] p-6 text-white shadow-xl sm:p-9">
              <div className="flex items-center justify-between border-b border-white/20 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#d8e7af]">Knowledge check</p>
                  <p className="mt-2 text-sm text-white/70">Example question format</p>
                </div>
                <span className="rounded-sm bg-[#e6f26a] px-3 py-1.5 text-xs font-bold text-[#18342d]">01 / 05</span>
              </div>
              <h2 className="mt-7 text-2xl font-semibold leading-snug">Which statement best describes active recall?</h2>
              <div className="mt-6 space-y-3 text-sm">
                <div className="rounded-md border border-[#d8e7af] bg-[#e8f0db] px-4 py-3 font-medium text-[#18342d]">Retrieving information from memory</div>
                <div className="rounded-md border border-white/20 px-4 py-3 text-white/85">Reading the same page repeatedly</div>
                <div className="rounded-md border border-white/20 px-4 py-3 text-white/85">Highlighting every key sentence</div>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-white/20 pt-5 text-xs text-white/65">
                <span>Topic-focused questions</span>
                <span>Questions built around your material</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#dce2d6] py-10 md:py-12">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-bold">One place for your study session</h2>
            <Link href="/upload" className="text-sm font-semibold text-[#54752b] hover:text-[#183f36]">Start with a document →</Link>
          </div>
          <div className="grid gap-7 pb-12 sm:grid-cols-3 sm:gap-10">
            <div className="border-t-2 border-[#688b32] pt-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#688b32]">01 · Understand</p>
              <h3 className="mt-3 text-lg font-semibold">Clear summaries</h3>
              <p className="mt-2 text-sm leading-6 text-[#617168]">Find the central ideas and key terms in your material.</p>
            </div>
            <div className="border-t-2 border-[#d98460] pt-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#a85639]">02 · Remember</p>
              <h3 className="mt-3 text-lg font-semibold">Useful practice</h3>
              <p className="mt-2 text-sm leading-6 text-[#617168]">Review with flashcards and topic-focused questions that change each round.</p>
            </div>
            <div className="border-t-2 border-[#708fa1] pt-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#527183]">03 · Improve</p>
              <h3 className="mt-3 text-lg font-semibold">Visible progress</h3>
              <p className="mt-2 text-sm leading-6 text-[#617168]">Keep track of completed quizzes and your study momentum.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

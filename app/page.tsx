export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Vinit{' '}
          <span className="text-primary">Vaibhav</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Developer Portfolio — Built with Next.js 15, Tailwind CSS & shadcn/ui
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-muted-foreground">Project scaffolded successfully</span>
        </div>
      </div>
    </main>
  )
}

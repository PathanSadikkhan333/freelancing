/*
import Link from "next/link"
import JobList from "./components/JobList";


export default function Home() {
    return(
        <div className="min-h-screen p-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold">sadik's freelance</h1>
                <p className="text-gray-600">find project works</p>
            </header>

            <main>
                <section className="mb-6">
                    <div className="flex-gap-4">
                        <Link href="/dashboard" className="btn">Dashboard</Link>
                        <Link href="/jobs/1" className="btn">sample job</Link>
                    </div>
                </section>
            </main>
        </div>
    )
}
    */


import Link from "next/link";
import JobList from "../components/JobList";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">sadik's freelance</h1>
        <p className="text-gray-600">find project works</p>
      </header>

      <main>
        <section className="mb-6 flex gap-4">
          <Link href="/dashboard" className="btn">
            Dashboard
          </Link>
          <Link href="/jobs/1" className="btn">
            sample job
          </Link>
        </section>

        {/* Render JobList here */}
        <JobList />
      </main>
    </div>
  );
}

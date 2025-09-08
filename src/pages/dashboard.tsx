import Link from 'next/link'
export default function Dashboard(){
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <ul className="mt-4">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/jobs/1">Sample Job</Link></li>
      </ul>
    </div>
  )
}
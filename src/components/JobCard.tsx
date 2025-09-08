import Link from "next/link";

interface Job {
  id: string;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
}

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold">{job.title}</h3>
      <p className="text-sm text-gray-600">{job.description}</p>
      <div className="mt-2 flex justify-between items-center">
        <div className="text-xs">
          Budget: ${job.budgetMin} - {job.budgetMax}
        </div>
        <Link href={`/jobs/${job.id}`} className="text-blue-600">
          view
        </Link>
      </div>
    </div>
  );
}

import { worksData, workSummary, WorkData } from "@/lib/works-data";

interface WorksProps {
  title?: string;
  subtitle?: string;
}

export default function Works({
  title = "Work",
  subtitle = "... /Experience ...",
}: WorksProps) {
  return (
    <section className="relative z-10 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-gray-400 text-sm font-light tracking-widest uppercase font-mono mb-4">
            {subtitle}
          </p>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-light mb-4 text-white tracking-tight">
            {title}
          </h2>
        </div>

        <div className="space-y-4">
          {worksData.map((work) => (
            <WorkItem key={work.id} work={work} />
          ))}
        </div>

        <div className="text-right mt-16">
          <div className="text-gray-400">
            <div className="text-lg font-light tracking-wide">
              {workSummary.title}
            </div>
            <div className="text-2xl font-light italic text-white">
              {workSummary.totalExperience}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface WorkItemProps {
  work: WorkData;
}

function WorkItem({ work }: WorkItemProps) {
  return (
    <div
      className={`
        grid grid-cols-12 gap-4 items-center py-8 px-6 rounded-2xl transition-all duration-500 cursor-pointer group border
        ${
          work.isActive
            ? "bg-white text-black border-gray-300 shadow-lg"
            : "bg-transparent text-white border-gray-800/50 hover:bg-white hover:text-black hover:border-gray-300 hover:shadow-lg backdrop-blur-sm"
        }
      `}
    >
      <div className="col-span-12 md:col-span-2">
        <div
          className={`font-light text-sm md:text-base ${
            work.isActive
              ? "text-gray-600"
              : "text-gray-400 group-hover:text-gray-600"
          }`}
        >
          <div className="font-normal tracking-wide">{work.period}</div>
          <div className="text-xs md:text-sm opacity-80">{work.duration}</div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-3">
        <h3
          className={`font-light text-xl md:text-2xl tracking-tight ${
            work.isActive ? "text-black" : "text-white group-hover:text-black"
          }`}
        >
          {work.company}
        </h3>
      </div>

      <div className="col-span-12 md:col-span-6">
        <p
          className={`font-light text-sm md:text-base leading-relaxed ${
            work.isActive
              ? "text-gray-700"
              : "text-gray-300 group-hover:text-gray-700"
          }`}
        >
          {work.position} | {work.technologies}
        </p>
      </div>

      <div className="col-span-12 md:col-span-1 flex justify-end">
        {work.isActive && (
          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-gray-800" />
        )}
      </div>
    </div>
  );
}

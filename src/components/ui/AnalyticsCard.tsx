import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

interface AnalyticsCardProps {
  title: string;
  value: string;
  trend: "up" | "down";
  trendValue: string;
}

export default function AnalyticsCard({
  title,
  value,
  trend,
  trendValue,
}: AnalyticsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
      <div className="mt-2 flex items-baseline">
        <span className="text-3xl font-semibold text-gray-900">{value}</span>
        <span
          className={`ml-2 flex items-center text-sm font-medium ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend === "up" ? (
            <ArrowUpIcon className="h-4 w-4 flex-shrink-0" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 flex-shrink-0" />
          )}
          <span className="sr-only">
            {trend === "up" ? "Increased" : "Decreased"} by
          </span>
          {trendValue}
        </span>
      </div>
    </div>
  );
}

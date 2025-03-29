import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

interface AnalyticsCardProps {
  title: string;
  value: string;
  trend: "up" | "down";
  trendValue: string;
  darkMode: boolean;
}

export default function AnalyticsCard({
  title,
  value,
  trend,
  trendValue,
  darkMode,
}: AnalyticsCardProps) {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all hover:shadow-lg border border-gray-100 dark:border-gray-700 ${
        darkMode ? "hover:border-gray-600" : "hover:border-gray-200"
      }`}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {title}
      </h3>
      <div className="mt-2 flex items-baseline">
        <span className="text-3xl font-semibold text-gray-900 dark:text-white">
          {value}
        </span>
        <span
          className={`ml-2 flex items-center text-sm font-medium ${
            trend === "up"
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
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
          {treverndValue}
        </span>
      </div>
    </motion.div>
  );
}

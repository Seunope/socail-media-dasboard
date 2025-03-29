import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ToxicityIndicatorProps {
  levels: number[];
  scores: number[];
}

export default function ToxicityIndicator({
  levels,
  scores,
}: ToxicityIndicatorProps) {
  const levelsData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        label: "Percentage",
        data: levels,
        backgroundColor: [
          "rgba(239, 68, 68, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(234, 179, 8, 0.8)",
        ],
        borderColor: [
          "rgba(239, 68, 68, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(234, 179, 8, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const scoresData = {
    labels: ["Recent", "Average", "Lowest"],
    datasets: [
      {
        label: "Score",
        data: scores,
        backgroundColor: "rgba(79, 70, 229, 0.8)",
        borderColor: "rgba(79, 70, 229, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="h-full flex flex-col">
      <div className="h-1/2">
        <h3 className="text-sm font-medium text-gray-500 mb-2">
          Toxicity Levels
        </h3>
        <div className="h-full">
          <Bar data={levelsData} options={options} />
        </div>
      </div>
      <div className="h-1/2 mt-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">
          Toxicity Scores
        </h3>
        <div className="h-full">
          <Bar data={scoresData} options={options} />
        </div>
      </div>
    </div>
  );
}

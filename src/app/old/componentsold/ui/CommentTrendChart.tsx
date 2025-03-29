import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface CommentTrendChartProps {
  data: number[];
  darkMode: boolean;
}

export default function CommentTrendChart({
  data,
  darkMode,
}: CommentTrendChartProps) {
  const textColor = darkMode ? "#E5E7EB" : "#111827";
  const gridColor = darkMode
    ? "rgba(255, 255, 255, 0.05)"
    : "rgba(0, 0, 0, 0.05)";

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Comments",
        data: data,
        borderColor: darkMode ? "rgb(129, 140, 248)" : "rgb(79, 70, 229)",
        backgroundColor: darkMode
          ? "rgba(129, 140, 248, 0.1)"
          : "rgba(79, 70, 229, 0.1)",
        tension: 0.3,
        fill: true,
        pointBackgroundColor: darkMode
          ? "rgb(129, 140, 248)"
          : "rgb(79, 70, 229)",
        pointRadius: 4,
        pointHoverRadius: 6,
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
      tooltip: {
        backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: darkMode ? "#374151" : "#E5E7EB",
        borderWidth: 1,
        padding: 10,
        usePointStyle: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: textColor,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

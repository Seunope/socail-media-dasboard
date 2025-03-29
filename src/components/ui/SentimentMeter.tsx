import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface SentimentMeterProps {
  positive: number;
  neutral: number;
  negative: number;
}

export default function SentimentMeter({
  positive,
  neutral,
  negative,
}: SentimentMeterProps) {
  const data = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        data: [positive, neutral, negative],
        backgroundColor: [
          "rgba(74, 222, 128, 0.8)",
          "rgba(156, 163, 175, 0.8)",
          "rgba(248, 113, 113, 0.8)",
        ],
        borderColor: [
          "rgba(74, 222, 128, 1)",
          "rgba(156, 163, 175, 1)",
          "rgba(248, 113, 113, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
    cutout: "70%",
  };

  return <Doughnut data={data} options={options} />;
}

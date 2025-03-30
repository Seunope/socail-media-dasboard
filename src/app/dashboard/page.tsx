"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

interface Sentiment {
  name: string;
  value: number;
  color: string;
}

interface Trend {
  date: string;
  comments: number;
}

interface DashboardData {
  totalComments: number;
  positiveComments: number;
  negativeComments: number;
  sentiments: Sentiment[];
  trends: Trend[];
}

const dummyData: DashboardData = {
  totalComments: 1523,
  positiveComments: 832,
  negativeComments: 415,
  sentiments: [
    { name: "Positive", value: 832, color: "#82ca9d" },
    { name: "Neutral", value: 276, color: "#8884d8" },
    { name: "Negative", value: 415, color: "#ff6961" },
  ],
  trends: [
    { date: "Jan", comments: 120 },
    { date: "Feb", comments: 150 },
    { date: "Mar", comments: 200 },
    { date: "Apr", comments: 250 },
    { date: "May", comments: 320 },
  ],
};

const Dashboard: React.FC = () => {
  const [data] = useState<DashboardData>(dummyData);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Social Media Comment Analyzer</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Total Comments</h2>
            <p className="text-2xl">{data.totalComments}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Positive Comments</h2>
            <p className="text-2xl">{data.positiveComments}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Negative Comments</h2>
            <p className="text-2xl">{data.negativeComments}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Sentiment Analysis</h2>
            <PieChart width={300} height={300}>
              <Pie
                data={data.sentiments}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.sentiments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Comment Trends</h2>
            <LineChart width={400} height={300} data={data.trends}>
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="comments" stroke="#82ca9d" />
              <Tooltip />
            </LineChart>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={() => console.log("Exporting report...")}>
          Export Report
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;

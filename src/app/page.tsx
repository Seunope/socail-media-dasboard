"use client";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeProvider";
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

const dummyData = {
  facebookComments: 1532,
  instagramComments: 1217,
  sentiments: [
    { name: "Positive", value: 50, color: "#4CAF50" },
    { name: "Neutral", value: 30, color: "#8884d8" },
    { name: "Negative", value: 20, color: "#FF4D4D" },
  ],
  toxicity: [
    { label: "Toxic", value: 72 },
    { label: "Obscene", value: 18 },
    { label: "Severe Toxic", value: 10 },
  ],
  trends: [
    { day: 1, comments: 12 },
    { day: 5, comments: 20 },
    { day: 10, comments: 35 },
    { day: 15, comments: 50 },
    { day: 20, comments: 65 },
    { day: 25, comments: 80 },
    { day: 30, comments: 100 },
  ],
  keywords: [
    "love",
    "great",
    "amazing",
    "price",
    "customer",
    "recommend",
    "support",
    "service",
    "best",
  ],
};

export default function Dashboard() {
  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Social Media Comment Analyzer</h1>
        <ThemeToggle />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Facebook & Instagram Comments */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <p className="font-semibold">FACEBOOK COMMENTS</p>
          <p className="text-2xl">{dummyData.facebookComments}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <p className="font-semibold">INSTAGRAM COMMENTS</p>
          <p className="text-2xl">{dummyData.instagramComments}</p>
        </div>

        {/* Sentiment Analysis */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Sentiment Analysis</h2>
          <PieChart width={300} height={200}>
            <Pie
              data={dummyData.sentiments}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={60}
            >
              {dummyData.sentiments.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Toxicity Detection */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h2 className="font-semibold">Toxicity Detection</h2>
          {dummyData.toxicity.map((item, index) => (
            <div key={index} className="mt-2">
              <p>{item.label}</p>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <motion.div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${item.value}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Comment Trends */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h2 className="font-semibold">Comment Trends</h2>
          <LineChart width={300} height={200} data={dummyData.trends}>
            <XAxis dataKey="day" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="comments" stroke="#4CAF50" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

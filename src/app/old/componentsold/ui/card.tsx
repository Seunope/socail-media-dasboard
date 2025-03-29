import React from "react";

export const Card = ({ children }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-md">{children}</div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="p-2">{children}</div>;
};

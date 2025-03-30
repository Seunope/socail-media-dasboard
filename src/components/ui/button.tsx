import React from "react";

export const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
    >
      {children}
    </button>
  );
};

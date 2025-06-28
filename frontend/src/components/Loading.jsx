import React from "react";

const Loading = ({ height = "100vh" }) => {
  return (
    <div className="flex items-center justify-center" style={{ height }}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#24cfa5]"></div>
    </div>
  );
};

export default Loading;

import React from "react";
interface Props {
  percent: number;
}

const ProgressBar = ({ percent }: Props) => {
  return (
    <div>
      <div className="my-4 overflow-hidden bg-gray-200 rounded-full">
        <div
          className={`w-[${percent ? percent : 0}%] h-2 ${
            percent ? "bg-blue-500" : "bg-blue-50"
          } rounded-full`}></div>
      </div>
    </div>
  );
};

export default ProgressBar;

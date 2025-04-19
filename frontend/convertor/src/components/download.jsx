import React from "react";
import { useLocation } from "react-router-dom";

export default function Download() {
  const location = useLocation();
  const { value } = location.state;
  console.log("download",value);

  return (
    <>
      <div className="bg-red-600 w-48 h-32 p-7 flex justify-center">
        {" "}
        Download your Merged PDF's
        <a href=""></a>
      </div>
    </>
  );
}

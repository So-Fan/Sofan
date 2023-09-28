import React, { useEffect, useState } from "react";
import "./CrossmintPayload.css";
import { useLocation } from "react-router-dom";
import useCrossmintPayloadContext from "../../contexts/CrossmintPayloadContext/useCrossmintPayload";

const CrossmintPayload = () => {
  const location = useLocation();
  const { crossmintPayloadLocationdata, setCrossmintPayloadLocationdata } =
    useCrossmintPayloadContext();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pParam = params.get("p");

    if (pParam) {
      const decodedData = JSON.parse(decodeURIComponent(pParam));
      console.log("decodedData -> ", decodedData);
      setCrossmintPayloadLocationdata(decodedData);
      localStorage.setItem("crossmintPayload", JSON.stringify(decodedData[0]));
      setTimeout(() => {
        window.close();
      }, 200);
    }
  }, [location.search]);
  return (
    <div
      style={{
        zIndex: "999",
        background: "red",
        textAlign: "left",
        width: "500px",
      }}
    >
      {crossmintPayloadLocationdata}
    </div>
  );
};

export default CrossmintPayload;

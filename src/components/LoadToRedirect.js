import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: "150px" }}
    >
      <h5>Not Authorized! Redirecting in {count} seconds</h5>
    </div>
  );
};

export default LoadToRedirect;

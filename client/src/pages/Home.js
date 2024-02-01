import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // fetching input from server's "/test" endpoint
    fetch("/test")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Navbar />
      <h1>{message ? message : "Loading..."}</h1>
      <h2>Home Message</h2>
    </div>
  );
}

export default Home;

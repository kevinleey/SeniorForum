import React, {useEffect, useState} from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {

    // fetching input from server's "/test" endpoint
    fetch("/test")
        .then((res) => res.text())
        .then((data) => setMessage(data))
        .catch((err) => console.log(err));
  }, []);

  return (
      <h1>{message ? message : "Loading..."}</h1>
  );
}

export default App;

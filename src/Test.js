import React, { useEffect } from "react";
import { Spinner } from "./Utils";
const Test = () => {
  useEffect(() => {
    // ----------------
    get();
    // --------------
  }, []);

  const get = async () => {
    fetch("/api/diaries")
      .then((s) => s.json())
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div>
      <Spinner />
      <button onClick={get}>getttt</button>
    </div>
  );
};

export default Test;

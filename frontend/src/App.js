import React, { useEffect, useState } from "react";
import { setAccessToken } from "./accessToke";
import Landingrender from "./pages/renderpages/Landingrender";
function App() {
  const [loading, Setloading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      Setloading(false);
    });
  });
  return (
    <>
      {loading && <div>loading....</div>}
      {!loading && <Landingrender />}
    </>
  );
}

export default App;

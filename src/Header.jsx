import { useEffect } from "react";

import { wakeUpBackend } from "./functions";

function App() {
  useEffect(() => {
    (async () => {
      await wakeUpBackend();
    })();
  }, []);

  return <header>Welcome to my blog!</header>;
}

export default App;

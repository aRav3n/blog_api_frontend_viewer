import { useEffect } from "react";

import { wakeUpBackend } from "./apiFunctions";

function App() {
  useEffect(() => {
    (async () => {
      await wakeUpBackend();
    })();
  }, []);

  return <header>Welcome to my blog!</header>;
}

export default App;

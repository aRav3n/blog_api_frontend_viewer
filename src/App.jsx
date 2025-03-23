import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  useEffect(() => {
    (async () => {
      await wakeUpBackend();
    })();
  }, []);

  return (
    <>
      <Header />
      {pages[pageToDisplay]}
      <Footer />
    </>
  );
}

export default App;

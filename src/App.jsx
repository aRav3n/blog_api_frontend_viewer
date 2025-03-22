import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import MainPage from "./MainPage";

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

import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar, EntrySide } from "./Components";
import { HomeView } from "./Views";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomeView />}>
            <Route path=":diaryId" element={<EntrySide />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;

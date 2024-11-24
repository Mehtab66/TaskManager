import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./MainPage";
import { NewTask } from "./NewTask";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            {" "}
          </Route>
          <Route path="/addNewTask" element={<NewTask />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

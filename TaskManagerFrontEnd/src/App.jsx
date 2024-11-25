import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./MainPage";
import { NewTask } from "./NewTask";
import { EditTask } from "./EditTask";

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
          <Route path="/editTask/:id" element={<EditTask />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

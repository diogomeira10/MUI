import { Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Create from './pages/Create'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Notes />}></Route>
        <Route path="/create" element={<Create />}></Route>
      </Routes>
    </div>
  );
}

export default App;
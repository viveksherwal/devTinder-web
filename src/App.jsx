import { BrowserRouter, Route, Routes } from "react-router-dom";
 import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// export default function App() {
//   return (
//     <div className="p-8 space-y-4">
//       <button className="btn btn-primary">Primary Button</button>
//       <button className="btn btn-secondary">Secondary Button</button>
//       <input type="text" placeholder="DaisyUI input" className="input input-bordered" />
//     </div>
//   );
// }

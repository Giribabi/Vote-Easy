import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Auth from "./Pages/Auth.jsx";
import Vote from "./Pages/Vote.jsx";
import AppLayout from "./AppLayout/AppLayout";
import Results from "./Pages/Results.jsx";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AppLayout />}>
                        <Route index element={<Home />} />
                        <Route path="auth" element={<Auth />} />
                        <Route path="vote" element={<Vote />} />
                        <Route path="results" element={<Results />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

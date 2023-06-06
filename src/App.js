import { noAuthRoute, authRoute } from "./routes";
import ProtectedRoute from "./components/ProtectedRoute";
import NoAuthRoute from "./components/NoAuthRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    {authRoute.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <ProtectedRoute>
                                    <route.component />
                                </ProtectedRoute>
                            }
                        />
                    ))}
                    {noAuthRoute.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <NoAuthRoute>
                                    <route.component />
                                </NoAuthRoute>
                            }
                        />
                    ))}
                </Routes>
            </Router>
            {/* footer in bottom */}
            <div className="mt-5 p-4 bg-dark text-white text-center">
                <p>Footer</p>
            </div>
        </>
    );
}

export default App;

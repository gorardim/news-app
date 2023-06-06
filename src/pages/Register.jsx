import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [registrationHandler] = useMutation(REGISTER_MUTATION);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Registering user..");
        try {
            const { data } = await registrationHandler({
                variables: { name, email, password, password_confirmation },
            });
            const token = data.register.token;
            localStorage.setItem("token", token);
            navigate("/");
        } catch (error) {
            console.log("Registration error:", error);
        }
        setLoading(false);
    };

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h5>Register</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input type="text" className="form-control" id="name" aria-describedby="nameHelp" value={name} onChange={(e) => setName(e.target.value)} />
                                <div id="nameHelp" className="form-text">
                                    We'll never share your name with anyone else.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email address
                                </label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <div id="emailHelp" className="form-text">
                                    We'll never share your email with anyone else.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">
                                    Confirm Password
                                </label>
                                <input type="password" className="form-control" id="confirmPassword" value={password_confirmation} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-secondary btn-block"
                                style={{ width: "100%" }}
                            >
                                {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm"></span>
                                    <span>Loading.. </span>
                                </>
                                ) : (
                                <span>Register</span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const url = "http://localhost:3000/auth/login";

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const data = {
            email,
            password,
        }

        console.log(data);

        try {
            const res = await axios.post(url, data);

            if (res.status === 201) {
                const token = res.data;
                localStorage.setItem("jwt", token);
                navigate('/');
            }
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                setErrorMessage(e.response.data.message);
            } else {
                setErrorMessage("Napaka pri prijavi");
            }
        }
    }

    return (
        <>
            <main className="form-signin">
                <form onSubmit={submit} className="form-container">
                    <h1 className="h3 mb-3 fw-normal text-center">Prijavite se</h1>

                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="ime@primer.com"
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="floatingInput">Elektronski naslov</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Geslo"
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="floatingPassword">Geslo</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">Prijava</button>
                    {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                </form>
            </main>
        </>
    );
}

export default Login;

import './Register.css';
import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const url = "http://localhost:3000/users";
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const data = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            pass: password,
        };

        console.log(data);

        const res = await axios.post(url, data);

        if (res.status === 201) {
            setRedirect(true);
        }
    };

    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <main className="form-signin">
                <form onSubmit={submit} className="form-container">
                    <h1 className="h3 mb-3 fw-normal text-center">Registrirajte se</h1>

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="firstNameInput"
                            placeholder="Vnesite vaše ime"
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <label htmlFor="firstNameInput">Ime</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="lastNameInput"
                            placeholder="Vnesite vaš priimek"
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                        <label htmlFor="lastNameInput">Priimek</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="emailInput"
                            placeholder="ime@primer.com"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="emailInput">Elektronski naslov</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Geslo"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="floatingPassword">Geslo</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword2"
                            placeholder="Ponovno vnesite geslo"
                            onChange={(e) => setPassword2(e.target.value)}
                            required
                        />
                        <label htmlFor="floatingPassword2">Ponovite geslo</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">Registriraj se</button>
                </form>
                <footer className="text-center mt-4">
                    <p>Pišite mi na mail, če imate kakšne težave: <a href="mailto:mraovic111@gmail.com">mraovic111@gmail.com</a></p>
                </footer>
            </main>
        </>
    );
}

export default Register;

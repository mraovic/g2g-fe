import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import './SubAdd.css'; // Uvozimo CSS za dodatno oblikovanje

const SubAdd = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const url = "http://localhost:3000/subs";
    const [redirect, setRedirect] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const data = {
            name: name,
            price: parseFloat(price),
            description: description
        };

        try {
            const jwt = localStorage.getItem("jwt");
            const res = await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });

            if (res.status === 201) {
                setRedirect(true);
            }
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                setErrorMessage(e.response.data.message);
            }
        }
    };

    if (redirect) {
        return <Navigate to="/sub" />;
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <form onSubmit={submit} className="form-container">
                        <h2 className="text-center mb-4">Dodaj nov izdelek</h2>

                        <div className="form-group mb-3">
                            <label htmlFor="name">Ime izdelka</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="price">Cena izdelka</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="description">Opis izdelka</label>
                            <textarea
                                className="form-control"
                                id="description"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Dodaj izdelek</button>

                        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubAdd;

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SyntheticEvent } from "react";

const Zahvala = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, price, description, purchaseDate } = location.state || {};

    const shraniVRacune = async (e: SyntheticEvent) => {
        e.preventDefault();
        const userName = "Uporabnik"; // Pridobite dejansko uporabniško ime iz avtentikacije

        const podatki = {
            name,
            price,
            description,
            userName,
            purchaseDate,
        };

        try {
            await axios.post('http://localhost:3000/racuni', podatki);
            console.log("Račun uspešno shranjen v bazo.");
        } catch (error) {
            console.error("Napaka pri shranjevanju v bazo:", error);
        }
    };

    const nadaljujZNakupovanjem = () => {
        navigate('/sub'); // Preusmeritev na stran z izdelki
    };

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>Hvala za vaš nakup!</h1>
            <p>Vaš račun je spodaj:</p>

            <div style={{ border: "1px solid #ccc", padding: "20px", marginTop: "20px", display: "inline-block" }}>
                <h3>Račun</h3>
                <p><strong>Ime izdelka:</strong> {name}</p>
                <p><strong>Opis:</strong> {description}</p>
                <p><strong>Cena:</strong> {price} €</p>
                <p><strong>Datum in ura nakupa:</strong> {purchaseDate ? new Date(purchaseDate).toLocaleString() : ""}</p>
            </div>

            <div style={{ marginTop: "20px" }}>
                <button onClick={shraniVRacune} className="btn btn-success" style={{ marginRight: "10px" }}>
                    Shrani v bazo
                </button>
                <button onClick={nadaljujZNakupovanjem} className="btn btn-primary">
                    Nadaljuj z nakupovanjem
                </button>
            </div>

            <p style={{ marginTop: "20px" }}>
                Vaše uporabniško ime in geslo boste prejeli po e-pošti.
            </p>
        </div>
    );
};

export default Zahvala;

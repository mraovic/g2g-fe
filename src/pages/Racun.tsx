import { SyntheticEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Racuni = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { name, price, description } = location.state || {};

    const handleConfirmPurchase = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            // Preusmeri na stran z zahvalo
            navigate('/zahvala', {
                state: {
                    name,
                    price,
                    description,
                    purchaseDate: new Date()
                }
            });
        } catch (error) {
            console.error("Napaka pri potrditvi nakupa:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>Potrdite nakup</h1>
            <p>Ali želite kupiti naslednji izdelek?</p>

            <div style={{ border: "1px solid #ccc", padding: "20px", marginTop: "20px", display: "inline-block" }}>
                <h3>Račun</h3>
                <p><strong>Ime izdelka:</strong> {name}</p>
                <p><strong>Opis:</strong> {description}</p>
                <p><strong>Cena:</strong> {price} €</p>
            </div>

            <div style={{ marginTop: "20px" }}>
                <button onClick={handleConfirmPurchase} className="btn btn-primary">
                    Potrdi nakup
                </button>
            </div>
        </div>
    );
};

export default Racuni;

import { useNavigate } from "react-router-dom";
import axios from "axios";

const SubCard = ({ data, onRemove, editSub, isAdmin }: { data: any, onRemove?: (id: number) => void, editSub?: (id: number) => void, isAdmin?: boolean }) => {
    const navigate = useNavigate();

    const handleBuyClick = async () => {
        try {
            // Izbriši izdelek s strežnika
            await axios.delete(`http://localhost:3000/subs/${data.id}`);
            // Preusmeri na stran /racun z podatki o izdelku
            navigate('/racun', { state: data });
        } catch (error) {
            console.error("Napaka pri brisanju izdelka:", error);
        }
    };

    return (
        <div className="col">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">{data.name}</h5>
                    <p className="card-text">{data.description}</p>
                    <p className="card-text">Cena: {data.price} €</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            {isAdmin && (
                                <>
                                    <button onClick={() => editSub?.(data.id)} type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                    <button onClick={() => onRemove?.(data.id)} type="button" className="btn btn-sm btn-outline-secondary">Delete</button>
                                </>
                            )}
                            <button onClick={handleBuyClick} type="button" className="btn btn-sm btn-primary">Kupi</button>
                        </div>
                        <small className="text-body-secondary">9 mins</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubCard;

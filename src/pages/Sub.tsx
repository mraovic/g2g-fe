import { useEffect, useState } from "react";
import axios from "axios";
import SubCard from "../components/SubCard.tsx";
import { useNavigate } from 'react-router-dom';
import './Sub.css'; // Importiramo CSS za dodatno oblikovanje

const Sub = () => {
    const [subs, setSubs] = useState<any[]>([]);
    const [filteredSubs, setFilteredSubs] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filter, setFilter] = useState<string>('');

    const url = "http://localhost:3000/subs";
    const navigate = useNavigate();

    const loadSubs = async () => {
        try {
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            });
            if (res.status === 200) {
                setSubs(res.data);
                applyFilters(res.data);
            }
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                setErrorMessage(e.response.data.message);
            }
        }
    };

    useEffect(() => {
        loadSubs();
    }, []);

    const addSub = () => {
        navigate('/addSub');
    };

    const removeSub = async (id: number) => {
        const url = `http://localhost:3000/subs/${id}`;
        try {
            const res = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            });
            if (res.status === 200) {
                setSubs(subs.filter(sub => sub.id !== id));
                applyFilters(filteredSubs.filter(sub => sub.id !== id));
            }
        } catch (e) {
            setErrorMessage("Napaka pri brisanju");
        }
    };

    const editSub = (id: number) => {
        const url = `/editSub/${id}`;
        navigate(url);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        applyFilters(subs, value, filter);
    };

    const applyFilters = (subs: any[], searchTerm: string = '', filter: string = '') => {
        let filtered = subs;

        if (searchTerm) {
            filtered = filtered.filter(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (filter) {
            filtered = filtered.filter(sub => sub.name.includes(filter));
        }

        setFilteredSubs(filtered);
    };

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
        applyFilters(subs, searchTerm, newFilter);
    };

    return (
        <>
            <div className="container mt-5">
                <button className="btn btn-primary mb-3" onClick={addSub}>Dodaj nov oglas</button>
                <input
                    type="text"
                    placeholder="Iskanje po imenu izdelka..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="form-control mb-3 search-input"
                />
                <div className="filter-buttons mb-4 text-center">
                    <button className={`btn ${filter === 'EUNE' ? 'btn-primary' : 'btn-outline-primary'} me-2`} onClick={() => handleFilterChange('EUNE')}>
                        Prikaži EUNE
                    </button>
                    <button className={`btn ${filter === 'EUWE' ? 'btn-primary' : 'btn-outline-primary'} me-2`} onClick={() => handleFilterChange('EUWE')}>
                        Prikaži EUWE
                    </button>
                    <button className="btn btn-outline-primary" onClick={() => handleFilterChange('')}>
                        Pokaži vse
                    </button>
                </div>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            </div>
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {filteredSubs.map((sub, i) => (
                            <SubCard key={i} data={sub} onRemove={removeSub} editSub={editSub} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sub;

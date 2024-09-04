import { useEffect, useState } from "react";
import axios from "axios";
import SubCard from "../components/SubCard";
import { useNavigate } from 'react-router-dom';
import './Sub.css'; // Importiramo CSS za dodatno oblikovanje

const Sub = () => {
    const [subs, setSubs] = useState<any[]>([]);
    const [filteredSubs, setFilteredSubs] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const [userRole, setUserRole] = useState<string | null>(null);

    const subsUrl = "http://localhost:3000/subs";
    const usersUrl = "http://localhost:3000/users"; // URL za pridobitev uporabnikov
    const navigate = useNavigate();

    const loadSubs = async () => {
        try {
            // Pridobi podatke o uporabniku in njegovi vlogi
            const userRes = await fetch(usersUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            });

            if (!userRes.ok) {
                throw new Error(`HTTP error! status: ${userRes.status}`);
            }

            const users = await userRes.json();
            const currentUser = users.find(user => user.id === 5); // Zamenjaj `yourCurrentUserId` z ID-jem prijavljenega uporabnika

            if (currentUser) {
                const userRoles = currentUser.roles;

                if (userRoles.includes('admin')) {
                    navigate('/adminpage'); // Preusmeri na admin stran, če je uporabnik admin
                    return;
                } else {
                    setUserRole(userRoles[0]); // Nastavi prvo vlogo uporabnika
                }
            } else {
                setErrorMessage('User not found');
            }
        } catch (error) {
            console.error('Error fetching roles:', error);
            setErrorMessage('Error fetching user roles');
        }

        // Naloži podatke o subs samo, če uporabnik ni preusmerjen
        try {
            const subsRes = await axios.get(subsUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            });
            if (subsRes.status === 200) {
                setSubs(subsRes.data);
                applyFilters(subsRes.data);
            }
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                setErrorMessage(e.response.data.message || 'Unknown error occurred while loading subscriptions.');
            } else {
                setErrorMessage('Unknown error occurred while loading subscriptions.');
            }
        }
    };

    useEffect(() => {
        loadSubs();
    }, []);

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
                <input
                    type="text"
                    placeholder="Iskanje po imenu izdelka..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="form-control mb-3 search-input"
                />
                <div className="filter-buttons mb-4 text-center">
                    <button
                        className={`btn ${filter === 'EUNE' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                        onClick={() => handleFilterChange('EUNE')}
                    >
                        Prikaži EUNE
                    </button>
                    <button
                        className={`btn ${filter === 'EUWE' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                        onClick={() => handleFilterChange('EUWE')}
                    >
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
                            <SubCard key={i} data={sub} isAdmin={userRole === 'admin'} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sub;

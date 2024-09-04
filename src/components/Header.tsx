import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Header.css'; // Uvozimo CSS za dodatno oblikovanje

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const navigate = useNavigate();
    const logoutUser = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        navigate('/login');
    }

    return (
        <>
            <header>
                <div className="collapse text-bg-dark" id="navbarHeader">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 col-md-7 py-4">
                                <h4>G2G</h4>
                                <p className="text-body-secondary">
                                    Če imate kakršne koli težave ali vprašanja, nam pišite na <a href="mailto:mraovic111@gmail.com">mraovic111@gmail.com</a>
                                </p>
                            </div>
                            <div className="col-sm-4 offset-md-1 py-4">
                                <ul className="list-unstyled">
                                    {isLoggedIn ? (
                                        <>
                                            <li><a href="/" className="text-white">Home</a></li>
                                            <li><a href="/sub" className="text-white">Oglasi</a></li>
                                            <li><a href="/Kontakti" className="text-white">Kontakt</a></li> {/* Dodana povezava "Kontakt" */}
                                            <li><a href="#" onClick={logoutUser} className="text-white">Odjava</a></li>
                                        </>
                                    ) : (
                                        <>
                                            <li><a href="/login" className="text-white">Login</a></li>
                                            <li><a href="/register" className="text-white">Register</a></li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container">
                        <a href="#" className="navbar-brand d-flex align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                                 stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                 aria-hidden="true" className="me-2" viewBox="0 0 24 24">
                                <path
                                    d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                                <circle cx="12" cy="13" r="4"/>
                            </svg>
                            <strong>G2G</strong> {/* Posodobljeno ime */}
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;

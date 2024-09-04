import './Welcome.css'; // Importiramo CSS datoteko za Welcome

const Welcome = () => {
    return (
        <section className="welcome-section text-center container">
            <div className="welcome-content">
                <h1 className="welcome-title">Dobrodošli na g2g</h1>
                <p className="welcome-description">
                    g2g je spletna platforma, kjer lahko kupujete in prodajate račune za igre, kot so League of Legends, CS:GO in mnoge druge. Odkrijte enostaven način za iskanje in dodajanje oglasov ter izboljšajte svojo igralno izkušnjo.
                </p>
                <div className="welcome-buttons">
                    <a href="/addSub" className="btn btn-primary">Objavi svoj izdelek</a>
                    <a href="/Sub" className="btn btn-secondary">Poglej druge izdelke</a>
                    <a href="/Kontakti" className="btn btn-secondary">Kontakt</a>
                </div>
            </div>
        </section>
    );
}

export default Welcome;

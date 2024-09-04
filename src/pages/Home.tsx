import Welcome from "../components/Welcome";
import './Home.css'; // Importiramo CSS za dodatno oblikovanje

const Home = () => {
    return (
        <div className="home-container">
            <Welcome />
            <section className="info-section text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <h1 className="section-title">Dobrodošli na g2g</h1>
                        <p className="section-description">
                            g2g je spletna platforma, kjer lahko kupujete in prodajate račune za igre, kot so League of Legends, CS:GO in mnoge druge. Naša stran vam omogoča enostavno iskanje in dodajanje oglasov za račune, ki vam lahko izboljšajo vašo igralno izkušnjo.
                        </p>
                        <p className="section-description">
                            Če imate kakršna koli vprašanja ali potrebujete pomoč, nas kontaktirajte preko naše kontaktne strani. Za začetek preprosto objavite svoj oglas ali prebrskajte naše ponudbe.
                        </p>
                        <div className="button-group">
                            <a href="/addSub" className="btn btn-primary my-2">Objavi svoj izdelek</a>
                            <a href="/Sub" className="btn btn-secondary my-2">Poglej druge izdelke</a>
                            <a href="/Kontakti" className="btn btn-secondary my-2">Kontakt</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;

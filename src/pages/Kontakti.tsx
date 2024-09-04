import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Kontakti.css'; // Importiramo CSS za dodatno oblikovanje

const Kontakti = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const templateParams = {
            from_email: email,
            message: message,
        };

        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setStatus('Sporočilo je bilo uspešno poslano!');
                setEmail('');
                setMessage('');
            })
            .catch((err) => {
                console.log('FAILED...', err);
                setStatus('Pošiljanje sporočila ni uspelo.');
            });
    };

    return (
        <div className="kontakti-container">
            <h1>Kontaktirajte nas</h1>
            <p className="info-text">
                Če imate kakršna koli vprašanja ali potrebujete pomoč, nam lahko pošljete sporočilo preko obrazca spodaj ali pa nam pišete na <a href="mailto:mraovic111@gmail.com">mraovic111@gmail.com</a>.
            </p>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label htmlFor="email">E-poštni naslov:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Sporočilo:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Pošlji</button>
            </form>
            {status && <p className={`status-message ${status.includes('uspešno') ? 'success' : 'error'}`}>{status}</p>}
        </div>
    );
};

export default Kontakti;

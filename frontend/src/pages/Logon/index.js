import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import api from '../../services/api';

function Logon() {

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogon(e) {
        e.preventDefault();

        try {
            const resp = await api.post('sessions', { id }); 

            //Manter este dado disponível por toda a aplicação
            localStorage.setItem('ongID', id);
            localStorage.setItem('ongName', resp.data.name);

            history.push('/profile');
        } catch (error) {
            alert('Falha no Login');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero"/>

                <form onSubmit={handleLogon}>
                    <h1>Faça o seu Logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value = {id}
                        onChange = {e => setId(e.target.value)}/>
                    <button className="button" type="submit">
                        Entrar
                    </button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color='red' />
                        Não tenho cadastro
                    </Link>

                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>      
    );
}

export default Logon;
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft } from 'react-icons/fi'

import './styles.css';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

function NewIncident() {
    const history = useHistory();

    const ongId = localStorage.getItem('ongID');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');



    async function handleNewIncident(e) {
        e.preventDefault();
        
        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });

            history.push('/profile');

        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    } 

    return (
        
        <div className="new-incident">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>

                    <h1>Cadastrar novo caso</h1>     
                    <p>Descreva os detalhes do caso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color='red' />
                        Voltar para home
                    </Link>   
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                        
                    <textarea 
                        placeholder="Descrição" 
                        value={description}
                        onChange={e => setDescription(e.target.value)} />
                    <input 
                        placeholder="Valor em Reais (R$)" 
                        value={value}
                        onChange={e => setValue(e.target.value)} />
                    
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
        
    );
}

export default NewIncident;
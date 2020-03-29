import React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidentes] = useState([]);
    const history = useHistory();

    const ongId = localStorage.getItem('ongID');
    const ongName = localStorage.getItem('ongName');

    //Apesar da variável 'ongId' não mudar no LocalStorage porque o login já está feito
    //seria legal atualizar os dados na tela se a ongID mudar 
    //após uma nova requisição no server. Este é o uso do 'UseEffect'
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidentes(response.data);  
        })
    }, []);

    /*Significado das 'colchetes []' - toda vez que uma variável dentro do colchete
    mudar de valor do array, a função será executada.
     */

    async function handleDeleteIncident(id) {
        try {
            
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            //Atualizar a tela
            setIncidentes(incidents.filter(incident => incident.id !== id));

        } catch (error) {
            alert ("Erro ao deletar o caso, tente novamente");
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Nem vinda, {ongName}</span>

                <Link  className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button"> 
                    <FiPower  size={16} color="red"/>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {/* <li>
                    <strong>Caso:</strong>
                    <p>Teste</p>

                    <strong>Descrição:</strong>
                    <p>Exemplo de descrição</p>

                    <strong>Valor:</strong>
                    <p>120,00</p>

                    <button type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li> */}

                {incidents.map(incid => (                    
                    <li key={incid.id}>
                        <strong>Caso:</strong>
                        <p>{incid.title}</p>

                        <strong>Descrição:</strong>
                        <p>{incid.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incid.value)}</p>

                        {/* TOMAR CUIDADO sobre a diferença 
                        onClick={() => handleDeleteIncident(incid.id)} ---- executa a função
                        onClick={handleDeleteIncident(incid.id)} ---- retorna o resultado da função
                        */}

                        <button onClick={() => handleDeleteIncident(incid.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>   
                ))}

                
            </ul>
        </div>
    );
}
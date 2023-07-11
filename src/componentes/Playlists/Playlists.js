/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Musicas from '../Musicas/Musicas';
import axios from 'axios';

function Playlists() {
    const [playlists, setPlaylists] = useState([]);
    const [namePlaylist, setNamePlaylist] = useState('');
    const [pesquisa, setPesquisa] = useState({ nome: '' });

    useEffect(() => {
        getAllPlaylists();
    }, []);

    useEffect(() => {
        pesquisaPlaylist(pesquisa);
    }, [pesquisa]);

    const getAllPlaylists = () => {
        const headers = {
            headers: {
                Authorization: 'amanda-polari-easley',
            },
        };

        axios
            .get(
                `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists`,
                headers
            )
            .then((resp) => {
                // console.log(resp.data.result.list);
                setPlaylists(resp.data.result.list);
            })
            .catch((err) => {
                // console.log('Erro: NÃO pegou todas as playlists', err.response);
            });
    };

    const pesquisaPlaylist = async (pesquisa) => {
        try {
            const resp = await axios.get(
                `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=${pesquisa.nome}`,
                {
                    headers: {
                        Authorization: 'amanda-polari-easley',
                    },
                }
            );
            console.log('entrou no try', resp);
            resp.data.result.playlist.length
                ? setPlaylists(resp.data.result.playlist)
                : getAllPlaylists();
        } catch (error) {
            console.log('entrou no catch');
            console.log(error.response);
        }
    };

    const enviarDados = () => {
        const novaPesquisa = {
            nome: namePlaylist,
        };
        setPesquisa(novaPesquisa);
        setNamePlaylist('');
    };

    const resete = () => {
        getAllPlaylists();
    };

    return (
        <div>
            <div>
                <input
                    value={namePlaylist}
                    onChange={(e) => setNamePlaylist(e.target.value)}
                    placeholder="Nome da Playlist"
                />
                <button
                    type="submit"
                    onClick={() => {
                        enviarDados();
                    }}
                >
                    Pesquisar
                </button>
                <button
                    onClick={() => {
                        resete();
                    }}
                >
                    Limpar
                </button>
            </div>
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist} />;
            })}
        </div>
    );
}

export default Playlists;

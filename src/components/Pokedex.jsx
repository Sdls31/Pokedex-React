import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pokemon } from './Pokemon';
import { Box,Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { dbStorage } from '../firebase/firebase-config';

export const Pokedex = () => {
    const [pokemons, setPokemon] = useState([]);
    const [page, setPage] = useState(1);
    const [backcolor, setBack] = useState('#ffffff');
    const navigate = useNavigate();
    const [team, setTeam] = useState([]);
    const [renderedTeam, setRenderedTeam] = useState([])

    const url = `https://pokeapi.co/api/v2/pokemon?limit=15&offset=${(page - 1) * 15}`;

    useEffect(() => {
        axios.get(url).then((response) => {
            const pokemonList = response.data.results;
            const pokemonPromise = pokemonList.map((pokemon) => {
                return axios.get(pokemon.url);
            });
            Promise.all(pokemonPromise).then((pokemonResponses) => {
                const pokemonData = pokemonResponses.map((res) => {
                    const pokemon = res.data;
                    return {
                        ...pokemon,
                        image: pokemon.sprites.front_default,
                        sprites: pokemon.sprites,
                        official_artwork: pokemon.sprites.other['official-artwork'].front_default,
                        official_artwork_shiny: pokemon.sprites.other['official-artwork'].front_shiny,
                        stats: pokemon.stats.map((stat) => ({
                            name: stat.stat.name,
                            value: stat.base_stat
                          })),
                    };
                });
                setPokemon(pokemonData);
            });
        });
    }, [setPokemon, page]);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
        const docRef = doc(dbStorage , "teams", user.uid);
        const docSnap = await getDoc(docRef);
          if (user) {
            const uid = user.uid;
            handleTeam(uid, docSnap)
          } else {
            console.log('No user')
          }
        });
        }, []);
  
      const handleTeam = (uid, docSnap) => {
  
        if (docSnap.exists()) {
            const pokemon = docSnap.data();
            const arrayPokemon = Object.values(pokemon)
            console.log('array', arrayPokemon)
            setTeam((prevTeam) => [...prevTeam, ...arrayPokemon])
            console.log('team', team)
        } else {
          // docSnap.data() will be undefined in this case
          console.log("Create a Team!");
        }
      };


    return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: '3rem'
                }}
            >
            <div>
                <Stack spacing={2} direction="row" className='pages_buttons' margin={5}>
                    { 
                    page != 1 ? 
                    <>
                        <Button variant="contained" onClick={() => setPage(page-1)} sx={{backgroundColor: '#A6CF98'}}>Prev</Button>
                        <Button variant="contained" onClick={() => setPage(1)} sx={{backgroundColor: '#A6CF98'}}>First Page</Button>
                        <Button variant="contained" onClick={() => setPage(page+1)} sx={{backgroundColor: '#A6CF98'}}>Next</Button>
                    </>
                        :
                    <>
                        <Button variant="contained" disabled>Prev</Button>
                        <Button variant="contained" disabled>First Page</Button>
                        <Button variant="contained" onClick={() => setPage(page+1)} sx={{backgroundColor: '#A6CF98'}}>Next</Button>
                    </>
                    }
                </Stack>
            </div>
                <Grid container gap={0} sx={{ margin: 'auto' }}>
                    {pokemons.map((pokemon) => (
                        <Grid
                            item
                            xs={12}
                            sm={5}
                            md={4}
                            sx={{width: '75%', height: '75%' , backgroundColor:{backcolor}}}
                            key={pokemon.name}
                            padding={2}
                            display='flex'
                            justifyContent='center'
                            alignItems= 'center'

                        >
                            <Pokemon pokemon={pokemon} setTeam={setTeam} team={team} text='select'/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
    );
};


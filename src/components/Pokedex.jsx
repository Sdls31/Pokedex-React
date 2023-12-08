import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pokemon } from './Pokemon';
import { Box,Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const Pokedex = () => {
    const [pokemons, setPokemon] = useState([]);
    const [selectedPokemons, setSelectedPokemons] = useState([]);
    const [page, setPage] = useState(1);
    const [backcolor, setBack] = useState('#ffffff');

   const PokemonTypeColor = {
    'normal': '#A8A77A',
    'fire': '#EE8130',
    'water': '#6390F0',
    'grass': '#7AC74C',
    'electric': '#F7D02C',
    'ice': '#96D9D6',
    'fighting': '#C22E28',
    'poison': '#A33EA1',
    'ground': '#E2BF65',
    'flying': '#A98FF3',
    'psychic': '#F95587',
    'bug': '#A6B91A',
    'rock': '#B6A136',
    'ghost': '#735797',
    'dark': '#705746',
    'dragon': '#6F35FC',
    'steel': '#B7B7CE',
    'fairy': '#D685AD'
  }

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
                    };
                });
                setPokemon(pokemonData);
            });
        });
    }, [setPokemon, page]);


    return (


            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
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
                            <Pokemon pokemon={pokemon}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
    );
};


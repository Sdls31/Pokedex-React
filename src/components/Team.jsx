import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState} from 'react'
import { Box } from '@mui/material';
import { auth } from '../firebase/firebase-config';
import {onAuthStateChanged} from "firebase/auth";
import { doc, arrayUnion , getDoc, updateDoc} from "firebase/firestore"; 
import { dbStorage } from '../firebase/firebase-config';
import { Pokemon } from './Pokemon';


export const Team = ({}) => {
    const [team, setTeam] = useState([]);
    const [currentUID, setCurrentUID] = useState('');
    const [backcolor, setBack] = useState('#ffffff');
    const [renderedTeam, setRenderedTeam] = useState([]);
    const [label, setLabel] = useState(false)


    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          handleTeam(uid);
        } else {
          console.log('No user');
        }
      });
    }, [label]);

    const handleTeam = async (uid) => {
      const docRef = doc(dbStorage , "teams", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const pokemon = docSnap.data().pokemon;
        const arrayPokemon = Object.values(pokemon);

        const pokemonPromises = arrayPokemon.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
          res.json()
        )
      );

      Promise.all(pokemonPromises).then((pokemonData) => {
        setTeam(
          pokemonData.map((pokemon) => ({
            id: pokemon.id,
            image: pokemon.sprites.front_default,
            sprites: pokemon.sprites,
            official_artwork: pokemon.sprites.other['official-artwork'].front_default,
            official_artwork_shiny: pokemon.sprites.other['official-artwork'].front_shiny,
            stats: pokemon.stats.map((stat) => ({
              name: stat.stat.name,
              value: stat.base_stat
            })),
            types: pokemon.types,
            name: pokemon.name
          }))
        );
      });
    } else {
        // docSnap.data() will be undefined in this case
        console.log("Create a Team!");
        
    }
    };

    const handleDeleteTeam = async (pokemon) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {          
          const teamRef = doc(dbStorage, 'teams', user.uid);

          const newTeam = team.map(item => item.id)
          console.log(newTeam)

          
          const deleteTeam = newTeam.filter(item => item !== pokemon);
          console.log(deleteTeam)

          await updateDoc(teamRef, { pokemon: deleteTeam }); // Update Firebase
        }
      });
      setLabel(!label)
    }

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '8rem'
    }}
    >
      <Grid container gap={0} sx={{ margin: 'auto' }}>
                    {team.map((pokemon,index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            sx={{width: '750px', height: '0' , backgroundColor:{backcolor}}}
                            key={index}
                            padding={2}
                            display='flex'
                            justifyContent='center'
                            alignItems= 'center'

                        >
                          
                            <Pokemon key={index} pokemon={pokemon} setTeam={setTeam} team={team} text='delete' onDelete={handleDeleteTeam}/>
                        </Grid>
                    ))}
                </Grid>
    </Box>
  )
}

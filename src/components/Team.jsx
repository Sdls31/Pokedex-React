import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState} from 'react'
import { Box } from '@mui/material';
import { auth } from '../firebase/firebase-config';
import {onAuthStateChanged} from "firebase/auth";
import { doc, arrayUnion , getDoc} from "firebase/firestore"; 
import { dbStorage } from '../firebase/firebase-config';
import { Pokemon } from './Pokemon';

export const Team = ({}) => {
    const [team, setTeam] = useState([]);
    const [currentUID, setCurrentUID] = useState('');
    const [renderedTeam, setRenderedTeam] = useState([]);

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          handleTeam(uid)
        } else {
          console.log('No user')
        }
      });
      }, []);

    const handleTeam = async (uid) => {
      const docRef = doc(dbStorage , "teams", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const pokemon = docSnap.data();
        const arrayPokemon = Object.values(pokemon)
        const newArray = arrayPokemon.map((values)=> {
          setRenderedTeam([...renderedTeam, values])
        })
        console.log(renderedTeam)
      } else {
        console.log("No such document!");
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
      {team.map((pokemon)=> {
        <Pokemon pokemon={pokemon}/>
      })}
    </Box>
  )
}

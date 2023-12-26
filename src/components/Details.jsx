import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState , useEffect} from 'react';
import { IconButton } from '@mui/material';
import { Image } from '@mui/icons-material';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import { auth } from '../firebase/firebase-config';
import {onAuthStateChanged} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore"; 
import { dbStorage } from '../firebase/firebase-config';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  maxWidth: 300
};



export const BasicModal = ({setOpen, open, pokemon, setTeam, team, text, onDelete}) => {
  const [image, setImage] = useState(pokemon.official_artwork)
  const [shiny, setShiny] = useState(false)
  const navigate = useNavigate();

  const handleSetTeam = async (pokemon) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const teamRef = doc(dbStorage, 'teams', user.uid);
        const docSnap = await getDoc(teamRef);
        try {
          const updatedTeam = [];
  
          if (docSnap.exists()) {
            const pokemonIds = docSnap.data().pokemon;
            if(pokemonIds.includes(pokemon)){
              console.log('The pokemon alredy in the team')
            }else{
              updatedTeam.push(...Object.values(pokemonIds)); // Add existing Pokémon

              updatedTeam.push(pokemon); // Add the new Pokémon

              await updateDoc(teamRef, { pokemon: updatedTeam }); // Update Firebase
            }
          }else{
            await setDoc(teamRef, {
              pokemon: pokemon
            });
            console.log("Equipo creado")
          }
  
        } catch (error) {
          console.error('Error updating team:', error);
        }
  
      } else {
        navigate('/login');
      }
    });
  };
  


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

  const handleShiny = () => {
    if(shiny){
      setImage(pokemon.official_artwork_shiny)
    }else{
      setImage(pokemon.official_artwork)
    }

    setShiny(!shiny)
  }

  const maxStatValue = Math.max(...pokemon.stats.map(stat => stat.value));

  
  const OneLabel = ({type}) => {
    const selectedColor = PokemonTypeColor[type.toLowerCase()];
    return (
    <div style={{backgroundColor: selectedColor, paddingLeft:"5px", paddingRight: "5px", borderRadius:"5px", textAlign:"center"}} >
      <Typography sx={{color:'white'}}>{type}</Typography>
    </div>
    )
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1, padding: 0}}>
            <Typography id="modal-modal-title" variant="h6" component="h2"  sx={{ flexGrow: 1 }}>
              {pokemon.name}
            </Typography>
            <IconButton onClick={handleShiny}>
              <img src='src\assets\estrellas.png'/>
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1, padding:0}}>
            <Box sx={{flexGrow: 1}} paddingRight={5} paddingTop={5}>
              <img src={image} width={125}/>
              <Box display='flex' justifyContent='center' alignItems='center' paddingBottom={1}>
                  {pokemon.types.length === 2 ? 
                  <Stack spacing={1} direction="row" alignItems="center" justifyContent="center">
                    <OneLabel type={pokemon.types[0].type.name}/>
                    <OneLabel type={pokemon.types[1].type.name}/>
                  </Stack>
                  :
                  <Stack>
                    <OneLabel type={pokemon.types[0].type.name}/>
                  </Stack>
                }
              </Box>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <Button variant='contained' sx={{backgroundColor:'#A6CF98'}} 
                onClick={text === 'select' ? () => handleSetTeam(pokemon.id) : () => onDelete(pokemon.id)}>{text}</Button>
              </Box>
            </Box>
            <Stack spacing={1} sx={{ width: '100%', my: 2 }} direction='column'>
              {pokemon.stats.map(stat => (
                <Box key={stat.name}>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {stat.name}
                  </Typography>
                  <LinearProgress variant="determinate" value={(stat.value / maxStatValue) * 100} />
                </Box>
              ))}
            </Stack>
          </Box>         
        </Box>
      </Modal>
    </div>
  );
}
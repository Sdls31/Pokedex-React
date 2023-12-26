import React, { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, IconButton, Modal, Stack, Typography } from '@mui/material';
import { BasicModal } from './Details';

export const Pokemon = ({pokemon, setTeam, team, text, onDelete}) => {
  const [image, setImage] = useState(pokemon.official_artwork);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true)

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
  
  const PokemonCard = () => {
    return (
      <Box style={{backgroundColor: '#CACDCE', padding:25, borderRadius:'5px'}} alignItems="center" justifyContent="center" onClick={handleOpen}>
        <img width='125px' height='125px' src={image}/>
        <Typography variant='h6' mt={2} sx={{textAlign:'center'}}>{pokemon.name}</Typography>
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
    )
  }


  const OneLabel = ({type}) => {
    const selectedColor = PokemonTypeColor[type.toLowerCase()];
    return (
    <div style={{backgroundColor: selectedColor, paddingLeft:"5px", paddingRight: "5px", borderRadius:"5px", textAlign:"center"}} >
      <Typography sx={{color:'white'}}>{type}</Typography>
    </div>
    )

  }


  return (
    <>
        {  
        open ? 
        <BasicModal setOpen={setOpen} open={open} pokemon={pokemon} setTeam={setTeam} team={team} text={text} onDelete={onDelete}/>
        :
        <PokemonCard/>
        }
    </>
  )
}

import React, { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, IconButton, Stack, Typography } from '@mui/material';

export const Pokemon = ({pokemon, setBack}) => {
  const [image, setImage] = useState(pokemon.official_artwork)
  const [label, setLabel] = useState(false)


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


  const OneLabel = ({type}) => {
    const selectedColor = PokemonTypeColor[type.toLowerCase()];
    return (
    <div style={{backgroundColor: selectedColor, paddingLeft:"5px", paddingRight: "5px", borderRadius:"5px", textAlign:"center"}} >
      <Typography sx={{color:'white'}}>{type}</Typography>
    </div>
    )

  }

  const handleShinyEvent = () => {
    if(label){
      setImage(pokemon.official_artwork_shiny)
    }else{
      setImage(pokemon.official_artwork)
    }
    setLabel(!label)
  }

  return (
    <Box style={{backgroundColor: '#CACDCE', padding:25, borderRadius:'5px'}} alignItems="center" justifyContent="center">
        <Box display='flex' justifyContent='flex-end' alignItems='flex-end'>
          <IconButton onClick={handleShinyEvent}>
            <img src='src\assets\estrellas.png'/>
          </IconButton>
          </Box>
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

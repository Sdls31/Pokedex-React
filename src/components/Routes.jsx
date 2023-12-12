import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { NavigationBar } from './Navigation'
import { Pokedex } from './Pokedex'
import { Login_page } from './login'
import { Logup_page } from './loginup'
import { Team } from './Team'

export const PagesRoutes = () => {
  return (
    <>
      <NavigationBar/>
        <Routes>
            <Route path='/' element={<Pokedex />}/>
            <Route path='/login' element={<Login_page/>}/>
            <Route path='/logup' element={<Logup_page/>}/>
            <Route path='/team' element={<Team/>}/>
        </Routes>
    </>
  )
}

import React from 'react'
import '../../app/styles/Header.css'
import Menu from './menu/Menu'

export default function Header() {
  return (
    <>
     <header className='header'>
        <Menu/>
     </header>
    </>
  )
}

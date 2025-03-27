import React from 'react'
import 'boxicons'
import {Link} from 'react-router-dom'

export default function 
() {
  return (
    <>
        <div className='block__menu'>
            <div className="logo">
                <Link to='/home'>
                    <box-icon type='solid' name='car' color='white' size='4em'></box-icon>
                </Link>    
            </div> 
            <nav>
              <ul className='menu__list'>
                <li><Link to="carsharing">Каршеринг</Link></li>
                <li><Link href="">Подписка</Link></li>
                <li><Link href="">Для бизнеса</Link></li>
                <li style={{marginLeft:'30px'}}><Link to='/'>Регистрация</Link></li>
              </ul>
            </nav>       
        </div>
     
    </>
  )
}

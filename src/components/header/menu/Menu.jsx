import React from 'react'
import 'boxicons'
import {Link} from 'react-router-dom'

export default function 
() {
  return (
    <>
        <div className='block__menu'>
            <div className="logo">
                <Link to='/'>
                    <box-icon type='solid' name='car' color='white' size='4em'></box-icon>
                </Link>    
            </div> 
            <nav>
              <ul className='menu__list'>
                <li><Link href="">Каршеринг</Link></li>
                <li><Link href="">Подписка</Link></li>
                <li><Link href="">Для бизнеса</Link></li>
                <li><Link to='Registration'>хуй</Link></li>
              </ul>
            </nav>       
        </div>
     
    </>
  )
}

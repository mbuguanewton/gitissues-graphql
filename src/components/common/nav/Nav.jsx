import React from 'react'
import { Link } from 'react-router-dom'
import { Stack, Image } from '@chakra-ui/react'

function Nav() {
  return (
    <nav className='nav' data-testid='nav'>
      <div className='nav__wrapper'>
        <Link to='/' className='nav__wrapper--logo'>
          <Stack direction='row' alignItems='center'>
            <Image src='/logo.svg' objectFit='contain' />
            <h1>Git Issues</h1>
          </Stack>
        </Link>
      </div>
    </nav>
  )
}

export default Nav

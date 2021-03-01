import { Badge } from '@chakra-ui/react'
import React, { useState, useEffect, useCallback } from 'react'

function Languages({ languages }) {
  //   console.log(languages)
  //   const [langArray, setLangArray] = useState([])

  //   const changeToArray = useCallback(() => {
  //     const newLangs = Object.keys(languages)
  //     setLangArray(newLangs)
  //   }, [languages])

  //   useEffect(() => {
  //     changeToArray()
  //   }, [languages, changeToArray])

  return (
    <div className='languages'>
      <div className='languages__wrapper'>
        {languages && languages.length
          ? languages.map((lang) => (
              <Badge
                key={lang.node.id}
                alignItems='center'
                justifyContent='center'
                display='flex'
                padding='5px'
                className='languages__wrapper--badge'>
                {lang.node.name}
              </Badge>
            ))
          : null}
      </div>
    </div>
  )
}

export default Languages

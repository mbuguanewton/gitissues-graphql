import {
  Avatar,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from '@chakra-ui/react'
import React from 'react'

function AvatarComponent({ user }) {
  return (
    <div className='avatar' data-testid='avatar'>
      {user ? (
        <Stack direction='row' alignItems='center' className='avatar__stack'>
          <Avatar
            name={user.label}
            src={user.url}
            className='avatar__stack--avatar'
            width='25px'
            height='25px'
          />

          <Text as='h4'>{user.label}</Text>
        </Stack>
      ) : (
        <Stack direction='row' alignItems='center' className='avatar__stack'>
          <SkeletonCircle size='10' />
          <SkeletonText height='10px' width='60px' noOfLines={1} />
        </Stack>
      )}
    </div>
  )
}

export default AvatarComponent

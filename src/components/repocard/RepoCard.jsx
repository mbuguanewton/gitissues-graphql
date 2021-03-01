import React from 'react'
import AvatarComponent from '../common/avatar/Avatar'
import { FaGithub } from 'react-icons/fa'
import { SkeletonText, SkeletonCircle, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function RandomRepoCard({ repo }) {
  const user = {
    url: repo ? repo.node.owner.avatarUrl : '',
    label: repo ? repo.node.owner.login : '',
  }
  return (
    <div className='randomcard'>
      <div className='randomcard__wrapper'>
        {repo ? (
          <Link
            to={{
              pathname: `/repo/${repo.node.name}`,
              state: { ...repo.node },
            }}>
            <Text as='h3'>{repo.node.name}</Text>
          </Link>
        ) : (
          <SkeletonText height='20px' />
        )}
        <div className='randomcard__wrapper--container'>
          <AvatarComponent user={user} />

          {repo ? (
            <a href={repo.node.url} target='_blank' rel='noopener noreferrer'>
              <FaGithub className='icon' />
            </a>
          ) : (
            <SkeletonCircle size='10' />
          )}
        </div>
      </div>
    </div>
  )
}

export default RandomRepoCard

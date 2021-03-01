import { Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { FaGithub } from 'react-icons/fa'
import AvatarComponent from '../common/avatar/Avatar'
import Languages from '../languages/Languages'

function RepoDetail({ repo }) {
  const [languages, setLanguages] = useState([])
  const user = {
    url: repo ? repo.owner.avatarUrl : '',
    label: repo ? repo.owner.login : '',
  }

  useEffect(() => {
    if (repo) {
      setLanguages(repo.languages.edges)
    }
  }, [repo])

  return (
    <div className='repodetail'>
      <div className='repodetail__wrapper'>
        <div className='repodetail__wrapper--header'>
          <AvatarComponent user={user} />
          <a href={repo && repo.url} className='btn btn__repo'>
            <FaGithub className='icon' />
            <Text as='span'>Visit github</Text>
          </a>
        </div>
        <Languages languages={languages} />
        <div className='repodetail__wrapper--description'>
          <Text as='p'>{repo && repo.description}</Text>
        </div>
      </div>
    </div>
  )
}

export default RepoDetail

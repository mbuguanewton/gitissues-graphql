import { Text } from '@chakra-ui/react'
import React, { Suspense, lazy } from 'react'

const RepoCard = lazy(() => import('../repocard/RepoCard'))

function UserRepos({ repos }) {
  return (
    <div className='userrepos'>
      <Text as='h2'>Repos</Text>
      <div className='userrepos__wrapper'>
        {repos &&
          repos.map((repo) => (
            <Suspense key={repo.node.id} fallback={<h3>Loading ...</h3>}>
              <RepoCard repo={repo} />
            </Suspense>
          ))}
      </div>
    </div>
  )
}

export default UserRepos

import { Avatar, Badge, Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FaGithub, FaGlobe } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRepos } from '../../store/actions/GithubActions'

function UserDetails() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.github)

  useEffect(() => {
    if (user) {
      dispatch(fetchRepos(user.login))
    }
  }, [user, dispatch])
  return (
    <div className='user'>
      <div className='user__wrapper'>
        <div className='user__wrapper--avatar'>
          <Avatar
            src={user && user.avatarUrl}
            name={user && user.login}
            className='user--avatar'
          />
        </div>
        <div className='user__wrapper--details'>
          {/* <h5>Details</h5> */}
          <h3>{user && user.login}</h3>
          <Stack direction='row' alignItems='center'>
            <Badge className='badge'>
              Repos : {user && user.repositories.totalCount}
            </Badge>
            <Badge className='badge'>
              Gists : {user && user.gists.totalCount}
            </Badge>
            <Badge className='badge'>
              Followers : {user && user.followers.totalCount}
            </Badge>
          </Stack>
          <div className='actions'>
            <a href={user && user.websiteUrl} className='btn btn__blog'>
              <FaGlobe className='icon' />
            </a>
            <a href={user && user.url} className='btn btn__link'>
              <FaGithub className='icon' />
              <span>visit github</span>
            </a>
          </div>
        </div>
        <div className='user__wrapper--bio'>
          <h5>Bio</h5>
          <p>{user && user.bio}</p>
        </div>
      </div>
    </div>
  )
}

export default UserDetails

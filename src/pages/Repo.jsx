import { Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import RepoDetail from '../components/repodetail/RepoDetail'
import IssuesList from '../components/issueslist/IssuesList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIssues } from '../store/actions/GithubActions'

function Repo() {
  const dispatch = useDispatch()
  const { issues } = useSelector((state) => state.github)
  const { state } = useLocation()

  //   const url = `https://api.github.com/repos/${state.owner.login}/${state.name}/issues`
  useEffect(() => {
    if (state) {
      dispatch(fetchIssues(state.owner.login, state.name))
    }
  }, [state, dispatch])

  return (
    <div className='repo'>
      <div className='repo__wrapper'>
        <Text as='h1'>{state && state.name}</Text>
        <RepoDetail repo={state} />
        <IssuesList issues={issues} repo={state} />
      </div>
    </div>
  )
}

export default Repo

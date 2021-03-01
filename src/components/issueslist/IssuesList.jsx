import { Select, Stack, Text } from '@chakra-ui/react'
import React, { Suspense, lazy, useState } from 'react'
import IssueForm from '../../forms/IssueForm'
import { useDispatch } from 'react-redux'
import { createIssue } from '../../store/actions/GithubActions'

const IssueCard = lazy(() => import('../issuecard/IssuesCard'))

function IssuesList({ issues, repo }) {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState({
    title: '',
    description: '',
    loading: false,
  })

  const toggle = () => {
    setOpen((prevState) => !prevState)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setValue({ ...value, loading: true })
      let desc = value.description.replace(/(<([^>]+)>)/gi, '')

      const issue = {
        repositoryId: repo.id,
        title: value.title,
        body: desc,
      }

      dispatch(createIssue(issue))
      setValue({ ...value, loading: false })
      toggle()
    } catch (error) {
      setValue({ ...value, loading: false })
    }
  }

  return (
    <div className='issues'>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        className='issues__header'>
        <Select width={['30%']} mb='10px' placeholder='Sort By'>
          <option value='open'>Open</option>
          <option value='closed'>Closed</option>
        </Select>

        {!repo.isPrivate && (
          <button className='btn btn__newissue' onClick={toggle}>
            New Issue
          </button>
        )}
      </Stack>
      {open && (
        <IssueForm
          value={value}
          setValue={setValue}
          submit={handleSubmit}
          submitting={value.loading}
        />
      )}

      <Text as='h3'>Repo Issues</Text>
      <div className='issues__wrapper'>
        {issues &&
          issues.map((issue) => (
            <Suspense key={issue.node.id} fallback={<h3>Loading ...</h3>}>
              <IssueCard issue={issue} />
            </Suspense>
          ))}

        {!issues.length && <Text as='h3'>No Issues found</Text>}
      </div>
    </div>
  )
}

export default IssuesList

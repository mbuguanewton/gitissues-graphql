import { Select, Stack, Text } from '@chakra-ui/react'
import React, { Suspense, lazy, useState, useEffect } from 'react'
import IssueForm from '../../forms/IssueForm'
import { useDispatch } from 'react-redux'
import { createIssue } from '../../store/actions/GithubActions'

const IssueCard = lazy(() => import('../issuecard/IssuesCard'))

function IssuesList({ issues, repo }) {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([])
  const [value, setValue] = useState({
    title: '',
    description: '',
    loading: false,
  })

  const [select, setSelect] = useState('')

  console.log(select)

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

  useEffect(() => {
    if (issues) {
      setItems(issues)
    }
  }, [issues])

  useEffect(() => {
    if (select === 'open') {
      const openIssues =
        issues && issues.filter((issue) => issue.node.state === 'OPEN')

      setItems(openIssues)
    } else if (select === 'closed') {
      const closedIssues =
        issues && issues.filter((issue) => issue.node.state === 'CLOSED')

      setItems(closedIssues)
    } else {
      setItems(issues)
    }
  }, [select, issues])

  return (
    <div className='issues'>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        className='issues__header'>
        <Select
          width={['30%']}
          mb='10px'
          value={select}
          placeholder='Sort By'
          onChange={(e) => setSelect(e.target.value)}>
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
        {items &&
          items.map((issue) => (
            <Suspense key={issue.node.id} fallback={<h3>Loading ...</h3>}>
              <IssueCard issue={issue} />
            </Suspense>
          ))}

        {!items.length && <Text as='h3'>No Issues found</Text>}
      </div>
    </div>
  )
}

export default IssuesList

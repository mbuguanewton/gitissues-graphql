import { Badge, Text } from '@chakra-ui/react'
import React from 'react'
import AvatarComponent from '../common/avatar/Avatar'

function IssuesCard({ issue }) {
  const user = {
    url: issue ? issue.node.author.avatarUrl : '',
    label: issue ? issue.node.author.login : '',
  }
  return (
    <div className='issuecard'>
      <Text as='h3'>{issue && issue.node.title}</Text>

      <div className='issuecard__container'>
        <AvatarComponent user={user} />

        {issue && issue.node.state === 'OPEN' ? (
          <Badge className='badge badge__open'>{issue.node.state}</Badge>
        ) : (
          <Badge className='badge badge__close'>{issue.node.state}</Badge>
        )}
      </div>
    </div>
  )
}

export default IssuesCard

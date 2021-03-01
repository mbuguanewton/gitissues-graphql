import { useControllableState } from '@chakra-ui/react'
import React from 'react'
import QuillEditor from 'react-quill'

function Editor({ value, setValue }) {
  const handlechange = (val) => {
    setValue({ ...value, description: val })
  }
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link'],
      ['clean'],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
  ]
  return (
    <QuillEditor
      theme='snow'
      modules={modules}
      formats={formats}
      onChange={handlechange}
      value={value.description}
    />
  )
}

export default Editor

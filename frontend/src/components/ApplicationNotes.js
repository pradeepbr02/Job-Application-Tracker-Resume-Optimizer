import { useEffect, useState } from 'react'
import {
  getApplicationNotes,
  updateJobApplicationNotes,
} from '../apis/applicationApi.js'
import '../styles/applicationNotes.css'

const ApplicationNotes = ({ appId }) => {
  const [notes, setNotes] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    fetchApplicationNotes()
  }, [])

  const fetchApplicationNotes = async () => {
    const data = await getApplicationNotes(appId)
    setNotes(data)
  }

  const handleAddNote = async (e) => {
    e.preventDefault()
    if (!text.trim()) return

    await updateJobApplicationNotes(appId, text)
    setText('')
    fetchApplicationNotes()
  }

  return (
    <div className="notes-container">
      <form className="notes-form" onSubmit={handleAddNote}>
        <input
          placeholder="Add note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>Add</button>
      </form>

      <ul className="notes-list">
        {notes.map((note) => (
          <li key={note._id}>{note.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default ApplicationNotes

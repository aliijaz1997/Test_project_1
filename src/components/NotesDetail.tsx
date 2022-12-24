import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  CircularProgress
} from "@mui/material"
import React from "react"
import { useGetCallByIdQuery, useUpdateNotesMutation } from "../api/api"
import { AuthContext } from "../context/authContext"
import { NodesProps } from "../types/type"

interface NoteDetailProps {
  currentNode: NodesProps
}

const NoteDetail = ({ currentNode }: NoteDetailProps) => {
  const [notes, setNotes] = React.useState("")
  const authContext = React.useContext(AuthContext)

  const [updateNote] = useUpdateNotesMutation()

  const { data: node } = useGetCallByIdQuery({
    id: currentNode.id,
    token: authContext.authState.token
  })
  const handleSaveNotes = () => {
    updateNote({
      id: currentNode.id,
      content: notes,
      token: authContext.authState.token
    })
  }

  if (!node) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <Box
      sx={{
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4
      }}
    >
      <Typography component="h1" variant="h4">
        ADD NOTES
      </Typography>
      <Typography component="p" sx={{ color: "#7973F9" }} variant="body1">
        CALL ID {node.id}
      </Typography>
      <Divider variant="fullWidth" />
      <Box sx={{ p: "1rem" }}>
        <Typography component="h1" variant="h6">
          Call Type: <span>{node.call_type}</span>
        </Typography>
        <Typography component="h1" variant="h6">
          Duration: <span>{node.duration}</span>
        </Typography>
        <Typography component="h1" variant="h6">
          From: <span>{node.from}</span>
        </Typography>
        <Typography component="h1" variant="h6">
          To: <span>{node.to}</span>
        </Typography>
        <Typography component="h1" variant="h6">
          Via: <span>{node.via}</span>
        </Typography>
      </Box>

      <Typography component="h1" variant="h6">
        Notes
      </Typography>
      {node.notes &&
        node.notes.map(note => {
          return <Box key={note.id}>{note.content}</Box>
        })}
      <TextField
        multiline
        rows={5}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setNotes(e.target.value)
        }}
        fullWidth
        variant="outlined"
      />
      <Divider variant="fullWidth" />
      <Button
        fullWidth
        sx={{
          backgroundColor: "#4F45F8",
          mt: "0.5rem",
          color: "white",
          "&:hover": {
            backgroundColor: "gray",
            color: "white"
          }
        }}
        onClick={handleSaveNotes}
      >
        Save
      </Button>
    </Box>
  )
}

export default NoteDetail

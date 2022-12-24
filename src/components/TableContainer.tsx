import React from "react"
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TableContainer,
  Box
} from "@mui/material"
import { DataProps, NodesProps } from "../types/type"

interface TableContainerProps {
  columns: string[]
  data: NodesProps[]
  handleToggleArchieve: (id: string) => void
  setDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentNode: React.Dispatch<React.SetStateAction<NodesProps>>
}
function TableContainerF({
  columns,
  data,
  handleToggleArchieve,
  setDetailModalOpen,
  setCurrentNode
}: TableContainerProps) {
  const getCorrectValueForm = (word: string) => {
    if (word === "voicemail") {
      return "Voice Mail"
    } else {
      return word.split("").map((w, idx) => {
        if (idx === 0) {
          return w.toUpperCase()
        }
        return w
      })
    }
  }
  const getCorrectDateFormat = (value: string) => {
    const today = new Date(value)

    const yyyy = today.getFullYear()
    let mm = today.getMonth() + 1 // Months start at 0!
    let dd = today.getDate()

    const formattedToday = dd + "/" + mm + "/" + yyyy
    return formattedToday
  }
  const getDurationInMinutes = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const extraSeconds = seconds % 60
    const newMinutes = minutes < 10 ? "0" + minutes : minutes
    const newExtraSeconds =
      extraSeconds < 10 ? "0" + extraSeconds : extraSeconds
    return ` ${newMinutes} minutes and ${newExtraSeconds} seconds`
  }
  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead
          sx={{
            "& th": {
              backgroundColor: "#F4F4F9"
            }
          }}
        >
          <TableRow>
            {columns.map(column => (
              <TableCell key={column} align="right" style={{ minWidth: 150 }}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(node => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={node.id}>
                {columns.map(column => {
                  const splittedIndex = column.split(" ")
                  const index =
                    splittedIndex.length === 1
                      ? splittedIndex[0].toLowerCase()
                      : `${splittedIndex[0].toLowerCase()}_${splittedIndex[1].toLowerCase()}`

                  const value = node[index as keyof NodesProps] as string

                  if (index === "status") {
                    return (
                      <TableCell key={column} align="center">
                        <Button
                          sx={{
                            backgroundColor: node.is_archived
                              ? "#EDFBFA"
                              : "#FFFFFF",
                            color: node.is_archived ? "#6DDBCE" : "#7B7B7B"
                          }}
                          onClick={() => handleToggleArchieve(node.id)}
                        >
                          {node.is_archived ? "Archived" : "Unarchive"}
                        </Button>
                      </TableCell>
                    )
                  }
                  if (index === "actions") {
                    return (
                      <TableCell key={column} align="right">
                        <Button
                          sx={{
                            backgroundColor: "#4F45F8",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "gray",
                              color: "white"
                            }
                          }}
                          onClick={() => {
                            setDetailModalOpen(true)
                            setCurrentNode(node)
                          }}
                        >
                          Add Note
                        </Button>
                      </TableCell>
                    )
                  }
                  if (index === "created_at") {
                    getCorrectDateFormat
                    return (
                      <TableCell key={column} align="right">
                        <React.Fragment>
                          {getCorrectDateFormat(value)}
                        </React.Fragment>
                      </TableCell>
                    )
                  }
                  if (index === "duration") {
                    return (
                      <TableCell key={column} align="right">
                        <React.Fragment>
                          {getDurationInMinutes(Number(value))}
                        </React.Fragment>
                        <Box sx={{ color: "#4F45F8" }}> ({value})</Box>
                      </TableCell>
                    )
                  }
                  if (index === "call_type" || index === "direction") {
                    return (
                      <TableCell
                        key={column}
                        sx={{
                          color:
                            value === "voicemail" ||
                            value === "inbound" ||
                            value === "outbound"
                              ? "#4167E9"
                              : value === "answered"
                              ? "#68D9CD"
                              : "#D13C56"
                        }}
                        align="left"
                      >
                        <React.Fragment>
                          {getCorrectValueForm(value)}
                        </React.Fragment>
                      </TableCell>
                    )
                  }
                  return (
                    <TableCell key={column} align="right">
                      <React.Fragment>{value}</React.Fragment>
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableContainerF

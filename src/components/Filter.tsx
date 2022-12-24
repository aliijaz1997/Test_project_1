import { Box, Typography, TextField, MenuItem } from "@mui/material"

interface FilterProps {
  filterBy: string
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Filter({ filterBy, handleFilterChange }: FilterProps) {
  return (
    <Box
      sx={{
        p: "0.5rem",
        display: "flex",
        alignItems: "center"
      }}
    >
      <Typography component="h1" variant="h4">
        Filter By:
      </Typography>
      <TextField
        sx={{
          p: "1rem",
          backgroundColor: "none"
        }}
        color="primary"
        variant="standard"
        select
        value={filterBy}
        onChange={handleFilterChange}
      >
        <MenuItem
          sx={{
            "&:hover": {
              color: "#4F45F6",
              backgroundColor: "#D8D6FD"
            }
          }}
          value="all"
        >
          All
        </MenuItem>
        <MenuItem
          sx={{
            "&:hover": {
              color: "#4F45F6",
              backgroundColor: "#D8D6FD"
            }
          }}
          value="archived"
        >
          Archived
        </MenuItem>
        <MenuItem
          sx={{
            "&:hover": {
              color: "#4F45F6",
              backgroundColor: "#D8D6FD"
            }
          }}
          value="unarchived"
        >
          UnArchive
        </MenuItem>
      </TextField>
    </Box>
  )
}

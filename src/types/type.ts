interface NotesProps {
  content: string
  id: string
}
export interface NodesProps {
  call_type: string
  createdAt: string
  direction: string
  duration: string
  to: string
  from: string
  id: string
  is_archived: boolean
  via: string
  notes: NotesProps[]
}
export interface DataProps {
  hasNextPage: boolean
  nodes: NodesProps[]
  totalCount: number
}

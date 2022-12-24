import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { DataProps, NodesProps } from "../../types/type"
import { BaseUrl } from "../../utils/baseUrl"

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl
  }),
  tagTypes: ["GetData", "GetOneNode"],
  endpoints: builder => ({
    getCalls: builder.query<DataProps, { token: string; page: number }>({
      query: ({ token, page }) => {
        return {
          url: `calls?offset=${page}`,
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        }
      },
      providesTags: ["GetData"]
    }),
    getCallById: builder.query<NodesProps, { id: string; token: string }>({
      query: ({ id, token }) => {
        return {
          url: `calls/${id}`,
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        }
      },
      providesTags: ["GetOneNode"]
    }),
    updateArchive: builder.mutation<any, { token: string; id: string }>({
      query: ({ id, token }) => ({
        url: `calls/${id}/archive`,
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      }),
      invalidatesTags: ["GetData"]
    }),
    updateNotes: builder.mutation<
      any,
      { id: string; token: string; content: string }
    >({
      query: ({ id, content, token }) => ({
        url: `calls/${id}/note`,
        method: "POST",
        body: { content },
        headers: { Authorization: `Bearer ${token}` }
      }),
      invalidatesTags: ["GetOneNode"]
    })
  })
})
export const {
  useGetCallsQuery,
  useUpdateArchiveMutation,
  useGetCallByIdQuery,
  useUpdateNotesMutation
} = apiSlice

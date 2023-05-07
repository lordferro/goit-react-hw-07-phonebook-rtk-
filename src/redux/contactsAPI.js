import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contacts',
  tagTypes: ['Contacts'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6453a5b1c18adbbdfea35ef8.mockapi.io/',
  }),
  endpoints: builder => ({
    fetchContacts: builder.query({
      query: () => 'contacts',
      // подписаться на этот тэг
      providesTags: ['Contacts'],
    }),
    deleteContacts: builder.mutation({
      query: contactId => ({
        method: 'delete',
        url: `contacts/${contactId}`,
      }),
      // подписанным на этот тэг - обновиться!
      invalidatesTags: ['Contacts'],
    }),
    addContacts: builder.mutation({
      query: body => ({
        method: 'post',
        url: 'contacts',
        body,
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const { useFetchContactsQuery, useDeleteContactsMutation, useAddContactsMutation } = contactsApi;

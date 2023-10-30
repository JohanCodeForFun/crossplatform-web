import { createApi } from '@reduxjs/toolkit/query/react';
import { db } from '../../firebase-config';
import { addDoc, collection, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";

const firebaseBaseQuery = async ({ baseUrl, url, method, body }) => {
	switch (method) {
		case 'GET':
			const snapshot = await getDocs(collection(db, url));	
			const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
			return { data };

		case 'POST':
			const docRef = await addDoc(collection(db, url), body);
			return { data: { id: docRef.id, ...body } };

		// case 'PUT':
		// 	const updatedRef = await updateDoc((db, url);
		// 	return { data: { id: updatedRef.id, ...body } };

		case 'DELETE':
			console.log(url)
			const deletedRef = await deleteDoc(doc(db, url));
			return { data: { id: deletedRef, ...body } };

		default:
			throw new Error(`Unhandled method ${method}`);
	}
};

export const usersApi = createApi({
  reducerPath: 'usersApi',
	baseQuery: firebaseBaseQuery,
	endpoints: (builder) => ({
		createUser: builder.mutation({
			query: ({ user }) => ({
				baseUrl: '',
				url: 'users',
				method: 'POST', // PUT = modifiera data - DELETE = ta bort data
				body: user
			}),
		}),
		getUsers: builder.query({
			query: ({ userList }) => ({
				baseUrl: '',
				url: 'users',
				method: 'GET',
				body: userList
			}),
		}),
		deleteUser: builder.mutation({
			query: ({ userId }) => ({
				baseUrl: '',
				url: `users/${userId}`,
				method: 'DELETE',
				body: ''
			}),
		}),
	}),
});

export const { useCreateUserMutation, useGetUsersQuery, useDeleteUserMutation } = usersApi;
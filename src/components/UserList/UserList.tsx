import React, { useState } from 'react';
import { Modal } from './modal';
import styles from './UserList.module.css'
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } from '../../store/api/usersApi'

export const UserList = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState({});

  const usersList = useGetUsersQuery('users');
  const [deleteUser, ] = useDeleteUserMutation();
  const [updateUser,] = useUpdateUserMutation();

  const { data, isError, isLoading, isSuccess } = usersList;

  let sortedData;

  if (data) {
    sortedData = [...data].sort((a, b) => {
      if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
        return -1;
      } else if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
  });

} else {
  return null;
}

  const handleRefresh = () => {
    usersList.refetch()
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const repsonse = await deleteUser({userId: userId});
      console.log('User deleted', repsonse);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  if (isSuccess) {
    return (
      <div className={styles.container}>
        <h3>User List <button className={styles.refreshButton} onClick={() => {handleRefresh()}}>refresh</button></h3>
        <ul className={styles.ulContainer}>
          {sortedData?.map((user) => (
            <li className={styles.liElement} key={user.id}>
              <div>
                {user.firstName}  {user.lastName}
              </div>
              <div>
                <button
                  className={styles.updateButton}
                  onClick={() => {
                    setShowUpdateModal(!showUpdateModal)
                    setUserToUpdate(user)
                  }}
                  >Update
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => {handleDeleteUser(user.id)}}
                  >Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <Modal
          updateUser={updateUser}
          userToUpdate={userToUpdate}
          showUpdateModal={showUpdateModal}
          setShowUpdateModal={setShowUpdateModal}
        />
      </div>
    )
  }
}

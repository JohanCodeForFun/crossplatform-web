import styles from './UserList.module.css'
import { useGetUsersQuery, useDeleteUserMutation } from '../../store/api/usersApi'

export const UserList = () => {
  const usersList = useGetUsersQuery('users');
  const { data, isError, isLoading, isSuccess } = usersList;
  // const { mutate: deleteUser } = useDeleteUserMutation();

  const handleRefresh = () => {
    usersList.refetch()
  };

  const handleDeleteUser = async (id: number) => {
    try {
      // await deleteUser(id);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(data)
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  if (isSuccess) {
    return (
      <div className={styles.container}>
        <h3>User List <button onClick={() => {handleRefresh()}}>refresh</button></h3>
        <ul>
          {data?.map((user) => (
            <li key={user.id}>
              {user.firstName}  {user.lastName}
              <button
                className={styles.submitButton}
                onClick={() => {handleDeleteUser(user.id)}}
                >delete user</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

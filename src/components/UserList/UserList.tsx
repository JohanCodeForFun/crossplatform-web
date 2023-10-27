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
        <h3>User List <button className={styles.refreshButton} onClick={() => {handleRefresh()}}>refresh</button></h3>
        <ul className={styles.ulContainer}>
          {data?.map((user) => (
            <li className={styles.liElement} key={user.id}>
              <div>
                {user.firstName}  {user.lastName}
              </div>
              <div>
                <button
                  className={styles.deleteButton}
                  onClick={() => {handleDeleteUser(user.id)}}
                  >delete user</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

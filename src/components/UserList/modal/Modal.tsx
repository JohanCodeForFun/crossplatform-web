import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";

export const Modal = (props) => {
  const { userToUpdate, updateUser, showUpdateModal, setShowUpdateModal } = props;
  const [user, setUser] = useState({
    firstName: userToUpdate.firstName || '',
    lastName: userToUpdate.lastName || '',
  });

  useEffect(() => {
    setUser({
      firstName: userToUpdate.firstName || '',
      lastName: userToUpdate.lastName || '',
    });
  }, [userToUpdate]);


  const handleFirstNameChange = (e) => {
    setUser({
      ...user,
      firstName: e.target.value,
    });
  }

  const handleLastNameChange = (e) => {
    setUser({
      ...user,
      lastName: e.target.value,
    });
  }

  const handleUpdateUser = () => {
    try {
      updateUser({
        userId: userToUpdate.id,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } catch (err) {
      console.error(err);
    }

    setShowUpdateModal(false);
  }

  function handleCancelModal() {
    setShowUpdateModal(false);
    setUser({
      firstName: '',
      lastName: '',
    });
  }

  if (!showUpdateModal) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}
        >
        <div className={styles.modalHeader}>
          <h4 className={styles.modalTitle}>Update user</h4>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.labelContainer}>
            <label className={styles.label}>Firstname</label>
          <input
            value={user.firstName}
            placeholder="Firstname"
            onChange={handleFirstNameChange}
          />
          </div>

          <div className={styles.labelContainer}>
            <label className={styles.label}>Lastname</label>
            <input
            value={user.lastName}
            placeholder="Lastname"
            onChange={handleLastNameChange}
          />
        </div>
          
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={() => handleCancelModal()}>
            Close
          </button>
          <button className={styles.submitButton} onClick={() => handleUpdateUser()}>
            Update user
          </button>
        </div>
      </div>
    </div>
  );
};

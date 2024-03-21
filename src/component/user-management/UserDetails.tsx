import { useDispatch, useSelector } from "react-redux";
import { User, userActions } from "../../store/Users/UserSlice";
import { RootState } from "../../store/store";
import UserModal from "../UI/Modal";
import { useState } from "react";
import "./UserDetails.css";

const UserDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");


  const users = useSelector((state: RootState) => state.userName.users);

  const dispatch = useDispatch();
  const { deleteUser } = userActions;

  const handleUserDelete = (userId: string) => {
    if (userId !== null) {
      dispatch(deleteUser(userId));
    }
  };

  const handleUserEdit = (user: User) => {
    setEditingUser(user);
    openModal();
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setEditingUser(null);
    setIsModalOpen(false);
  };
  const filteredUsersData = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  return (
    <div>
      <div className="user-list-container">
        <h2>User List</h2>
        <div className="header-container">
         <input
         className="search-bar"
            type="text"
            name="query"
            value={searchQuery}
            onChange={onChangeHandler}
            placeholder="Search by name or email..."
          />
        <button onClick={openModal}>Add User</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsersData.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.dateOfBirth}</td>
                <td>
                  <button onClick={() => handleUserEdit(user)}>Edit</button>
                  <button onClick={() => handleUserDelete(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <UserModal
          isAddUser={!editingUser}
          show={isModalOpen}
          onClose={closeModal}
          user={editingUser}
        />
      )}
    </div>
  );
};

export default UserDetails;

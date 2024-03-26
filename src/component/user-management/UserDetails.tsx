import { useDispatch, useSelector } from "react-redux";
import { User, userActions } from "../../store/Users/UserSlice";
import { RootState } from "../../store/store";
import UserModal from "../UI/Modal";
import { useEffect, useMemo, useState } from "react";
// import SearchInput from "./SearchInput";
import "./UserDetails.css";
import useDebounce from "../../hooks/useDebounce";

const UserDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedQuery = useDebounce(searchQuery, 300);
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

  const filteredUsers: User[] = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.length < 3) {
      return users;
    }

    const normalizedQuery = debouncedQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(normalizedQuery) ||
        user.email.toLowerCase().includes(normalizedQuery)
    );
  }, [debouncedQuery, users]);

  const sortedUsers = useMemo(() => {
    return filteredUsers.sort((a, b) => b.createdAt - a.createdAt);
  }, [filteredUsers]);

  useEffect(() => {
    setSearchQuery("");
  }, []);

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
            onChange={(e) => setSearchQuery(e.target.value)}
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
              <th>createdAt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.dateOfBirth}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
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

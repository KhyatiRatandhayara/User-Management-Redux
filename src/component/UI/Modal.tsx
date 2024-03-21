import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddUser from "../user-management/AddUser";
import EditUser from "../user-management/EditUser";

interface UserModalProps {
  show: boolean;
  onClose: ()=>void;
  isAddUser: boolean;
  user?: any 
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


const UserModal: FC<UserModalProps> = ({ show, onClose, isAddUser, user }) => {
  return (
    <Modal
    open={show}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
      {isAddUser ? 'Add User' : 'Edit User'}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      {isAddUser ? <AddUser onClose={onClose}/> : <EditUser user={user} onClose={onClose}/>}
      </Typography>
    </Box>
  </Modal>
  )
};



export default UserModal;

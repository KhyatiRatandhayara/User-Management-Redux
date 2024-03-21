import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { validationSchema } from "../../validations/validation";
import { User, userActions } from "../../store/Users/UserSlice";
import { useDispatch } from "react-redux";
import "./EditUser.css";

interface EditUserFormProps {
  user: User;
  onClose: () => void;
}

const EditUser: React.FC<EditUserFormProps> = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const { editUser } = userActions;

  const editSubmitHandler = (values: User) => {
    dispatch(editUser({ userId: user.id, updatedUserData: values }));
    onClose();
  };

  return (
    <div className="form-container">
      <Formik
        initialValues={user}
        validationSchema={validationSchema}
        onSubmit={editSubmitHandler}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" />
            <ErrorMessage
              name="name"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <Field
              type="date"
              name="dateOfBirth"
              max={new Date().toISOString().split("T")[0]}
            />
            <ErrorMessage
              name="dateOfBirth"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <Field type="text" name="mobile" />
            <ErrorMessage
              name="mobile"
              component="div"
              className="error-message"
            />
          </div>

          {/* <button className="discard-button" type="button" onClick={onCancel}>
            Cancel
          </button> */}
          <button type="submit" className="submit-button">
            Update
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditUser;

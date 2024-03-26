import React from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { validationSchema } from "../../validations/validation";
import { User, userActions } from "../../store/Users/UserSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import "./AddUserForm.css";

interface AddUserInterface{
  onClose: ()=>void
}

const AddUser: React.FC<AddUserInterface> = ({onClose}) => {
  const initialValues: User = {
    id: uuidv4(),
    name: "",
    email: "",
    mobile: '   ',
    dateOfBirth: "",
    createdAt: new Date().getTime()
  };

  const dispatch = useDispatch();
  const { createUser } = userActions;

  const handleSubmit = (values: User, { resetForm }: FormikHelpers<User>) => {
    const userWithUUID: User = {
      ...values,
      id: uuidv4()
    };
    dispatch(createUser(userWithUUID));
    resetForm();
    onClose();
  };
  return (
    <div className="form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
            <Field type="date" name="dateOfBirth" max={new Date().toISOString().split('T')[0]}/>
            <ErrorMessage
              name="dateOfBirth"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <Field type="text" name="mobile"/>
            <ErrorMessage
              name="mobile"
              component="div"
              className="error-message"
            />
          </div>

          <button className="discard-button" type="reset">
            Discard
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddUser;

import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: Yup.string().required("Email is required").email("Email is not valid"),
  mobile: Yup.string()
    .required("Mobile is required")
    .matches(/^[0-9]+$/, "Mobile number must contain only digits")
    .min(6, "Mobile must be at least 6 characters")
    .max(40, "Mobile must not exceed 40 characters"),
  dateOfBirth: Yup.date()
    .required("Date of Birth is required")
    .test("age", "User must be 18 years or older", function (value) {
      const eighteenYearsAgo = new Date();
      eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
      return value && new Date(value) <= eighteenYearsAgo;
    })
    .max(new Date(), "Date of Birth must be in the past"),
});

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { DatePicker } from "@material-ui/pickers";
import useStyles from "./useStyles";
import moment from "moment";
import axios from "axios";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  DOB: null,
};

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length < 2) {
    errors.name = "Enter a valid name";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = "Required";
  } else if (
    !/(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(
      values.phoneNumber  
    )
  ) {
    errors.phoneNumber = "Invalid phone number";
  }
  if (!values.DOB) {
    errors.DOB = "Requried";
  } else if (moment().diff(moment(values.DOB, "DD-MM-YYYY"), "years") < 18) {
    errors.DOB = "Age can't be less than 18";
  }

  return errors;
};

export default function SignUp() {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  const onSubmit = async (formData) => {
    try {
      const data = {
        ...formData,
        DOB: moment(formData.DOB, "DD-MM-YYYY").format(
          "YYYY-MM-DD[T00:00:00.000Z]"
        ),
      };
      setLoading(true);

      const apiResponse = await axios.post(
        "https://alcofocus-task.herokuapp.com/users",
        data,
        {
          headers: {
            // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Content-Type": "application/json",
          },
        }
      );
      history.push("/users");
    } catch (error) {
      console.log(error.response);
      alert("It seems we had some issue, please try again!");
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Welcome!
        </Typography>
        <Formik
          validate={validate}
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {(formikProps) => {
            const {
              values,
              errors,
              handleChange,
              handleBlur,
              touched,
            } = formikProps;

            return (
              <form
                className={classes.form}
                onSubmit={formikProps.handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="name"
                      name="name"
                      variant="outlined"
                      required
                      fullWidth
                      label="Name"
                      autoFocus
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!(errors.name && touched.name && errors.name)}
                      helperText={
                        errors.name && touched.name && errors.name
                          ? errors.name
                          : undefined
                      }
                      inputProps={{
                        maxLength: 100,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Email"
                      name="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.email && touched.email}
                      helperText={
                        errors.email && touched.email ? errors.email : undefined
                      }
                      inputProps={{
                        maxLength: 100,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Phone Number"
                      name="phoneNumber"
                      autoComplete="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!(errors.phoneNumber && touched.phoneNumber)}
                      helperText={
                        errors.phoneNumber && touched.phoneNumber
                          ? errors.phoneNumber
                          : undefined
                      }
                      inputProps={{
                        maxLength: 14,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DatePicker
                      variant="outlined"
                      required
                      fullWidth
                      name="DOB"
                      label="Date Of Birth"
                      autoComplete="DOB"
                      value={
                        values.DOB ? moment(values.DOB, "DD-MM-YYYY") : null
                      }
                      onChange={(date) => {
                        formikProps.setFieldValue(
                          "DOB",
                          moment(date).format("DD-MM-YYYY")
                        );
                      }}
                      onBlur={handleBlur}
                      error={!!(errors.DOB && touched.DOB)}
                      helperText={
                        errors.DOB && touched.DOB ? errors.DOB : undefined
                      }
                      format="DD-MM-YYYY"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={formikProps.isSubmitting}
                >
                  Add User
                </Button>
              </form>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
}

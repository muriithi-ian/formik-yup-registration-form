import React from 'react'
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as yup from 'yup'
import './RegistrationForm.css'

function RegistrationForm() {
    const validationSchema = yup.object({
        name: yup
            .string('Enter full name')
            .required('Required'),
        email: yup
            .string('Enter email')
            .email('Invalid format, use: name@mail.com')
            .required('Required'),
        location: yup
            .string('Enter your location'),
        password: yup
            .string('Enter password with uppercase, lowercase, a number and a special character')
            .min(8, 'Password should be of minimum 8 characters length')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Must contain uppercase, lowercase, a number and special character")
            .required("Required"),
        confirmPassword: yup
            .string("Retype password")
            .oneOf([yup.ref('password'), null], "Passwords do not match")
            .required('Please confirm password')
    });
    const initialValues = {
        name: '',
        email: '',
        location: '',
        password: '',
        confirmPassword: '',
    }
    const onSubmit = values => {
        console.log("Form data", values)
    }
    return (
        <div className="form">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>

                <Form className="form">
                    <h1>Registration form</h1>
                    <div className="form_control">
                        <label htmlFor="name">Name</label>
                        <div className="error">
                            <ErrorMessage name="name" />
                        </div>
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="form_control">
                        <label htmlFor="email">Email</label>
                        <div className="error">
                            <ErrorMessage name="email" />
                        </div>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                        />

                    </div>

                    <div className="form_control">
                        <label htmlFor="location">Location</label>
                        <div className="error">
                            <ErrorMessage name="location" />
                        </div>
                        <Field
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Enter your location"
                        />
                    </div>

                    <div className="form_control">
                        <label htmlFor="password">Password</label>
                        <div className="error">
                            <ErrorMessage name="password" />
                        </div>
                        <Field
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password with uppercase, lowercase, a number and a special character"
                        />
                    </div>

                    <div className="form_control">
                        <label htmlFor="confirmPassword">Retype Password</label>
                        <Field
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Retype password"
                        />
                        <div className="error">
                            <ErrorMessage name="confirmPassword" />
                        </div>
                    </div>

                    <button type="submit">Submit</button>

                </Form>
            </Formik>
        </div>
    )
}

export default RegistrationForm

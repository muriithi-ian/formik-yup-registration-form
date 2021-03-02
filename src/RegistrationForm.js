import React from 'react'
import { Formik, Field, ErrorMessage, FieldArray, Form } from 'formik'
import * as yup from 'yup'
import './RegistrationForm.css'

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
        .required('Please confirm password'),
    phNumbers: yup
        .array()
        .required('Required')
        .of(
            yup
                .string('Enter your phone number')
                .min(10, 'Incomplete phone number')
                .required("Enter a value")
        )

});
const initialValues = {
    name: '',
    email: '',
    location: '',
    password: '',
    confirmPassword: '',
    phNumbers: ['']
}
const onSubmit = values => {
    console.log("Form data", values)
}
function RegistrationForm() {
    return (
        <div className="form">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>

                {
                    props => (
                        <Form className="form" onSubmit={onSubmit}>
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
                                <div className="error">
                                    <ErrorMessage name="confirmPassword" />
                                </div>
                                <Field
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Retype password"
                                />
                            </div>
                            <div className="form_control">
                                {/* <div className="error">
                            <ErrorMessage name="phNumbers" />
                        </div> */}
                                <label>List of Phone Numbers</label>
                                <FieldArray name="phNumbers">
                                    {
                                        (fieldArrayProps) => {
                                            console.log("Field Array Props: ", fieldArrayProps.form)
                                            const { push, remove, form } = fieldArrayProps
                                            const { phNumbers } = form.values
                                            return <div>

                                                {
                                                    phNumbers.map((phNumber, index) => (
                                                        <div key={index}>
                                                            <div className="error"> <ErrorMessage name={`phNumbers[${index}]`} /></div>

                                                            <Field name={`phNumbers[${index}]`} />
                                                            <button type="button" onClick={() => remove(index)}>-</button>
                                                        </div>
                                                    ))
                                                }
                                                <button type="button" onClick={() => push('')}>+</button>
                                            </div>
                                        }
                                    }
                                </FieldArray>
                            </div>
                            <button type="submit">Submit</button>

                        </Form>

                    )
                }

            </Formik>
        </div>
    )
}

export default RegistrationForm

import React, { Fragment } from 'react';
import { FormGroup, Grid, TextField } from "@material-ui/core";
import { ErrorMessage, Field } from "formik";


const BasicInfo = props => {
    console.log('basicInfo', props)
    return (
        <Fragment>
            <Grid item xs={12} sm={6}>
                <FormGroup>
                    <Field
                        label='First Name'
                        name="firstName"
                        as={TextField}
                        type="text"
                        placeholder="First Name"
                    />
                    <ErrorMessage
                        name="firstName"
                        component="div"
                        className="field-error"
                    />
                </FormGroup>

            </Grid>
            <Grid item xs={12} sm={6}>
                <FormGroup>
                    <Field
                        label='Last Name'
                        name="lastName"
                        as={TextField}
                        type="text"
                        placeholder="Last Name"
                    />
                    <ErrorMessage
                        name="lastName"
                        component="div"
                        className="field-error"
                    />
                </FormGroup>
            </Grid>
        </Fragment>
    )
}

export default BasicInfo;

import React from 'react'
import { date, object, string } from 'yup'

import { Avatar, FormGroup, Grid, makeStyles, MenuItem, TextField, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ErrorMessage, Field } from "formik";
import WizardWithMaterial from "../BaseWizard/BaseWizard";
import BasicInfo from "../steps/BasicInfo/BasicInfo";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const required = value => (value ? undefined : 'Required');

const styels = makeStyles(( theme ) => (
    {
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        buttons: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        button: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(1)
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative'
        },
        buttonProgress: {
            position: 'absolute',
            top: '50%',
            left: '50%'
        },
        stepper: {
            padding: theme.spacing(3, 0, 5)
        }
    }
));

const SignUpForm = props => {
    const classes = styels();
    const validationSchema = object({
        title: string().oneOf([ 'Mr,', 'Rev', 'Pastor' ]).required(),
        firstName: string().required(),
        lastName: string().required(),
        gender: string().oneOf([ 'Male', 'Female' ]).required(),
        dateOfBirth: date().max(new Date()).required(),
        nationality: string().oneOf([ 'Ghana', 'Austria' ]).required()
    });
    return (
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5" align='center'>
                Sign up
            </Typography>
            <WizardWithMaterial
                initialValues={{
                    title: '',
                    firstName: '',
                    lastName: '',
                    gender: '',
                    dateOfBirth: '',
                    nationality: '',
                    email: '',
                    favoriteColor: '',
                }}
                validationSchema={validationSchema}
                onSubmit={( values, actions ) => {
                    sleep(300).then(() => {
                        window.alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    });
                }}
                classes={classes}
            >
                <WizardWithMaterial.Page>
                    <BasicInfo validationSchema={validationSchema} {...props} />
                </WizardWithMaterial.Page>
                <WizardWithMaterial.Page
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        }
                        if (!values.favoriteColor) {
                            errors.favoriteColor = 'Required';
                        }
                        return errors;
                    }}
                >
                    <Grid item xs={12}>
                        <FormGroup>
                            <Field
                                label='Email'
                                name="email"
                                as={TextField}
                                type="email"
                                placeholder="Email"
                            />
                            <ErrorMessage name="email" component="div" className="field-error"/>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <Field
                                name="favoriteColor"
                                as={TextField}
                                select>
                                <MenuItem value="">Select a Color</MenuItem>
                                <MenuItem value="#ff0000">❤️ Red</MenuItem>
                                <MenuItem value="#00ff00">💚 Green</MenuItem>
                                <MenuItem value="#0000ff">💙 Blue</MenuItem>
                            </Field>
                            <ErrorMessage
                                name="favoriteColor"
                                component="div"
                                className="field-error"
                            />
                        </FormGroup>
                    </Grid>
                </WizardWithMaterial.Page>
                <div>
                    <p>Hello There how are you</p>
                </div>
            </WizardWithMaterial>
        </div>
    )
}


export default SignUpForm;

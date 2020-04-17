import React, {Fragment} from 'react';
import { ErrorMessage, Field, Formik } from 'formik';
import {
    Avatar,
    Button,
    FormGroup,
    Grid,
    makeStyles,
    MenuItem,
    TextField,
    Typography,
    withStyles
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { Debug } from '../../Debug';
import RegistrationSuccess from "../../signup/steps/Success/RegistrationSuccess";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const required = value => (value ? undefined : 'Required');

const useStyles = theme => (
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
);


const Style = makeStyles(( theme ) => (
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

class WizardWithMaterial extends React.Component {
    static Page = ( { children } ) => children;

    constructor( props ) {
        super(props);
        this.state = {
            page: 0,
            values: props.initialValues,
        };
    }

    next = values =>
        this.setState(state => ({
            page: Math.min(state.page + 1, this.props.children.length - 1),
            values,
        }));

    previous = () =>
        this.setState(state => ({
            page: Math.max(state.page - 1, 0),
        }));

    validate = values => {
        const activePage = React.Children.toArray(this.props.children)[
            this.state.page
            ];
        return activePage.props.validate ? activePage.props.validate(values) : {};
    };

    handleSubmit = ( values, bag ) => {
        const { children, onSubmit } = this.props;
        const { page } = this.state;
        const isLastPage = page === React.Children.count(children) - 1;
        if (isLastPage) {
            return onSubmit(values, bag);
        } else {
            bag.setTouched({});
            bag.setSubmitting(false);
            this.next(values);
        }
    };

    render() {
        const { children, classes } = this.props;
        const { page, values } = this.state;
        const activePage = React.Children.toArray(children)[page];
        const isLastPage = page === React.Children.count(children) - 1;


        return (
            <Formik
                initialValues={values}
                enableReinitialize={false}
                validate={this.validate}
                onSubmit={this.handleSubmit}
            >
                {( { values, handleSubmit, isSubmitting, handleReset } ) => (
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <Grid container spacing={2}>
                            {activePage}
                        </Grid>
                        <div className={classes.buttons}>
                            {page > 0 && (
                                <Button
                                    type="button"
                                    className={classes.button}
                                    color='secondary'
                                    onClick={this.previous}
                                >
                                    « Previous
                                </Button>
                            )}

                            {!isLastPage &&
                            <Button className={classes.button} color='primary' type="submit">Next »</Button>}
                            {isLastPage && (
                                <Button type="submit" className={classes.button} color='primary'
                                        disabled={isSubmitting}>
                                    Submit
                                </Button>
                            )}
                        </div>

                        <Debug/>
                    </form>
                )}
            </Formik>
        );
    }
}

const BasicInfo = props => {
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
                        validate={required}
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
                        validate={required}
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


const MultiStepWizardWithMaterial = props => {
    const classes = Style();

    return (
        <div className={classes.paper}>
            <h1>Multistep / Form Wizard With Material </h1>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5" align='center'>
                Sign up
            </Typography>
            <WizardWithMaterial
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    favoriteColor: '',
                }}
                onSubmit={( values, actions ) => {
                    sleep(300).then(() => {
                        window.alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    });
                }}
                classes={classes}
            >
                <div>
                    <p>I am first</p>
                </div>
                <WizardWithMaterial.Page>
                    <BasicInfo {...props} />
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
                <WizardWithMaterial.Page>
                    <RegistrationSuccess/>
                </WizardWithMaterial.Page>
                <div>
                    <p>Hello There how are you</p>
                </div>
                <RegistrationSuccess/>
            </WizardWithMaterial>
        </div>
    )
};

export default withStyles(useStyles, { withTheme: true })(MultiStepWizardWithMaterial);

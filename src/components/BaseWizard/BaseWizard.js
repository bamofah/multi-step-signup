import React, { Component } from 'react';
import { Formik } from 'formik';
import { Button, Grid, makeStyles, withStyles } from "@material-ui/core";

import { Debug } from '../Debug';

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


class WizardWithMaterial extends Component {
    static Page = ( { children } ) => children;

    constructor( props ) {
        super(props);
        this.state = {
            page: 0,
            values: props.initialValues,
            validationSchema: props.validationSchema
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

        console.log('activepage props', activePage.props);
        console.log('activepage.values', values);
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
        const { page, values, validationSchema } = this.state;
        const activePage = React.Children.toArray(children)[page];
        const isLastPage = page === React.Children.count(children) - 1;

        const updatedActivePAge = React.cloneElement(activePage, {
            key: this.props.validationSchema
        })

        return (
            <Formik
                initialValues={values}
                enableReinitialize={false}
                // validate={this.validate}
                validationSchema={validationSchema}
                onSubmit={this.handleSubmit}
            >
                {( { values, handleSubmit, isSubmitting, handleReset, validateField, validateForm } ) => (
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

export default withStyles(useStyles, { withTheme: true })(WizardWithMaterial);

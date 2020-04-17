import React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

const Copyright = () => (
    <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <MuiLink color="inherit" href="https://material-ui.com/">
            Auth Web
        </MuiLink>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
);

export default Copyright

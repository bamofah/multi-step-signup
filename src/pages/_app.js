import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/core/styles';
import Head from 'next/head';
import React from 'react';
import * as PropTypes from "prop-types";

import theme from '../components/styles/theme'
import Copyright from "../components/styles/Copyright";
import Box from "@material-ui/core/Box";


const MyApp = props => {
    const { Component, pageProps } = props;

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>My page</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                {/*<CssBaseline />*/}
                {/*<Component {...pageProps} />*/}
                <Container component="main" maxWidth="md">
                    <Component {...pageProps} />
                    <Box mt={8}>
                        <Copyright/>
                    </Box>
                </Container>
            </ThemeProvider>
        </React.Fragment>
    );
};

export default MyApp
//
// export default class MyApp extends App {
//     componentDidMount() {
//         // Remove the server-side injected CSS.
//         const jssStyles = document.querySelector('#jss-server-side');
//         if (jssStyles) {
//             jssStyles.parentElement.removeChild(jssStyles);
//         }
//     }
//
//     render() {
//         const { Component, pageProps } = this.props;
//
//         return (
//             <React.Fragment>
//                 <Head>
//                     <title>Auth App</title>
//                     <meta
//                         name="viewport"
//                         content="minimum-scale=1, initial-scale=1, width=device-width"
//                     />
//                 </Head>
//                 <ThemeProvider theme={theme}>
//                     {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
//                     <CssBaseline/>
//                     <Container>
//                         <Box marginTop={8}>
//                             <Component {...pageProps} />
//                         </Box>
//                     </Container>
//                 </ThemeProvider>
//             </React.Fragment>
//         );
//     }
// }

// using prop-types as I don't know typescript
MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};

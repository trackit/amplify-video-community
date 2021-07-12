import { DefaultTheme } from 'styled-components'

const defaultTheme: DefaultTheme = {
    palette: {
        primary: {
            main: 'var(--amplify-primary-color)',
            contrastText: 'var(--amplify-primary-contrast)',
            background: '#f2f3f3',
            ternary: '#dedede',
            darkblue: '#050029',
        },
        navbar: {
            main: 'var(--amplify-primary-color)',
            boxShadow: '0px 3px 3px #dedede',
            contrastText: 'var(--amplify-primary-contrast)',
        },
        textMd: 'var(--amplify-text-md)',
    },
}

export default defaultTheme

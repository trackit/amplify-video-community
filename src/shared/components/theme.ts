import { DefaultTheme } from 'styled-components'

const defaultTheme: DefaultTheme = {
    palette: {
        primary: {
            main: 'var(--amplify-primary-color)',
            contrastText: 'var(--amplify-primary-contrast)',
            background: '#f2f3f3',
        },
        textMd: 'var(--amplify-text-md)',
    },
}

export default defaultTheme

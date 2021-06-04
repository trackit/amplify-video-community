import { DefaultTheme } from 'styled-components'

const defaultTheme: DefaultTheme = {
    palette: {
        primary: {
            main: 'var(--amplify-primary-color)',
            contrastText: 'var(--amplify-primary-contrast)',
            secondary: 'var(--amplify-secondary-color)',
            secondaryContrast: 'var(--amplify-secondary-contrast)',
        },
        textMd: 'var(--amplify-text-md)',
        textLg: 'var(--amplify-text-lg)',
        textSm: 'var(--amplify-text-sm)',
    },
}

export default defaultTheme

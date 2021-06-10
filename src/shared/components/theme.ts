import { DefaultTheme } from 'styled-components'

const defaultTheme: DefaultTheme = {
    palette: {
        primary: {
            color: 'var(--amplify-primary-color)',
            contrast: 'var(--amplify-primary-contrast)',
        },
        secondary: {
            color: 'var(--amplify-secondary-color)',
            contrast: 'var(--amplify-secondary-contrast)',
        },
    },
    text: {
        medium: 'var(--amplify-text-md)',
        large: 'var(--amplify-text-lg)',
        small: 'var(--amplify-text-sm)',
    },
}

export default defaultTheme

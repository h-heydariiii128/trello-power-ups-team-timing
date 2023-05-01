/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./src/views/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
        },
        extend: {
            invert: {
                25: '.25',
                50: '.5',
                75: '.75',
            },
            colors: {
                primary: {
                    50: '#dbe4fa',
                    100: '#a7bbe8',
                    200: '#7298e7',
                    300: '#376fe3',
                    400: '#1c5ce0',
                    500: '#0051fd',
                    600: '#0e42ad',
                    700: '#0035a8',
                    800: '#043380',
                    900: '#0b245d',
                    DEFAULT: '#0051fd'
                },
            }
        },
    },
    plugins: [],
}

import { light, dark } from 'maki-toolkit';
import { Colors } from 'maki-toolkit/dist/theme/types';

console.log('colors', light.colors)

const darkColors: Colors = {
 ...dark.colors,
 primary: '#0080FF',
 primaryDark: '#0080FF',
 secondary: '#0080FF',
 tertiary: '#212121',
 background: '#000000',
 backgroundAlt: '#FFFFFF',
 invertedContrast: '#0E0E0F',
 navBackground: '#111111',
 card: 'rgba(53, 53, 53, 0.1)',
 cardBorder: '#0950B5',
 borderColor: '#555555',
 input: '#212121',
 gradients: {
    ...dark.colors.gradients,
    cardHeader: 'linear-gradient(93.42deg, #F70139 -0.25%, #BA06F0 50.27%, #00D3F0 99.75%)'
 },
 textDisabled: '#BDC2C4',
}
export { darkColors }
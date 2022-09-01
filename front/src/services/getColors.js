import { useSelector } from 'react-redux';

const colors = () => {
    const { darkMode } = useSelector((state) => state.settings);
    const { colorTheme } = useSelector((state) => state.settings);

    if (colorTheme === 'gradient') {
        return {color:'#FF3CAC', image: 'linear-gradient(180deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)'}
    } else if (colorTheme === 'original') {
        return !darkMode ? {color: 'rgb(58,12,163)', image: 'linear-gradient(180deg, rgba(58,12,163,1) 0%, rgba(96,50,201,1) 100%)'} : {color: 'rgba(2,50,107)', image: 'linear-gradient(180deg, rgba(0,47,84,1) 0%, rgba(2,50,107,1) 100%)'}
    } else {
        return {color: colorTheme}
    }
}

export default colors;
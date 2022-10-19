import { useSelector } from 'react-redux';

const colors = () => {
    const { darkMode } = useSelector((state) => state.settings);
    const { colorTheme } = useSelector((state) => state.settings);

    if (colorTheme === 'original') {
        return !darkMode ? {color: 'primary.main'} : {color: 'rgba(2,50,107)'}
    } else {
        return {color: colorTheme}
    }
}

export default colors;
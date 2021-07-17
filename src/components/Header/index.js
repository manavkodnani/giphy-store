import ToggleSwitch from '../../common/ToggleSwitch';
import './styles.scss';

const Header = ({ toggleTheme, theme }) => {
  const themeName = theme ? 'Light Theme' : 'Dark Theme';
  return (
    <div className='header-wrapper'>
      <div className='title'>GIPHY STORE</div>
      <div className='theme-container'>
        <div className='theme-container-name'>{themeName}</div>
        <ToggleSwitch toggleTheme={toggleTheme} />
      </div>
    </div>
  )
}

export default Header;
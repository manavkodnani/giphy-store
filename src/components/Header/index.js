import './styles.scss';

const Header = ({ toggleTheme, lightTheme }) => {
  const theme = lightTheme ? 'Light Theme' : 'Dark Theme';
  return (
    <div className='header-wrapper'>
      <div>Giphy Store</div>
      <span>{theme}</span>
      <label className="switch">
        <input type="checkbox" onClick={toggleTheme} />
        <span className="slider round"></span>
      </label>
    </div>
  )
}

export default Header;
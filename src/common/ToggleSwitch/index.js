import './styles.scss';

const ToggleSwitch = ({ toggleTheme }) => {
  return (
    <div className='toggle-switch-wrapper'>
      <label className="switch">
        <input type="checkbox" onClick={toggleTheme} />
        <span className="slider round"></span>
      </label>
    </div>
  )
}

export default ToggleSwitch;
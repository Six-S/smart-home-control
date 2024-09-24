import React, { useState } from 'react';
import { setDeviceState } from './utils';

const Card = ({ title, description, model, initialToggleState }) => {
  const [isToggled, setIsToggled] = useState(initialToggleState);

  const handleToggleChange = async () => {
    setIsToggled(!isToggled);
    await setDeviceState(description, model, !isToggled);
  };

  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    maxWidth: '300px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    margin: '16px auto',
    textAlign: 'center',
    backgroundColor: '#e0e0e0',
  };

  const toggleContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '16px',
  };

  const toggleSwitchStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '60px',
    height: '34px',
    marginRight: '8px',
  };

  const sliderStyle = {
    position: 'absolute',
    cursor: 'pointer',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: isToggled ? '#2196F3' : '#ccc',
    transition: '0.4s',
    borderRadius: '34px',
  };

  const sliderBeforeStyle = {
    position: 'absolute',
    content: '""',
    height: '26px',
    width: '26px',
    left: '4px',
    bottom: '4px',
    backgroundColor: 'white',
    transition: '0.4s',
    borderRadius: '50%',
    transform: isToggled ? 'translateX(26px)' : 'none',
  };

  return (
    <div style={cardStyle}>
      <h2>{title}</h2>
      <p>{model}</p>
      <p>{description}</p>
      <div style={toggleContainerStyle}>
        <label style={toggleSwitchStyle}>
          <input
            type="checkbox"
            checked={isToggled}
            onChange={handleToggleChange}
            style={{ display: 'none' }}
          />
          <span style={sliderStyle}>
            <span style={sliderBeforeStyle}></span>
          </span>
        </label>
        <span>{isToggled ? 'On' : 'Off'}</span>
      </div>
    </div>
  );
};

export default Card;
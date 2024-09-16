import React from 'react';

const Savedposts = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full height of the viewport
    backgroundColor: '#2364FF', // The blue background color
  };

  const boxStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slight transparency for the box
    borderRadius: '10px', // Rounded corners
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', // Subtle shadow for the box
  };

  const textStyle = {
    marginLeft: '10px',
    color: '#FFFFFF',
    fontSize: '24px',
    fontFamily: 'Nunito, sans-serif',
  };

  const imageStyle = {
    width: '30px',
    height: '30px',
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <img
          src="./path-to-your-image.png" // Change this to the actual path of the image
          alt="logo"
          style={imageStyle}
        />
        <span style={textStyle}>Nothing here currently!</span>
      </div>
    </div>
  );
};

export default Savedposts;
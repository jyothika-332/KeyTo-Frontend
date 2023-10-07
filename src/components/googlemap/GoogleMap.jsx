import React from 'react'

function GoogleMap() {
    const latitude = 37.7749; // Replace with your desired latitude
    const longitude = -122.4194; // Replace with your desired longitude

    const openGoogleMaps = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        window.open(url, '_blank'); // Open the URL in a new tab/window
      };
  return (
    <div className="App">
      <h1>Direct to Google Maps</h1>
      <p>
        Latitude: {latitude}, Longitude: {longitude}
      </p>
      <button onClick={openGoogleMaps}>Open Google Maps</button>
    </div>
  )
}

export default GoogleMap
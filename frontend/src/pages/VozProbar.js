import React, { useState, useEffect } from 'react';
import '../styles/VozProbar.css';
 
const VozProbar = () => {  
  const [isListening, setIsListening] = useState(false);

  
  return (
    <div className="container"> 
      <div className="voice-container">        
      </div>
    </div>
  );
}

export default VozProbar;

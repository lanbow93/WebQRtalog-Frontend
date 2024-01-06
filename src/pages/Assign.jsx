import { useState } from 'react';
import {QrReader} from 'react-qr-reader'
function Assign(){
    const [data, setData] = useState('No result');

    const handleScan = async (result, error) => {
            if (!!result) {
              console.log(result.text)
            }
  
            if (!!error) {
              console.log(error)
            }
            
    }
    
    return <div className="assign">
        <h1>Assign</h1>
        <QrReader
        onResult={(result, error) => handleScan(result, error)}
        
      />
      <p>{data}</p>
    </div>
}

export default Assign
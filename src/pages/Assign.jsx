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

        <h1>Assign By QR</h1>
        <p>Please Scan Item</p>
        <QrReader
        onResult={(result, error) => handleScan(result, error)}
        className='scanner'
      />
      
    </div>
}

export default Assign
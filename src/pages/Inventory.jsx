import { Link } from 'react-router-dom'
import { inventoryButtons } from '../utils/jsonDetails.json'
import useCheckUserSession from '../utils/useCheckUserSession'
function Inventory() {
    useCheckUserSession()
    return (
        <div className="inventory">
            <h1>Inventory</h1>
            <p>Select An Option:</p>
            <div className="buttonOptions">
                {inventoryButtons.map((option) => (
                    <Link to={option[1]} key={option[1] + option[2]}>
                        <button>{option[0]}</button>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Inventory

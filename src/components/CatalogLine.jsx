import { Link } from 'react-router-dom'
import { capitalizeWords } from '../utils/SharedFunctions'
function CatalogLine(props) {
    return (
        <div className={`line ${props.index % 2 === 0 ? 'even' : 'odd'}`}>
            <p>{capitalizeWords(props.productName)}</p>
            <p>{props.currentAssignee}</p>
            <p className="desktopView">{capitalizeWords(props.category)}</p>
            <Link to={`/inventory/catalog/${props._id}`}>
                <button>✓</button>
            </Link>
        </div>
    )
}

export default CatalogLine

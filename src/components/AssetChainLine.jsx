import { dateConverter } from '../utils/SharedFunctions'
function AssetChainLine(props) {
    return (
        <div className={`line ${props.index % 2 === 0 ? 'even' : 'odd'}`}>
            <p>{dateConverter(props.timestamp)}</p>
            <p className="desktopView">{props.action}</p>
            <p>{props.possesor}</p>
            <p className="lastColumn">{props.user}</p>
        </div>
    )
}

export default AssetChainLine

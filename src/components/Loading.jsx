import loadingImage from '../assets/loading.gif'
function LoadingScreen() {
    return (
        <div className="loadingScreen">
            <img src={loadingImage} alt="Adorable Dancing Totoro By CL Terry" />
            <p>Credit: CL Terry</p>
            <h1>...Loading...</h1>
        </div>
    )
}

export default LoadingScreen

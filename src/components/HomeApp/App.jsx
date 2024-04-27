import React from "react"
import "./App.css"
import QRCodeAndroid from '../../img/qr-code-android-v1.svg'

const App = () => {
    return (
        <div className="app-main">
            <div className="container">
                <div className="app-wrap">
                    <h1>Всегда под рукой</h1>
                    <p>Мы собрали весь функционал криптообменника XBT в мобильном приложении. Торгуйте эффективно с помощью простого интерфейса!</p>
                    <div className="app-body">
                        <div className="app-links">
                            <a href="https://play.google.com/store/apps/details?id=com.navisdevs.xbt" target="_blank" className="android">
                                <div>
                                    <span>Download from</span>
                                    <b>Google play</b>
                                </div>
                                <div className="qr-code-icon"></div>
                                <div className="qr-code-wrap">
                                    <img src={QRCodeAndroid} alt="" />
                                </div>
                            </a>
                            <a className="ios">
                                <div>
                                    <span>Download from</span>
                                    <b>Apple Store</b>
                                </div>
                                <small className="qr-code-soon">Скоро</small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App

import React from 'react'
import './sass/mapContent.sass'

export default class Popup extends React.Component {
    render() {
        return (
            <div id="popup">
                <div className="popup_content">
                    <p id="popup_title"></p>
                    <p id="popup_description"></p>
                </div>
                <div className="popover_arrow"></div>
            </div>
        )
    }
}
import React from 'react'
import './sass/mapContent.sass'

export default class Popup extends React.Component<{
    information: {
        title: string,
        description: string
    }
}> {
    render() {
        return (
            <div id="popup">
                <div className="popup_content">
                    <p id="popup_title">
                        {this.props.information.title}
                    </p>
                    <p id="popup_description">
                        {this.props.information.description}
                    </p>
                </div>
                <div className="popover_arrow"></div>
            </div>
        )
    }
}
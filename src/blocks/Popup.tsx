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
                    <p className="popup_title">
                        {this.props.information.title}
                    </p>
                    <p className="popup_description">
                        {this.props.information.description}
                    </p>
                </div>
                <div className="popover_arrow"></div>
            </div>
        )
    }
}
import React from 'react'

export default class Popup extends React.Component<{
    information:{
        title:string,
        description:string
    }
}> {
    render() {
        //console.log(this.props);
        return (
            <div id="popup" style={{ backgroundColor: "red", display:"none" }}>
                <p>
                    {this.props.information.title}
                </p>
                <p>
                    {this.props.information.description}
                </p>               
            </div>
        )
    }
}
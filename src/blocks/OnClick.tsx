import React from 'react';
import 'antd/dist/antd.css';
import { Popover, Button } from 'antd';

export default class OnClick extends React.Component<{
    information:{
        title:string,
        description:string
    }
}> {
  state = {
    visible: true,
  };

  render() {
    console.log(this.props)  
    return (
      <Popover
        content={this.props.information.description}
        title={this.props.information.title}
        visible={this.state.visible}
      >
        <Button>Click me</Button> 
      </Popover>
    );
  }
}
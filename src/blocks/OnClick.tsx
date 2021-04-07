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
    visible: false,
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = (visible:boolean) => {
    this.setState({ visible });
  };

  render() {
    console.log(this.props)  
    return (
      <Popover
        content={this.props.information.description}
        title={this.props.information.title}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <Button>Click me</Button>
      </Popover>
    );
  }
}
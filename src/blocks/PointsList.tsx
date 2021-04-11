import React from 'react';
import 'antd/dist/antd.css';
import './sass/mapContent.sass'
import { List, Card } from 'antd';

export default class PointList extends React.Component <{
    arrayPoints:{
        coordinates:number[],
        title:string,
        description:string
    }[]
}>{
    render() {
        return (
            <List
                grid={{ column: 1 }}
                dataSource={this.props.arrayPoints}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.title}>{item.description}</Card>
                    </List.Item>
                )}
            />
        )
    }
}
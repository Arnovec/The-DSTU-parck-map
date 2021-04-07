import React from 'react';
import 'antd/dist/antd.css';
import './sass/PointList.sass'
import { List, Card } from 'antd';

const data = [
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
];

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
import React, {Component} from 'react';
import {Row, Col, Table, Button, message, Popconfirm, Input} from 'antd';
import {getList} from '@/service/category';

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };
    }
    componentDidMount() {
        this.getList();
    }
    getList = () => {
        getList().then(({code, data}) => {
            if (code === 0) {
                const dataSource = data.items.map(item => (item.key = item._id, item));
                this.setState({
                    dataSource
                });
            }
            else {
                message.error('null');
            }
        });
    }
    render() {
        const columns = [
            {title: '名称', dataIndex: 'name', key: 'name'},
            {
                title: '操作',
                width: 200,
                render(text, record, index) {
                    return (
                        <Button.Group>
                            <Button type='default'>修改</Button>
                            <Popconfirm onConfirm={() => message.warn('删除成功')}>
                                <Button type='danger'>删除</Button>
                            </Popconfirm>
                        </Button.Group>
                    );
                }
            }
        ];
        return (
            <div>
                <Row>
                    <Col span={6}>
                        <Button.Group>
                            <Button type='default'>添加</Button>
                            <Button type='danger'>删除</Button>
                        </Button.Group>
                    </Col>
                    <Col span={18}>
                        <Input.Search
                            enterButton
                            placehoder='请输入分类'
                            onSearch={keyword => {console.log(keyword)}}
                        >
                        </Input.Search>
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    dataSource={this.state.dataSource}
                    bordered
                />
            </div>
        );
    }
}

import React, {Component} from 'react';
import {Row, Col, Table, Button, message, Modal, Form, Popconfirm, Input} from 'antd';
import {getList, create} from '@/service/category';

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            title: '',
            isCreate: true,
            isShowModal: false,
            pagination: {
                pageSize: 5,
                current: 1
            }
        };
    }
    componentDidMount() {
        this.getList();
    }
    getList = () => {
        const params = {
            pageSize: 5,
            current: this.state.pagination.current
        };

        getList(params).then(({code, data}) => {
            if (code === 0) {
                const dataSource = data.items.map(item => (item.key = item._id, item));
                console.log(data)
                this.setState({
                    dataSource,
                    pagination: {
                        current: data.pageNum,
                        pageSize: data.pageSize,
                        total: data.total,
                        showTotal: total => `总共${total}条`,
                        onChange: this.pageChange
                    }
                });
            }
            else {
                message.error('null');
            }
        });
    }
    pageChange = async (pageNum, pageSize) => {
        await this.setState({
            pagination: {
                ...this.state.pagination,
                current: pageNum
            }
        });
        this.getList();
    }
    handleAdd = () => {
        this.setState({
            title: '添加分类',
            isCrate: true,
            isShowModal: true
        });
    }
    editCancel = () => {
        this.setState({
            isShowModal: false
        });
    }
    handleOk = () => {
        const category = this.editFrom.props.form.getFieldsValue();
        create(category).then(({code, error}) => {
            if (code === 0) {
                this.getList();
                this.setState({
                    isShowModal: false
                });
            }
            else {
                message.error(error);
            }
        });

    }
    render() {
        const columns = [
            {title: '名称', dataIndex: 'name', key: 'name'},
            {
                title: '操作',
                key: 'operation',
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
                            <Button type='default' onClick={this.handleAdd}>添加</Button>
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
                    pagination={this.state.pagination}
                />
                <Modal
                    title={this.state.title}
                    visible={this.state.isShowModal}
                    onCancel={this.editCancel}
                    onOk={this.handleOk}
                >
                    <WrappedEditModal
                        wrappedComponentRef={init => this.editFrom = init}
                    />
                </Modal>
            </div>
        );
    }
}

class EditModal extends Component {
    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator('name', {
                            rules: [{required: true, message: '请输入分类名称'}]
                        })(
                            <Input placeholder='请输入分类名称'></Input>
                        )
                    }
                </Form.Item>
            </Form>
        );
    }
}

const WrappedEditModal = Form.create()(EditModal);

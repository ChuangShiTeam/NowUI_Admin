import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Form, Col, Button, message} from 'antd';

import NHeader from '../component/NHeader';
import NCol from '../component/NCol';
import NInputText from '../component/NInputText';
import http from "../common/http";

import constant from '../common/constant';

class NDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoad: false,
            isEdit: false,
            systemVersion: ''
        }
    }

    componentDidMount() {
        if (this.props.route.path.indexOf('/edit') > -1) {
            this.setState({
                isEdit: true
            });

            this.handleLoad();
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }

    handleLoad() {
        this.setState({
            isLoad: true
        });

        let values = {};
        values[this.props.primaryKey] = this.props.params[this.props.primaryKey];

        http.request({
            url: '/' + this.props.name + '/admin/find',
            data: values,
            success: function (data) {
                let values = {};

                for (let i = 0; i < this.props.columnList.length; i++) {
                    values[this.props.columnList[i].id] = data[this.props.columnList[i].id];
                }
                this.props.form.setFieldsValue(values);

                this.setState({
                    systemVersion: data.systemVersion
                });
            }.bind(this),
            complete: function () {
                this.setState({
                    isLoad: false
                });

            }.bind(this)
        });
    }

    handleSubmit() {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (!!errors) {
                return;
            }

            this.setState({
                isLoad: true
            });

            if (this.state.isEdit) {
                values[this.props.primaryKey] = this.props.params[this.props.primaryKey];
            }
            values.systemVersion = this.state.systemVersion;

            http.request({
                url: '/' + this.props.name + '/admin/' + (this.state.isEdit ? 'update' : 'save'),
                data: values,
                success: function (data) {
                    if (data) {
                        message.success(constant.success);

                        this.handleBack();
                    } else {
                        message.error(constant.failure);
                    }
                }.bind(this),
                complete: function () {
                    this.setState({
                        isLoad: false
                    });
                }.bind(this)
            });
        });
    }

    handleDelete() {
        this.setState({
            isLoad: true
        });

        let values = {};
        values[this.props.primaryKey] = this.props.params[this.props.primaryKey];
        values.systemVersion = this.state.systemVersion;

        http.request({
            url: '/' + this.props.name + '/admin/delete',
            data: values,
            success: function (data) {
                if (data) {
                    message.success(constant.success);

                    this.handleBack();
                } else {
                    message.error(constant.failure);
                }
            }.bind(this),
            complete: function () {
                this.setState({
                    isLoad: false
                });

            }.bind(this)
        });
    }

    handleReset() {
        this.props.form.resetFields();
    }

    handleBack() {
        this.props.history.goBack();
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        let buttonList = [];
        for (var i = 0; i < this.props.buttonList.length; i++) {
            var button = {
                name: this.props.buttonList[i].name,
                icon: this.props.buttonList[i].icon,
                isPrimary: this.props.buttonList[i].isPrimary
            };

            switch (this.props.buttonList[i].type) {
                case 'BACK':
                    button.click = this.handleBack.bind(this);
                    break;
                case 'DELETE':
                    button.click = this.handleDelete.bind(this);
                    break;
                default:
                    button.click = this.props.buttonList[i].click;
                    break;
            }

            buttonList.push(button);
        }

        let secondButtonList = [];
        for (var i = 0; i < this.props.secondButtonList.length; i++) {
            var button = {
                name: this.props.secondButtonList[i].name,
                icon: this.props.secondButtonList[i].icon
            };

            switch (this.props.secondButtonList[i].type) {
                case 'BACK':
                    button.click = this.handleBack.bind(this);
                    break;
                case 'DELETE':
                    button.click = this.handleDelete.bind(this);
                    break;
                default:
                    button.click = this.props.secondButtonList[i].click;
                    break;
            }

            secondButtonList.push(button);
        }

        return (
            <div>
                <NHeader name={this.props.title} breadcrumbList={this.props.breadcrumbList} buttonList={buttonList} secondButtonList={secondButtonList}/>
                <div className="page-content">
                    <Form>
                        {
                            this.props.columnList.map(function (column) {
                                return (
                                    <Row key={column.id}>
                                        <NCol>
                                            <NInputText id={column.id}
                                                        label={column.name}
                                                        required={column.required}
                                                        getFieldDecorator={getFieldDecorator}
                                                        onPressEnter={this.handleSubmit.bind(this)}
                                            />
                                        </NCol>
                                    </Row>
                                )
                            }.bind(this))
                        }
                        <Row>
                            <NCol>
                                <Col xs={{span: 24}}
                                     sm={{span: 17, offset: 4}}
                                     md={{span: 17, offset: 4}}
                                     lg={{span: 17, offset: 4}}
                                     xl={{span: 17, offset: 4}}
                                >
                                    <Button type="primary"
                                            icon="check-circle"
                                            loading={this.state.isLoad}
                                            className="page-button-left"
                                            onClick={this.handleSubmit.bind(this)}
                                    >
                                        提交
                                    </Button>
                                    <Button icon="reload"
                                            loading={this.state.isLoad}
                                            onClick={this.handleReset.bind(this)}
                                    >
                                        重置
                                    </Button>
                                </Col>
                            </NCol>
                        </Row>
                    </Form>
                </div>
            </div>
        );
    }
}

NDetail.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    primaryKey: PropTypes.string.isRequired,
    store: PropTypes.object.isRequired,
    breadcrumbList: PropTypes.array.isRequired,
    buttonList: PropTypes.array.isRequired,
    secondButtonList: PropTypes.array.isRequired,
    columnList: PropTypes.array.isRequired
};

NDetail.defaultProps = {};

NDetail = Form.create()(NDetail);

export default NDetail;
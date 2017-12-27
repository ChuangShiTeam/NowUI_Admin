import {connect} from 'react-redux';

import NIndex from '../../layout/NIndex';

export default connect(function (state) {
    return {
        id: 'appConfig',
        type: 'TABLE',
        title: '应用配置信息',
        primaryKey: 'configId',
        store: state.appConfig,
        listUrl: '/app/config/admin/list',
        breadcrumbList: [{
            name: '应用配置管理',
            url: ''
        }],
        buttonList: [{
            name: '搜索',
            icon: 'search',
            type: 'SEARCH',
            isLoad: true,
            isPrimary: true
        }, {
            name: '新增',
            icon: 'plus-circle',
            type: 'ADD',
            pathname: '/app/config/add'
        }],
        searchList: [{
            id: 'configCategoryId',
            name: '应用配置分类',
            type: 'SELECT',
            select: {
                allowClear: true,
                showSearch: true,
                storeKey: 'configCategoryList',
                remoteOptionConfig: {
                    key: 'configCategoryId',
                    value: 'configCategoryName',
                    url: '/app/config/category/admin/all/list',
                    params: {}
                }
            }
        }, {
            id: 'configKey',
            name: '键',
            type: 'VARCHAR'
        }, {
            id: 'configIsDisabled',
            name: '是否禁用',
            type: 'SELECT',
            select: {
                staticOptionList: [{
                    key: '',
                    value: '全部'
                }, {
                    key: true,
                    value: '是'
                }, {
                    key: false,
                    value: '否'
                }]
            }
        }],
        columnList: [{
            id: 'configKey',
            name: '键',
            pathname: '/app/config/edit'
        }, {
            id: 'configValue',
            name: '值'
        }, {
            id: 'configCategoryName',
            name: '分类'
        }, {
            id: 'configIsDisabled',
            name: '是否禁用',
            render: function (text, record, index){
                return text ? '是' : '否';
            }
        }]
    }
})(NIndex);
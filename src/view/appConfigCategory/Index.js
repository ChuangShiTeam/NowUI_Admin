import {connect} from 'react-redux';

import NIndex from '../../layout/NIndex';

export default connect(function (state) {
    return {
        id: 'appConfigCategory',
        type: 'TABLE',
        title: '应用配置分类信息',
        primaryKey: 'configCategoryId',
        store: state.appConfigCategory,
        listUrl: '/app/config/category/admin/v1/list',
        breadcrumbList: [{
            name: '应用配置分类管理',
            url: ''
        }],
        buttonList: [{
            name: '搜索',
            icon: 'search',
            type: 'SEARCH',
            isLoad: true,
            isPrimary: true
        }],
		secondButtonList: [{
			name: '新增',
			icon: 'plus-circle',
			type: 'ADD',
			addUrl: '/app/config/category/add'
		}, {
			name: '同步',
			icon: 'sync',
			type: 'SYNCHRONIZE',
			synchronizeUrl: '/app/config/category/admin/v1/synchronize'
		}],
        searchList: [{
            id: 'configCategoryName',
            name: '名称',
            type: 'VARCHAR'
        }, {
            id: 'configCategoryCode',
            name: '编码',
            type: 'VARCHAR'
        }],
        columnList: [{
            id: 'configCategoryName',
            name: '名称',
            editUrl: '/app/config/category/edit/:configCategoryId'
        }, {
            id: 'configCategoryCode',
            name: '编码'
        }]
    }
})(NIndex);

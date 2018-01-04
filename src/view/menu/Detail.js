import {connect} from 'react-redux';

import NDetail from '../../layout/NDetail';

export default connect(function (state) {
    return {
        id: 'menu',
        baseUrl: '/menu',
        title: '菜单表单',
        primaryKey: 'menuId',
        store: state.menu,
        breadcrumbList: [{
            name: '菜单管理',
            url: '/menu/index'
        }, {
            name: '菜单信息',
            url: ''
        }],
        buttonList: [{
            name: '返回',
            icon: 'left-circle',
            type: 'BACK',
            isPrimary: false
        }],
        secondButtonList: [{
            name: '删除',
            icon: 'delete',
            type: 'DELETE'
        }],
        columnList: [{
            id: 'menuName',
            name: '名称',
            type: 'VARCHAR',
            required: true
        }, {
            id: 'menuImage',
            name: '图片',
            type: 'MEDIA',
            returnLimit: 1,
            supportUploadTypes: ['image'],
            ref: 'navigationImage'
        }, {
            id: 'menuUrl',
            name: '地址',
            type: 'VARCHAR',
            required: true
        }, {
            id: 'menuSort',
            name: '排序',
            type: 'NUMBER',
            min: 0,
            max: 99999,
            required: true
        }]
    }
})(NDetail);

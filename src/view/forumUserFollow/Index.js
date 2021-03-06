import {connect} from 'react-redux';

import NIndex from '../../layout/NIndex';

export default connect(function (state) {
    return {
        id: 'forumUserFollow',
        type: 'TABLE',
        title: '论坛用户关注',
        primaryKey: 'forumUserFollowId',
        store: state.forumUserFollow,
        listUrl: '/forum/user/follow/admin/list',
        breadcrumbList: [{
            name: '论坛用户关注管理',
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
			addUrl: '/forum/user/follow/add'
		}, {
			name: '同步',
			icon: 'loading-3-quarters',
			type: 'SYNCHRONIZE',
			synchronizeUrl: '/forum/user/follow/admin/v1/synchronize'
		}],
        searchList: [{
            id: 'userId',
            name: '用户Id',
            type: 'VARCHAR'
            }, {
            id: 'forumId',
            name: '论坛Id',
            type: 'VARCHAR'
        }],
        columnList: [{
            id: 'userId',
            name: '用户Id'
        }, {
            id: 'forumId',
            name: '论坛Id'
        }]
    }
})(NIndex);

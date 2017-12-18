const initialState = {
    productName: '',
    total: 0,
    pageIndex: 1,
    pageSize: 5,
    list: []
};

function product(state = initialState, action) {
    switch (action.type) {
        case 'product':
            return Object.assign({}, state, action.data);

        default :
            return state;
    }
}

export default product;
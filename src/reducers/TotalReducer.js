const TotalReducer = (state, action) => {
    switch (action.type) {
        case 'addTotal': return {total: action.payload};
        case 'reset': return {total: 0};
        default: state;
    }
}

export default TotalReducer;
const initialState = {
    nickname: null,
    publications: [],
    _id: null
};

const userReducer = (state = initialState, action) => {
    if (action.type === "SET_USER") {
        return {
            ...state,
            ...action.payload
        };
    }

    return state;
}

export default userReducer;
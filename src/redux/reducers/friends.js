const initialState = []

const friendsReducer = (state = initialState, action) => {
    if (action.type === "SET_FRIENDS") {
        return [...state, ...action.payload]
    }

    return state;
}

export default friendsReducer;
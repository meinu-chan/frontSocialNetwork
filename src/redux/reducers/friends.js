const initialState = []

const friendsReducer = (state = initialState, action) => {
    if (action.type === "SET_FRIENDS") {
        return action.payload ? [
            ...state, action.payload
        ] : [...state]
    }

    return state;
}

export default friendsReducer;
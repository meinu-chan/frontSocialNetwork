const initialState = false

const listOfReqReducer = (state = initialState, action) => {
    if (action.type === "SHOW_LIST") {
        return !state
    }

    return state;
}

export default listOfReqReducer;
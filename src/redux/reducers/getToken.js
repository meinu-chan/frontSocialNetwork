const getToken = (state = "", action) => {
    if (action.type === "GET_TOKEN") {
        state = action.payload;
        return state;
    }
    return state;

}

export default getToken;
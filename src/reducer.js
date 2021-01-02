const initialState = {
    name: '',
    online: false,
    messages: [],
    users: [],
};

const reducer = (state = initialState, action) => {
    const updateMessages = (params = {}) => {
        const messages = [...state.messages];
        const { name, text, users } = action.data;
        messages.push({ ...params, name, text });
        return { ...state, users: users || state.users, messages };
    };

    switch (action.type) {
        case 'ONLINE':
            return { ...state, ...action.data, online: true };
        case 'MESSAGE':
            return updateMessages({ type: 'REGULAR' });
        case 'CONNECTED':
            return updateMessages({ type: 'CONNECTED' });
        case 'DISCONNECTED':
            return updateMessages({ type: 'DISCONNECTED' });
        default:
            return state;
    }
};

export default reducer;

import path from 'path';

const initialState = {
    name: '',
    online: false,
    messages: [],
    users: [],
};

const reducer = (state = initialState, action) => {
    if (state.online) {
        switch (action.type) {
            case 'MESSAGES':
                soundMessage();
                return { ...state, messages: action.info.messages };
            default:
                return state;
        }
    } else {
        switch (action.type) {
            case 'ONLINE':
                return { ...state, ...action.info, online: true };
            default:
                return state;
        }
    }
};

const soundMessage = () => {
    if (document.visibilityState === 'hidden') {
        const dirname = path.dirname(import.meta.url);
        new Audio(path.resolve(dirname, '/msg.mp3')).play();
    }
};

export default reducer;

import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
    count: 0
}
const userInitialState = {
    name: "rion",
    age: 25
}

const userInfoState = {}

const ADD = "ADD";
function countReducer(state = initialState, action) {
    console.log(state, action);
    switch (action.type) {
        case "ADD":
            return { count: state.count + (action.num || 1) }

        default:
            return state;
    }
}

const UPDATE_NAME = "UPDATE_NAME";
function userReducer(state = userInitialState, action) {
    switch (action.type) {
        case "UPDATE_NAME":
            return {
                ...state,
                name: action.name
            }

        default:
            return state;
    }
}


function userInfoReducer(state = userInfoState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

// const store = createStore(countReducer, initialState);
const allReducers = combineReducers({
    counter: countReducer,
    user: userReducer,
    userInfo: userInfoReducer
})
// const store = createStore(
//     allReducers,
//     {
//         counter: initialState,
//         user: userInitialState
//     },
//     composeWithDevTools(applyMiddleware(ReduxThunk))
// );

export function add(num) {
    return {
        type: "ADD",
        num
    }
}

function addAsync(num) {
    return (dispatch, getState) => {
        setTimeout(() => {
            dispatch(add(num));
        }, 1000);
    }
}

// console.log(store.getState());
// store.dispatch({ type: ADD });
// store.dispatch(add(6));
// console.log(store.getState());

// store.subscribe(() => {
//     console.log("subscribe", store.getState());
// })
// store.dispatch({ type: ADD });
// store.dispatch(addAsync(2));


// store.dispatch({ type: UPDATE_NAME, name: "zya" });


// export default store;

export default function initialStore(state) {
    const store = createStore(
        allReducers,
        // {
        //     counter: initialState,
        //     user: userInitialState
        // },
        Object.assign({}, {
            counter: initialState,
            user: userInitialState,
            userInfo: userInfoState
        }, state),
        composeWithDevTools(applyMiddleware(ReduxThunk))
    );

    return store;
}

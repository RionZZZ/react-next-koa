import React, { useState, useReducer, memo, useMemo, useCallback, useRef } from "react";

function BFunc() {
    const [name, setName] = useState("rion");
    const [count, dispatchCount] = useReducer(BReducer, 0); // 复杂变量使用reducer（对象）

    const config = useMemo(() => ({
        text: `count is ${count}`,
        color: count > 3 ? "red" : "blue"
    }), [count])

    const handleButtonClick = useCallback(() => dispatchCount({ type: "add" }), [count]);
    // const handleButtonClick = useMemo(() => () => dispatchCount({ type: "add" }), []);


    const countRef = useRef(); // {current:''} useRef每次返回同一个对象，不会创建新对象
    countRef.current = count;
    const handleAlert = () => {
        setTimeout(() => {
            // alert(count); // 闭包
            alert(countRef.current);
        }, 1000);
    }

    return (
        <div>
            <input value={name} onChange={e => setName(e.target.value)} />
            <Child
                config={config}
                onButtonClick={handleButtonClick} />
            <button onClick={handleAlert}>alert count</button>
        </div>
    )
}

function BReducer(state, action) {
    switch (action.type) {
        case "add":
            return state + 1
        case "minus":
            return state - 1
        default:
            return state
    }
}

// function Child({ onButtonClick, config }) {
const Child = memo(function Child({ onButtonClick, config }) {
    console.log("child render");
    return (
        <button onClick={onButtonClick} style={{ color: config.color }}>
            {config.text}
        </button>
    )
})

export default BFunc;

import React, { useState, useEffect, useReducer, useLayoutEffect, useContext } from "react";
import Component from "../../components/component";

import MyContext from "../../lib/my-context";

class B extends React.Component {
    state = {
        count: 0
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                count: ++this.state.count
            })
        }, 1000)
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    render() {
        return <span>{this.state.count}</span>
    }
}

// Hooks
function BFunc() {
    // const [count, setCount] = useState(0); // 返回[]，结构赋值
    const [name, setName] = useState("zya");

    const [count, dispatchCount] = useReducer(BReducer, 0); // 复杂变量使用reducer（对象）

    const context = useContext(MyContext);

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         // setCount(25);
    //         // setCount(c => ++c);
    //         dispatchCount({ type: "add" });
    //     }, 1000)
    //     return () => clearInterval(timer);
    // }, [])

    useEffect(() => {
        console.log("effect invoke");
        return () => {
            console.log("effect detect");
        }
    }, [name])

    // 比effect先执行，在dom挂载到html上去之前执行。 会卡，少用..
    useLayoutEffect(() => {
        console.log("useLayoutEffect invoke");
        return () => {
            console.log("useLayoutEffect detect");
        }
    }, [name])

    return (
        <div>
            <span>{count}</span>
            <span>{name}</span>
            <input value={name} onChange={e => setName(e.target.value)} />
            <button onClick={() => dispatchCount({ type: "add" })}>{count}</button>
            <p>{context}</p>
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

// export default B;
export default BFunc;

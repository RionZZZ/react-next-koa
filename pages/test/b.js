import React, { useState, useEffect, useReducer } from "react";
import Component from "../../components/component";

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

    useEffect(() => {
        const timer = setInterval(() => {
            // setCount(25);
            // setCount(c => ++c);
            dispatchCount({ type: "add" });
        }, 1000)
        return () => clearInterval(timer);
    }, [])

    return <span>{count}</span>
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

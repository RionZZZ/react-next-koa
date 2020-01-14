import Compontent from "../components/component";
import { withRouter } from "next/router";
import Link from "next/link";

const A = ({ router, name }) => {
    console.log(router);
    return <Link href="#abc"><button>A--{router.query.id}--{name}</button></Link>
}

A.getInitialProps = async (...args) => {
    console.log(...args)

    const promise = new Promise(resolve => {
        setTimeout(() => {
            resolve({
                name: "rion"
            })
        }, 1500)
    })

    return await promise;

    // return {
    //     name: "rion"
    // }
}

export default withRouter(A);
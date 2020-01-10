import Compontent from "../components/component";
import { withRouter } from "next/router";

const A = ({ router }) => <Compontent>A--{router.query.id}</Compontent>

export default withRouter(A);
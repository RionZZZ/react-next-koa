import Compontent from "../../components/component";
import { withRouter } from "next/router";

const B = ({ router }) => <Compontent>B--{router.query.id}</Compontent>


export default withRouter(B);

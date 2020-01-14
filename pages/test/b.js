import Component from "../../components/component";
import { withRouter } from "next/router";

const B = ({ router }) => <Component>B--{router.query.id}</Component>


export default withRouter(B);

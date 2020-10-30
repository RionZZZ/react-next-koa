import { cloneElement } from 'react';

// export default ({ children, comp: Comp }) => {
//     return <Comp style={style}>{children}</Comp>
// };

export default ({ children, renderer = <div/> }) => {
    return cloneElement(renderer, {
        style: Object.assign({}, renderer.props.style, style),
        children
    })
};


const style = {
    width: '100%',
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 20,
    paddingRight: 20
}

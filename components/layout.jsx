import Link from "next/link";
import { Button, Layout, Icon, Input, Avatar, Tooltip, Dropdown, Menu } from "antd";
import { useState, useCallback } from 'react';
import Container from './Container';
import { connect } from 'react-redux';


const { Header, Content, Footer } = Layout;

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const Comp = ({ color, children, style }) => <div style={{ color, ...style }}>{children}</div>

const userDropdown = (
    <Menu>
        <Menu.Item>
            <span>login out</span>
        </Menu.Item>
    </Menu>
)

function LayoutComp({ children, user }) {

    const [search, setSearch] = useState('');
    const searchChange = useCallback((event) => {
        setSearch(event.target.value);
    }, [setSearch])

    const onSearchClick = useCallback(() => { }, []);

    return (
        <Layout>
            <Header>
                <Container renderer={<div className="header-inner" />}>
                    <div className="header-left">
                        <div className="log">
                            <Icon type="github" style={github} />
                        </div>
                        <div>
                            <Input.Search placeholder="搜索仓库" value={search} onChange={searchChange} onSearch={onSearchClick} />
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="user">
                            {
                                user && user.id ? (
                                    <Dropdown overlay={userDropdown}>
                                        <a href="/">
                                            <Avatar size={40} src={user.avatar_url} />
                                        </a>
                                    </Dropdown>
                                ) : (
                                        <Tooltip placement="bottom" title="click to login">
                                            <a href={publicRuntimeConfig.OAUTH_URL}>
                                                <Avatar size={40} icon="user" />
                                            </a>
                                        </Tooltip>
                                    )}
                        </div>
                    </div>
                </Container>
            </Header>
            <Content style={content}>
                {/* <Container comp="div">
                    {children}
                </Container> */}
                <Container renderer={<Comp color="#f00" style={{ fontSize: 38 }} />}>
                    {children}
                </Container>
            </Content>
            <Footer style={footer}>
                Develop by Rion @ <a href="mailto:rion.z924@gmail.com">rion@gmail</a>
            </Footer>
            <style jsx>{`
                .header-inner{
                    display: flex;
                    justify-content: space-between;
                }
                .header-left{
                    display: flex;
                    align-items: center;
                }
            `}</style>
            <style jsx global>{`
                #__next{
                    height: 100%;
                }
                .ant-layout{
                    height: 100%;
                }
                .ant-layout-header{
                    padding: 0;
                }
            `}</style>
        </Layout >
    )
}

export default connect(function mapState(state) {
    return {
        user: state.userInfo,
    }
}
)(LayoutComp);

const github = {
    color: '#fff',
    fontSize: 40,
    display: 'block',
    marginRight: 20
}

const footer = {
    textAlign: 'center'
}

const content = {
    display: 'flex',
    flex: 1
}


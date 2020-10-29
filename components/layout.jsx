import Link from "next/link";
import { Button, Layout, Icon, Input, Avatar } from "antd";
import { useState, useCallback } from 'react';

const { Header, Content, Footer } = Layout;

export default ({ children }) => {

    const [search, setSearch] = useState('');
    const searchChange = useCallback((event) => {
        setSearch(event.target.value);
    }, [setSearch])

    const onSearchClick = useCallback(() => { }, []);

    return (
        <Layout>
            <Header>
                <div className="header-inner">
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
                            <Avatar size={40} icon="user" />
                        </div>
                    </div>
                </div>
            </Header>
            <Content style={content}>{children}</Content>
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
            `}</style>
        </Layout>
    )
}

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
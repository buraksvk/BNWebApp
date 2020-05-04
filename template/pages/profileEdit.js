import ProfileEditCard from '../components/profile_page_Component/ProfileEditCard';
import Header from '../components/styles/Header'
import { Component } from 'react'
import { Row, Col } from 'antd'


class profileEditPage extends Component {
    render() {
        return (
            <div>
                <Header> </Header>
                <Row>
                <Col lg={4} md={1}> 
                    </Col>
                    <Col lg={16} md={22}>
                        <ProfileEditCard />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default profileEditPage;
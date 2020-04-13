import { Card, Divider, Col, Row } from "antd";
import { Button, Input } from "antd";
import { Component } from "react";
import { List, Avatar } from "antd";
import { Star } from "react-feather";
import { getConnectionLink } from "../../lib/connector";
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/authActions";
import { bindActionCreators } from "redux";
import * as profile_viewActions from "../../redux/actions/profile_viewActions";

const data = [
  {
    title: <a href="#">Sepetim</a>
  },
  {
    title: <a href="#">Adres Bilgilerim</a>
  },
  {
    title: <a href="#">Ayarlarım</a>
  }
];

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: "",
      loaded: false
    };
  }
  componentDidMount() {
    if (this.props.profile_data == "") {
      if (this.props.currenToken != "" && this.props.currentToken != null) {
        var paramsNames = ["token"];
        var paramsValues = [this.props.currentToken];
        var obj = getConnectionLink(
          "profile",
          paramsNames,
          paramsValues,
          "POST"
        );
        this.props.actions.profilePage(obj);
        console.log(this.props.profile_data);
        console.log(this.props.currentToken);
        console.log("profil verilerini alma");
        debugger;
      }
      else
      {
        console.log("token alınmamıştır.");         
      }
    } else {
      this.setState(
        { profiles: this.props.profile_data, loaded: true },
        function() {
          console.log("state ayarlama");
        }
      );
    }
  }
  componentDidUpdate() {
    if (this.props.profile_data != "" && !this.state.loaded) {
      this.setState(
        { profiles: this.props.profile_data, loaded: true },
        function() {
          console.log(this.state.profiles);
        }
      );
    }
    console.log(this.props.currentToken);
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Card title="Profilim" style={{ marginTop: "10px" }}>
          <Row>
            <Col lg={16} md={32}>
              <Col
                lg={8}
                md={16}
                style={{ marginBottom: "50px", float: "center" }}
              >
                <img
                  src="https://www.scripturaengage.com/wp-content/uploads/2017/05/Profile-Picture-Toon-Wouters-circle-ScripturaEngage.png"
                  alt="profilelogo1"
                />
              </Col>
              <Col lg={4} md={8}></Col>
              <Col lg={12} md={24} style={{ marginTop: "10px" }}>
                <h2 style={{ marginBottom: "30px" }}>John Doe</h2>
                <p>E-Mail : johndoe@gmail.com</p>
                <p>Adres : Sallabaşı Cad. 23/4 Kadıköy/İst</p>
                <p>Posta Numarası : HASJ49FM</p>
                <p>Telefon : 0533 333 33 33</p>

                <Button type="primary" style={{ marginTop: "50px" }}>
                  BİLGİLERİ DÜZENLE
                </Button>
              </Col>
            </Col>
            <Col lg={8} md={16}>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Star size={20} strokeWidth={1} />}
                      title={<a href="https://ant.design">{item.title}</a>}
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    profile_data: state.profile_viewReducer,
    currentToken: state.authReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      profilePage: bindActionCreators(profile_viewActions.profileInformation, dispatch),
        loginUser: bindActionCreators(authActions.loginUser, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);

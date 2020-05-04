import { Card, Divider, Col, Row } from "antd";
import { Button, Input } from "antd";
import { Component } from "react";
import { List, Avatar, Dropdown } from "antd";
import { Star } from "react-feather";
import Router from "next/router";

import { getConnectionLink } from "../../lib/connector";
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/authActions";
import { bindActionCreators } from "redux";
import * as profileViewActions from "../../redux/actions/profileViewActions";

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: [],
      loaded: false,
    };
  }
  
  componentDidMount() {
    if (this.props.currentToken != "") {
      if (this.props.profile_data == "") {
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
      } else {
        this.setState(
          { profileInfo: this.props.profile_data, loaded: true },
          function() {
            console.log(this.state.profileInfo);
          }
        );
      }
    } else {
      setTimeout(() => {
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
      }, 500);
    }
  }
  componentDidUpdate() {
    console.log(this.props.currentToken);
    if (this.props.currentToken == "")
    {
      Router.push("/homepage");
    }
    if (this.props.profile_data != "" && !this.state.loaded) {
      this.setState(
        { profileInfo: this.props.profile_data, loaded: true },
        function() {
          console.log(this.state.profileInfo);
        }
      );
    }
  }
  render() {
    

    var tit = []
    tit.push("Hoşgeldin ")
    tit.push(this.state.profileInfo.user_real_name)
    console.log(tit);
    return (
      <div>
        <Card 
        title={tit}  style={{ marginTop: "10px", padding: "7px"}}>
          <Row>
            <Col lg={6} md={12}>
              <div className="text-center mb-4">
                <Avatar src="/static/images/avatar.jpg" size={180} />
              </div>
            </Col>
            <Col lg={1} md={2}></Col>
            <Col lg={11} md={22} style={{ marginTop: "10px" }}>
              <h2 style={{ marginBottom: "30px" }}>
                {this.state.profileInfo.user_real_name}{" "}
                {this.state.profileInfo.user_surname}
              </h2>
              <p>E-Mail : {this.state.profileInfo.user_mail}</p>
              <p>Telefon : {this.state.profileInfo.user_phone}</p>
              <Col md={24} lg={24}></Col>
              <Button 
              href="/profileEdit" 
              type="primary">
                BİLGİLERİ DÜZENLE

              </Button>
              </Col>
          </Row>
        </Card>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    profile_data: state.profileViewReducer,
    currentToken: state.authReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      profilePage: bindActionCreators( profileViewActions.ProfileInformation,
        dispatch
      ),
      loginUser: bindActionCreators(authActions.loginUser, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);




import {
    AutoComplete,
    Button,
    Col,
    Form,
    Input,
    Row,
    Select,
    Card
  } from 'antd';
  import PropTypes from "prop-types";
  import { getConnectionLink } from "../../lib/connector";
  import { connect } from "react-redux";
  import * as authActions from "../../redux/actions/authActions";
  import { bindActionCreators } from "redux";
  import * as profileEditActions from '../../redux/actions/profileEditActions'
  import * as profileViewActions from '../../redux/actions/profileViewActions'
  
  
  const FormItem = Form.Item;
  const Option = Select.Option;
  const AutoCompleteOption = AutoComplete.Option;
  const ProductForm = Form.create()(
    
    class  extends React.Component {
      constructor(props) {
          super(props);
          this.state = {
              profile:"",
              loaded: false,
          };
      }
      componentDidMount() {
          if (this.props.profile_data == "") {
              var paramsNames = [];
              var paramsValues = [];
              var obj = getConnectionLink(
                  "profileEdit",
                  paramsNames,
                  paramsValues,
                  "PUT"
              );
              this.props.actions.putProfileEdit(obj);
              console.log(this.props.profile_data);
              this.props.profile_data;
          }
          else {
              this.setState({ profile: this.props.profile_data, loaded: true }, function () {
                  console.log(this.state.profile);
              });
          }
      }
      componentDidUpdate() {
        console.log(this.props.profile_data)

          if (this.props.profile_data != "" && !this.state.loaded) {
              
            this.setState({loaded: true }, function () {
              

              });
          }
      }
     
      
   
    
      handleSubmit = e => {
          e.preventDefault();
          this.props.form.validateFieldsAndScroll((err, values) => {
              if (!err) {
                var paramsNames = ["name", "surname", "email", "phone", "img", "imgDesc","token"];
                var paramsValues = [name.values, surname.value, email.value, phone.value,this.props.currentToken];
                console.log(this.props.currentToken);
                var obj = getConnectionLink("addproduct", paramsNames, paramsValues, "POST");
                this.props.productAddPage(obj);
              }
          });
      };
    
      render() {

          const { getFieldDecorator } = this.props.form;
          const { autoCompleteResult } = this.state;
      
          const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 }
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 }
            }
          };
          const formItemSelectLayout = {
              labelCol: {
                xs: { span: 24 },
                sm: { span: 10 }
              },
              wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 }
              }
            };
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0
              },
              sm: {
                span: 16,
                offset: 8
              }
            }
          };
          const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86'
          })(
            <Select style={{ width: 70 }}>
              <Option value="86">+86</Option>
              <Option value="87">+87</Option>
            </Select>
          );
          return (
                        <div>
                          {this.props.profil.user_mail}
                          <Card title="PROFİL DÜZENLEME" >
                              <Row>
                              <Col lg={4} md={1}>

                            
                              </Col>
                                  <Col lg={16} md={22}>
                                      <Form onSubmit={this.handleSubmit}>
                                          <FormItem label="İsim:" {...formItemLayout} hasFeedback>
                                              {getFieldDecorator('name', {
                                                  rules: [
                                                      {
                                                          required: true,
                                                          message: "İsim boş bırakılamaz"
                                                      }
                                                  ]
                                              })( <Input placeholder="İsim giriniz." />)}
                                          </FormItem>
                                          <FormItem label="Soyisim:" {...formItemLayout} >
                                              {getFieldDecorator('surname', {
                                                  rules: [
                                                      {
                                                          required: true,
                                                          message: "Soyisim boş bırakılamaz"
                                                      }
                                                  ]
                                              })(<Input placeholder="Soyisim giriniz." />)}
                                          </FormItem>
                                          <FormItem label="E-mail:" {...formItemLayout} >
                                              {getFieldDecorator('email', {
                                                  rules: [
                                                      {
                                                          required: true,
                                                          message: "E-mail boş bırakılamaz"
                                                      }
                                                  ]
                                              })(<Input placeholder={this.props.profil.user_mail} />)}
                                          </FormItem>
                                          <FormItem label="phone:" {...formItemLayout} >
                                              {getFieldDecorator('proPrice', {
                                                  rules: [
                                                      {
                                                          required: true,
                                                          message: "Telefon Numarası boş bırakılamaz"
                                                      }
                                                  ]
                                              })(<Input placeholder="Telefon Numarası giriniz." />)}
                                          </FormItem>
                                          <FormItem {...tailFormItemLayout}>
                                              <Button type="primary" htmlType="submit" > Ürün Ekle </Button>
                                          </FormItem>
                                      </Form>
                                  </Col>
                              </Row>
                          </Card>
                      </div>
          );
      }
    }
  )
  
  class ProfileEditCard extends React.Component{
    render(){
      return(
      <ProductForm
        putProfileEdit = {this.props.actions.putProfileEdit}
        currentToken = {this.props.currentToken}
        profil = {this.props.profil}
      >
        
      </ProductForm>);
      }
  }
  
  function mapStateToProps(state) {
    return {
        profile_data : state.profileEditReducer,
        currentToken: state.authReducer,
        profil: state.profileViewReducer
    };
  }
  function mapDispatchToProps(dispatch) {
    return {
        actions: {
            putProfileEdit: bindActionCreators(profileEditActions.putProfileEdit, dispatch),
            profilePage: bindActionCreators(profileViewActions.ProfileInformation, dispatch),
        }
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditCard);
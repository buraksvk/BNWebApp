import Header from '../../components/styles/Header'
import { Component } from 'react'
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
  import * as ShoppingActions from '../../redux/actions/ShoppingActions'
  import * as cartActions from '../../redux/actions/cartActions'




function handleChange(value) {
  console.log(`selected ${value}`);
}

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const ProductForm = Form.create()(
  class  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart:"",
            loaded: false,
        };
    }
    componentDidMount() {
        if (this.props.cart_data == "") {
            var paramsNames = [];
            var paramsValues = [];
            var obj = getConnectionLink(
                "profileEdit",
                paramsNames,
                paramsValues,
                "POST"
            );
            this.props.actions.cartAddPage(obj);
            console.log(this.props.cart_data);
            this.props.cart_data;
        }
        else {
            this.setState({ cart: this.props.cart_data, loaded: true }, function () {
                console.log(this.state.cart);
            });
        }
    }
    componentDidUpdate() {
      console.log(this.props.cart_data)

        if (this.props.cart_data != "" && !this.state.loaded) {
            
          this.setState({loaded: true }, function () {
            

            });
        }
    }
   
    
 
  
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
              var paramsNames = ["name", "address", "nation", "city", "post_code", "card_number","card_name","card_month","card_year","ccv"];
              var paramsValues = [name.values, address.value, values.nation,values.city,post_code.value,card_number.value,card_name.value,values.card_month,values.card_year,ccv.value];
              console.log(name.values, address.value, values.nation,values.city,post_code.value,card_number.value,card_name.value,values.card_month,values.card_year,ccv.value);
            //   var obj = getConnectionLink("shoppingPage", paramsNames, paramsValues, "POST");
            //   this.props.productAddPage(obj);
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
            <Header></Header>

            <h1 style={{textAlign:'center', marginBottom:'40px'}}>SEPETİ ONAYLA</h1>
            <Card bodyStyle={{ padding: '20px' }} style={{ marginBottom:'20px'}}>
            <Form onSubmit={this.handleSubmit}>
            <Row gutter={16} id="components-button-demo">
                <Col lg={8} md={16}>
                   
                        <h3 style={{ marginBottom:'20px', textAlign:'center'}}>Fatura Bilgileri</h3>
                        
                                        <FormItem label="İsim Soyisim:" {...formItemLayout} hasFeedback>
                                            {getFieldDecorator('name', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "İsim boş bırakılamaz"
                                                    }
                                                ]
                                            })( <Input style={{ marginBottom:'20px'}} placeholder="İsim " />)}
                                        </FormItem>
                        
                                        <FormItem label="Adres:" {...formItemLayout} hasFeedback>
                                            {getFieldDecorator('address', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Adres boş bırakılamaz"
                                                    }
                                                ]
                                            })( <Input style={{ marginBottom:'20px'}} placeholder="Adres" />)}
                                        </FormItem>
                                        <FormItem label="Ülke:" {...formItemLayout} hasFeedback>
                                            {getFieldDecorator('nation', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Ülke boş bırakılamaz"
                                                    }
                                                ]
                                            })( <Select defaultValue="türkiye" style={{ marginBottom:'20px' }} onChange={handleChange}>
                                            <Option value="türkiye">Türkiye</Option>
                                            <Option value="amaringa">Amaringa</Option>
                                            <Option value="ruskisuka">Ruski Suka</Option>
                                            </Select>)}
                                        </FormItem>
                            
                        
                        
                            <FormItem label="Şehir:" {...formItemLayout} hasFeedback>
                                            {getFieldDecorator('city', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Şehir boş bırakılamaz"
                                                    }
                                                ]
                                            })( <Select defaultValue="istanbul" style={{ marginBottom:'20px' }} onChange={handleChange}>
                                            <Option value="istanbul">İstanbul</Option>
                                            <Option value="ankara">Ankara</Option>
                                            <Option value="izmir">İzmir</Option>
                                            </Select>)}
                                        </FormItem>
                            
                            
                           
                            <FormItem label="Posta Kodu:" {...formItemLayout} hasFeedback>
                                            {getFieldDecorator('post_code', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Posta Kodu boş bırakılamaz"
                                                    }
                                                ]
                                            })( <Input style={{ marginBottom:'20px'}} placeholder="Posta Kodu" />)}
                                        </FormItem>
                    
                </Col>
                <Col lg={8} md={16}>

                    <h3 style={{ marginBottom:'20px', textAlign:'center'}}>Kart Bilgileri</h3>
                    <FormItem label="Kart No:" {...formItemLayout} hasFeedback>
                                            {getFieldDecorator('card_number', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Kart Numarası boş bırakılamaz"
                                                    }
                                                ]
                                            })( <Input style={{ marginBottom:'20px'}} placeholder="Kart Numarası " />)}
                                        </FormItem>
                    
                                        <FormItem label="Karttaki İsim:" {...formItemLayout} hasFeedback>
                                            {getFieldDecorator('card_name', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Kart Üzerindeki İsim boş bırakılamaz"
                                                    }
                                                ]
                                            })(<Input style={{ marginBottom:'20px'}} placeholder="Kart Üzerindeki İsim " />)}
                                        </FormItem>

                            <FormItem label="Son Ay:" {...formItemLayout} hasFeedback>
                                            {getFieldDecorator('card_month', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Ay boş bırakılamaz"
                                                    }
                                                ]
                                            })( 
                                            <Select defaultValue="05" style={{ marginBottom:'20px' }} onChange={handleChange}>
                                            <Option value="05">05</Option>
                                            <Option value="06">06</Option>
                                            <Option value="07">07</Option>
                                            </Select>)}
                                        </FormItem>
                        
                            <FormItem label="Son Yıl:" {...formItemLayout} hasFeedback>
                                            {getFieldDecorator('card_year', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Yıl boş bırakılamaz"
                                                    }
                                                ]
                                            })( 
                                                <Select defaultValue="21" style={{ marginBottom:'20px' }} onChange={handleChange}>
                                                <Option value="21">21</Option>
                                                <Option value="22">22</Option>
                                                <Option value="23">23</Option>
                                                </Select>)}
                                        </FormItem>
                        
                        <FormItem label="CCV:" {...formItemLayout} hasFeedback>
                                            {getFieldDecorator('ccv', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "CCV boş bırakılamaz"
                                                    }
                                                ]
                                            })(<Input style={{ marginBottom:'20px'}} placeholder="CCV " />)}
                                        </FormItem>
                    
                    
                    
                </Col>
                <Col style={{textAlign:'center'}} lg={8} md={16}>
                    <h3 style={{ marginBottom:'20px'}}>Sepet</h3>
                    <Card bodyStyle={{ padding: '20px' }} style={{ marginBottom:'20px'}}>
                    Tasma - 99.99
                    </Card>
                    <Card bodyStyle={{ padding: '20px' }} style={{ marginBottom:'20px'}}>
                    Tasma - 99.99
                    </Card>
                    <Card bodyStyle={{ padding: '20px' }} style={{ marginBottom:'20px'}}>
                    Bileklik - 99.99
                    </Card>
                </Col>
            </Row>
            <Row style={{ marginTop:'200px'}}>
                <Col lg={3} md={16}>
                <h3>Ödeme Tutarı: </h3>
                </Col>
                <Col lg={2} md={16}>
                <h1>1299</h1>
                </Col>
                <Col lg={3} md={16}>
                <h5>TL </h5>
                </Col>
                <Col lg={3} md={16}>
                
                </Col>
                


            </Row>
            <div style={{textAlign:'right'}}>
                <Button type="primary">SEPETi ONAYLA</Button>
                </div>
        </Form>
        </Card>
        </div>
  
  
    );
    }
    }
    )

class CartsAdd extends React.Component{
render(){
return(
<ProductForm
removeFromCart = {this.props.actions.removeFromCart}
currentToken = {this.props.currentToken}
>

</ProductForm>);
}
}

function mapStateToProps(state) {
return {
cart_data: state.cartReducer,
currentToken: state.authReducer
};
}
function mapDispatchToProps(dispatch) {
return {
actions: {
    removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
}
};
}
export default connect(mapStateToProps, mapDispatchToProps)(CartsAdd);

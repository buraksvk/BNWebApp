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
import * as productAddActions from '../../redux/actions/productAddActions'



const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const ProductForm = Form.create()(
  class  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            device:"",
            loaded: false,
        };
    }
    componentDidMount() {
        if (this.props.device_data == "") {
            var paramsNames = [];
            var paramsValues = [];
            var obj = getConnectionLink(
                "product",
                paramsNames,
                paramsValues,
                "POST"
            );
            this.props.actions.productAddPage(obj);
            console.log(this.props.product_data);
            this.props.product_data;
        }
        else {
            this.setState({ products: this.props.product_data, loaded: true }, function () {
                console.log(this.state.products);
            });
        }
    }
    componentDidUpdate() {
        if (this.props.product_data != "" && !this.state.loaded) {
            this.setState({ devices: this.props.product_data, loaded: true }, function () {
                console.log(this.state.products);
  
            });
        }
    }
   
    
 
  
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
              var paramsNames = ["proType", "proDes", "proName", "proPrice","token"];
              var paramsValues = [values.proType, proDes.value, proName.value, proPrice.value,this.props.currentToken];
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
                        <Card title="ÜRÜN EKLE" >
                            <Row>
                                <Col sm={16}>
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormItem label="Ürün Tipi:" {...formItemLayout} hasFeedback>
                                            {getFieldDecorator('proType', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Ürün Tipi boş bırakılamaz"
                                                    }
                                                ]
                                            })( <Select name="proType" placeholder="Ürün Tipini Seçiniz." >
                                            <Option value="1">Tasma</Option>
                                            <Option value="2">Bileklik</Option>
                                            <Option value="3">Anahtarlık</Option>
                                            <Option value="4">Kalemlik</Option>
                                          </Select>)}
                                        </FormItem>
                                        <FormItem label="Ürün Açıklaması:" {...formItemLayout} >
                                            {getFieldDecorator('proDes', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Ürün Açıklaması boş bırakılamaz"
                                                    }
                                                ]
                                            })(<Input placeholder="Ürün Açıklamasını giriniz." />)}
                                        </FormItem>
                                        <FormItem label="Ürün İsmi:" {...formItemLayout} >
                                            {getFieldDecorator('proName', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Ürün İsmi boş bırakılamaz"
                                                    }
                                                ]
                                            })(<Input placeholder="Ürün İsmini giriniz." />)}
                                        </FormItem>
                                        <FormItem label="Ürün Fiyatı:" {...formItemLayout} >
                                            {getFieldDecorator('proPrice', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Ürün Fiyatı boş bırakılamaz"
                                                    }
                                                ]
                                            })(<Input placeholder="Ürün Fiyatını giriniz." />)}
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

class ProductsAdd extends React.Component{
  render(){
    return(
    <ProductForm
      productAddPage = {this.props.actions.productAddPage}
      currentToken = {this.props.currentToken}
    >
      
    </ProductForm>);
    }
}

function mapStateToProps(state) {
  return {
      device_data: state.productAddReducer,
      currentToken: state.authReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
      actions: {
        productAddPage: bindActionCreators(productAddActions.productAddPage, dispatch),
      }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsAdd);
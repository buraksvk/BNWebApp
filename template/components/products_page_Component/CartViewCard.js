import React, { Component } from "react";
import PropTypes from "prop-types";

import { Button, Col, Input, Card, Row } from "antd";

//importlar
import { getConnectionLink } from "../../lib/connector";
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/authActions";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import * as cartActions from "../../redux/actions/cartActions";
import { Alert } from 'antd';

const { Meta } = Card;

// function ProductList(props) {
//   const numbers = props.numbers;
//   const listItems = numbers.map((number) =>
//     <li key={number.toString()}>
//       {number}
//     </li>
//   );
//   return (
//     <ul>{listItems}</ul>
//   );
// }

class CartViewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loaded: false
    };
  }
  componentDidMount() {
    if (this.props.product_data == "") {
      var paramsNames = [];
      var paramsValues = [];
      var obj = getConnectionLink(
        "products",
        paramsNames,
        paramsValues,
        "POST"
      );
      this.props.actions.ProductPage(obj);
      console.log(this.props.product_data);
      this.props.product_data;
    } else {
      this.setState(
        { products: this.props.product_data, loaded: true },
        function() {
          console.log(this.state.products);
        }
      );
    }
  }
  addToCart = (product) => {
      this.props.actions.addToCart({quantity:1,product})
      console.log( product.product_name," eklendi");
      
      
  }
  renderEmpty(){
      return(
          <div>
              <Card>
                  <h2>Sepetiniz Boş !</h2>
              </Card>
          </div>
      );

  }
  renderSummary(){
    return(
        <div>
           {this.props.cart.map(CartItem=>(

             <h2> ürün </h2>
           ))}
        </div>
    );

}
//   componentDidUpdate() {
//     if (this.props.product_data != "" && !this.state.loaded) {
//       this.setState(
//         { products: this.props.product_data, loaded: true },
//         function() {
//           console.log(this.state.products);
//         }
//       );
//     }
//   }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    
    // if (this.state.products != []) {
    //   this.state.products.forEach(product => {
    //     productlist.push(
    //       <div key={product.product_id}>
    //         <Col lg={6} md={12} style={{ margin: 5 }}>
    //           <Card bodyStyle={{ padding: 5 }} style={{ marginBottom: "20px" }}>
    //             <div float="center">
    //               <Card
    //                 cover={
    //                   <img
    //                     alt="example"
    //                     src="https://www.patidogclub.com/wp-content/uploads/2017/12/yavru-kopekler-icin-tasma-egitimi.jpg"
    //                   />
    //                 }
    //                 actions={[
    //                   <Button onClick={()=>this.addToCart(product)} type="primary" block>
    //                     Sepete Ekle
    //                   </Button>
    //                 ]}
    //               >
    //                 <Meta
    //                   style={{ textAlign: "center" }}
    //                   title={product.product_description}
    //                   description={product.product_name}
    //                 />
    //                 <br></br>
    //                 <div className="price-container">
    //                   <h2>${product.product_price}</h2>
    //                 </div>
    //               </Card>
    //             </div>
    //           </Card>
    //         </Col>
    //       </div>
    //     );
    //   });
    // } else {
    //   productlist = "Yükleniyor.";
    // }

    return (
      <div>
        { this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer
    
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
    }
  };
}
//actions aldik

export default connect(mapStateToProps, mapDispatchToProps)(CartViewCard);
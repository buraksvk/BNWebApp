import Header from "../components/styles/Header";
import { Card, Col, Row, Form } from "antd";
import { Component } from "react";
import CartViewCard from "../components/products_page_Component/CartViewCard";

class cartView extends Component {
  render() {
    return (
      <div>
        <CartViewCard />
      </div>
    );
  }
}

export default cartView;
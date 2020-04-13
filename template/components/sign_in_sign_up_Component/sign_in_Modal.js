import React, { Component } from "react";
import { Button, Form, Input, Modal, Radio, Tabs } from "antd";
import { Eye, Mail, Triangle, User } from "react-feather";
import Link from "next/link";
import Sing from "./signup";
import Router from "next/router";
import md5 from "md5";
import { getConnectionLink }from '../../lib/connector'

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const UserModal = Form.create()(
  class extends React.Component {
    submit(err) {
      if (!err) {
        var paramsNames = ["email", "password"];
        //console.log(this.state.email)
        var hash = md5(password.value);
        console.log(hash);
        var paramsValues = [email.value, hash];
        //console.log(email.value);
        var obj = getConnectionLink("login", paramsNames, paramsValues, "POST");
        this.props.loginUser(obj);
        //location.reload()
        //Router.push("/iletisim")
      }
    }

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          footer={null}
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Kullanıcı Girişi" key="1">
              <Form
                layout="vertical"
                onSubmit={e => {
                  e.preventDefault();
                  form.validateFields((err, values) => this.submit(err));
                }}
              >
                <FormItem label="Email">
                  {form.getFieldDecorator("email", {
                    rules: [
                      {
                        type: "email",
                        message: "The input is not valid E-mail!"
                      },
                      {
                        required: true,
                        message: "Please input your E-mail!"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Mail
                          size={16}
                          strokeWidth={1}
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="email"
                      placeholder="Email"
                      onChange={e => {
                        this.setState({ [e.target.name]: e.target.value });
                      }}
                    />
                  )}
                </FormItem>

                <FormItem label="Password">
                  {form.getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Password!"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Eye
                          size={16}
                          strokeWidth={1}
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                      onChange={e => {
                        this.setState({ [e.target.name]: e.target.value });
                      }}
                    />
                  )}
                </FormItem>

                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className="mt-3"
                  >
                    Log in
                  </Button>
                </FormItem>
              </Form>
            </TabPane>
            <TabPane tab="Kayıt Ol" key="2">
              <Sing />
            </TabPane>
          </Tabs>
        </Modal>
      );
    }
  }
);
export default UserModal;

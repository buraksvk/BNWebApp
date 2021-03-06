import { Modal, Button } from 'antd';

class App extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Button onClick={this.showModal}>Open Modal</Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some conasdsasadadstents...</p>
          <p>Some consadasadsadtents...</p>
          <p>Soasdsaddsadsa.</p>
        </Modal>
      </div>
    );
  }
}

export default App;
/*<style>
.ant-modal p {
  margin: 0;
}
</style>*/

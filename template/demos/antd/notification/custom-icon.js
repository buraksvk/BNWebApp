import { Button, notification, Icon } from 'antd';

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    icon: <Icon type="smile" style={{ color: '#108ee9' }} />
  });
};

const Component = () => (
  <Button onClick={openNotification}>Open the notification box</Button>
);
export default Component;

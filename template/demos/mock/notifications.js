import { Avatar } from 'antd';
import { MessageCircle } from 'react-feather';

export default [
  {
    title: 'John Doe launched a new application',
    description: '1 hour ago',
    avatar: (
      <Avatar
        size="large"
        style={{
          color: 'rgb(34, 245, 0)',
          backgroundColor: 'rgb(207, 253, 219)'
        }}
      >
        <MessageCircle size={24} strokeWidth={1} />
      </Avatar>
    )
  },
 
  
  
];

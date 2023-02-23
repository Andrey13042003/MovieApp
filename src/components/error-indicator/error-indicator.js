import { Alert, Space } from 'antd';
import { Offline, Online } from 'react-detect-offline';

const ErrorIndicator = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Online>
        <Alert
          message="BOOM!"
          description="We apologize, but we can't find anything on this query. Please, update the page and try again!"
          type="error"
          showIcon
        />
      </Online>
      <Offline>
        <Alert message="BOOM!" description="You've some problems with the internet connection!" type="error" showIcon />
      </Offline>
    </Space>
  );
};

export default ErrorIndicator;

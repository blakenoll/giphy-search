import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { SearchBar } from './components/SearchBar'
import './App.css';

const { Header, Content } = Layout;
const { Text } = Typography

// initialize react-query client
const queryClient = new QueryClient()

function App() {
  return (
    // Provide  queryClient to App
    <QueryClientProvider client={queryClient}>
      <Layout className="App">
        <Header>
          <Row justify='center'>
            <Text style={{ fontSize: '20px' }}>Giphy Search</Text>
          </Row>
        </Header>
        <Content>
          <br />
          <SearchBar />
        </Content>
      </Layout>
    </QueryClientProvider>

  );
}

export default App;

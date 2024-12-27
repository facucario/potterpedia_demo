import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, Card, Spin, Alert, Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3002/characters')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Layout className="layout">
      <Header>
        <h1 style={{ textAlign: 'center', color: 'white', margin: 0}}>Potterpedia</h1>
      </Header>
      <Content style={{ padding: '50px 50px' }}>
        <div className="site-layout-content">
          {loading && (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <Spin size="large" />
            </div>
          )}

          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              style={{ marginBottom: '20px' }}
            />
          )}

          {!loading && !error && (
            <Row gutter={[16, 16]}>
              {data.slice(0, 21).map((item) => (
                <Col span={8} key={item.id}>
                  <Card
                    title={item.name}
                    bordered={false}
                    hoverable
                    style={{ width: '100%', padding: 0 }}
                  >
                    <ul>
                      <li><strong>House:</strong> {item.house || 'Unknown'}</li>
                      <li><strong>Ancestry:</strong> {item.ancestry || 'Unknown'}</li>
                      <li><strong>Gender:</strong> {item.gender || 'Unknown'}</li>
                      <li><strong>Species:</strong> {item.species || 'Unknown'}</li>
                      <li><strong>Wizard:</strong> {item.wizard ? 'Yes' : 'No'}</li>
                      <li><strong>Alive:</strong> {item.alive ? 'Yes' : 'No'}</li>
                      <li><strong>Hogwarts Student:</strong> {item.hogwartsStudent ? 'Yes' : 'No'}</li>
                      <li><strong>Hogwarts Staff:</strong> {item.hogwartsStaff ? 'Yes' : 'No'}</li>
                      <li><strong>Eye Colour:</strong> {item.eyeColour || 'Unknown'}</li>
                      <li><strong>Hair Colour:</strong> {item.hairColour || 'Unknown'}</li>
                      <li><strong>Patronus:</strong> {item.patronus || 'None'}</li>
                      <li>
                        <strong>Wand:</strong> 
                        {item.wand.length || item.wand.core || item.wand.wood 
                          ? ` ${item.wand.length || 'Unknown length'}, ${item.wand.wood || 'Unknown wood'}, ${item.wand.core || 'Unknown core'}`
                          : 'None'}
                      </li>
                      <li><strong>Year of Birth:</strong> {item.yearOfBirth || 'Unknown'}</li>
                      <li><strong>Date of Birth:</strong> {item.dateOfBirth || 'Unknown'}</li>
                    </ul>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        © 2024
      </Footer>
    </Layout>
  );
};

export default App;
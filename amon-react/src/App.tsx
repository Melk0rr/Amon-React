import React from 'react'

// CSS imports
import './css/theme.css'
import './css/App.css'

// Local resources imports
import logo from './img/amon-react.svg'

// Component imports
import { Button, Switch, Slider, Card, Flex } from 'components'
const { Row, Col } = Flex

/**
 * Main component rendering the AmonReact application
 * @returns 
 */
const App: React.FC = () => (
  <div className="App">
    <h1 className="AmonReact-main-title">Amon<img src={logo} className="AmonReact-logo-min" alt="R" />eact</h1>

    <section className="component-demo">
      <h2 className="section-title">Components list</h2>
      <Row className="component-list" wrap justify="start" align="stretch">
        <Col className="component-col" justify="stretch">
          <Card title="Button" className="component-display" hoverable>
            <p><Button>Default button</Button></p>
            <p><Button shape="round">Round button</Button></p>
            <p><Button shape="round" icon="search">Icon button</Button></p>
          </Card>
        </Col>

        <Col className="component-col" justify="stretch">
          <Card title="Switch" className="component-display" hoverable>
            <p><Switch /></p>
            <p><Switch size="small" /></p>
          </Card>
        </Col>

        <Col className="component-col" justify="stretch">
          <Card title="Slider" className="component-display" hoverable>
            <Slider min={0} max={100} />
            <Slider range min={0} max={100} />
          </Card>
        </Col>
      </Row>
    </section>
  </div>
)

export default App

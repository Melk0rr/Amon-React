import React from 'react'

// CSS imports
import './css/theme.css'
import './css/App.css'

// Local resources imports
import logo from './img/amon-react.svg'

// Component imports
import { Button, Switch, Slider, Card } from 'components'

/**
 * Main component rendering the AmonReact application
 * @returns 
 */
const App: React.FC = () => (
  <div className="App">
    <h1 className="AmonReact-main-title">Amon<img src={logo} className="AmonReact-logo-min" alt="R" />eact</h1>

    <section className="component-demo">
      <h2 className="section-title">Components list</h2>
      <div className="component-list">
        <Card title="Button" hoverable>
          <p><Button>Default button</Button></p>
          <p><Button shape="round">Round button</Button></p>
          <p><Button shape="round" icon="search">Icon button</Button></p>
        </Card>

        <Card title="Switch" hoverable>
          <p><Switch /></p>
          <p><Switch size="small" /></p>
        </Card>

        <Card title="Slider" hoverable>
          <Slider min={0} max={100} />
        </Card>
      </div>
    </section>
  </div>
)

export default App

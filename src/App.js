import React, { useState } from 'react'
import { Inputs } from './components/Inputs'
import { Outputs } from './components/Outputs'
import { PayloadGenerator } from './components/PayloadGenerator'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Jumbotron, Row, Col, Button, Card } from 'react-bootstrap'
import { getProratedAmounts } from './services/Prorate'

const App = () => {
  const [allocationAmount, setAllocationAmount] = useState('')
  const [proratedAmounts, setProratedAmounts] = useState({})
  const [investors, setInvestors] = useState([])
  const preparePayload = () => {
    const alloc = parseFloat(allocationAmount)

    if (Number.isNaN(allocationAmount)) {
      alert('Please specify correct allocation amount')
      return
    }

    return {
      allocation_amount: alloc,
      investor_amounts: investors,
    }
  }
  const handleClick = async () => {
    const payload = preparePayload()
    const response = await getProratedAmounts(payload)
    setProratedAmounts(response)
  }
  const addInvestor = (investor) => {
    setInvestors([...investors, investor])
  }
  const resetData = () => {
    setAllocationAmount('')
    setProratedAmounts({})
    setInvestors([])
  }
  return (
    <Container className="p-3">
      <Row>
        <Col>
          <h1 className="header">Welcome to Prorator demo app</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Jumbotron>
            <PayloadGenerator
              onAllocationAmount={setAllocationAmount}
              onAddInvestor={addInvestor}
            />
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col>
          <Inputs investors={investors} />
        </Col>
        <Col>
          <Outputs proratedAmounts={proratedAmounts} />
        </Col>
      </Row>
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <Button onClick={handleClick}>Generate Prorated Amounts</Button>
            </Col>
            <Col>
              <Button variant="outline-primary" onClick={resetData}>
                Reset
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default App

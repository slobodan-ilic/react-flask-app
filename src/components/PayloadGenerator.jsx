import React, { useState } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const PayloadGenerator = ({ onAllocationAmount, onAddInvestor }) => {
  const [invName, setInvName] = useState('')
  const [requestedAmount, setRequestedAmount] = useState('')
  const [averageAmount, setAverageAmount] = useState('')

  const addInvestor = () => {
    const requested_amount = parseFloat(requestedAmount)
    const average_amount = parseFloat(averageAmount)

    if (invName === '') {
      alert('Must specify name.')
      return
    }
    if (Number.isNaN(requested_amount)) {
      alert('Please specify correct requested amount.')
      return
    }
    if (Number.isNaN(average_amount)) {
      alert('Please specify correct average amount.')
      return
    }

    const newInvestor = {
      name: invName,
      requested_amount: requested_amount,
      average_amount: average_amount,
    }

    // Update state with newly added investor
    onAddInvestor(newInvestor)

    // Clean state for adding (potential) next investor
    setInvName('')
    setRequestedAmount('')
    setAverageAmount('')
  }

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Label>Total Allocation Amount</Form.Label>
              <Form.Control
                placeholder="Enter Total Allocation Amount"
                onInput={(e) => onAllocationAmount(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Row>
        </Form.Group>

        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                placeholder="Enter Investor's First Name"
                value={invName}
                onInput={(e) => setInvName(e.target.value)}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Label>Requested Amount</Form.Label>
              <Form.Control
                placeholder="Enter Requested Amount"
                value={requestedAmount}
                onInput={(e) => setRequestedAmount(e.target.value)}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Label>Average Amount</Form.Label>
              <Form.Control
                placeholder="Enter Average Amount"
                value={averageAmount}
                onInput={(e) => setAverageAmount(e.target.value)}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Label>Add Investor to list</Form.Label>
              <Button variant="outline-primary" onClick={addInvestor}>
                Add Investor to list
              </Button>
            </Col>
          </Form.Row>
        </Form.Group>
      </Form>
    </div>
  )
}

export { PayloadGenerator }

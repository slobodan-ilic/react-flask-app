import React from 'react'
import { Table } from 'react-bootstrap'

const Outputs = ({ proratedAmounts }) => {
  return (
    <div>
      <h5>Prorated Amounts:</h5>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Prorated Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(proratedAmounts).map((el, ind) => {
            return (
              <tr key={ind}>
                <td>{ind}</td>
                <td>{el[0]}</td>
                <td>{el[1].toFixed(2)}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export { Outputs }

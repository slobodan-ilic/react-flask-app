import React, { useState } from 'react'
import { getProratedAmounts } from '../services/Prorate'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const Inputs = ({ investors }) => {
  return (
    <div>
      <div>
        <h5>List of investors:</h5>
        <Table bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Requested Amount</th>
              <th>Average Amount</th>
            </tr>
          </thead>
          <tbody>
            {investors.map((el, ind) => {
              return (
                <tr key={ind}>
                  <td>{ind}</td>
                  <td>{el.name}</td>
                  <td>{el.requested_amount}</td>
                  <td>{el.average_amount}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export { Inputs }

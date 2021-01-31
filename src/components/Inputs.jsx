import React, { useState } from 'react'
import { getProratedAmounts } from '../services/Prorate'

const Inputs = () => {
  const [proratedAmounts, setProratedAmounts] = useState({})
  const [alloc, setAlloc] = useState()
  const [investors, setInvestors] = useState([])
  const [invName, setInvName] = useState()
  const [requested, setRequested] = useState()
  const [average, setAverage] = useState()

  const preparePayload = () => {
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

  const addInvestor = () => {
    const newInvestor = {
      name: invName,
      requested_amount: requested,
      average_amount: average,
    }

    // Update state with newly added investor
    setInvestors([...investors, newInvestor])

    // Clean state for adding (potential) next investor
    setInvName('')
    setRequested('')
    setAverage('')
  }

  return (
    <div>
      <div>
        <label>Total Allocation Amount:</label>
        <input
          value={alloc}
          onInput={(e) => setAlloc(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <p>Investors:</p>
        <ol>
          {investors.map((el, ind) => {
            return (
              <div key={ind}>
                {el.name} - Requested: {el.requested_amount} (average:{' '}
                {el.average_amount})
              </div>
            )
          })}
        </ol>
      </div>
      <div>
        <label>Add Investor:</label>
        <input value={invName} onInput={(e) => setInvName(e.target.value)} />
        <input
          value={requested}
          onInput={(e) => setRequested(parseFloat(e.target.value))}
        />
        <input
          value={average}
          onInput={(e) => setAverage(parseFloat(e.target.value))}
        />
        <button onClick={addInvestor}>Add</button>
      </div>
      <button onClick={handleClick}>Prorate</button>
      <p>Outputs:</p>
      <ol>
        {Object.entries(proratedAmounts).map((el) => {
          return (
            <div>
              {el[0]} - Prorated amount: {el[1]}
            </div>
          )
        })}
      </ol>
    </div>
  )
}

export { Inputs }

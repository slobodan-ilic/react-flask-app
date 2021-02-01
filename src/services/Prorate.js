const getProratedAmounts = async (testPayload) => {
  try {
    const response = await fetch('http://localhost:3000/prorate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    })
    console.log(response)
    return response.json()
  } catch (err) {
    console.error(err)
  }
}

export { getProratedAmounts }

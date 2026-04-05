const axios = require('axios')

describe('JSONPlaceholder API tests', () => {
  
  test('GET all posts returns array', async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.data)).toBe(true)
  })

  test('GET single post returns object', async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts/1')
    expect(res.status).toBe(200)
    expect(res.data.id).toBe(1)
  })

 
  test('POST create post works', async () => {
    const res = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'Lab4',
      body: 'Testing API',
      userId: 1
    })
    expect(res.status).toBe(201)
    expect(res.data.title).toBe('Lab4')
  })


  test('PUT update post works', async () => {
    const res = await axios.put('https://jsonplaceholder.typicode.com/posts/1', {
      id: 1,
      title: 'Updated',
      body: 'Updated body',
      userId: 1
    })
    expect(res.status).toBe(200)
    expect(res.data.title).toBe('Updated')
  })

  test('DELETE post works', async () => {
    const res = await axios.delete('https://jsonplaceholder.typicode.com/posts/1')
    expect(res.status).toBe(200)
  })
})

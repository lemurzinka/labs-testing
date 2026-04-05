import axios from 'axios'

async function testGet() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    console.log(response.data.slice(0, 3)) 
  } catch (error) {
    console.error(error)
  }
}

testGet()

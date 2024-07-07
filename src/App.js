import { useState } from 'react'
import Products from './Products'
import Loading from './Loading'
import './App.css'

function App() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [isLoading, setIsLoading]  = useState(false)
  const YOUR_APP_ID = 'effa6c15'
  const YOUR_APP_KEY ='e84771fd3cec0aa4bec594bbf736fd0b'

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = async (e) => {
    console.log(search)
    e.preventDefault()
    setIsLoading(true);
    
    try{
      const response = await fetch(
        `https://api.edamam.com/search?q=${search}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=30&calories=591-722&health=alcohol-free`
      );
      const data = await response.json();
      setData(data.hits);
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <>
    <center></center>
      <h1>Food Reciepe App</h1>
      <form onSubmit={handleSubmit}>
        <input type = 'text' value= {search} onChange={handleSearch}/><br/>
        <input type = 'submit' className='submit' value = 'Search'  onChange={handleSubmit}/>
      </form>
      {isLoading ? <Loading/> : 
      data.length >= 1 ? <Products data={data}/> : null }

      <center/>
    </>
  )
}

export default App

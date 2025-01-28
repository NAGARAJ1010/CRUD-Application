import './App.css'

function App() {
  return (
    <>
      <div className='container'>
        <h1>CRUD Application</h1>        
        <div className="input-search">
          <input type="search" />
          <button>Add</button>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Nagaraj</td>
              <td>23</td>
              <td>Chennai</td>
              <td><button>Edit</button></td>
              <td><button>Delete</button></td>
            </tr>

            <tr>
              <td>2</td>
              <td>Nagaraj</td>
              <td>23</td>
              <td>Chennai</td>
              <td><button>Edit</button></td>
              <td><button>Delete</button></td>
            </tr>

            <tr>
              <td>3</td>
              <td>Nagaraj</td>
              <td>23</td>
              <td>Chennai</td>
              <td><button>Edit</button></td>
              <td><button>Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App

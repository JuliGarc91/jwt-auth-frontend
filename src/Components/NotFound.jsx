import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className='not-found'>
      <h1>
        Error 404: Page Not Found
      </h1>
      <button>
      <Link to="/dashboard">Back to Dashboard</Link>
      </button>
    </div>
  )
}

export default NotFound;
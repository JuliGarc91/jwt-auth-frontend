import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className='not-found'>
      <img src='https://res.cloudinary.com/dwygxzqku/image/upload/v1713547342/Garden%20Nook/error-404.jpg' alt='sad-flower'/>
      <h1>
        Error 404: Page Not Found
      </h1>
      <button>
      <Link to="/dashboard">Back to Dashboard</Link>
      </button>
      <button>
      <Link to="/">Back to Home</Link>
      </button>
    </div>
  )
}

export default NotFound;
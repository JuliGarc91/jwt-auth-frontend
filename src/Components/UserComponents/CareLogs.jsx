import { useState, useEffect } from 'react';
import { Link, useOutletContext } from "react-router-dom";

const CareLogs = () => {
    const { user } = useOutletContext(); // access logged in user details such as id and username
  return (
    <div>CareLogs</div>
  )
}

export default CareLogs;
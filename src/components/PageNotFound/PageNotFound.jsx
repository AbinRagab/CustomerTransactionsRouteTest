import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PageNotFound() {
  const navto = useNavigate()

  useEffect(function(){
    navto('/customer')
  },[])
  return (
    <div>PageNotFound</div>
  )
}

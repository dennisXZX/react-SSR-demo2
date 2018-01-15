import React from 'react'

const NotFoundPage = ({ staticContext = {} }) => {

  // indicate an user has landed on an erroneous route
  staticContext.notFound = true;

  return (
    <div>
      Route not found.
    </div>
  )
}

export default {
  component: NotFoundPage
}

import React from 'react'

const Layout = ({children, className=""}) => {
  return (
    <div className={`w-full inline-block z-0 bg-light p-4 sm:p-8 md:p-16 lg:p-32 dark:bg-dark ${className}`}>
        {children}
    </div>
  )
}

export default Layout
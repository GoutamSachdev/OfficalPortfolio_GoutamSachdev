import React from 'react'

const Layout = ({children, className=""}) => {
  return (
    <div className={`w-full z-0 bg-light text-dark p-4 sm:p-8 md:p-12 lg:p-20 dark:bg-dark dark:text-light ${className}`}>
        {children}
    </div>
  )
}

export default Layout
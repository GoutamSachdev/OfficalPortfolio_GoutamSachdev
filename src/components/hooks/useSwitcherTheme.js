import React, { useEffect, useState } from 'react'

const useSwitcherTheme = () => {
  const perfersDarkQuery = "(prefers-color-scheme: dark)";

  const [mode, setMode] = useState("")

  useEffect(() => {
    const mediaQuery = window.matchMedia(perfersDarkQuery)
    const userPref = window.localStorage.getItem("theme")

    const applyMode = (check) => {
      setMode(check)
      if (check === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }

    const handleChange = () => {
      if (userPref) {
        applyMode(userPref === "dark" ? "dark" : "light")
      } else {
        applyMode(mediaQuery.matches ? "dark" : "light")
      }
    }

    // resolve once on mount so mode isn't left empty on first load
    handleChange()

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    if (mode === "dark") {
      window.localStorage.setItem("theme", "dark")
      document.documentElement.classList.add("dark")
    } else if (mode === "light") {
      window.localStorage.setItem("theme", "light")
      document.documentElement.classList.remove("dark")
    }
  }, [mode])

  return [mode, setMode]
}

export default useSwitcherTheme
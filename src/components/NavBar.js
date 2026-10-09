import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Logo from '@/components/Logo'
import { GithubIcon, LinkedInIcon, SunIcon, MoonIcon } from './Icon'
import { AnimatePresence, motion } from "framer-motion"
import SocialButton from './SocialButton'
import useSwitcherTheme from './hooks/useSwitcherTheme'

const CustomLink = ({ href, title, className = "" }) => {
  const router = useRouter();
  const active = router.asPath === href;
  return (
    <Link href={href} className={`${className} relative group`} aria-current={active ? "page" : undefined}>
      {title}
      <span className={`h-[1px] inline-block bg-dark
        absolute left-0 -bottom-0.5
        group-hover:w-full
        transition-[width] ease duration-300
        ${active ? 'w-full' : 'w-0'} dark:bg-light`}>
        &nbsp;
      </span>
    </Link>
  );
}

const CustomMobileLink = ({ href, title, className = "", close }) => {
  const router = useRouter();
  const active = router.asPath === href;

  return (
    <Link
      href={href}
      onClick={close}
      aria-current={active ? "page" : undefined}
      className={`${className} relative group text-dark dark:text-light my-3 text-2xl`}
    >
      {title}
      <span className={`h-[1px] inline-block bg-dark
        absolute left-0 -bottom-0.5
        group-hover:w-full
        transition-[width] ease duration-300
        ${active ? 'w-full' : 'w-0'} dark:bg-light`}>
        &nbsp;
      </span>
    </Link>
  );
}

const ThemeToggle = ({ mode, setMode, className = "" }) => (
  <button
    onClick={() => setMode(mode === "dark" ? "light" : "dark")}
    aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
    className={`relative flex items-center justify-center rounded-full p-1 transition-colors duration-300
      after:absolute after:-inset-1.5 after:rounded-full after:content-['']
      ${mode === "light" ? "bg-dark text-light" : "bg-light text-dark"} ${className}`}
  >
    {mode === "dark"
      ? <SunIcon className="fill-yellow-500" />
      : <MoonIcon className="fill-dark" />}
  </button>
)

const NavBar = () => {
  const [mode, setMode] = useSwitcherTheme();
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((o) => !o);

  // Lock body scroll + trap focus while the mobile menu is open.
  useEffect(() => {
    if (!isOpen) return;
    const { body } = document;
    const originalOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    // focus the overlay container so keyboard users land inside it
    const t = setTimeout(() => {
      const firstLink = overlayRef.current?.querySelector("a, button");
      firstLink?.focus();
    }, 50);

    const onKey = (e) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "Tab" && overlayRef.current) {
        const focusables = overlayRef.current.querySelectorAll(
          'a[href], button:not([disabled])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      body.style.overflow = originalOverflow;
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <header className='w-full px-4 sm:px-8 md:px-16 lg:px-20 py-6 font-medium flex items-center justify-between dark:text-light relative z-40'>

      {/* Hamburger button - mobile only. Sized to a 44x44 touch target; the
          negative margin keeps the bars optically aligned with the page gutter. */}
      <button
        onClick={toggle}
        className="flex flex-col justify-center items-center lg:hidden z-50 w-11 h-11 -ml-2.5"
        aria-label="Toggle Menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm
          ${isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-0.5'}`} />
        <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5
          ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
        <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm
          ${isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-0.5'}`} />
      </button>

      {/* Desktop Nav */}
      <div className='w-full hidden lg:flex justify-between items-center'>
        <nav aria-label='Primary' className='flex items-center'>
          <CustomLink href='/' title="Home" className='mr-4' />
          <CustomLink href='/about' title="About" className='mx-4' />
          <CustomLink href='/projects' title="Projects" className='mx-4' />
          <CustomLink href='/skills' title="Skills" className='mx-4' />
          <CustomLink href='/articles' title="Articles" className='mx-4' />
          <CustomLink href='/contact' title="Contact" className='ml-4' />
        </nav>

        <nav className='flex items-center justify-center flex-wrap' aria-label='Social and theme'>
          <SocialButton href='https://github.com/GoutamSachdev' label='GitHub' size='sm' className='mx-1.5'>
            <GithubIcon />
          </SocialButton>
          <SocialButton href='https://www.linkedin.com/in/goutam-sachdev-978435190/' label='LinkedIn' size='sm' className='mx-1.5'>
            <LinkedInIcon />
          </SocialButton>
          <ThemeToggle mode={mode} setMode={setMode} className="ml-3" />
        </nav>
      </div>

      {/* Logo centered — hidden on mobile to avoid colliding with the hamburger */}
      <div className='absolute left-[50%] top-2 -translate-x-1/2 hidden lg:block'>
        <Logo />
      </div>

      {/* Mobile Menu — full-screen dialog */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="fixed inset-0 bg-dark/60 dark:bg-black/70 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.nav
              key="menu"
              ref={overlayRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className='fixed inset-0 z-50 flex flex-col
              bg-light dark:bg-dark lg:hidden'
            >
              <button
                ref={closeBtnRef}
                onClick={close}
                aria-label="Close menu"
                className="absolute top-6 right-6 flex items-center justify-center w-10 h-10
                rounded-full border border-solid border-line dark:border-lineDark"
              >
                <span className="relative block w-5 h-5">
                  <span className="absolute top-1/2 left-0 w-5 h-0.5 bg-dark dark:bg-light rotate-45 -translate-y-1/2" />
                  <span className="absolute top-1/2 left-0 w-5 h-0.5 bg-dark dark:bg-light -rotate-45 -translate-y-1/2" />
                </span>
              </button>

              {/* Scrolls rather than clipping when the viewport is short — every
                  landscape phone. `m-auto` centres the block when there is room
                  and still lets it scroll when there isn't; `justify-center`
                  would cut the top off once the content overflowed. */}
              <div className='flex flex-1 flex-col items-center overflow-y-auto px-6 py-20'>
                <div className='m-auto flex flex-col items-center'>
                  <div className='flex flex-col items-center justify-center'>
                    <CustomMobileLink href='/' title="Home" close={close} />
                    <CustomMobileLink href='/about' title="About" close={close} />
                    <CustomMobileLink href='/projects' title="Projects" close={close} />
                    <CustomMobileLink href='/skills' title="Skills" close={close} />
                    <CustomMobileLink href='/articles' title="Articles" close={close} />
                    <CustomMobileLink href='/contact' title="Contact" close={close} />
                  </div>

                  <div className='flex items-center justify-center flex-wrap mt-8 gap-3'>
                    <SocialButton href='https://github.com/GoutamSachdev' label='GitHub' size='md'>
                      <GithubIcon />
                    </SocialButton>
                    <SocialButton href='https://www.linkedin.com/in/goutam-sachdev-978435190/' label='LinkedIn' size='md'>
                      <LinkedInIcon />
                    </SocialButton>
                    <ThemeToggle mode={mode} setMode={setMode} className="ml-1 rounded-full border border-solid border-line dark:border-lineDark" />
                  </div>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

export default NavBar
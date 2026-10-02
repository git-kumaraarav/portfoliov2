"use client"

import { Button }  from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'
import {cn} from '@/lib/utils'
import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faChartGantt,
  faCode,
  faTrophy,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import React from "react";

const Themes = ['indigo', 'paper', 'midnight', 'mono', 'sunset'];

function NavButton({ children, href}: { children?: React.ReactNode; href: string}) {
  return (
    <Link href={href} className="px-2 py-1 rounded-lg flex flex-row items-center gap-1
    hover:bg-accent/20 transition-all duration-300">
      {children}
    </Link>
  )
}

NavButton.logo = ({children} : {children?:React.ReactNode}) => {
  const [theme, setTheme] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

  const CycleTheme = () => {
    setTheme((theme) => (theme + 1) % Themes.length);
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    // get theme
    if (savedTheme) {
      setTheme(parseInt(savedTheme));
      setLoaded(true);
    }

  }, []); 


  useEffect( () => {
    if (!loaded) return;
    // update and save
    document.documentElement.setAttribute('data-theme', Themes[theme]);
    localStorage.setItem('theme', theme.toString());
  }, [theme]);


  return <div className="flex flex-row items-center gap-1">
        <Link href="#" onClick={() => { CycleTheme(); }} data-theme={Themes[theme]} className="flex flex-row items-center gap-1">
        <div className="w-10 h-10 flex item-center rounded-xl ring-1 ring-accent/50 hover:ring-accent/80 transition-all duration-300  ">
          <Image src={`/logos/cat${theme+1}.svg`} alt="Aarav" width={50} height={50} className="rounded-[20%]" />
        </div>
          <div className="hidden md:block">@kumaraarav</div>
        </Link>
      </div>  
}

NavButton.text = ({children} : {children?:React.ReactNode}) => {
  return <div className="hidden lg:block">{children}</div>
}

NavButton.icon = ({children} : {children?:React.ReactNode}) => {
  return <div className="">{children}</div>
}

const sections = {
  "Experiences": faBriefcase, "Projects" : faChartGantt, "Skills": faCode, "Certifications": faTrophy, "Me": faUser
}


function Navbar({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-row justify-between px-4 py-3 w-full max-w-6xl bg-primary rounded-xl mx-auto my-2', 
      "shadow-lg shadow-surface/50", 
    className)}>
      {/* Logo */}
      <NavButton.logo></NavButton.logo>

      {/* Navigation Links */}
      <div className="flex flex-row gap-4 items-center">
          {Object.entries(sections).map(([key, Icon], i) => 
          <NavButton href={`#${key.toLowerCase()}`} key={i}>
            <NavButton.icon><FontAwesomeIcon icon={Icon}/></NavButton.icon>
            <NavButton.text>{key}</NavButton.text>
          </NavButton>
           )} 
      </div>  
    </div>
  )}

export default Navbar
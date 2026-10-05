"use client"
import Image from 'next/image'
import Link from 'next/link'
import {cn} from '@/lib/utils'
import { useEffect } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBriefcase,
  faChartGantt,
  faCode,
  faTrophy,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import info from './Info.json'
import React from "react";

const Themes = [ "pickle", "ocean", "cassette", "matcha", "lemon", "arcade", "sunset", "mono", "indigo", "paper", "midnight" ]

function NavButton({ children, href}: { children?: React.ReactNode; href: string}) {
  return (
    <Link href={href} className="px-2 py-1 rounded-lg flex flex-row items-center gap-1
    hover:bg-accent/20 transition-all duration-300">
      {children}
    </Link>
  )
}

NavButton.logo = ({children} : {children?:React.ReactNode}) => {
  const [theme, setTheme] = React.useState(4);
  const [loaded, setLoaded] = React.useState(false);
  const [hasClickedTheme, setHasClickedTheme] = React.useState(false);
  const [showThemeTooltip, setShowThemeTooltip] = React.useState(false);

  const CycleTheme = () => {
    setHasClickedTheme(true);
    localStorage.setItem('theme-tooltip-dismissed', 'true');
    setTheme((theme) => (theme + 1) % Themes.length);
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedThemeIndex = savedTheme === null ? NaN : Number.parseInt(savedTheme, 10);
    const hasDismissedTooltip = localStorage.getItem('theme-tooltip-dismissed') === 'true';

    if (Number.isInteger(savedThemeIndex) && savedThemeIndex >= 0 && savedThemeIndex < Themes.length) {
      setTheme(savedThemeIndex);
    }
    setHasClickedTheme(hasDismissedTooltip);
    setLoaded(true);
  }, []); 


  useEffect( () => {
    if (!loaded) return;
    document.documentElement.setAttribute('data-theme', Themes[theme]);
    localStorage.setItem('theme', theme.toString());
  }, [loaded, theme]);

  useEffect(() => {
    if (!loaded || hasClickedTheme) return;

    const timer = window.setTimeout(() => {
      setShowThemeTooltip(true);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [loaded, hasClickedTheme]);

  const cats = [1, 2, 3, 4, 5]
  return <div className="flex flex-row items-center gap-1">
        <button
          type="button"
          onClick={CycleTheme}
          data-theme={Themes[theme]}
          aria-label="Change theme"
          className="flex flex-row items-center gap-1 hover:cursor-pointer"

        >
        <div className="w-10 h-10 flex item-center rounded-xl ring-2  ring-accent/50 hover:ring-accent/80 transition-all duration-300">

        <Tooltip open={showThemeTooltip && !hasClickedTheme}>
          <TooltipTrigger>
            <Image src={`/logos/cat${cats[theme % cats.length]}.svg`} alt="Aarav" width={50} height={50} className="rounded-[20%] hover:cursor-pointer " />
          </TooltipTrigger>
          <TooltipContent className="bg-accent/90 text-accent-foreground transition-all duration-300">
            <p className="text-sm text-fg/80">Meeeeoooowwww, Theme?</p>
          </TooltipContent>
        </Tooltip>
        </div>
          <div className="hidden md:block">{info.basics.navbar_label}</div>
        </button>
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
    <div className={cn('flex flex-row justify-between px-4 py-3 w-full max-w-6xl rounded-xl mx-auto my-2', 
      "shadow-lg shadow-surface/50 backdrop-blur-xl", 
    className)}>
      {/* Logo */}
      <NavButton.logo></NavButton.logo>

      {/* Navigation Links */}
      <div className="flex flex-row gap-4 items-center">
          {Object.entries(sections).map(([key, Icon], i) => 
          <NavButton href={`#${key.toLowerCase()}`} key={i}>
            <NavButton.icon><FontAwesomeIcon icon={Icon} className="text-accent" /></NavButton.icon>
            <NavButton.text>{key}</NavButton.text>
          </NavButton>
           )} 
      </div>  
    </div>
  )}

export default Navbar
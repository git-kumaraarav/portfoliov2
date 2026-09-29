import { Button }  from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'

import { 
  Briefcase, 
  ChartNoAxesGantt, 
  CodeXml, 
  Mail,
  User
} from "lucide-react";

import React from "react";
import {cn} from 'cn'

function NavButton({ children, href}: { children: React.ReactNode; href: string}) {
  return (
    <Link href={href} className="p-1 rounded-lg flex flex-row items-center gap-1
    hover:bg-taupe-300/20 transition-all duration-300">
      {children}
    </Link>
  )
}

NavButton.text = ({children} : {children:React.ReactNode}) => {
  return <div className="hidden lg:block">{children}</div>
}

NavButton.icon = ({children} : {children:React.ReactNode}) => {
  return <div className="">{children}</div>
}

const sections = {
  "Experience": Briefcase, "Projects" : ChartNoAxesGantt, "Skills": CodeXml, "Contact": Mail, "Me": User
}

function Navbar({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-row justify-between px-4 py-3 w-full max-w-6xl bg-primary rounded-xl mx-auto my-2', className)}>
      {/* Logo */}
      <div className="flex flex-row items-center gap-1 p">
        <Image src="/cat2.webp" alt="Aarav" width={30} height={30} className="rounded-[20%]" />
        <div className="hidden md:block">@kumaraarav</div>
      </div>  

      {/* Navigation Links */}
      <div className="flex flex-row gap-4 items-center">
          {Object.entries(sections).map(([key, Icon], i) => 
          <NavButton href="#experiences" key={i}>
            <NavButton.icon><Icon/></NavButton.icon>
            <NavButton.text>{key}</NavButton.text>
          </NavButton>
           )} 
      </div>  
    </div>
  )}

export default Navbar
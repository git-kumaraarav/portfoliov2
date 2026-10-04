import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils' // Updated import path for cn utility
import { Button } from '@/components/ui/button'
import { 
  faLinkedin, 
  faGithub, 
  faTwitter, 
  faInstagram 
}  from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import info from './Info.json'

interface SocialItem {
  url: string
  icon: typeof faLinkedin 
}

const Socials: Record<string, SocialItem> = {
  Linkedin: { url: info.basics.profiles.linkedin, icon: faLinkedin},
  Github: { url: info.basics.profiles.github, icon: faGithub },
  Twitter: { url: info.basics.profiles.x, icon: faTwitter },
  Leetcode: { url: info.basics.profiles.leetcode, icon: faGithub },
}

export default function About({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 max-w-xl mx-auto items-start", className)}>
      <div className="flex flex-row gap-4 max-w-xl p-3">
        <Image 
          src="/profile.jpg" 
          alt={`${info.basics.name}`} 
          width={100} 
          height={100} 
          className="rounded-lg object-cover"
        />
        <div className="flex gap-1 flex-col">
          <h1 className="text-4xl font-medium">{info.basics.name}</h1>
          <h2 className="text-lg text-muted-foreground">{info.basics.title}</h2>

          {/* Socials */}
          <div className="flex flex-row gap-2 mt-2">
            {Object.entries(Socials).map(([name, { url, icon }]) => (
              <div key={name}>
                <Link href={url} target="_blank" rel="noopener noreferrer"> 
                  <Button size="icon" variant="outline" aria-label={name} className="hover:bg-accent/20 hover:text-accent transition-all duration-300 hover:cursor-pointer">
                    <FontAwesomeIcon icon={icon}  className=""/>
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-3">
        <p className="text-muted-foreground text-pretty">
          {info.basics.description}
        </p> 
        <div className="my-2"></div>
        <p className="text-muted-foreground">
          Connect with me on socials like <Link href={info.basics.profiles.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent font-medium">LinkedIn</Link> and <Link href={info.basics.profiles.x} target="_blank" rel="noopener noreferrer" className="text-accent font-medium">X (formerly Twitter)</Link>
        </p> 
      </div>
    </div>
  )
}
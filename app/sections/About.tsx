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

interface SocialItem {
  url: string
  icon: typeof faLinkedin 
}

const Socials: Record<string, SocialItem> = {
  Linkedin: { url: "https://www.linkedin.com/in/kumaraarav/", icon: faLinkedin},
  Github: { url: "https://github.com/git-kumaraarav", icon: faGithub },
  Twitter: { url: "https://twitter.com/kumaraaravX", icon: faTwitter },
  Leetcode: { url: "https://leetcode.com/leet-kumaraarav", icon: faGithub },
}

export default function About({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 max-w-xl mx-auto items-start", className)}>
      <div className="flex flex-row gap-4 max-w-xl p-3">
        <Image 
          src="/profile.jpg" 
          alt="Aarav Kumar" 
          width={100} 
          height={100} 
          className="rounded-lg object-cover"
        />
        <div className="flex gap-1 flex-col">
          <h1 className="text-4xl font-medium">Aarav Kumar</h1>
          <h2 className="text-lg text-muted-foreground">Software Developer</h2>

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
          Hi, 👋 I am Aarav, a software developer. I love to build things and explore new technologies.
          I am currently working as a Freelancer building Fullstack and Mobile applications for clients. 
        </p> 
        <div className="my-2"></div>
        <p className="text-muted-foreground">
          Connect with me on socials like <span className="text-accent font-medium">X (formerly Twitter)</span> and <span className="text-accent font-medium">LinkedIn</span>.
        </p> 
      </div>
    </div>
  )
}
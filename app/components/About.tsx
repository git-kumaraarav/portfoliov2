import React from 'react'
import Image from 'next/image'
import { cn } from 'cn'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import { 
    FaLinkedin, 
    FaGithub, 
    FaTwitter, 
    FaCode, 
    FaInstagram

} from 'react-icons/fa6'

const Socials = {
    "Linkedin": ["https://www.linkedin.com/in/kumaraarav/", <FaLinkedin />],
    "Github": ["https://github.com/git-kumaraarav", <FaGithub />],
    "Twitter": ["https://twitter.com/kumaraaravX", <FaTwitter />],
    "Leetcode": ["https://leetcode.com/leet-kumaraarav", <FaCode />],
    "X": ["https://twitter.com/kumaraaravX", <FaTwitter />]
}

function About({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 max-w-xl mx-auto items-start", className)}>
        <div className="flex flex-row gap-4 max-w-xl p-3">
            <Image src="/profile.jpg" alt="About Me" width={100} height={100} className="rounded-lg "></Image>
            <div className="flex gap-1 flex-col">
                <h1 className="text-4xl text-medium">Aarav Kumar</h1>
                <h2 className="text-lg text-muted-foreground">Software Developer</h2>

                {/* Socials */}
                <div className="flex flex-row justify-between">
                    {Object.entries(Socials).map(([name, [url, icon]], index) => (
                        <div className="">
                            <Link href={url} key={index} > 
                                <Button>
                                    {icon}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="flex flex-col gap-2 p-3">
            <p className="text-lg text-muted-foreground">
                Hi, <span>hi_icon</span> I am Aarav, a software developer. I love to build things and explore things.
                I am currently working as Freelancer. I build Fullstack and Mobile applications for clients. 
            </p> 
            <div className="m-3"></div>
            <p className="text-lg text-muted-foreground">
                Hi, <span>hi_icon</span> Connect me on socials <span>X</span>(formely Twitter) and <span>Linkedin</span> 
            </p> 
        </div>
        
    </div>

  )
}

export default About;
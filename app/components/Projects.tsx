import React from 'react'
import Info from './Info.json'
import {cn} from '@/lib/utils'
import YoutubeEmbed from './VideoFrame'

import {
    Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface ProjectsProps {
    className?: string;
    id?: string;
    selectedIndex?: number;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }

export default function Projects({className, id, selectedIndex = 0, open, onOpenChange}: ProjectsProps) {
    const projects = Info.projects
    const project = projects[selectedIndex] ?? projects[0]

    return (
        <div>
            <h2 className="p-4 text-3xl font-bold">Projects</h2>
            <ProjectCard className={cn(`flex flex-col gap-2 p-4 rounded-xl`, className)}>
                <ProjectCard.title className=''>{project.name}</ProjectCard.title>
                <ProjectCard.description className=''>{project.description}</ProjectCard.description>
                <YoutubeEmbed videoId={project.video} className='rounded-lg w-full ring-1 ring-taupe-300/20'/>
            </ProjectCard>
        </div>
    )
}

function ProjectCard({children, className}:{children?: React.ReactNode, className?: string}){
    return (<div className={cn("", className)}>
        {children} 
    </div>)
}

ProjectCard.title = ({className, children}:{className?: string, children?: React.ReactNode}) => {
return (
<div className={cn('text-lg font-bold', className)}>{children}</div>
) 
}

ProjectCard.description = ({className, children}:{className?: string, children?: React.ReactNode}) => {
return (
    <div className={cn('text-sm text-muted-foreground', className)}>{children}</div>
) 
}



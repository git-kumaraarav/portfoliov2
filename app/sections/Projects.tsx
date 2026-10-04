import React from 'react'
import Info from './Info.json'
import {cn} from '@/lib/utils'
import YoutubeEmbed from './VideoFrame'
import {
    faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";  
import { Separator } from '@/components/ui/separator';

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
            <ProjectCard className={cn(`flex flex-col gap-2`, className)}>
                <div className='flex flex-row gap-2 items-center hover:cursor-pointer'>
                    <ProjectCard.title className='text-xl text-accent'>{project.name}</ProjectCard.title>
                    <div className="flex flex-wrap gap-2">
                        {project.source && (
                            <a
                                href={project.source}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 rounded-xl px-2 py-1 text-xs text-secondary hover:ring-1  ring-secondary/70 transition-colors hover:bg-secondary/20"
                            >
                                Source
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                            </a>
                        )}

                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 rounded-xl px-2 py-1 text-xs text-secondary hover:ring-1 ring-secondary/70 transition-colors hover:bg-secondary/20"
                            >
                                <span
                                    aria-hidden="true"
                                    className="size-2 rounded-full bg-secondary animate-pulse"
                                />
                                Live site
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                            </a>
                        )}
                    </div>
                </div>
                <Separator className="my-2 h-px w-full bg-secondary/10" />
                <ProjectCard.description className='text-balance text-sm text-fg/70'>{project.description}</ProjectCard.description>
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
<div className={cn('text-lg font-bold', className)}>
    {children}
    
    </div>
) 
}

ProjectCard.description = ({className, children}:{className?: string, children?: React.ReactNode}) => {
return (
    <div className={cn('text-sm text-muted-foreground', className)}>{children}</div>
) 
}

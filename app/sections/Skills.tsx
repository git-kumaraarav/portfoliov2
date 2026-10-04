import React from "react";
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import Info from './Info.json';
import {Button} from "@/components/ui/button";
import CardLayout from "../components/Cardlayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faCode } from "@fortawesome/free-solid-svg-icons";
import { Separator } from "@base-ui/react";
import Image from "next/image"; 

type applications = {
    context?: string;
    description?: string;
    link?: string;
    source?: string;
  };

type SkillCategory = {
    category: string;
    technologies: string[];
    applications: Array<applications>;
};

type Project = {
  name: string;
  link?: string;
  source?: string;
};

const Skills = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  const skillsApplied = (Info as { skillsApplied: SkillCategory[] }).skillsApplied;

  return (
    <div className={cn('flex flex-row p-4 gap-1 flex-wrap justify-center items-center', className)}>
        { 
           skillsApplied.map((category) => {
            return (
                <CardLayout className="relative flex flex-col rounded-xl border border-accent/20 bg-surface/20 w-fit " key={category.category}>
                    <h2 className="text-lg text-accent">{category.category}</h2>
                    <Separator className="my-2 h-px w-full bg-secondary/10" />
                    <div className="flex flex-row flex-wrap gap-2 justify-between ">
                    { category.technologies.map((tech, index) => {
                        return (
                            <Skill category={category} tech={tech} index={index} key={`${tech}-${index}`}/>
                        )
                    })}
                    </div>
                </CardLayout>
            )}) 
        }
    </div>
  );
};







const Skill = ({category, tech, index, className, children}:
    {category: {"category": string, "technologies": string[], "applications": Array<applications>}, tech: string,
    index: number, className?: string, children?: React.ReactNode}) => {
    const apps = category.applications 
return (
    <HoverCard key={`${tech}-${index}`}>
                        <HoverCardTrigger className="flex rounded-2xl border border-accent bg-accent/25 px-3 py-2 text-sm font-medium text-foreground transition text-fg hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-fg hover:cursor-pointer">
                            {tech}
                        </HoverCardTrigger>
                        <HoverCardContent side="top" align="start" className="max-w-xs">
                            {
                                apps.map((app, index) => (
                                    <CardLayout className="hover:cursor-pointer hover:bg-accent/20 transition-all duration-300" key={`${tech}-${index}`}>
                                        <div className="space-y-1" key={index}>
                                            <p className="font-medium text-foreground">{app.context}</p>
                                            {app?.description ? (
                                                <p className="text-xs text-muted-foreground">{app.description}</p>
                                            ) : null}
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {app?.link ? (
                                                    <a
                                                        href={app.link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1 rounded-xl px-2 py-1 text-xs text-secondary hover:ring-1  ring-secondary/70 transition-colors hover:bg-secondary/20"
                                                    >
                                                        Live site
                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                    </a>
                                                ) : null}

                                                {app?.source ? (
                                                    <a
                                                        href={app.source}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1 rounded-xl px-2 py-1 text-xs text-secondary hover:ring-1  ring-secondary/70 transition-colors hover:bg-secondary/20"
                                                    >
                                                        Source code
                                                        <FontAwesomeIcon icon={faCode} />
                                                    </a>
                                                ) : null}
                                            </div>
                                        </div>  
                                    </CardLayout>
                                ))
                            }
                        </HoverCardContent>
                    </HoverCard>
    )
}


export default Skills;
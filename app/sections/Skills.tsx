import React from "react";
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import Info from './Info.json';
import {Button} from "@/components/ui/button";
type applications = {
    context?: string;
    description?: string;
    link?: string;
  };

type SkillCategory = {
    category: string;
    technologies: string[];
    applications: Array<applications>;
};

const Skills = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  const skills = (Info as { skillsApplied: SkillCategory[] }).skillsApplied;
  const skillMap = new Map<string, applications[]>();
    for (const cat of skills) {
        for (const tech of cat.technologies) {
           skillMap.set(tech, cat.applications); 
        }
    }
  return (
    <div className={cn('flex flex-row flex-wrap p-4 gap-4', className)}>

        {
            [...skillMap].map(([skill, apps], index) => {

                return (<HoverCard key={`${skill}-${index}`}>
                    <HoverCardTrigger className="inline-flex rounded-2xl border bg-surface px-3 py-2 text-sm font-medium text-foreground transition text-fg hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-fg">
                        {skill}
                    </HoverCardTrigger>
                    <HoverCardContent side="top" align="start" className="max-w-xs">
                        {
                            apps.map((app, index) => (
                                <div className="space-y-1" key={index}>
                                    <p className="font-medium text-foreground">{app.context}</p>
                                    {app?.description ? (
                                        <p className="text-xs text-muted-foreground">{app.description}</p>
                                    ) : null}
                                </div>
                            ))
                        }
                    </HoverCardContent>
                </HoverCard>
            )})
        }
    </div>
  );
};

export default Skills;
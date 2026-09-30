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
                    <HoverCardTrigger className="inline-flex rounded-2xl border border-green-500/70 bg-background px-3 py-2 text-sm font-medium text-foreground transition hover:border-green-400">
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
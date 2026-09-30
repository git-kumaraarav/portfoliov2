import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from '@/components/reui/timeline'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import React from 'react'
import { workspaceConfigSchema } from 'shadcn/schema';
import info from './Info.json'
import { cn } from 'cn'

function TimelineWrapper ({children, step, work} : {children?: React.ReactNode | undefined, step: number, work: any}) {
  return (
    <>
      <TimelineItem step={step} className="">
        <TimelineHeader>
          <TimelineIndicator render={<FontAwesomeIcon icon={faBriefcase} />} className=""/>
          <TimelineTitle>{work.company}</TimelineTitle>
          <TimelineDate>{work.startDate} - {work.endDate}</TimelineDate>
        </TimelineHeader>
        <TimelineSeparator />
        <TimelineContent className="flex min-w-0 flex-col gap-2 break-words">
          {work.position && <div className="font-semibold">{work.position}</div>}
          {work.description && <div className="font-semibold mt-2">{work.description}</div>}
        </TimelineContent>
      </TimelineItem>
    </>
  )
}

function Experience({ className }: { className?: string }) {
  const works = info.work 
  return (
    <Timeline className={cn("mx-auto w-full min-w-0 max-w-xl wrap-break-word", className)}>
      {works.map((work, index) => (
        <TimelineWrapper key={index} work={work} step={index}></TimelineWrapper>
      )) }
    </Timeline>
  )
}

export default Experience
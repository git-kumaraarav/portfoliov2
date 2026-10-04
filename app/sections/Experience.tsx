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
import info from './Info.json'
import { cn } from 'cn'
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

function TimelineWrapper ({children, step, work} : {children?: React.ReactNode | undefined, step: number, work: any}) {
  return (
    <>
      <TimelineItem step={step} className="">
        <TimelineHeader>
          <TimelineIndicator render={<FontAwesomeIcon icon={faBriefcase} />} className="text-accent"/>
          <TimelineTitle className="text-accent">{work.company}</TimelineTitle>
          <TimelineDate className="text-fg/50 ">{work.startDate} - {work.endDate}</TimelineDate>
        </TimelineHeader>
        <TimelineSeparator />
        <TimelineContent className="flex min-w-0 flex-col gap-2 text-pretty">
          {work.position && <div className=" text-sm text-fg/50">{work.position}</div>}
          {work.description && <div className=" mt-2 text-fg/95">{work.description}</div>}
        </TimelineContent>
      </TimelineItem>
    </>
  )
}

function Experience({ className }: { className?: string }) {
  const works = info.work 
  return (
      <Timeline className={cn("mx-auto w-full min-w-0 max-w-xl wrap-break-word",  className)}>
        {works.map((work, index) => (
          <TimelineWrapper key={index} work={work} step={index+1}></TimelineWrapper>
        )) }
        <div className="text-end">
          <a href={info.resume} target="_blank" className="rounded-full p-2 text-secondary text-sm hover:ring-1 hover:ring-secondary/70 hover:bg-secondary/20">
            View Resume <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-1"/>
          </a>
        </div>
      </Timeline>
  )
}

export default Experience
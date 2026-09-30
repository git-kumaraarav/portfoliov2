"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Experience from "./components/Experience";
import info from "./components/Info.json";
import About from "./components/About";
import Projects from "./components/Projects";
import AnalogDial from "@/components/ui/projectdial";
import Skills from "./components/Skills";
import ScrollableCardStackDemo from "./components/Certifications";
import GlowCursor from "./components/Cursor";

export default function Home() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const projectNames = info.projects.map((project) => project.name);

  return (
    <>
      <Navbar className="sticky top-4 z-40 w-[95%]" />
      <GlowCursor />

      <main className="@container w-[95%] mx-auto max-w-5xl ">

        <div className="flex flex-wrap pt-40 lg:flex">
          <div id="#experiences" className="flex flex-wrap lg:flex-nowrap lg:justify-center">
            <About className="min-w-2 text-balance"/>
            <Experience className="flex flex-col"/> 
          </div>
        </div>

        <div id="projects" className="flex flex-col w-full items-center
         md:flex-row md:justify-between">
          <div className="flex gap-2 ring-1 rounded-xl p-2 flex-col h-full w-full items-center justify-around
          lg:flex-row 
          ">

              <div className="flex">
                <Projects
                  selectedIndex={activeProjectIndex}
                  open={projectDialogOpen}
                  onOpenChange={setProjectDialogOpen}
                  className="md:max-w-3xl"
                />
              </div>

              <div className="
              flex w-[60%] h-[20%] max-h-60  min-h-50 
              md:w-[30%]  lg:static lg:translate-x-0 
              ">
                <AnalogDial
                  className="w-full md:max-w-2xl "
                  projects={projectNames}
                  onActiveChange={(index) => {
                    setActiveProjectIndex(index);
                    setProjectDialogOpen(true);
                  }}
                />
            </div>

          </div>
        </div>
        <div id="skills" className="my-4 ring-1 font-bold ring-zinc-200 rounded-xl">
          <h2 className="text-3xl p-4">Skills</h2>  
          <Skills></Skills>
        </div>

        <div id="certifications" className="my-4 ring-1 font-bold ring-zinc-200 rounded-xl">
          <h2 className="text-3xl p-4">Certifications</h2>  
          <ScrollableCardStackDemo />
        </div>
        
      </main>
  </>
  );
}
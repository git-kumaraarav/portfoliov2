"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Experience from "./components/Experience";
import info from "./components/Info.json";
import About from "./components/About";
import Projects from "./components/Projects";
import AnalogDial from "@/components/ui/projectdial";

export default function Home() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const projectNames = info.projects.map((project) => project.name);

  return (
    <>
      <Navbar className="sticky top-4 z-40 w-[95%]" />

      <main className="@container w-[95%] mx-auto max-w-5xl">

        <div className="flex flex-wrap pt-40 lg:flex">
          <div className="flex flex-wrap lg:flex-nowrap lg:justify-center">
            <About className="min-w-2 text-balance"/>
            <Experience className="flex flex-col"/> 
          </div>
        </div>

        <div id="projects" className="flex flex-row h-screen items-center justify-center">
          <div className="w-full">
            <AnalogDial
              className="w-full"
              projects={projectNames}
              onActiveChange={(index) => {
                setActiveProjectIndex(index);
                setProjectDialogOpen(true);
              }}
            />
            <Projects
              selectedIndex={activeProjectIndex}
              open={projectDialogOpen}
              onOpenChange={setProjectDialogOpen}
            />
          </div>
        </div>
      </main>
  </>
  );
}
"use client";

import { useState } from "react";
import Navbar from "./sections/Navbar";
import Experience from "./sections/Experience";
import info from "./sections/Info.json";
import About from "./sections/About";
import Projects from "./sections/Projects";
import AnalogDial from "@/components/ui/projectdial";
import Skills from "./sections/Skills";
import ScrollableCardStackDemo from "./sections/Certifications";
import GlowCursor from "./sections/Cursor";
import Footer from "./sections/Footer";
import CardLayout from "./components/Cardlayout";
import SectionLayout from "./components/SectionLayout";

export default function Home() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const projectNames = info.projects.map((project) => project.name);

  return (
    <>
    {/* Navbar */}
      <Navbar className="sticky top-4 z-40 w-[95%] bg-surface" />
      <GlowCursor className="" />

      <main className="@container w-[95%] mx-auto max-w-5xl self-center ">

        {/* About and Experiences */}
        <SectionLayout className="flex flex-wrap lg:flex">
          <div id="#experiences" className=" gap-10 
          flex flex-wrap lg:flex-nowrap lg:justify-center">
            <About className="max-w-2xl text-balance"/>
            <Experience className="flex flex-col bg-surface rounded-xl p-4 "/> 
          </div>
        </SectionLayout>



        {/* Projects */}
        <SectionLayout id="projects" sectionName="Projects" className="flex w-full
         flex-col ">
            <CardLayout> 
              <div className="flex">
                <Projects
                  selectedIndex={activeProjectIndex}
                  open={projectDialogOpen}
                  onOpenChange={setProjectDialogOpen}
                  className="md:max-w-3xl "
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
          </CardLayout>
        </SectionLayout>

        <SectionLayout id="skills" sectionName="Skills">
          <CardLayout>
            <Skills className=""></Skills>
          </CardLayout>
        </SectionLayout>

        <SectionLayout id="certifications" sectionName="Certifications">
          <CardLayout> 
            <ScrollableCardStackDemo />
          </CardLayout>
        </SectionLayout>


        <Footer className="my-10 font-bold ring-zinc-200 rounded-xl" />

      </main>
  </>
  );
}
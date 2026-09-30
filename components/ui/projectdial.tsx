'use client'; 

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import {cn} from '@/lib/utils'

const ITEM_ANGLE = 22; // Degrees between each major project
const RADIUS = 280; // 3D cylinder radius in pixels
const TICKS_PER_ITEM = 10; // Number of ticks between each project
const DRAG_SENSITIVITY = 0.015; // How much drag moves the dial
const WHEEL_SENSITIVITY = 0.006; // How much scroll moves the dial
const MOMENTUM_MULTIPLIER = 8; // How far it spins after letting go

interface AnalogDialProps {
  className?: string;
  projects: string[];
  onActiveChange?: (index: number) => void;
}

export default function AnalogDial({ className, projects, onActiveChange }: AnalogDialProps) {
  const [visualOffset, setVisualOffset] = useState(0); //  
  const currentOffsetRef = useRef(0);
  const targetOffset = useRef(0);
  
  // Interaction state
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const startOffset = useRef(0);
  const velocity = useRef(0);
  const lastY = useRef(0);
  
  // Timers and loop references
  const rafId = useRef<number | null>(null);
  const physicsLoopRef = useRef<() => void>(() => {});
  const snapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastActiveIndex = useRef(0);

  const clamp = (value : number, min : number, max : number) => Math.max(min, Math.min(value, max));

  // The main physics loop: Smoothly interpolates the visual state towards the target
  const runPhysicsLoop = useCallback(() => {
    const diff = targetOffset.current - currentOffsetRef.current;
    
    // Stop the loop if we have settled on the target and aren't dragging
    if (Math.abs(diff) < 0.001 && !isDragging.current) {
      currentOffsetRef.current = targetOffset.current;
      setVisualOffset(currentOffsetRef.current);
      rafId.current = null;
      return; 
    }

    // Smooth lerp (linear interpolation)
    currentOffsetRef.current += diff * 0.15;
    setVisualOffset(currentOffsetRef.current);
    
    rafId.current = requestAnimationFrame(() => physicsLoopRef.current());
  }, []);

  const startLoopIfNeeded = useCallback(() => {
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(() => physicsLoopRef.current());
    }
  }, []);

  useEffect(() => {
    const activeIndex = clamp(Math.round(visualOffset), 0, projects.length - 1);
    if (activeIndex !== lastActiveIndex.current) {
      lastActiveIndex.current = activeIndex;
      onActiveChange?.(activeIndex);
    }
  }, [onActiveChange, projects.length, visualOffset]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Capture the pointer so events are still routed here even if the mouse leaves the element
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
    
    isDragging.current = true;
    if (snapTimeout.current !== null) {
      clearTimeout(snapTimeout.current);
    }
    // Cancel any pending snaps.
    
    const clientY = e.clientY;
    dragStartY.current = clientY;
    lastY.current = clientY;
    startOffset.current = targetOffset.current;
    velocity.current = 0;
    
    startLoopIfNeeded();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    
    const clientY = e.clientY;
    const deltaY = clientY - dragStartY.current;
    
    // Calculate velocity for momentum on release
    const stepVelocity = clientY - lastY.current;
    velocity.current = stepVelocity;
    lastY.current = clientY;
    
    let newTarget = startOffset.current - (deltaY * DRAG_SENSITIVITY);
    
    // Soft boundary resistance (elastic edge)
    if (newTarget < 0) {
      newTarget = newTarget * 0.3;
    } else if (newTarget > projects.length - 1) {
      newTarget = (projects.length - 1) + (newTarget - (projects.length - 1)) * 0.3;
    }
    
    targetOffset.current = newTarget;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }

    // Apply momentum
    let finalTarget = targetOffset.current - (velocity.current * DRAG_SENSITIVITY * MOMENTUM_MULTIPLIER);
    
    // Clamp to valid index boundaries and round to snap exactly to a project
    finalTarget = clamp(Math.round(finalTarget), 0, projects.length - 1);
    targetOffset.current = finalTarget;
    
    startLoopIfNeeded();
  };

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault(); 
    if (snapTimeout.current !== null) {
      clearTimeout(snapTimeout.current);
    }

    // Add directly to the target for smooth continuous scrolling
    targetOffset.current += (e.deltaY * WHEEL_SENSITIVITY);
    
    // Loose clamp during scroll (allows slight elastic overscroll)
    targetOffset.current = clamp(targetOffset.current, -0.5, projects.length - 0.5);
    
    startLoopIfNeeded();

    // Debounce the snap: once scrolling stops for 150ms, snap to nearest
    snapTimeout.current = setTimeout(() => {
      if (!isDragging.current) {
        targetOffset.current = clamp(Math.round(targetOffset.current), 0, projects.length - 1);
        startLoopIfNeeded();
      }
    }, 150);
  }, [projects.length, startLoopIfNeeded]);

  useEffect(() => {
    physicsLoopRef.current = runPhysicsLoop;
    const container = containerRef.current;
    if (container) {
      // passive: false is required to prevent default page scrolling while interacting with the dial
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      if (snapTimeout.current !== null) {
        clearTimeout(snapTimeout.current);
      }
      physicsLoopRef.current = () => {};
    };
  }, [handleWheel, runPhysicsLoop]);

  const handleItemClick = (index: number) => {
    // Only allow click-to-snap if we didn't just perform a drag
    if (Math.abs(velocity.current) < 2) {
      targetOffset.current = index;
      startLoopIfNeeded();
    }
  };

  const handlePrev = useCallback(() => {
    targetOffset.current = clamp(Math.round(targetOffset.current) - 1, 0, projects.length - 1);
    startLoopIfNeeded();
  }, [projects.length, startLoopIfNeeded]);

  const handleNext = useCallback(() => {
    targetOffset.current = clamp(Math.round(targetOffset.current) + 1, 0, projects.length - 1);
    startLoopIfNeeded();
  }, [projects.length, startLoopIfNeeded]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleNext();
    }
  }, [handlePrev, handleNext]);

  // Pad the ticks so the wheel looks continuous even at the very top or bottom
  const padTicks = 15; 
  const startTick = -padTicks;
  const endTick = (projects.length - 1) * TICKS_PER_ITEM + padTicks;
  const ticks = [];
  
  for (let i = startTick; i <= endTick; i++) {
    ticks.push(i);
  }

  return (
    <div className={cn("flex flex-col rounded-lg dark:bg-zinc-950 items-center justify-center font-sans text-zinc-900 dark:text-zinc-50 overflow-hidden select-none", className)}>
      
      {/* 3D Wheel Container */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-2xl h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-8 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-offset-zinc-950 rounded-xl"
        style={{ perspective: '1200px' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp} // Safely catch interruptions
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label="Project Selector Dial"
        role="region"
      >
        
        {/* Soft fading masks - standard minimalist approach */}
        {/* <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-zinc-50 via-zinc-50/80 dark:from-zinc-950 dark:via-zinc-950/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-zinc-50 via-zinc-50/80 dark:from-zinc-950 dark:via-zinc-950/80 to-transparent z-20 pointer-events-none" /> */}

        {/* 3D Transform Space */}
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d', transform: `translateZ(-${RADIUS}px)` }}
        >
          
          {ticks.map((tickIndex) => {
            // Calculate rotational angle for this specific tick
            const angle = (tickIndex / TICKS_PER_ITEM - visualOffset) * ITEM_ANGLE;
            
            // Performance: Culling elements that are rotated to the back of the cylinder
            if (Math.abs(angle) > 85) return null;

            const isMajor = tickIndex % TICKS_PER_ITEM === 0;
            const projectIndex = tickIndex / TICKS_PER_ITEM;
            
            // Check if this tick maps to a valid project
            const isValidProject = isMajor && projectIndex >= 0 && projectIndex < projects.length;
            const project = isValidProject ? projects[projectIndex] : null;
            
            // Determine active states for typography styling
            const distance = Math.abs(angle);
            const isActive = distance < (ITEM_ANGLE / 2);
            
            // Falloff logic to simulate fading out as it curves away
            const fadeOpacity = Math.max(0, 1 - (distance / 80));

            return (
              <div
                key={`tick-${tickIndex}`}
                className="absolute w-full px-8 md:px-16 top-1/2 flex items-center justify-between pointer-events-auto"
                style={{
                  transform: `rotateX(${-angle}deg) translateZ(${RADIUS}px)`,
                  transformOrigin: 'center center',
                  backfaceVisibility: 'hidden',
                  opacity: fadeOpacity,
                }}
              >
                {/* Left Analog Tick */}
                <div 
                  className={`transition-all duration-300 rounded-full ${
                    isMajor 
                      ? 'w-8 md:w-16 h-[2px] bg-zinc-800 dark:bg-zinc-200' 
                      : 'w-4 md:w-8 h-[1px] bg-zinc-300 dark:bg-zinc-700'
                  } ${isActive ? 'opacity-100' : 'opacity-30'}`}
                />

                {/* Typography Container */}
                <div className="flex-1 flex justify-center px-1">
                  {project && (
                    <button
                      onClick={() => handleItemClick(projectIndex)}
                      className={`text-xl md:text-xl  tracking-tight transition-all duration-300 focus:outline-none ${
                        isActive 
                          ? 'text-zinc-900 font-medium dark:text-zinc-50 scale-100' 
                          : 'text-zinc-600 font-light dark:text-zinc-600 scale-80 cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-400'
                      }`}
                    >
                      {project}
                    </button>
                  )}
                </div>

                {/* Right Analog Tick */}
                <div 
                  className={`transition-all duration-300 rounded-full ${
                    isMajor 
                      ? 'w-8 md:w-16 h-[2px] bg-zinc-800 dark:bg-zinc-200' 
                      : 'w-4 md:w-8  h-[1px] bg-zinc-300 dark:bg-zinc-700'
                  } ${isActive ? 'opacity-100' : 'opacity-30'}`}
                />

              </div>

            );
          })}

          {/* <StubleIndicator
            className=""
            handlePrev={handlePrev}
            handleNext={handleNext}
            visualOffset={visualOffset}
            projectCount={projects.length}
          /> */}
        </div>
      </div>
    </div>
  );
}



//  lower button controls for accessibility and subtle indicator
export function StubleIndicator({className, handlePrev, handleNext, visualOffset, projectCount}: {className?: string, handlePrev: () => void, handleNext: () => void, visualOffset: number, projectCount: number}) {
  return (
    <>
      {/* Subtle indicator and Accessible Controls */}
      <div className={cn("absolute top-[50%] left-[-40%] md:bottom-0 md:left-[35%] md:top-[120%] md:rotate-0 md:flex flex-col items-center gap-4 rotate-90", className)}>
        
        <div className="flex items-center gap-6 bg-zinc-100 dark:bg-zinc-900/50 p-2 rounded-full shadow-sm border border-zinc-200 dark:border-zinc-800/50 backdrop-blur-sm">
          <button 
            onClick={handlePrev}  
            className="p-1 text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-full bg-white dark:bg-zinc-800/50 shadow-sm"
            aria-label="Previous project"
          >
            <FontAwesomeIcon icon={faChevronUp} className="w-5 h-5" />
          </button>

          <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 tracking-widest uppercase w-16 text-center" aria-live="polite">
            {Math.round(visualOffset + 1)} / {projectCount}
          </div>

          <button 
            onClick={handleNext}
            className="p-1 text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-full bg-white dark:bg-zinc-800/50 shadow-sm"
            aria-label="Next project"
          >
            <FontAwesomeIcon icon={faChevronDown} className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  )
}

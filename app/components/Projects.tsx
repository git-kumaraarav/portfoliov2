import React from 'react'
import Info from './Info.json'
import {cn} from 'cn'
import {
    Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
        <div id={id} className={cn("flex flex-col gap-4 max-w-xl mx-auto items-start", className)}>
                <Dialog open={open} onOpenChange={onOpenChange}>
                    <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Projects</DialogTitle>
                        <DialogDescription>
                        Here are some of my projects.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-lg font-semibold">{project.name}</h3>
                            <p className="text-sm text-muted-foreground">{project.description}</p>
                        </div>
                    </div>
                    <DialogFooter>
                    </DialogFooter>
                    </DialogContent>
                </Dialog>
        </div>
    )
    }

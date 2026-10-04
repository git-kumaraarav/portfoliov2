import React from "react";
import { cn } from "@/lib/utils";
import CardLayout from "@/app/components/Cardlayout";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faLinkedin, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import info from "./Info.json";
import Image from "next/image";

const profiles = info.basics.profiles;
const contact = info.basics.contact;

const Contact = ({ className }: { className?: string }) => {
  return (
    <CardLayout
      className={cn("relative flex flex-col ", 
        className
      )}
    >
        <div className="w-fit flex flex-col gap-4 justify-start items-start">

        <div className="flex flex-col gap-2 items-start justify-start">
            <h2 className="text-lg font-bold text-accent">Contact Me</h2>
            <div className="flex gap-2 flex-wrap indent-10">
                <Link 
                    href={profiles.mail}
                    className="text-fg hover:text-accent/80"
                    target = "_blank"
                >
                    <div className="flex flex-col justify-center items-center gap-1">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span className="text-sm">{contact.email}</span>
                    </div>
                </Link>
                <Link
                    href={profiles.whatsapp}
                    className="text-fg hover:text-accent/80"
                    target = "_blank"
                >
                    <div className="flex flex-col justify-center items-center gap-1">
                        <FontAwesomeIcon icon={faWhatsapp} />
                        <span className="text-sm">{contact.phone}</span>
                    </div>
                </Link>
            </div> 

        </div>
        
        <div className="flex flex-col gap-2 justify-start items-start">
            <h2 className="text-lg font-bold text-accent ">Follow me on socials</h2>
            <div className="flex flex-wrap gap-5 indent-10">
                <Link
                    href={profiles.instagram}
                    className="text-fg hover:text-accent/80"
                    target = "_blank"
                >
                    <div className="flex flex-col justify-center items-center gap-1">
                        <FontAwesomeIcon icon={faInstagram} />
                        <span className="text-sm">{contact.instagram}</span>
                    </div>
                </Link>
                <Link
                    href={profiles.linkedin}
                    className="text-fg hover:text-accent/80"
                    target = "_blank"
                >
                    <div className="flex flex-col justify-center items-center gap-1">
                        <FontAwesomeIcon icon={faLinkedin} />
                        <span className="text-sm">{contact.linkedin}</span>
                    </div>
                </Link>
                <Link
                    href={profiles.x}
                    className="text-fg hover:text-accent/80"
                    target = "_blank"
                >
                    <div className="flex flex-col justify-center items-center gap-1">
                        <FontAwesomeIcon icon={faTwitter} />
                        <span className="text-sm">{contact.x}</span>
                    </div>
                </Link>
            </div>
        </div>
        </div>

    </CardLayout>
  )}



  export default Contact;

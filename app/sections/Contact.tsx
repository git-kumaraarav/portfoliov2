import React from "react";
import { cn } from "@/lib/utils";
import CardLayout from "@/app/components/Cardlayout";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faLinkedin, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import info from "./Info.json";

const profiles = info.basics.profiles;

const Contact = ({ className }: { className?: string }) => {
  return (
    <CardLayout
      className={cn("flex flex-col ", 
        className
      )}
    >
        <div className="w-1/3 flex flex-col gap-4 justify-start items-start">

        <div className="flex flex-col gap-2 items-start justify-start">
            <h2 className="text-lg font-bold text-accent">Contact Me</h2>
            <div className="flex gap-5  indent-2">
                <Link 
                    href={profiles.mail}
                    className="text-fg hover:text-accent/80"
                    target = "_blank"
                >
                    <FontAwesomeIcon icon={faEnvelope} />
                </Link>
                <Link
                    href={profiles.whatsapp}
                    className="text-fg hover:text-accent/80"
                    target = "_blank"
                >
                    <FontAwesomeIcon icon={faWhatsapp} />
                </Link>
            </div> 

        </div>
        
        <div className="flex flex-col gap-2 justify-start items-start">
            <h2 className="text-lg font-bold text-accent ">Follow me on socials</h2>
            <div className="flex gap-5 indent-2 ">
                <Link
                    href={profiles.instagram}
                    className="text-fg hover:text-accent/80"
                    target = "_blank"
                >
                    <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link
                    href={profiles.linkedin}
                    className="text-fg hover:text-accent/80"
                    target = "_blank"
                >
                    <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <Link
                    href={profiles.x}
                    className="text-fg hover:text-accent/80"
                    target = "_blank"
                >
                    <FontAwesomeIcon icon={faTwitter} />
                </Link>
            </div>
        </div>
        </div>

    </CardLayout>
  )}

  export default Contact;

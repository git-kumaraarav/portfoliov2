import { cn } from "@/lib/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";


const Footer = ({className, children}:{className?: string, children?: React.ReactNode}) => {
return (
<div className={cn('relative h-20 flex items-center justify-center', className)}>
    <p className="text-sm text-center text-muted-foreground">
        Made with <span className="p-2"><FontAwesomeIcon icon={faHeart} color="red" beatFade/></span> by Aarav
    </p>
    <Image src="/logos/nobel.svg" alt="Character" width={150} height={150} />
    </div>
) 
}



export default Footer; 
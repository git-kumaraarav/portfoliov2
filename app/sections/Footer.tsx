import { cn } from "@/lib/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Footer = ({className, children}:{className?: string, children?: React.ReactNode}) => {
return (
<div className={cn('h-20 flex items-center justify-center', className)}>
    <p className="text-sm text-center text-muted-foreground">
        Made with <span className="p-2"><FontAwesomeIcon icon={faHeart} color="red" beatFade/></span> by DarkIce.
    </p>
    {children}
    </div>
) 
}

export default Footer; 
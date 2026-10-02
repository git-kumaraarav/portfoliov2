import { cn } from "@/lib/utils";

const SectionLayout = ({
  className,
  children,
  id,
  sectionName
}: {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  sectionName?: string;
}) => {
  return (
    <div id={id}
      className={cn(
        "py-10",    
        className,
      )}
    >
        <h2 className={`${sectionName !== undefined ? 'block' : 'hidden'} text-3xl m-2 font-bold`}>{sectionName}</h2>  
        {children}
    </div>
  );
};

export default SectionLayout;

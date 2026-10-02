import { cn } from "@/lib/utils";

const CardLayout = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "flex flex-wrap w-full rounded-xl p-8 bg-surface items-center justify-center ring-1 ring-surface md:flex-nowrap",
        "shadow-lg shadow-surface/50 my-4", 
        className,
      )}
    >
      {children}
    </div>
  );
};

export default CardLayout;

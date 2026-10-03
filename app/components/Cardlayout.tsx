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
        "flex flex-wrap w-full rounded-xl p-3 lg:p-8 bg-surface items-center justify-center ring-1 ring-surface md:flex-nowrap",
        "shadow-lg shadow-accent/10 my-4 z-2 hover:shadow-accent/20 hover:scale-101 transition-all duration-300", 

        className,
      )}
    >
      {children}
    </div>
  );
};

export default CardLayout;

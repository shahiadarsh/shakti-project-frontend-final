import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spiritualButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-divine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        divine: "bg-divine-gradient text-primary-foreground hover:shadow-divine hover:scale-105 divine-pulse",
        sacred: "bg-sacred-gradient text-accent-foreground hover:shadow-sacred hover:scale-105",
        aura: "bg-background/10 backdrop-blur-sm border border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/60 hover:shadow-glow",
        outline: "border border-primary/30 bg-background/5 backdrop-blur-sm text-foreground hover:bg-primary/10 hover:border-primary/60",
        ghost: "text-foreground hover:bg-accent/20 hover:text-accent",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "divine",
      size: "default",
    },
  }
);

export interface SpiritualButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof spiritualButtonVariants> {
  asChild?: boolean;
}

const SpiritualButton = React.forwardRef<HTMLButtonElement, SpiritualButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(spiritualButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

SpiritualButton.displayName = "SpiritualButton";

export { SpiritualButton, spiritualButtonVariants };
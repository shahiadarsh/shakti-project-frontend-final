import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spiritualCardVariants = cva(
  "rounded-xl border bg-card text-card-foreground shadow-lg transition-divine overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-border/20 bg-card/50 backdrop-blur-sm hover:bg-card/70 hover:shadow-divine",
        divine: "border-primary/30 bg-divine-gradient shadow-divine hover:shadow-glow",
        sacred: "border-accent/30 bg-sacred-gradient shadow-sacred",
        ethereal: "border-accent/20 bg-background/10 backdrop-blur-md hover:bg-background/20 hover:border-accent/40",
        glow: "border-accent/40 bg-card/30 backdrop-blur-sm shadow-glow hover:shadow-divine",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        xl: "p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface SpiritualCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spiritualCardVariants> {}

const SpiritualCard = React.forwardRef<HTMLDivElement, SpiritualCardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(spiritualCardVariants({ variant, size, className }))}
      {...props}
    />
  )
);

SpiritualCard.displayName = "SpiritualCard";

const SpiritualCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));

SpiritualCardHeader.displayName = "SpiritualCardHeader";

const SpiritualCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent",
      className
    )}
    {...props}
  />
));

SpiritualCardTitle.displayName = "SpiritualCardTitle";

const SpiritualCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

SpiritualCardDescription.displayName = "SpiritualCardDescription";

const SpiritualCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
));

SpiritualCardContent.displayName = "SpiritualCardContent";

const SpiritualCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));

SpiritualCardFooter.displayName = "SpiritualCardFooter";

export {
  SpiritualCard,
  SpiritualCardHeader,
  SpiritualCardFooter,
  SpiritualCardTitle,
  SpiritualCardDescription,
  SpiritualCardContent,
  spiritualCardVariants,
};
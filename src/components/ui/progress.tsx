import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/utils'

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string
  showLabel?: boolean
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, indicatorClassName, showLabel, ...props }, ref) => (
    <div className="relative">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn('relative h-2.5 w-full overflow-hidden rounded-full bg-muted', className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn('h-full w-full flex-1 bg-primary-500 transition-all duration-700 ease-out rounded-full', indicatorClassName)}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
      {showLabel && (
        <span className="absolute right-0 -top-5 text-xs font-medium text-primary-500">
          {value}%
        </span>
      )}
    </div>
  )
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

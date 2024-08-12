import cn from 'clsx'
import type { ComponentProps, ReactNode } from 'react'
import { forwardRef } from 'react'

type InputProps = ComponentProps<'input'> & { suffix?: ReactNode }

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, suffix, ...props }, forwardedRef) => (
    <div className="nx-relative nx-flex nx-items-center nx-text-gray-900 contrast-more:nx-text-gray-800 dark:nx-text-gray-300 contrast-more:dark:nx-text-gray-300 nx-border nx-border-brand-dark-400 dark:nx-bg-brand-dark-700">
      <input
        ref={forwardedRef}
        spellCheck={false}
        className={cn(
          className,
          'nx-block nx-w-full nx-appearance-none nx-p-3 nx-transition-colors nx-pr-[38px]',
          'nx-text-body1 lg:nx-text-body3',
          'nx-bg-black/[.05] dark:nx-bg-brand-dark-700',
          'focus:nx-bg-white',
          'placeholder:nx-text-gray-500 dark:placeholder:nx-text-brand-gray-300 dark:nx-text-white',
          'contrast-more:nx-border contrast-more:nx-border-current'
        )}
        {...props}
      />
      {suffix}
    </div>
  )
)

Input.displayName = 'Input'

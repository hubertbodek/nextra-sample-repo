import cn from 'clsx'
import { Code, Pre, Table, Td, Th, Tr } from 'nextra/components'
import type { Components } from 'nextra/mdx'
import type { ComponentProps, ReactElement, ReactNode } from 'react'
import { Children, cloneElement, useEffect, useRef, useState } from 'react'
import { Anchor, Collapse } from './components'
import type { AnchorProps } from './components/anchor'
import type { ThemeConfig } from './constants'
import { DetailsProvider, useDetails, useSetActiveAnchor } from './contexts'
import { useIntersectionObserver, useSlugs } from './contexts/active-anchor'

// Anchor links
function HeadingLink({
  tag: Tag,
  context,
  children,
  id,
  className,
  ...props
}: ComponentProps<'h2'> & {
  tag: `h${2 | 3 | 4 | 5 | 6}`
  context: { index: number }
}): ReactElement {
  const setActiveAnchor = useSetActiveAnchor()
  const slugs = useSlugs()
  const observer = useIntersectionObserver()
  const obRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!id) return
    const heading = obRef.current
    if (!heading) return
    slugs.set(heading, [id, (context.index += 1)])
    observer?.observe(heading)

    return () => {
      observer?.disconnect()
      slugs.delete(heading)
      setActiveAnchor(f => {
        const ret = { ...f }
        delete ret[id]
        return ret
      })
    }
  }, [id, context, slugs, observer, setActiveAnchor])

  return (
    <Tag
      className={
        // can be added by footnotes
        className === 'sr-only'
          ? 'nx-sr-only'
          : cn(
              'nx-tracking-tight nx-text-slate-900 dark:nx-text-white',
              {
                h2: 'nx-mt-10 nx-text-h3-mobile md:nx-text-h3',
                h3: 'nx-mt-10 nx-text-h4-mobile md:nx-text-h4',
                h4: 'nx-mt-10 nx-text-h5-mobile md:nx-text-h5',
                h5: 'nx-mt-10 nx-text-body1-mobile md:nx-text-body1',
                h6: 'nx-mt-10 nx-text-body1-mobile md:nx-text-body1'
              }[Tag]
            )
      }
      {...props}
    >
      {children}
      {id && (
        <a
          href={`#${id}`}
          id={id}
          className="subheading-anchor"
          aria-label="Permalink for this section"
          ref={obRef}
        />
      )}
    </Tag>
  )
}

const findSummary = (children: ReactNode) => {
  let summary: ReactNode = null
  const restChildren: ReactNode[] = []

  Children.forEach(children, (child, index) => {
    if (child && (child as ReactElement).type === Summary) {
      summary ||= child
      return
    }

    let c = child
    if (
      !summary &&
      child &&
      typeof child === 'object' &&
      (child as ReactElement).type !== Details &&
      'props' in child &&
      child.props
    ) {
      const result = findSummary(child.props.children)
      summary = result[0]
      c = cloneElement(child, {
        ...child.props,
        children: result[1]?.length ? result[1] : undefined,
        key: index
      })
    }
    restChildren.push(c)
  })

  return [summary, restChildren]
}

const Details = ({
  children,
  open,
  ...props
}: ComponentProps<'details'>): ReactElement => {
  const [openState, setOpen] = useState(!!open)
  const [summary, restChildren] = findSummary(children)

  // To animate the close animation we have to delay the DOM node state here.
  const [delayedOpenState, setDelayedOpenState] = useState(openState)
  useEffect(() => {
    if (openState) {
      setDelayedOpenState(true)
    } else {
      const timeout = setTimeout(() => setDelayedOpenState(openState), 500)
      return () => clearTimeout(timeout)
    }
  }, [openState])

  return (
    <details
      className="nx-my-4 nx-rounded nx-border nx-border-gray-200 nx-bg-white nx-p-2 nx-shadow-sm first:nx-mt-0 dark:nx-border-neutral-800 dark:nx-bg-neutral-900"
      {...props}
      open={delayedOpenState}
      {...(openState && { 'data-expanded': true })}
    >
      <DetailsProvider value={setOpen}>{summary}</DetailsProvider>
      <Collapse isOpen={openState}>{restChildren}</Collapse>
    </details>
  )
}

const Summary = (props: ComponentProps<'summary'>): ReactElement => {
  const setOpen = useDetails()
  return (
    <summary
      className={cn(
        'nx-flex nx-items-center nx-cursor-pointer nx-list-none nx-p-1 nx-transition-colors hover:nx-bg-gray-100 dark:hover:nx-bg-neutral-800',
        "before:nx-mr-1 before:nx-inline-block before:nx-transition-transform before:nx-content-[''] dark:before:nx-invert before:nx-shrink-0",
        'rtl:before:nx-rotate-180 [[data-expanded]>&]:before:nx-rotate-90'
      )}
      {...props}
      onClick={e => {
        e.preventDefault()
        setOpen(v => !v)
      }}
    />
  )
}

const EXTERNAL_HREF_REGEX = /https?:\/\//

export const Link = ({ href = '', className, ...props }: AnchorProps) => (
  <Anchor
    href={href}
    newWindow={EXTERNAL_HREF_REGEX.test(href)}
    className={cn(
      'nx-text-primary-600 dark:nx-text-brand-yellow-500 nx-decoration-from-font [text-underline-position:from-font]',
      className
    )}
    {...props}
  />
)

const A = ({ href = '', ...props }) => (
  <Anchor href={href} newWindow={EXTERNAL_HREF_REGEX.test(href)} {...props} />
)

export const getComponents = ({
  isRawLayout,
  components
}: {
  isRawLayout?: boolean
  components?: ThemeConfig['components']
}): Components => {
  if (isRawLayout) {
    return { a: A }
  }

  const context = { index: 0 }
  return {
    h1: props => (
      <h1
        className="nx-mt-2 nx-tracking-tight nx-text-slate-900 dark:nx-text-white nx-text-h2-mobile md:nx-text-h2"
        {...props}
      />
    ),
    h2: props => <HeadingLink tag="h2" context={context} {...props} />,
    h3: props => <HeadingLink tag="h3" context={context} {...props} />,
    h4: props => <HeadingLink tag="h4" context={context} {...props} />,
    h5: props => <HeadingLink tag="h5" context={context} {...props} />,
    h6: props => <HeadingLink tag="h6" context={context} {...props} />,
    ul: props => (
      <ul
        className="nx-mt-6 nx-list-disc first:nx-mt-0 ltr:nx-ml-6 rtl:nx-mr-6"
        {...props}
      />
    ),
    ol: props => (
      <ol
        className="nx-mt-6 nx-list-decimal first:nx-mt-0 ltr:nx-ml-6 rtl:nx-mr-6"
        {...props}
      />
    ),
    li: props => <li className="nx-my-2 nx-text-brand-gray-300" {...props} />,
    blockquote: props => (
      <blockquote
        className={cn(
          'nx-mt-6 nx-border-gray-300 nx-italic nx-text-gray-700 dark:nx-border-gray-700 dark:nx-text-gray-400',
          'first:nx-mt-0 ltr:nx-border-l-2 ltr:nx-pl-6 rtl:nx-border-r-2 rtl:nx-pr-6'
        )}
        {...props}
      />
    ),
    hr: props => (
      <hr
        className="nx-my-8 nx-border-neutral-200/70 contrast-more:nx-border-neutral-400 dark:nx-border-primary-100/10 contrast-more:dark:nx-border-neutral-400"
        {...props}
      />
    ),
    a: Link,
    table: props => (
      <Table
        className="nextra-scrollbar nx-mt-6 nx-p-0 first:nx-mt-0 nx-overflow-x-scroll"
        {...props}
      />
    ),
    p: props => <p className="nx-mt-6 first:nx-mt-0 nx-text-brand-gray-300 nx-text-body1-mobile md:nx-text-body1" {...props} />,
    tr: props => (
      <Tr
        className="even:dark:nx-bg-transparent odd:dark:nx-bg-transparent"
        {...props}
      />
    ),
    th: props => (
      <Th
        className="dark:nx-border-brand-dark-400 dark:nx-bg-brand-dark-600 nx-py-4 nx-text-body-2-mobile md:nx-text-body2"
        {...props}
      />
    ),
    td: props => (
      <Td
        className="dark:nx-border-brand-dark-400 dark:nx-bg-brand-dark-700 nx-py-4 nx-text-body2-mobile md:nx-text-body2" 
        {...props}
      />
    ),
    details: Details,
    summary: Summary,
    pre: Pre,
    code: props => <Code className='text-white nx-overflow-scroll nx-font-secondary-mono'  {...props} />,
    ...components
  }
}

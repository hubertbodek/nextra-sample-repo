import { useConfig } from "~/contexts";
import { renderComponent } from "~/utils";
import { Transition } from "@headlessui/react";
import { useMounted } from "nextra/hooks";
import cn from 'clsx'

export const Search = () => {
  const { search } = useConfig();
  const mounted = useMounted();

  return (
    <>
      {search.component ? <div className={cn("nx-relative nx-h-12 md:nx-px-8 lg:nx-py-2 nx-p-3 lg:nx-h-10 nx-text-body2" )}>
        <Transition
          show={mounted}
          enter="nx-transition-opacity nx-duration-[10ms]"
          enterFrom="nx-opacity-50"
          enterTo="nx-opacity-100"
        >
          {renderComponent(search.component)}
        </Transition>
      </div> : null}
    </>
    
  );
};

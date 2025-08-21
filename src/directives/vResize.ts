import type { Directive, DirectiveBinding  } from "vue";

interface HTMLElementWithObserver extends HTMLElement {
    _resizeObserver?: ResizeObserver;
}

export const vResize: Directive<HTMLElementWithObserver, (width: number, height: number) => void> = {
    mounted(el, binding: DirectiveBinding<(width: number, height: number) => void>) {
        const resizeObserver = new ResizeObserver(entries => {
            const entry = entries[0];
            const { width, height } = entry.contentRect;
            binding.value(width, height);
        });

        resizeObserver.observe(el);

        el._resizeObserver = resizeObserver;
    },

    unmounted(el) {
        if (el._resizeObserver) {
            el._resizeObserver.disconnect();
            delete el._resizeObserver;
        }
    },
}

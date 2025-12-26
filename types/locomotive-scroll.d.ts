declare module 'locomotive-scroll' {
    interface LocomotiveScrollOptions {
        el?: HTMLElement;
        smooth?: boolean;
        multiplier?: number;
        lerp?: number;
        smartphone?: {
            smooth?: boolean;
        };
        tablet?: {
            smooth?: boolean;
        };
    }

    interface ScrollInstance {
        scroll: {
            y: number;
        };
    }

    class LocomotiveScroll {
        scroll: { instance: ScrollInstance };
        constructor(options?: LocomotiveScrollOptions);
        on(event: string, callback: () => void): void;
        scrollTo(target: number | string | HTMLElement, options?: { duration?: number; disableLerp?: boolean }): void;
        update(): void;
        destroy(): void;
    }

    export default LocomotiveScroll;
}

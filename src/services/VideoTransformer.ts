import type {FocusOnData, VideoRegion} from "../types/video.ts";

export class VideoTransformer {
    viewportWidth: number = 0;
    viewportHeight: number = 0;
    focusOn: FocusOnData | null = null;
    videoWidth: number = 0;
    videoHeight: number = 0;
    
    setFocusOnData(focusOn: FocusOnData) {
        this.focusOn = focusOn;
    }

    async loadFocusOnData(fileName: string) {
        const file = await fetch(fileName);
        this.focusOn = await file.json();
    }

    setVideoSize(width: number, height: number) {
        this.videoWidth = width;
        this.videoHeight = height;
    }

    setViewportSize(width: number, height: number) {
        this.viewportWidth = width;
        this.viewportHeight = height;
    }

    private getDefaultRegion() {
        return {
            x: 0,
            y: 0,
            width: this.videoWidth,
            height: this.videoHeight
        };
    }

    private getRegion(time: number) {
        if (!this.focusOn) {
            return this.getDefaultRegion();
        }

        const activeRegion = this.focusOn.regions.find(
            region => time >= region.start && time <= region.end
        );

        return activeRegion?.region ?? this.getDefaultRegion();
    }

    private calculateScale(region: VideoRegion) {
        const { width, height } = region;
        const scaleX = this.viewportWidth / width;
        const scaleY = this.viewportHeight / height;
        return Math.min(scaleX, scaleY);
    }

    private calculateTranslation(region: VideoRegion) {
        const { x, y, width, height } = region;
        const translateX = -(x + width / 2) + this.viewportWidth / 2;
        const translateY = -(y + height / 2) + this.viewportHeight / 2;
        return { translateX, translateY };
    }

    getTransformData(time: number) {
        const region = this.getRegion(time);

        const scale = this.calculateScale(region);
        const { translateX, translateY } = this.calculateTranslation(region);

        return { translateX, translateY, scale };
    }

    getTransform(time: number) {
        const { translateX, translateY, scale } = this.getTransformData(time);

        return `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
}

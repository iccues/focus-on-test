import { VideoTransformer } from "./VideoTransformer";
import type { FocusOnData } from "../types/video";

global.fetch = vi.fn();

describe('VideoTransformer', () => {
    let transformer: VideoTransformer;

    beforeEach(() => {
        vi.clearAllMocks()
        transformer = new VideoTransformer()
    });

    test('应该正确初始化', () => {
        expect(transformer.viewportWidth).toBe(0)
        expect(transformer.viewportHeight).toBe(0)
        expect(transformer.focusOn).toBe(null)
        expect(transformer.videoWidth).toBe(0)
        expect(transformer.videoHeight).toBe(0)
    })

    test('应该设置视频尺寸', () => {
        transformer.setVideoSize(1920, 1080)

        expect(transformer.videoWidth).toBe(1920)
        expect(transformer.videoHeight).toBe(1080)
    })

    test('应该设置视口尺寸', () => {
        transformer.setViewportSize(800, 600)

        expect(transformer.viewportWidth).toBe(800)
        expect(transformer.viewportHeight).toBe(600)
    })

    test('应该加载 focus-on 数据', async () => {
        const focusOnData: FocusOnData = {
            version: '1',
            regions: [
                {
                    start: 0,
                    end: 10,
                    region: { x: 100, y: 100, width: 800, height: 600 }
                }
            ]
        };

        (global.fetch as any).mockResolvedValueOnce({
            json: vi.fn().mockResolvedValueOnce(focusOnData)
        })

        await transformer.loadFocusOnData('test.json')

        expect(global.fetch).toHaveBeenCalledWith('test.json')
        expect(transformer.focusOn).toEqual(focusOnData)
    })

    test('应该在没有 focus-on 数据时返回默认区域', () => {
        transformer.setVideoSize(1920, 1080)
        transformer.setViewportSize(1000, 540)

        const transformData = transformer.getTransformData(0)

        expect(transformData).toEqual({ scale: 0.5, translateX: -460, translateY: -270, })
    })

    test('应该根据时间获取正确的区域', () => {
        const focusOnData: FocusOnData = {
            version: '1',
            regions: [
                {
                    start: 0,
                    end: 10,
                    region: { x: 100, y: 100, width: 800, height: 400 }
                },
                {
                    start: 10,
                    end: 20,
                    region: { x: 200, y: 200, width: 300, height: 300 }
                }
            ]
        };


        transformer.setFocusOnData(focusOnData)
        transformer.setVideoSize(1920, 1080)
        transformer.setViewportSize(800, 600)

        const transformData1 = transformer.getTransformData(5)
        expect(transformData1).toEqual({ scale: 1, translateX: -100, translateY: 0 })

        const transformData2 = transformer.getTransformData(15)
        expect(transformData2).toEqual({ scale: 2, translateX: 50, translateY: -50 })
    })

    test('应该在时间超出范围时返回默认区域', async () => {
        const focusOnData: FocusOnData = {
            version: '1',
            regions: [
                {
                    start: 0,
                    end: 10,
                    region: { x: 100, y: 100, width: 800, height: 600 }
                }
            ]
        }

        transformer.setFocusOnData(focusOnData)
        transformer.setVideoSize(1920, 1080)
        transformer.setViewportSize(1000, 540)

        const transformData = transformer.getTransformData(20)
        expect(transformData).toEqual({ scale: 0.5, translateX: -460, translateY: -270 })
    })

    test('应该生成正确的变换字符串', () => {
        transformer.setVideoSize(1920, 1080)
        transformer.setViewportSize(800, 600)

        const transform = transformer.getTransform(0)

        expect(transform).toMatch(/translate\([-\d.]+px, [-\d.]+px\) scale\([\d.]+\)/)
    })
})

export declare class RendererService {
    canvas: HTMLScriptElement;
    context: Vex.IRenderContext;
    constructor(canvas: HTMLScriptElement);
    drawStave(stave: Vex.Flow.Stave): void;
    drawVoice(stave: Vex.Flow.Stave, voice: Vex.Flow.Voice): void;
    clearCanvas(): void;
}

export class RendererService {
  canvas: HTMLScriptElement;
  context: Vex.IRenderContext;

  setContext(canvas: HTMLScripElement) {
    this.canvas = canvas;
    const vfRenderer = new Vex.Flow.Renderer(this.canvas, 1);
    this.context = vfRenderer.getContext();
  }

  drawStave(stave: Vex.Flow.Stave) {
    this.clearCanvas();
    stave.setContext(this.context).draw();
  }

  drawVoice(stave: Vex.Flow.Stave, voice: Vex.Flow.Voice) {
    var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 300);
    this.drawStave(stave);
    voice.draw(this.context, stave);
  }

  clearCanvas() {
    this.context.clear();
  }
}

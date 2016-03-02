export class RendererService {
  canvas: HTMLScriptElement;
  context: Vex.IRenderContext;
  stave: Vex.Flow.Stave;

  setContext(canvas: HTMLScripElement, stave: Vex.Flow.Stave) {
    this.canvas = canvas;
    this.stave = stave;
    const vfRenderer = new Vex.Flow.Renderer(this.canvas, 1);
    this.context = vfRenderer.getContext();
  }

  drawStave() {
    this.clearCanvas();
    this.stave.setContext(this.context).draw();
  }

  drawVoice(voice: Vex.Flow.Voice) {
    var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 300);
    this.drawStave(this.stave);
    voice.draw(this.context, this.stave);
  }

  clearCanvas() {
    this.context.clear();
  }
}

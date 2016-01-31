"use strict";
var RendererService = (function () {
    function RendererService(canvas) {
        this.canvas = canvas;
        var vfRenderer = new Vex.Flow.Renderer(this.canvas, 1);
        this.context = vfRenderer.getContext();
    }
    RendererService.prototype.drawStave = function (stave) {
        this.clearCanvas();
        stave.setContext(this.context).draw();
    };
    RendererService.prototype.drawVoice = function (stave, voice) {
        var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 300);
        this.drawStave(stave);
        voice.draw(this.context, stave);
    };
    RendererService.prototype.clearCanvas = function () {
        this.context.clear();
    };
    return RendererService;
}());
exports.RendererService = RendererService;
//# sourceMappingURL=renderer.service.js.map
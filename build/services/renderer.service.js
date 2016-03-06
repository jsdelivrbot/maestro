"use strict";
var RendererService = (function () {
    function RendererService() {
    }
    RendererService.prototype.setContext = function (canvas, stave) {
        this.canvas = canvas;
        this.stave = stave;
        var vfRenderer = new Vex.Flow.Renderer(this.canvas, 1);
        this.context = vfRenderer.getContext();
    };
    RendererService.prototype.drawStave = function () {
        this.clearCanvas();
        this.stave.setContext(this.context).draw();
    };
    RendererService.prototype.drawVoice = function (voice) {
        var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 300);
        this.drawStave(this.stave);
        voice.draw(this.context, this.stave);
    };
    RendererService.prototype.clearCanvas = function () {
        this.context.clear();
    };
    return RendererService;
}());
exports.RendererService = RendererService;
//# sourceMappingURL=renderer.service.js.map
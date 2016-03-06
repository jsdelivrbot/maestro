"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Rx = require('rxjs/Rx');
var core_1 = require('angular2/core');
var renderer_service_1 = require('./renderer.service');
var VoiceService = (function () {
    function VoiceService(_renderer) {
        var _this = this;
        this._renderer = _renderer;
        this.voiceStream = new Rx.BehaviorSubject(null);
        this.voiceStream.subscribe(function (voice) {
            _this.updateVoice(voice);
        });
    }
    ;
    VoiceService.prototype.setVoice = function (voice) {
        this.voiceStream.next(voice);
    };
    ;
    VoiceService.prototype.updateVoice = function (voice) {
        this.currentVoice = voice;
        if (this._renderer.stave) {
            this._renderer.drawVoice(voice);
        }
    };
    ;
    VoiceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [renderer_service_1.RendererService])
    ], VoiceService);
    return VoiceService;
}());
exports.VoiceService = VoiceService;
;
//# sourceMappingURL=voice.service.js.map
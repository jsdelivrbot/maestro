import * as Rx from 'rxjs/Rx';
import {Injectable} from 'angular2/core';
import {RendererService} from './renderer.service';

@Injectable()
export class VoiceService {
  voice: Rx.Subject<Vex.Flow.Voice> = new Rx.BehaviorSubject<Vex.Flow.Voice>(null);

  constructor(private _renderer: RendererService) {
    const voice = new Vex.Flow.Voice({
      num_beats: 4,
      beat_value: 4,
      resolution: Vex.Flow.RESOLUTIO
    });

    const notes = [
        new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
        new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
        new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
        new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" })
    ];
    voice.addTickables(notes)
    this.setVoice(voice);
  };

  setVoice(voice: Vex.Flow.Voice) {
    this.voice.next(voice);
    if (this._renderer.stave) {
      console.log(this._renderer);
      this._renderer.drawVoice(voice);
    }
  };
}

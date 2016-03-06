import * as Rx from 'rxjs/Rx';
import {Injectable} from 'angular2/core';
import {RendererService} from './renderer.service';
import {SelectNoteService} from './select-note.service';

@Injectable()
export class VoiceService {
  voiceStream: Rx.Subject<Vex.Flow.Voice> = new Rx.BehaviorSubject<Vex.Flow.Voice>(null);
  currentVoice: Vex.Flow.Voice;

  constructor(private _renderer: RendererService) {
    this.voiceStream.subscribe((voice) =>
      this.updateVoice(voice);
    )
  };

  setVoice(voice: Vex.Flow.Voice) {
    this.voiceStream.next(voice);
  };

  private updateVoice(voice: Vex.Flow.Voice) {
    this.currentVoice = voice;
    if (this._renderer.stave) {
      this._renderer.drawVoice(voice);
    }
  };
};

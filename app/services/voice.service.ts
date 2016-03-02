import * as Rx from 'rxjs/Rx';

export class VoiceService {
  voice: Rx.Subject<Vex.Flow.Voice> = new Rx.BehaviorSubject<Vex.Flow.Voice>(null);

  setVoice(voice: Vex.Flow.Voice) {
    this.voice.next(voice);
  };
}

export class SelectVoiceService {
  selectedVoice: Vex.Flow.Voice;

  selectVoice(voice: Vex.Flow.Voice) {
    this.selectedVoice = voice;
  };
};

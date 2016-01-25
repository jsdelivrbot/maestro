export class VoiceDecorator {
  vfVoice: Vex.Flow.Voice;
  vfNotes: Array<Vex.Flow.StaveNote>

  constructor(voice: Vex.Flow.Voice, notes: Array<Vex.Flow.StaveNote>) {
    this.vfVoice = voice;
    this.vfNotes = notes;
  }
}
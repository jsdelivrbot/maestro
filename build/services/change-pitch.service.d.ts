export declare class ChangePitchService {
    raisePitch(note: Vex.Flow.Note, voice: Vex.Flow.Voice): {
        voice: Vex.Flow.Note;
        note: Vex.Flow.Voice;
    };
    lowerPitch(note: Vex.Flow.Note, voice: Vex.Flow.Voice): {
        voice: Vex.Flow.Note;
        note: Vex.Flow.Voice;
    };
    deleteNote(note: Vex.Flow.Note, voice: Vex.Flow.Voice): {
        voice: Vex.Flow.Note;
        note: Vex.Flow.Voice;
    };
    private updateNote(key, duration);
    private updateVoice(voice, note, index);
    private raiseKey(key);
    private lowerKey(key);
    private shouldRaiseOctave(noteName, newNoteName);
    private shouldLowerOctave(noteName, newNoteName);
    private newNoteName(charCode);
}

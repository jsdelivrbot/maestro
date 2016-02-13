export declare class AddNoteService {
    static DURATION_MAP: {
        [key: string]: number;
    };
    sayHi(): void;
    addNote(duration: string, index: number, oldNote: Vex.Flow.StaveNote, voice: Vex.Flow.Voice): Vex.Flow.Voice;
    duration(note: Vex.Flow.StaveNote): number;
    isLonger(newNote: Vex.Flow.StaveNote, oldNote: Vex.Flow.StaveNote): boolean;
    testMethod(oldNote: Vex.Flow.StaveNote): void;
    divideNote(newNote: Vex.Flow.StaveNote, oldNote: Vex.Flow.StaveNote): any;
}

import { RendererService } from '../../services/renderer.service';
import { ChangePitchService } from '../../services/change-pitch.service';
import { AddNoteService } from '../../services/add-note.service';
import './stave.style.scss';
export declare class StaveComponent {
    static WIDTH: number;
    static HEIGHT: number;
    canvas: any;
    stave: Vex.Flow.Stave;
    canvasSelector: string;
    renderer: RendererService;
    changePitchService: ChangePitchService;
    addNoteService: AddNoteService;
    voice: Vex.Flow.Voice;
    notes: Array<Vex.Flow.Note>;
    selectedNoteIndex: number;
    constructor();
    ngAfterViewInit(): void;
    drawVoices(): void;
    goRight(): void;
    goLeft(): void;
    selectNote(note: Vex.Flow.StaveNote): void;
    deselectNotes(notes: Array<Vex.Flow.StaveNote>): void;
    selectedNote(): Vex.Flow.StaveNote;
    deleteNote(): void;
    raisePitch(): void;
    lowerPitch(): void;
}

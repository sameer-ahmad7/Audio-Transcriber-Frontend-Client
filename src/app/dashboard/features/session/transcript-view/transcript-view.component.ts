import { ChangeDetectionStrategy, ElementRef, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { GetSpeakerBlocks, SnippetEvent, SpeakerBlock, Transcript, TranscriptItem, TranscriptItemType } from 'src/app/models';
import { Snippet } from 'src/app/models/sizzlereel';


const PUNCTUATION = ['?', ',', '.', '!'];


@Component({
  selector: 'app-transcript-view',
  templateUrl: './transcript-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./transcript-view.component.scss']
})

export class TranscriptViewComponent implements OnInit {
  @ViewChild('popover') popover: NgbPopover;
  @ViewChild('snippetName') snippetName: ElementRef;
  @ViewChild('transcriptionText') transcriptionText: ElementRef;
  @Output() snippet: EventEmitter<SnippetEvent> = new EventEmitter();
  @Input() transcript: Transcript;
  @Input() sessionId: string;



  AudioTags: { word?: string[] } = {};


  Snippet: Snippet = null;

  SpeakerBlocks: SpeakerBlock[];

  ItemText = {};

  SelectedText: string = "";
  GetSpeakerBlocks = GetSpeakerBlocks;
  ItemType = TranscriptItemType;

  constructor(
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.transcript) {
      console.log('changes');
      this.SpeakerBlocks = GetSpeakerBlocks(this.transcript);
      this.SpeakerBlocks.forEach(speakerBlock => {
        speakerBlock.Items.forEach((item, index) => {
          this.ItemText[item.Content] = this.DisplayItem(speakerBlock.Items, index);
        })
      })
    }
    console.log(this.ItemText);
  }

  FormatItems(items: TranscriptItem[]): string {
    let formatted = "";
    items.forEach((item: TranscriptItem) => {
      if (formatted.length > 0 && item.Type == TranscriptItemType.Utterance) {
        formatted += ` ${item.Content}`;
      } else {
        formatted += item.Content;
      }
    });
    return formatted;
  }

  DisplayItem(items: TranscriptItem[], index: number): string {
    let formatted = "";
    let item = items[index];
    formatted = item.Content;
    if (index != items.length - 1 && items[index + 1].Type != TranscriptItemType.Punctuation) {
      formatted += " "
    }
    return formatted;
  }

  AddToReel() {

    window.getSelection().removeAllRanges();

    console.log(this.snippetName.nativeElement.value);

    this.Snippet.Title = this.snippetName.nativeElement.value?.trim();

    this.snippet.emit({ Snippet: this.Snippet });


    if (this.popover.isOpen()) {
      this.popover.close();
    }
  }

  OpenPopup() {

    //Check if popup is open then close it

    if (this.popover.isOpen()) {
      this.popover.close();
    }

    let selection: Range = window.getSelection().getRangeAt(0);

    //Get selected text

    let selectedText = selection.toString().trim();

    //If punctuation is selected then return
    if (this.ContainsPunctuation(selectedText)) {
      window.getSelection().removeAllRanges();
      this.ClearPopover();
      return;
    }

    let startContainer: any = selection.startContainer.parentNode;

    let endContainer: any = selection.endContainer.parentNode;

    //If selected text reaches outside transcription boundary then select entire transcription

    endContainer = this.CheckSelectionBoundary(endContainer);

    //If selected text ends with punctuation then select word before it.
    if (this.ContainsPunctuation(endContainer.textContent)) {
      endContainer = endContainer.previousSibling;
    }

    //If selected text starts with punctuation then select word after it
    if (this.ContainsPunctuation(startContainer.textContent)) {
      startContainer = startContainer.nextSibling;
    }


    let range = new Range();

    range.setStart(startContainer, 0);

    range.setEnd(endContainer, 1);

    window.getSelection().removeAllRanges();

    //Make selection visible on DOM

    window.getSelection().addRange(range);



    //Get text between start and end
    let text = range.toString()?.trim();

    //If text is not empty then create snippet
    if (text) {
      this.SelectedText = text;
      this.CreateSnippet(startContainer, endContainer);
      this.popover.open();
    }
    else {
      this.ClearPopover();
    }
  }

  ContainsPunctuation(text: string): boolean {
    return (PUNCTUATION.findIndex(char => char == text.trim()) >= 0)
  }

  ClearPopover() {
    this.SelectedText = "";
    this.Snippet = null;
  }


  CreateSnippet(startContainer, endContainer) {
    let startTime = startContainer.getAttribute('data-start-time');
    let endTime = endContainer.getAttribute('data-end-time');
    let snippet: Snippet = {
      SessionId: this.sessionId,
      SessionVersion: 1,
      SnippetMetadata: { Text: this.SelectedText },
      StartTimeMs: +startTime,
      EndTimeMs: +endTime
    }
    this.Snippet = snippet;
  }

  CheckSelectionBoundary(endContainer) {
    let endContainerClass = endContainer.getAttribute('class');

    if (endContainerClass == 'copyright-wrapper') {
      console.log('hello');
      let containerLength = this.transcriptionText.nativeElement.children.length;
      endContainer = this.transcriptionText.nativeElement.children[containerLength - 1];
    }
    return endContainer;
  }

}

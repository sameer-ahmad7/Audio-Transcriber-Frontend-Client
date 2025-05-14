export enum TranscriptItemType {
  Utterance = "Utterance",
  Punctuation = "Punctuation",
};

export type TranscriptItem = Readonly<{
  Type: TranscriptItemType,
  Start?: number,
  End?: number,
  Content: string,
  Conf?: number,
  Speaker?: number,
  LastUtterance?: boolean, // assigned in GetSpeakerBlocks()
}>;

export type Transcript = Readonly<{
  Source?: string,
  Items: TranscriptItem[];
}>;

export interface SpeakerBlock {
  Speaker: number;
  Items: TranscriptItem[];
};

export function GetSpeakerBlocks(transcript: Transcript): SpeakerBlock[] {
  let blocks: SpeakerBlock[] = [];
  let prevItem: TranscriptItem = undefined;

  transcript.Items.forEach(item => {
    // first loop - create a seed block
    if (blocks.length == 0) {
      let newBlock: SpeakerBlock = {
        Speaker: -1,
        Items: [],
      }
      blocks.push(newBlock);
    }

    // is this item the same speaker?
    let curBlock = blocks[blocks.length - 1];
    let sameSpeaker = undefined;
    if (item.Type == TranscriptItemType.Punctuation) {
      sameSpeaker = true;
    } else if (curBlock.Speaker == -1) {
      sameSpeaker = true;
    } else {
      sameSpeaker = (curBlock.Speaker == item.Speaker);
    }

    // if it's a new speaker, add a new block
    if (sameSpeaker == false) {
      let newBlock: SpeakerBlock = {
        Speaker: item.Speaker,
        Items: [],
      };
      blocks.push(newBlock);
      curBlock = blocks[blocks.length - 1];
    }

    // update the speaker in the current block
    if (curBlock.Speaker == -1 && item.Type == TranscriptItemType.Utterance) {
      curBlock.Speaker = item.Speaker;
    }
    // add this item to the block
    curBlock.Items.push(item);

    // update the previous item
    if (prevItem != undefined) {
      if (item.Type == TranscriptItemType.Punctuation) {
        prevItem = {
          ...prevItem,
          LastUtterance: true,
        }
      }
    }

    // loop
    prevItem = item;
  })

  return blocks;
}


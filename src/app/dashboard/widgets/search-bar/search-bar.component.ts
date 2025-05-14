import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { SearchTagsEvent } from 'src/app/models';

const searchText = "Search by tags";


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() currentTennant: string;

  @Input() sessionLoading: boolean;

  @Output() search: EventEmitter<SearchTagsEvent> = new EventEmitter();



  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  SearchPlaceholder: string = searchText;

  SearchQuery: string = "";

  SearchTags: string[] = [];


  constructor() { }

  ngOnInit(): void {
  }

  AddSearchTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.SearchTags.push(value.trim());
      //      this.store$.dispatch(new SessionStoreActions.LoadRequestAction({ SearchTags: this.SearchTags, TennantId: this.tennantId }));
      this.SearchPlaceholder = "";
      this.search.emit({ TennantId: this.currentTennant, SearchTags: this.SearchTags });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

  }

  RemoveSearchTag(searchTag): void {

    const index = this.SearchTags.indexOf(searchTag);

    if (index >= 0) {
      this.SearchTags.splice(index, 1);
    }

    if (this.SearchTags.length == 0) {
      this.SearchPlaceholder = searchText;
    }

    this.search.emit({ TennantId: this.currentTennant, SearchTags: this.SearchTags });


    //    this.store$.dispatch(new SessionStoreActions.LoadRequestAction({ SearchTags: this.SearchTags, TennantId: this.tennantId }));

  }


}

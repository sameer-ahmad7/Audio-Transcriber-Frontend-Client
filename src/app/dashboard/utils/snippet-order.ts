
import { Snippet } from 'src/app/models/sizzle-reels';


// Input : getting two arrays i-e; array of objects(snippets) and array (snippet order)
//Function Description: function is taking two arrays and sorting the snippets
//according to snippetOrder.
//Output: array of snippet, sorted acc to snippetOrder
 export const SortSnippetsbySinppetOrder = (snippetorder : string[], snippets: Snippet[]): void => {
  snippets.sort((SnippetOne:Snippet, SnippetTwo:Snippet):number => {
     const aValue = Object.values(SnippetOne)[0];
     const bValue  = Object.values(SnippetTwo)[0];
     return snippetorder.indexOf(aValue) - snippetorder.indexOf(bValue);
  });


};



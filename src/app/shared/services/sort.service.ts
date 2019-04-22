import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SortService {

    public sort(inputList, property) {
        inputList.sort((leftside, rightside): number => {
          if (leftside[property] > rightside[property]) {
            return -1;
          }
          if (leftside[property] < rightside[property]) {
            return 1;
          }
          return 0;
        });
        return inputList;
      }
}

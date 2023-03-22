import { Component } from '@angular/core';
import { ComponentTypeEnum } from '../../enums/ComponentTypeEnum';
import { AbstractWorksSpaceComponent } from '../AbstractWorkspaceComponent';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent extends AbstractWorksSpaceComponent {

  constructor() {
    super(ComponentTypeEnum.CODE);
  }

}

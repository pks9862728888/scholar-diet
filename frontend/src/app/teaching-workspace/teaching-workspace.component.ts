import { Component } from '@angular/core';
import { ComponentTypeEnum } from './enums/ComponentTypeEnum';
import { WorkspaceComponentI } from './dto/WorkspaceComponentI';

@Component({
  selector: 'app-teaching-workspace',
  templateUrl: './teaching-workspace.component.html',
  styleUrls: ['./teaching-workspace.component.css']
})
export class TeachingWorkspaceComponent {

  showWorkspaceControls: boolean = true;
  componentList: WorkspaceComponentI[] = [];

  // component enum types
  ARRAY: ComponentTypeEnum = ComponentTypeEnum.ARRAY;
  MAP: ComponentTypeEnum = ComponentTypeEnum.MAP;

  constructor() {
  }

  addComponent(type: ComponentTypeEnum): void {
    // Add to component list
    this.componentList.push({
      type: type,
      reference: `${type}-${this.componentList.length}-${Date.now()}`
    });
    // Hide controls
    this.showWorkspaceControls = false;
  }

  deleteComponent(event: WorkspaceComponentI) : void {
    this.componentList = this.componentList.filter(c => c.reference !== event.reference);
    if (this.componentList.length === 0) {
      this.showWorkspaceControls = true;
    }
  }
}

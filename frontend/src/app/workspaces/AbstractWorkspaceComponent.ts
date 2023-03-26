import { Directive, EventEmitter, Input, Output } from "@angular/core";
import { WorkspaceComponentI } from "./dto/WorkspaceComponentI";
import { ComponentTypeEnum } from "./teaching-workspace/enums/ComponentTypeEnum";


@Directive()
export abstract class AbstractWorksSpaceComponent {

    private type: ComponentTypeEnum;
    @Input() componentRef;
    @Output() deleteComponentEvent: EventEmitter<WorkspaceComponentI>;

    constructor(type: ComponentTypeEnum) {
        this.type = type;
        this.componentRef = "";
        this.deleteComponentEvent = new EventEmitter<WorkspaceComponentI>()
    }

    protected getComponentType() : ComponentTypeEnum {
        return this.type;
    }

    protected getComponentRef() : string {
        return this.componentRef;
    }

    protected deleteComponent() : void {
        this.deleteComponentEvent.emit({
            type: this.type,
            reference: this.componentRef
        });
    }
}
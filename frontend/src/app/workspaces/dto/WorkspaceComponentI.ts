import { ComponentTypeEnum } from "../teaching-workspace/enums/ComponentTypeEnum";

export interface WorkspaceComponentI {
    type: ComponentTypeEnum,
    reference: string
}
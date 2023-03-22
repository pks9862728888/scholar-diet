import { ComponentTypeEnum } from "../enums/ComponentTypeEnum";

export interface WorkspaceComponentI {
    type: ComponentTypeEnum,
    reference: string
}
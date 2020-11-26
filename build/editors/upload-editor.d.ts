/// <reference types="react" />
import { ISchemaComponentProps } from "../components/schema-form-interfaces";
export interface IUploadEditorContext {
    getFileUrl(file: File, path: string[], schema: object): string;
    sendFile(url: string, file: File, progress: (pc: number) => void): Promise<void>;
    deleteFile?(url: string): Promise<void>;
    saveSiteRelative: boolean;
    testState?: "uploading";
}
export declare function sendFileAsBody(url: string, file: File, progress: (pc: number) => void, method?: string): Promise<void>;
export declare const imageSpec: {
    extensions: string[];
};
export declare function UploadEditor(props: ISchemaComponentProps): JSX.Element;

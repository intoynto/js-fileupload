import React from "react";
declare type IrdrLabelProps = {
    hasFile: boolean;
    hasDrag: boolean;
};
declare type IlocalProps = {
    onChange?: (files: any) => void;
    name?: string;
    renderLabel?: (props: IrdrLabelProps) => JSX.Element;
};
declare type Istate = {
    dragType: string;
    file: File | null | undefined;
    blob: Blob | null | undefined;
};
declare class FileUpload<P extends IlocalProps, S extends Istate> extends React.Component<P, S> {
    private iUid;
    private _key;
    private ndInput;
    constructor(props: P);
    protected gInitState(props?: P): S;
    protected callPropsChange(files: any): void;
    protected hCh(e: React.ChangeEvent<HTMLInputElement>): void;
    protected hDrgEnter(e: React.DragEvent<HTMLElement>): void;
    protected hDrgOver(e: React.DragEvent<HTMLElement>): void;
    protected hDrop(e: React.DragEvent<HTMLElement>): void;
    protected hDrgLeave(e: React.DragEvent<HTMLElement>): void;
    protected onClear(e?: React.MouseEvent): void;
    protected rdrFileInfo(): JSX.Element;
    render(): JSX.Element;
}
export { FileUpload };

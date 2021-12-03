import React from "react";

// npm i filepond --save

function toFloat(value:any)
{
    if(value===null || value===undefined) return 0;
    if(typeof value==="number")
    {
        return value;
    }

    if(typeof value==="string")
    {
        let val=parseFloat(value);
        val=isNaN(val)?0:val;
        return val;
    }

    return 0;
}

function toFileSize(bytes:string | number | null | undefined,digit:number=2)
{
    if(bytes===null || bytes===undefined) return '0 byte';

    const sizes=['byte', 'Kb', 'Mb', 'Gb', 'Tb'];
    const val:number=toFloat(bytes) as number;
    const dm=digit<0?0:digit;
    const nol=Math.floor(Math.log(val) / Math.log(1024));

    if(nol===-Infinity) return '0 byte';

    const i=parseInt(nol.toString());
    return Math.round(val/Math.pow(1024,i)).toFixed(dm)+' '+sizes[i];
}

type IrdrLabelProps = {
    hasFile:boolean
    hasDrag:boolean
}

const getUniqueId = () => Math.random().toString(36).substr(2, 9);

type IlocalProps = {
    onChange?:(files:any)=>void
    name?:string
    renderLabel?:(props:IrdrLabelProps)=>JSX.Element
}

type Istate = {
    dragType:string  
    file:File | null | undefined
    blob:Blob | null | undefined
}

class FileUpload<P extends IlocalProps,S extends Istate> extends React.Component<P,S>
{
    private iUid:string;
    private _key:number;
    private ndInput:any=null;

    constructor(props:P)
    {
        super(props);
        this.iUid=`file-go-${getUniqueId()}`;
        this._key=0;
        this.hDrgEnter=this.hDrgEnter.bind(this);
        this.hDrgOver=this.hDrgOver.bind(this);
        this.hDrop=this.hDrop.bind(this);
        this.hDrgLeave=this.hDrgLeave.bind(this);
        this.hCh=this.hCh.bind(this);
        this.onClear=this.onClear.bind(this);
        this.state=this.gInitState(props);
    }

    protected gInitState(props?:P):S
    {
        const s:S={
            dragType:'',            
            file:null,
            blob:null,
        } as S;
        return s;
    }

    protected callPropsChange(files:any)
    {
        typeof this.props.onChange==='function'?this.props.onChange(files):null;
    }

    protected hCh(e:React.ChangeEvent<HTMLInputElement>)
    {        
        e.preventDefault();
        const files=e.currentTarget.files?e.currentTarget.files:[];        
        const file=files[0];
        let type=(file?file.type:'').toString().toLowerCase().trim();        
        const hasImage=['image/png','image/jpg','image/jpeg','image/bmp','image/svg+xml',' 	image/tiff','image/webp'].indexOf(type)>=0;
        if(hasImage)
        {
            const reader=new FileReader();
            reader.onload=(re:ProgressEvent<FileReader>)=>{
                //console.log(re.currentTarget.result);
                this.setState({file:file,blob:((re.currentTarget as any).result)},()=>{
                    this.callPropsChange(files);
                });
            };
            reader.onerror=()=>{
                this.setState({file:null,blob:null},()=>{
                    this.callPropsChange(files);
                });
            }
            reader.readAsDataURL(file);
            return;
        }
        this.setState({file:file,blob:null},()=>{
            this.callPropsChange(files);
        });
    }

    protected hDrgEnter(e:React.DragEvent<HTMLElement>)
    {
        this.setState({dragType:e.type});
    }
    
    protected hDrgOver(e:React.DragEvent<HTMLElement>){
        e.preventDefault();
        this.setState({dragType:e.type});
    }
    
    protected hDrop(e:React.DragEvent<HTMLElement>)
    {
        e.preventDefault();  
        const files=e.dataTransfer?e.dataTransfer.files:[];
        const file=files[0];       
        let type=(file?file.type:'').toString().toLowerCase().trim();        
        const hasImage=['image/png','image/jpg','image/jpeg','image/bmp','image/svg+xml',' 	image/tiff','image/webp'].indexOf(type)>=0;
        this._key++;

        const proper=()=>{
            const input:HTMLInputElement=this.ndInput;
            if(!input) return;
            const b=new ClipboardEvent("").clipboardData || new DataTransfer();
            b.items.add(file);
            (input as any).files=b.files;
        };

        if(hasImage)
        {
            const reader=new FileReader();
            reader.onload=(re:ProgressEvent<FileReader>)=>
            {
                //console.log(re.currentTarget.result);
                this.setState({dragType:'',file:file,blob:((re.currentTarget as any).result)},()=>{
                    proper();
                    this.callPropsChange(files);
                });
            };
            reader.onerror=()=>{
                this.setState({dragType:'',file:null,blob:null},()=>{
                    this.callPropsChange(files);
                });
            }
            reader.readAsDataURL(file);
            return;
        }

        this.setState({dragType:'',file:file,blob:null},()=>{
            proper();
            this.callPropsChange(files);
        });
    }

    protected hDrgLeave(e:React.DragEvent<HTMLElement>)
    {
        this.setState({dragType:''});
    }

    protected onClear(e?:React.MouseEvent)
    {
        if(e) e.preventDefault();
        this._key++;
        this.setState({file:null,blob:null},()=>{
            this.callPropsChange([]);
        });
    }

    protected rdrFileInfo()
    {
        const {dragType,file,blob}=this.state;
        return (
            <div className="fU--file">
                <div>
                    <div className="fU--flex">
                        <div className="fU--flexAuto">
                            <div className='fU--fileInfo'>
                                <div className="fU--fileInfoMain">
                                    <div className="fU--aria">&nbsp;</div>
                                    <div className="fU--text">{(file as File).name}</div>
                                </div>
                                <div>Size {toFileSize((file as File).size)}</div>
                            </div>
                        </div>
                        <div>
                            <a className='fU--removeTrigger' onClick={this.onClear}>
                                <svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z" fill="currentColor" fill-rule="nonzero"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render()
    {
        const props=this.props;
        const {dragType,file,blob}=this.state;
        const hasDrag=dragType!=='';
        const hasFile=file!==null && file!==undefined;

        const cntStyle:React.CSSProperties=
        {
            position:'relative',
        };

        const inpStyle:React.CSSProperties={
            position:'absolute',
            margin:0,
            padding:0,
            left:'1em',
            top:'1.75em',
            width:'calc(100% - 2em)',
            fontSize:'0',
            opacity:0,
        };
        const lbCtnStyle:React.CSSProperties={
            position:'relative',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',           
            minHeight:'46px',
        };
        const inpProps:any={
            //value:file?file.name:'',
        };
        const imgProps:any={
            src:blob
        }
        return (
            <div className={`fU ${hasDrag?'fU--drag':''}`} style={cntStyle} onDragEnter={this.hDrgEnter} onDragOver={this.hDrgOver} onDragLeave={this.hDrgLeave} onDrop={this.hDrop}>
                <div style={{padding:'0.5rem'}}>
                    <input ref={fn=>this.ndInput=fn} key={this._key} type="file" name={`${props.name?props.name:'file'}`} style={inpStyle} id={this.iUid} onChange={this.hCh} {...inpProps} />
                    <div style={lbCtnStyle}>
                        <label id={this.iUid} htmlFor={this.iUid}>
                            {props.renderLabel && props.renderLabel({hasDrag,hasFile})}
                            {(!props.renderLabel) && <span>
                                    {hasDrag && <span>Lepaskan file disini</span>}
                                    {!hasDrag && <span>Drag & Drop file atau <a>Browse</a></span>}
                            </span>}
                        </label>
                    </div>
                    {file && 
                    <div className='fU--handle'>
                        {blob && <div className="fU--imagePreview">
                            {this.rdrFileInfo()}
                            <div className="fU--posterWrapper">
                                <div className="fU--filePoster">
                                    <img {...imgProps} />
                                </div>                                
                            </div>
                        </div>}
                        {(!blob) && 
                        <div className="fU--blob">
                            {this.rdrFileInfo()}
                        </div>
                        }
                    </div>
                    }
                </div>
            </div>
        );
    } 
}

export {FileUpload}
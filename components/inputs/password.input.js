import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
function PasswordInputComponent(props) {
    return (
        <div className="w-full flex flex-col">
            <label className="font-bold lg:text-xl text-black" htmlFor={props.name}>{props.label}</label>
            <div className='relative'>
                <input required={props.required} disabled={props.disabled} placeholder={props.placeholder} className="w-full border p-4 rounded-md text-black" id={props.name} name={props.name} value={props.value} onChange={props.onChange} type={props.type} />
                <div className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer' onClick={props.onVisible}>{props.type == 'text' ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}</div>
            </div>
        </div>
    );
}

export default PasswordInputComponent;
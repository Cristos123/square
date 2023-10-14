function TextInputComponent(props) {
  return (
    <div className="w-full flex flex-col">
      <label className="font-bold lg:text-xl text-black" htmlFor={props.name}>
        {props.label}
      </label>
      <div>
        <input
          required={props.required}
          disabled={props.disabled}
          placeholder={props.placeholder}
          className="w-full border p-4 rounded-md text-black"
          id={props.name}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          type={props.type}
        />
      </div>
    </div>
  );
}

export default TextInputComponent;

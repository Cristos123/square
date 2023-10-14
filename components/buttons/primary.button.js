function PrimaryButtonComponent(props) {
  return (
    <button
      className=" bg-blue-500 text-white text-center p-4  w-full rounded-md disabled:cursor-not-allowed"
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
}

export default PrimaryButtonComponent;

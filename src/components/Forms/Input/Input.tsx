const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
    ...props
  }) => {
    return (
      <>
        <input
          {...props}
          className="border-2 border-black/[.20] p-2 rounded-full"
        />
      </>
    );
  };

export default Input;
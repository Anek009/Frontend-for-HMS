type Props = {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>; // Allow optional onClick
};

const Button = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-600"
    >
      {children}
    </button>
  );
};

export default Button;


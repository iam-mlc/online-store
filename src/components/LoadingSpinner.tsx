import { Spinner } from "@/components/Icons";

interface LoadingSpinnerProps {
  className?: string;
}
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className }) => {
  return (
    <div
      className={
        className !== undefined
          ? className
          : "w-full h-full absolute top-0 overflow-hidden backdrop-blur-lg bg-black/[.20] z-[200] "
      }
    >
      <div className="relative group h-full w-full flex justify-center items-center">
        <div className="h-[30%] w-[30%]">
          <Spinner />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
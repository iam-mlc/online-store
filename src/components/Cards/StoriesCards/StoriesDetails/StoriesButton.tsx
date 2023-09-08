import { Action } from "react-insta-stories/dist/interfaces";


interface StoriesButtonProps {
    toggleMore: (show: boolean) => void;
    action: Action;
  }

const StoriesButton: React.FC<StoriesButtonProps> = ({ toggleMore, action }) => {
    return (
      <>
        <button
          className="text-2xl font-bold relative text-center text-Black p-4 bg-gray-200 block w-full"
          onClick={() => toggleMore(true)}
        >
          See More
        </button>
      </>
    );
  };

export default StoriesButton;
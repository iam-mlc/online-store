import StoriesCard1 from "@/components/Cards/StoriesCards/StoriesCard1";
import { WithHeader } from "react-insta-stories";
import { WithSeeMore } from "react-insta-stories";
import { Story } from "react-insta-stories/dist/interfaces";

interface ContentParams {
  action: (action: string, bufferAction?: boolean) => void;
  isPaused?: boolean;
  story: Story;
  config: {
    width?: number | string;
    height?: number | string;
    loader?: JSX.Element;
    header?: Function;
    storyStyles?: Object;
  };
}

interface StoriesContentProps extends ContentParams {
  data: Record<string, any>;
}

const StoriesContent: React.FC<StoriesContentProps> = ({
  story,
  config,
  action,
  data,
}) => {
  return (
    <WithHeader story={story} globalHeader={config.header}>
      <WithSeeMore story={story} action={action}>
        <StoriesCard1
          title={data.title}
          price={data.price}
          productImage={data.thumbnail}
          description={data.description}
          action={action}
        />
      </WithSeeMore>
    </WithHeader>
  );
};

export default StoriesContent;

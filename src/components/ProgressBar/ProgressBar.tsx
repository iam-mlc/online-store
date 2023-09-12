
interface ProgressBarProps{
    progress: number
}

const ProgressBar : React.FC<ProgressBarProps>= ({ progress }) => {

    // console.log(progress)

    return (
        <div className="relative h-[0.25em] w-full bg-gray-200 shadow-inner">
            <div className={`absolute inset-0 h-full bg-black transition-all duration-200 rounded-full`} style={{ width: `${progress}%` }}/>
        </div>
    );
}

export default ProgressBar;
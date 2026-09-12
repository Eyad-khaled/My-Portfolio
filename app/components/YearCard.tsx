interface Year {
  year: string;
  progress: number;
  title: string;
  description: string;
  xDirection: "left" | "right";
  yDirection: "top" | "bottom";
}

interface YearCardProps {
  year: Year;
  className?: string;
}

const REEL_HEIGHT = 58; // px — must match h-12 below
const REEL_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const START_YEAR = "0";

const DigitReel = ({
  startDigit,
  targetDigit,
}: {
  startDigit: number;
  targetDigit: number;
}) => {
  const startY = -(startDigit * REEL_HEIGHT);

  return (
    <div className="relative h-12 w-10 overflow-hidden">
      <div
        className="card-year-reel absolute top-0 left-0 flex flex-col"
        data-start-digit={startDigit}
        data-target-digit={targetDigit}
        style={{ transform: `translateY(${startY}px)` }}
      >
        {REEL_DIGITS.map((digit, i) => (
          <span key={i} className="h-12 leading-[3rem] block text-center">
            {digit}
          </span>
        ))}
      </div>
    </div>
  );
};

const YearCard = ({ year, className = "" }: YearCardProps) => {
  const [startTens, startUnits] = START_YEAR.split("").map(Number);
  const [targetTens, targetUnits] = year.year.split("").map(Number);

  return (
    <div
      data-progress={year.progress}
      data-x-direction={year.xDirection}
      data-y-direction={year.yDirection}
      className={`bg-[#dfdececc] p-5 rounded-lg w-80 h-55 absolute top-0 left-0 ${className}`}
    >
      <div className="flex items-center text-6xl text-[#2e78ff] font-bold card-year origin-left font-archivo-black">
        <span>'</span>
        <DigitReel startDigit={startTens} targetDigit={targetTens} />
        <DigitReel startDigit={startUnits} targetDigit={targetUnits} />
      </div>

      <h1 className="text-2xl text-black font-bold pt-2 capitalize card-title font-hand">
        {year.title}
      </h1>
      <p className="font-light font-cursive text-[17px] text-black opacity-75 capitalize absolute bottom-5 left-5 max-w-[90%] card-description">
        {year.description}
      </p>
    </div>
  );
};

export default YearCard;
export type { Year };
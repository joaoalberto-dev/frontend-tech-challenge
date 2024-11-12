import { Divider } from "../divider/divider";

type BattleFieldProps = {
  left: React.ReactNode;
  right: React.ReactNode;
  center?: React.ReactNode;
};

function BattleField({ left, center, right }: BattleFieldProps) {
  return (
    <div className="flex min-h-screen pb-[100px]">
      <div className="relative flex-auto w-1/2 min-h-screen lg:flex-1">
        {left}
      </div>
      <Divider>{center}</Divider>
      <div className="relative flex-auto w-1/2 min-h-screen lg:flex-1">
        {right}
      </div>
    </div>
  );
}

export { BattleField };

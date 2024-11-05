type DividerProps = {
  children?: React.ReactNode;
};

function Divider({ children = null }: DividerProps) {
  return (
    <div className="w-[4px] lg:w-[10px] fixed left-1/2 -translate-x-1/2 h-dvh bg-neutral-950 z-10 flex flex-col items-center justify-center gap-4">
      <div className="w-[30px] h-[30px] lg:w-[80px] lg:h-[80px] bg-neutral-950 text-white flex items-center justify-center font-bold lg:text-2xl shadow-md rounded-full">
        VS
      </div>
      {children}
    </div>
  );
}

export { Divider };

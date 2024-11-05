function Center({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex w-full h-full justify-center items-center">
      {children}
    </div>
  );
}

export { Center };

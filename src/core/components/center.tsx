function Center({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center w-full h-full">
      {children}
    </div>
  );
}

export { Center };

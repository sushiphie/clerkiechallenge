export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center mt-[20px] px-2">
      {[...Array(9)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-start justify-center px-[30px] border border-border-grey rounded shadow mb-[15px] w-[1050px] h-[114px]"
        >   
          <span
            className="inline-block bg-linear-grey h-[17px] w-full rounded-xl animate-pulse mb-2 animate-fade-out"
              style={{
                animationDelay: "0.05",
                animationDuration: "1s",
              }}
          />

          <span
            className="inline-block bg-linear-grey h-[12px] w-full rounded-xl animate-pulse animate-fade-out"
              style={{
                animationDelay: "0.05",
                animationDuration: "1s",
              }}
          />
        </div>
      ))}
      ;
    </div>
  );
}

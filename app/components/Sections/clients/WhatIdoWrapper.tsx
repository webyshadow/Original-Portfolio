import ServicesCarousel from "./WhatIdo";

const WhatIdoWrapper = () => {
  return (
    <section className="w-full py-16 bg-white max-h-screen">
      <div className="mx-auto flex max-w-12xl flex-col md:flex-row">

                {/* 80% column – carousel */}
        <div className="md:basis-[75%] md:max-w-[75%] mt-[5vw]">
          <ServicesCarousel />
        </div>
        {/* 20% column */}
        <div className="hidden md:basis-[25%] md:max-w-[25%] lg:flex md:flex-col">
          <div className="hidden md:block h-10 rounded-full " />
          <div>
            <h2 className="mt-2 text-[5.8vw] font-extrabold capitalize w-[20vw] tracking-tight leading-[1em] text-black text-end">
              What I can do for you with what stack
            </h2>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIdoWrapper;

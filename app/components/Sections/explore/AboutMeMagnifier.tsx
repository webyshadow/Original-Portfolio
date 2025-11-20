import { useEffect, useRef, useState } from "react";

const MAG_RADIUS = 210; // magnifier radius (px)

const AboutSection = () => {
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 }); // off-screen init
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // move handler only inside section
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    // hide magnifier when leaving section
    setMousePos({ x: -9999, y: -9999 });
  };

  // draw magnifier outline
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // if mouse is "hidden", don't draw
    if (mousePos.x < 0 || mousePos.y < 0) return;

    ctx.save();

    // Outer border
    ctx.beginPath();
    ctx.arc(mousePos.x, mousePos.y, MAG_RADIUS, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0,0,0,0.35)";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Inner glass ring
    ctx.beginPath();
    ctx.arc(mousePos.x, mousePos.y, MAG_RADIUS - 4, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }, [mousePos]);

  const showMag = mousePos.x >= 0 && mousePos.y >= 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-white"
      style={{ cursor: "none" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Canvas for magnifier outline (inside section only) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-50"
      />

      {/* BASE LAYER: normal view of whole section */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Large ABOUT ME base text (soft) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="text-[12vw] font-black tracking-tight leading-none whitespace-nowrap"
            style={{
              color: "rgba(0,0,0,0.03)",
              WebkitTextStroke: "1px rgba(0,0,0,0.10)",
            }}
          >
            ABOUT ME
          </h1>
        </div>

        {/* Biographical text (normal) */}
        <div className="absolute inset-0 p-6 md:p-12 text-xs md:text-sm leading-relaxed font-light text-black/80">
          {/* Top left quadrant */}
          <div className="absolute top-6 left-6 w-[20%] space-y-3">
            <p>
              Hi, I&apos;m Shadmaan Ansari — a full‑stack MERN developer from
              Bareilly, Uttar Pradesh, India. I build web experiences that try
              to feel effortless on the surface and well‑engineered underneath.
            </p>
            <p>
              Most of my work lives in React and Next.js, backed by Node,
              Express and MongoDB, with motion and detail handled through
              Tailwind and modern animation tools.
            </p>
          </div>

          {/* Top right quadrant */}
          <div className="absolute top-6 right-6 w-[20%] space-y-3 text-right">
            <p>
              I like mixing engineering with UI/UX and visual design, so I often
              own both the interface and the architecture: components, states
              and interactions all speaking the same design language.
            </p>
            <p>
              From landing pages and dashboards to full products, I focus on
              interfaces that stay fast, minimal and expressive.
            </p>
          </div>

          {/* Bottom left quadrant */}
          <div className="absolute bottom-6 left-6 w-[20%] space-y-3">
            <p>
              I&apos;m currently pursuing BCA at Future Institute in Bareilly,
              balancing university with freelance work and portfolio
              experiments.
            </p>
            <p>
              I&apos;ve spent the last couple of years building with the MERN
              stack, learning from real projects instead of just tutorials.
            </p>
          </div>

          {/* Bottom right quadrant */}
          <div className="absolute bottom-6 right-6 w-[20%] space-y-3 text-right">
            <p>
              Along the way I&apos;ve worked with clients from India and abroad,
              including UK‑based teams, and interned as a MERN developer at
              Webseeder Technologies.
            </p>
            <p>
              That mix of freelance, internships and personal builds is slowly
              shaping my own studio‑style approach to front‑end products.
            </p>
          </div>

          {/* Top-left secondary (personal sub‑para) */}
          <div className="absolute top-[35%] left-6 w-[7%] text-[0.65rem] opacity-70 leading-relaxed">
            <p>
              Most days are split between shipping client work and quietly
              polishing my own ideas. I enjoy taking rough concepts and turning
              them into interfaces that feel clean, intentional and easy to live
              with.
            </p>
          </div>

          {/* Top-right secondary (personal sub‑para) */}
          <div className="absolute top-[83%] right-[31vw] w-[17%] text-[0.65rem] opacity-70 text-right leading-relaxed">
            <p>
              I care a lot about the small things: how a button responds, how a
              layout breathes, how a transition feels. Those details are where a
              product stops feeling generic and starts feeling designed.
            </p>
          </div>

          {/* Bottom-left secondary (personal sub‑para) */}
          <div className="absolute bottom-[5%] left-[30vw] w-[17%] text-[0.65rem] opacity-70 leading-relaxed">
            <p>
              Collaboration matters to me. Whether it&apos;s working with a
              remote team or guiding a non‑technical client, I like turning
              ideas into a clear roadmap and then into something real on screen.
            </p>
          </div>

          {/* Bottom-right secondary (personal sub‑para) */}
          <div className="absolute bottom-[35%] right-6 w-[7%] text-[0.65rem] opacity-70 text-right leading-relaxed">
            <p>
              Outside pure development, I keep experimenting with motion, 3D and
              visual storytelling. It&apos;s my way of making web products feel
              a bit more cinematic without losing clarity or performance.
            </p>
          </div>

          {/* Far top-left corner (personal sub‑para) */}
          <div className="absolute top-[12%] left-[29vw] w-[13%] text-[0.6rem] opacity-60 leading-relaxed">
            <p>
              Curiosity drives most of my work. If something looks interesting,
              I&apos;ll usually try to break it down, rebuild it and understand
              why it feels the way it does.
            </p>
          </div>

          {/* Far top-right corner (personal sub‑para) */}
          <div className="absolute top-10 right-[35vw] w-[13%] text-[0.6rem] opacity-60 text-right leading-relaxed">
            <p>
              Over time that mindset has helped me move from copying designs to
              building my own systems, patterns and opinions about what good
              front‑end actually is.
            </p>
          </div>
        </div>
      </div>

      {/* MAGNIFIED LAYER: same content but clipped + enhanced */}
      {showMag && (
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            clipPath: `circle(${MAG_RADIUS}px at ${mousePos.x}px ${mousePos.y}px)`,
          }}
        >
          {/* Large ABOUT ME base text (stronger + scaled) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1
              className="text-[12vw] font-black tracking-tight leading-none whitespace-nowrap"
              style={{
                color: "#111827",
                WebkitTextStroke: "1px rgba(0,0,0,0.3)",
                transform: "scale(1.08)",
                filter: "contrast(1.1) brightness(1.05)",
              }}
            >
              ABOUT{" "}
              <span
                style={{
                  color: "rgb(240, 129, 15)",
                }}
              >
                ME
              </span>
            </h1>
          </div>

          {/* Biographical text (darker + slightly scaled) */}
          <div
            className="absolute inset-0 p-6 md:p-12 text-xs md:text-sm leading-relaxed font-light"
            style={{
              color: "#020617",
              transform: "scale(1.03)",
              transformOrigin: `${mousePos.x}px ${mousePos.y}px`,
              filter: "contrast(1.1) brightness(1.05)",
            }}
          >
            {/* Top left quadrant */}
            <div className="absolute top-6 left-6 w-[20%] space-y-3">
              <p>
                Hi, I&apos;m Shadmaan Ansari — a full‑stack MERN developer from
                Bareilly, Uttar Pradesh, India. I build web experiences that try
                to feel effortless on the surface and well‑engineered
                underneath.
              </p>
              <p>
                Most of my work lives in React and Next.js, backed by Node,
                Express and MongoDB, with motion and detail handled through
                Tailwind and modern animation tools.
              </p>
            </div>

            {/* Top right quadrant */}
            <div className="absolute top-6 right-6 w-[20%] space-y-3 text-right">
              <p>
                I like mixing engineering with UI/UX and visual design, so I
                often own both the interface and the architecture: components,
                states and interactions all speaking the same design language.
              </p>
              <p>
                From landing pages and dashboards to full products, I focus on
                interfaces that stay fast, minimal and expressive.
              </p>
            </div>

            {/* Bottom left quadrant */}
            <div className="absolute bottom-6 left-6 w-[20%] space-y-3">
              <p>
                I&apos;m currently pursuing BCA at Future Institute in Bareilly,
                balancing university with freelance work and portfolio
                experiments.
              </p>
              <p>
                I&apos;ve spent the last couple of years building with the MERN
                stack, learning from real projects instead of just tutorials.
              </p>
            </div>

            {/* Bottom right quadrant */}
            <div className="absolute bottom-6 right-6 w-[20%] space-y-3 text-right">
              <p>
                Along the way I&apos;ve worked with clients from India and
                abroad, including UK‑based teams, and interned as a MERN
                developer at Webseeder Technologies.
              </p>
              <p>
                That mix of freelance, internships and personal builds is slowly
                shaping my own studio‑style approach to front‑end products.
              </p>
            </div>

            {/* Top-left secondary */}
            <div className="absolute top-[35%] left-6 w-[7%] text-[0.65rem] leading-relaxed">
              <p>
                Most days are split between shipping client work and quietly
                polishing my own ideas. I enjoy taking rough concepts and
                turning them into interfaces that feel clean, intentional and
                easy to live with.
              </p>
            </div>

            {/* Top-right secondary */}
            <div className="absolute top-[83%] right-[31vw] w-[17%] text-[0.65rem] text-right leading-relaxed">
              <p>
                I care a lot about the small things: how a button responds, how
                a layout breathes, how a transition feels. Those details are
                where a product stops feeling generic and starts feeling
                designed.
              </p>
            </div>

            {/* Bottom-left secondary */}
            <div className="absolute bottom-[5%] left-[30vw] w-[17%] text-[0.65rem] leading-relaxed">
              <p>
                Collaboration matters to me. Whether it&apos;s working with a
                remote team or guiding a non‑technical client, I like turning
                ideas into a clear roadmap and then into something real on
                screen.
              </p>
            </div>

            {/* Bottom-right secondary */}
            <div className="absolute bottom-[35%] right-6 w-[7%] text-[0.65rem] text-right leading-relaxed">
              <p>
                Outside pure development, I keep experimenting with motion, 3D
                and visual storytelling. It&apos;s my way of making web products
                feel a bit more cinematic without losing clarity or performance.
              </p>
            </div>

            {/* Far top-left */}
            <div className="absolute top-[12%] left-[29vw] w-[13%] text-[0.6rem] leading-relaxed">
              <p>
                Curiosity drives most of my work. If something looks
                interesting, I&apos;ll usually try to break it down, rebuild it
                and understand why it feels the way it does.
              </p>
            </div>

            {/* Far top-right */}
            <div className="absolute top-10 right-[35vw] w-[13%] text-[0.6rem] text-right leading-relaxed">
              <p>
                Over time that mindset has helped me move from copying designs
                to building my own systems, patterns and opinions about what
                good front‑end actually is.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutSection;

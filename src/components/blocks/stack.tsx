"use client";

import "./local-css.css";
import { FaHtml5, FaJava, FaPython, FaReact } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io";
import { SiCplusplus } from "react-icons/si";

const stackItems = [
  { name: "JavaScript", icon: <IoLogoJavascript /> },
  { name: "Python",     icon: <FaPython /> },
  { name: "React",      icon: <FaReact /> },
  { name: "Java",       icon: <FaJava /> },
  { name: "C++",        icon: <SiCplusplus /> },
  { name: "HTML",       icon: <FaHtml5 /> },
  { name: "CSS",        icon: <FaCss3Alt /> },
];

export default function Stack() {
  return (
    <div className="w-full flex bg-card flex-col items-center py-8">
      <h2 className="text-muted-foreground mb-12 tracking-widest text-xs font-medium">
        TECNOLOGIAS QUE VOCÊ VAI DOMINAR
      </h2>
      <div
        className="w-full overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <div
          className="flex w-max py-6 animate-marquee"
          onMouseEnter={(e) =>
            (e.currentTarget.style.animationPlayState = "paused")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.animationPlayState = "running")
          }
        >
          {stackItems.map((item, i) => (
            <Item key={`a-${i}`} item={item} />
          ))}
          {stackItems.map((item, i) => (
            <Item key={`b-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Item({ item }: { item: { name: string; icon: React.ReactNode } }) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 sm:px-10 md:px-12 cursor-pointer group transition-transform duration-300 ease-in-out hover:scale-125">
      <span className="text-4xl sm:text-5xl text-muted-foreground transition-colors duration-300 group-hover:text-primary">
        {item.icon}
      </span>
      <p className="text-xs sm:text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors duration-300 group-hover:text-primary">
        {item.name}
      </p>
    </div>
  );
}
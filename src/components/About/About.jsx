import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import {VerticalTimeline,VerticalTimelineElement,} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import SchoolIcon from "@mui/icons-material/School";
// import StarIcon from "@mui/icons-material/Star";
import EventIcon from '@mui/icons-material/Event';
import { GrWorkshop } from "react-icons/gr";
import { TbPodium } from "react-icons/tb";
import { GoProjectSymlink } from "react-icons/go";

const About = () => {
  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        <motion.img
          src="https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/gboyrhzs1ojgyne6vhyd"
          alt="doc"
          className="w-full h-full object-cover absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 0.8 }}
          transition={{ duration: 5, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 md:px-20 z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 font-[Inter]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Design O Crats (DOC)
          </motion.h1>

          <p className="text-lg md:text-xl max-w-3xl">
            <Typewriter
              words={[
                "A dynamic platform where creativity, innovation, and design converge to inspire and foster new ideas in the field of architecture.",
              ]}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={50}
            />
          </p>
        </div>
      </div>

      <VerticalTimeline className="cursor-pointer">
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
          date="2025 - present"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<GrWorkshop />}
        >
          <h3 className="vertical-timeline-element-title md:text-xl font-[Inter]">
            Architectural Workshops
          </h3>
          <p>
            Hands-on workshops focusing on architectural software tools,
            equipping participants with essential practical skills
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
          icon={<TbPodium />}
        >
          <h3 className="vertical-timeline-element-title md:text-xl font-[Inter]">Expert Lectures</h3>
          <p>
            Lectures from renowned experts sharing industry insights,
            experiences, and the latest trends in architecture
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<GoProjectSymlink />}
        >
          <h4 className="vertical-timeline-element-title md:text-xl font-[Inter]">
            Project Development
          </h4>
          <p>
            Opportunities to bridge theory and practice by developing real-world
            architectural projects
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
          icon={<EventIcon />}
        >
          <h4 className="vertical-timeline-element-title md:text-xl font-[Inter]">
            Fun & Engaging Events
          </h4>
          <p>
            Creative events like Crats Alley and Braintecture that encourage
            exploration and networking in a relaxed atmosphere
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<GrWorkshop />}
        >
          <h4 className="vertical-timeline-element-title md:text-xl font-[Inter]">Workshops</h4>
          <p>
            Hands-on sessions cover Monolithic Expression, Fabrication, AutoCAD,
            SketchUp, and Photoshop, equipping students with essential design
            and technical skills
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
          icon={<TbPodium />}
        >
          <h4 className="vertical-timeline-element-title md:text-xl font-[Inter]">
            Guest Lecture and Expert talk
          </h4>
          <p>
            Renowned architects like Ajay Sharma and Siddharth Gautam share
            insights on motivation, innovation, and sustainability in
            architecture
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<SchoolIcon />}
        >
          <h4 className="vertical-timeline-element-title md:text-xl font-[Inter]">Events</h4>
          <p>
            DOC hosts engaging events like Crats Alley, a gaming challenge, and
            Braintecture Quiz
          </p>
        </VerticalTimelineElement>
        {/* <VerticalTimelineElement
          iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
          icon={<StarIcon />}
        /> */}
      </VerticalTimeline>
    </>
  );
};

export default About;

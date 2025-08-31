import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { LiaCanadianMapleLeaf } from "react-icons/lia";

export function CustomVerticalTimeline() {

    return (
        <>
        <VerticalTimeline className='gap-8 p-6'>
             <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: '#A32B0A', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid #A32B0A' }}
              date="May 2025 - Aug. 2025"
              iconStyle={{ background: '#A32B0A', color: '#fff' }}
              icon={<LiaCanadianMapleLeaf />}
            >
              <span className="vertical-timeline-element-title text-white font-bold">Client Management Analyst</span>
              <span className="vertical-timeline-element-subtitle text-white font-semibold"><br />Finance Canada </span>
              <span className="vertical-timeline-element-subtitle text-white"><br />Ottawa, ON</span>
              <span className="text-white"> Canada </span>
            </VerticalTimelineElement>  

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: '#426100', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid #426100' }}
              date="Jan. 2025 - Apr. 2025"
              iconStyle={{ background: '#426100', color: '#fff' }}
              icon={<LiaCanadianMapleLeaf />}
            >
              <span className="vertical-timeline-element-title text-white font-bold">Analyst </span>
              <span className="vertical-timeline-element-subtitle text-white font-semibold"><br />Public Safety Canada</span>
              <span className="vertical-timeline-element-subtitle text-white"><br />Ottawa, ON</span>
              <span className="text-white"> Canada </span>
            </VerticalTimelineElement>  

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: '#005E8A', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid #005E8A' }}
              date="Sept. 2024 - Dec. 2024"
              iconStyle={{ background: '#005E8A', color: '#fff' }}
              icon={<LiaCanadianMapleLeaf />}
            >
              <span className="vertical-timeline-element-title text-white font-bold">Level 1 Analyst </span>
              <span className="vertical-timeline-element-subtitle text-white font-semibold"><br />Royal Canadian Mounted Police</span>
              <span className="vertical-timeline-element-subtitle text-white"><br />Ottawa, ON</span>
              <span className="text-white"> Canada </span>
            </VerticalTimelineElement>  

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: '#705000', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid #705000' }}
              date="May 2024 - Aug. 2024"
              iconStyle={{ background: '#705000', color: '#fff' }}
              icon={<LiaCanadianMapleLeaf />}
            >
              <span className="vertical-timeline-element-title text-white font-bold">Data Scientist for Complex Systems </span>
              <span className="vertical-timeline-element-subtitle text-white font-semibold"><br />National Research Council of Canada</span>
              <span className="vertical-timeline-element-subtitle text-white"><br />Ottawa, ON</span>
              <span className="text-white"> Canada </span>
            </VerticalTimelineElement>  
          </VerticalTimeline>
        </>
    );
}

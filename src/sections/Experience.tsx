import React from "react";
import { Timeline } from "../components/ui/timeline";
import { PolaroidStack } from "../components/ui/polaroid-stack";

const Experience: React.FC = () => {
  const data = [

    {
      title: "2025",
      content: (
        <div className="mb-20 md:mb-40">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
            Sistema Pet
          </h3>
          <p className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
            Software Developer Intern <span className="text-sm font-normal opacity-70">— May 2025 - July 2025</span>
          </p>
          <ul className="space-y-3 ml-5 list-disc" style={{ color: 'var(--text-muted)' }}>
            <li className="leading-relaxed">Led the back-end development of an electronic time-tracking system using PHP, MySQL, HTML, CSS and JavaScript.</li>
            <li className="leading-relaxed">Integration of the Meta API for secure delivery of password recovery links/codes.</li>
            <li className="leading-relaxed">Developed systemic automation via the OpenAI/GPT API for natural language database queries.</li>
            <li className="leading-relaxed">Designed and implemented complex business logic for automatic record recalculation.</li>
            <li className="leading-relaxed">Managed version control and source code using Git and GitHub.</li>
          </ul>

          <div className="flex justify-center" style={{ marginTop: '30px' }}>
            <PolaroidStack
              images={[
                { src: "/images/sp.png", alt: "Preview 1", caption: "Home Office Day" },
                { src: "/images/sp2.png", alt: "Preview 2", caption: "Prototype System" },
                { src: "/images/sp3.png", alt: "Preview 3", caption: "The Corporate Office" },
              ]}
            />
          </div>

        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div className="mb-20 md:mb-40">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
            NSC Comunicação
          </h3>
          <p className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
            IT Intern <span className="text-sm font-normal opacity-70">— Sept 2024 - May 2025</span>
          </p>
          <ul className="space-y-3 ml-5 list-disc" style={{ color: 'var(--text-muted)' }}>
            <li className="leading-relaxed">Provided support to employees using the JD Edwards system.</li>
            <li className="leading-relaxed">Managed user access and permissions through Active Directory.</li>
            <li className="leading-relaxed">Handled support tickets via ServiceNow.</li>
            <li className="leading-relaxed">Updated and created system documentation, publishing it on SharePoint and Confluence.</li>
          </ul>

          <div className="flex justify-center" style={{ marginTop: '30px' }}>
            <PolaroidStack
              images={[
                { src: "/images/nsc.png", alt: "Office entrance", caption: "Main Entrance" },
                { src: "/images/nsc1.png", alt: "My first day", caption: "First Day in Office" },
                { src: "/images/nsc2.png", alt: "Selfie photo in office", caption: "Selfie in Office" },
                { src: "/images/nsc3.png", alt: "Women's day", caption: "Women's Day" },
                { src: "/images/nsc4.png", alt: "Carnaval", caption: "Carnaval" },
                { src: "/images/nsc5.png", alt: "Meeting with interns", caption: "Interns Meeting" },
                { src: "/images/nsc6.PNG", alt: "Another meeting with interns", caption: "Interns Meeting 2" },
              ]}
            />
          </div>

        </div>
      ),
    },
    {
      title: "2020",
      content: (
        <div className="mb-20 md:mb-40">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
            Flex Contact Center
          </h3>
          <p className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
            Customer Service Representative <span className="text-sm font-normal opacity-70">— Jun 2020 - July 2022</span>
          </p>
          <ul className="space-y-3 ml-5 list-disc" style={{ color: 'var(--text-muted)' }}>
            <li className="leading-relaxed">Answer phone calls about credit card issues and help the customer to solve problems with the app.</li>
            <li className="leading-relaxed">Help colleagues solve complex problems, assist individuals with hearing impairments.</li>
            <li className="leading-relaxed">Utilize Salesforce to verify customer data and provide accurate guidance and instructions.</li>
          </ul>

          <div className="flex justify-center" style={{ marginTop: '30px' }}>
            <PolaroidStack
              images={[
                { src: "/images/flex.png", alt: "Office entrsnce", caption: "Main Entrance" },
                { src: "/images/flex2.png", alt: "Last day of training", caption: "End of Salesforce Training" },
                { src: "/images/flex3.png", alt: "Christmas in office", caption: "Christmas", rotation: -80 },
              ]}
            />
          </div>

        </div>
      ),
    },
  ];

  return (
    <section
      id="experience"
      className="py-32 flex flex-col items-center transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="w-full max-w-4xl">
        <Timeline data={data} />
      </div>
    </section>
  );
};

export default Experience;

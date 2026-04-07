import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      EN: {
        translation: {
          "hero.greeting": "Hi, my name is",
          "hero.role": "Full Stack Developer",
          "hero.description": "Bachelor's in Information Systems",
          "tech.title": "Tech",
          "tech.subtitle": "Stack",
          "contact.title": "Contact Me",
          "contact.welcome": "Hey there! We're excited to link 🔗",
          "contact.input_label": "enter",
          "contact.fields.email": "email",
          "contact.fields.name": "name",
          "contact.fields.company": "company",
          "contact.fields.description": "description",
          "contact.invalidEmail": "Please enter a valid email",
          "contact.codeSendError": "Failed to send verification code. Please check your email and try again.",
          "contact.invalidCode": "Invalid code. Please try again.",
          "contact.fields.code": "code",
          "contact.steps.email": "To start, could you give us your email?",
          "contact.steps.code": "We sent a 6-digit verification code to your email. Please enter it below. (Check your spam folder if you don't see it)",
          "contact.steps.codeVerified": "Email verified!",
          "contact.steps.sendingCode": "Sending verification code to your email...",
          "contact.steps.name": "Awesome! And what's your name?",
          "contact.steps.company": "Got it! What is your company name?",
          "contact.steps.optional": "if not company, write anything",
          "contact.steps.help": "Perfect, and how can we help you?",
          "contact.summary.title": "Beautiful! Here's what we've got:",
          "contact.summary.confirm": "Look good?",
          "contact.buttons.restart": "Restart",
          "contact.buttons.send": "Send it!",
          "contact.success.sent": "Sent!",
          "contact.success.thanks": "We'll get back to you ASAP 😎",
          "projects.title": "Projects",
          "projects.list": [
            {
              title: "My Portfolio",
              description: "This website you are browsing, built with React, TypeScript and Tailwind CSS, focused on performance and design responsivity.",
              tech: ["React", "TypeScript", "Tailwind"],
              link: "#",
              image: "images/projects/capaPortfolio.png",
              cover: "images/projects/capaPortfolio.png"
            },
            {
              title: "Extension Project",
              description: "Youth Protagonism in the Digital Era",
              tech: ["Teaching", "Informatics", "Community"],
              link: "https://drive.google.com/file/d/1LUM4euMbWL19hjXX-KYLRIWYS_AZ1day/view?usp=sharing",
              image: "images/projects/capaExtensao.png",
              cover: "images/projects/capaExtensao.png"
            },
            {
              title: "E-commerce Platform",
              description: "Full-stack e-commerce application with payment integration, product catalog, and user authentication.",
              tech: ["HTML", "CSS", "JavaScript"],
              link: "https://thuanykamers.github.io/DressUP/",
              image: "images/projects/dressup.png"
            },
            {
              title: "Electronic Time-Tracking System",
              description: "Development of a solution for work schedule and time bank management, focused on legal compliance (CLT/Portaria 671). The project integrates complex logic flows, auditable data modeling, and AI-powered support.",
              tech: ["PHP", "MySQL", "HTML", "CSS", "JS", "APIs"],
              link: "https://skinny-protest-638.notion.site/Sistema-de-Ponto-Eletr-nico-3373f2d9e43b80148ce6d1cb4740ea06?source=copy_link",
              image: "images/projects/capatimeproject.png",
              cover: "images/projects/capatimeproject.png"
            }
          ],
          "achievements.title": "Achievements",
          "achievements.sw.badge": "3rd Place",
          "achievements.sw.date": "April 25-27, 2025",
          "achievements.sw.location": "São José, Santa Catarina, Brazil",
          "achievements.sw.description": "Competed in a 54-hour hackathon focused on cybersecurity, developing the MVP of VerifiCAR — a solution where buyers can verify if a vehicle ad link is authentic.",
          "achievements.sw.theme": "Cybersecurity",
          "achievements.sw.placement": "Placement",
          "achievements.sw.dateLabel": "Date",
          "achievements.sw.locationLabel": "Location",
          "achievements.sw.pitch": "Pitch Deck",
          "achievements.sw.graphs": "Validation Data",
          "achievements.sw.frontend": "Front-end Code",
          "achievements.comingSoon": "Coming Soon",
          "nav.experience": "Experience",
          "nav.international": "International",
          "nav.techStack": "Tech Stack",
          "nav.projects": "Projects",
          "nav.achievements": "Achievements",
          "nav.contact": "Contact",
          "exp.title": "IT Experience",
          "exp.sp.role": "Software Developer Intern",
          "exp.sp.period": "May 2025 - July 2025",
          "exp.sp.tasks": [
            "Led the back-end development of an electronic time-tracking system using PHP, MySQL, HTML, CSS and JavaScript.",
            "Integration of the Meta API for secure delivery of password recovery links/codes.",
            "Developed systemic automation via the OpenAI/GPT API for natural language database queries.",
            "Designed and implemented complex business logic for automatic record recalculation.",
            "Managed version control and source code using Git and GitHub."
          ],
          "exp.sp.captions": ["Home Office Day", "Prototype System", "The Corporate Office"],
          "exp.nsc.role": "IT Intern",
          "exp.nsc.period": "Sept 2024 - May 2025",
          "exp.nsc.tasks": [
            "Provided support to employees using the JD Edwards system.",
            "Managed user access and permissions through Active Directory.",
            "Handled support tickets via ServiceNow.",
            "Updated and created system documentation, publishing it on SharePoint and Confluence."
          ],
          "exp.nsc.captions": ["Main Entrance", "First Day in Office", "Selfie in Office", "Women's Day", "Carnaval", "Interns Meeting", "Interns Meeting 2"],
          "exp.flex.role": "Customer Service Representative",
          "exp.flex.period": "Jun 2020 - July 2022",
          "exp.flex.tasks": [
            "Answer phone calls about credit card issues and help the customer to solve problems with the app.",
            "Help colleagues solve complex problems.",
            "Provide customer support via chat.",
            "Utilize Salesforce to verify customer data and provide accurate guidance and instructions."
          ],
          "exp.flex.captions": ["Main Entrance", "End of Salesforce Training", "Christmas"],
          "intl.title": "International Experience",
          "intl.brazil": "Brazil",
          "intl.brazil.city": "São José, SC",
          "intl.brazil.jobs": [
            { "period": "2018", "role": "English Teacher", "company": "CAIC Prof. Febrônio Tancredo de Oliveira", "description": "Taught ESL to middle school students (6th–9th grade). Created tests and assignments to assess proficiency. Developed interactive games and activities to boost engagement and participation." },
            { "period": "2022", "role": "Store Manager", "company": "Cacau Show — Shopping Continente", "description": "Managed daily store operations in a mall environment. Led customer service and sales. Handled inventory control, store layout, and stockroom logistics. Trained and supervised new staff. Managed documents and reports using Master Retail PDV." }
          ],
          "intl.portugal": "Portugal",
          "intl.portugal.city": "Lisboa / Palmela, Setúbal",
          "intl.portugal.jobs": [
            { "period": "2023-24", "role": "Waitress at 5-Star Hotel", "company": "Talenter — Lisboa", "description": "Premium service at a 5-star hotel and casino, covering breakfast, dinner, and coffee breaks. Worked large-scale events at the hotel and casino. Wine service and international guest relations, requiring polished etiquette and multilingual fluency. Managed multiple tables simultaneously during peak hours while maintaining quality and guest satisfaction." },
            { "period": "2023", "role": "Line Operator", "company": "Hit & Fit Holding", "description": "Operated on a tomato product manufacturing line (sauces and concentrates), ensuring smooth filling and packaging processes. Strictly applied food hygiene and safety standards (HACCP) to guarantee product integrity. Performed visual and technical inspection of the production line to identify and remove non-conforming products." },
            { "period": "2023-24", "role": "Line Operator", "company": "Hanon Systems — Palmela, Setúbal", "description": "Worked on the production line of automotive components for AutoEuropa (Volkswagen Group), following strict quality and cycle-time standards. Performed technical part inspections to ensure compliance with automotive industry norms, preventing defects on the final assembly line. Collaborated in a high-pace industrial environment, maintaining productivity and operational safety." }
          ],
          "intl.germany": "Germany",
          "intl.germany.city": "Aachen",
          "intl.germany.jobs": [
            { "period": "2025-26", "role": "Sortation Associate", "company": "Amazon", "description": "Worked in a high-volume logistics center focused on Problem Solve and Quality Control. Executed Induct (package intake) and Stow (storage) tasks, ensuring inventory accuracy. Operated entirely in English with some German, requiring clear and fast communication in a dynamic environment. Fully committed to productivity targets and operational safety standards." }
          ]
        }
      },
      PT: {
        translation: {
          "hero.greeting": "Olá, meu nome é",
          "hero.role": "Desenvolvedora Full Stack",
          "hero.description": "Bacharel em Sistemas de Informação",
          "tech.title": "Stack",
          "tech.subtitle": "Tecnológica",
          "contact.title": "Contate-me",
          "contact.welcome": "Olá! Ficamos felizes em fazer essa conexão 🔗",
          "contact.input_label": "digite seu",
          "contact.fields.email": "email",
          "contact.fields.name": "nome",
          "contact.fields.company": "empresa",
          "contact.fields.description": "mensagem",
          "contact.invalidEmail": "Por favor, digite um email válido",
          "contact.codeSendError": "Falha ao enviar código de verificação. Verifique seu email e tente novamente.",
          "contact.invalidCode": "Código inválido. Tente novamente.",
          "contact.fields.code": "código",
          "contact.steps.email": "Para começar, poderia nos informar seu email?",
          "contact.steps.code": "Enviamos um código de 6 dígitos para seu email. Digite-o abaixo. (Verifique a caixa de spam caso não encontre)",
          "contact.steps.codeVerified": "Email verificado!",
          "contact.steps.sendingCode": "Enviando código de verificação para seu email...",
          "contact.steps.name": "Incrível! E qual é o seu nome?",
          "contact.steps.company": "Entendido! Qual o nome da sua empresa?",
          "contact.steps.optional": "se não for empresa, escreva qualquer coisa",
          "contact.steps.help": "Perfeito, e como podemos te ajudar?",
          "contact.summary.title": "Maravilha! Olha só o que temos:",
          "contact.summary.confirm": "Parece bom?",
          "contact.buttons.restart": "Reiniciar",
          "contact.buttons.send": "Enviar!",
          "contact.success.sent": "Enviado!",
          "contact.success.thanks": "Retornaremos o mais rápido possível 😎",
          "projects.title": "Projetos",
          "projects.list": [
            {
              title: "Meu Portfólio",
              description: "Este site que você está navegando, feito com React, TypeScript e Tailwind CSS, focado em performance e design responsivo.",
              tech: ["React", "TypeScript", "Tailwind"],
              link: "#",
              image: "images/projects/capaPortfolio.png",
              cover: "images/projects/capaPortfolio.png"
            },
            {
              title: "Projeto de Extensão",
              description: "Protagonismo Juvenil na Era Digital",
              tech: ["Ensino", "Informática", "Comunidade"],
              link: "https://drive.google.com/file/d/1LUM4euMbWL19hjXX-KYLRIWYS_AZ1day/view?usp=sharing",
              image: "images/projects/capaExtensao.png",
              cover: "images/projects/capaExtensao.png"
            },
            {
              title: "Plataforma E-commerce",
              description: "Aplicação e-commerce completa com integração de pagamento, catálogo de produtos e autenticação.",
              tech: ["HTML", "CSS", "JavaScript"],
              link: "https://thuanykamers.github.io/DressUP/",
              image: "images/projects/dressup.png"
            },
            {
              title: "Sistema de Ponto Eletrônico",
              description: "Desenvolvimento de uma solução para gestão de jornada e banco de horas, focada em conformidade legal (CLT/Portaria 671). O projeto integra fluxos lógicos complexos, modelagem de dados auditável e suporte via inteligência artificial.",
              tech: ["PHP", "MySQL", "HTML", "CSS", "JS", "APIs"],
              link: "https://skinny-protest-638.notion.site/Sistema-de-Ponto-Eletr-nico-3373f2d9e43b80148ce6d1cb4740ea06?source=copy_link",
              image: "images/projects/capatimeproject.png",
              cover: "images/projects/capatimeproject.png"
            }
          ],
          "achievements.title": "Conquistas",
          "achievements.sw.badge": "3º Lugar",
          "achievements.sw.date": "25 a 27 de abril de 2025",
          "achievements.sw.location": "São José, Santa Catarina, Brasil",
          "achievements.sw.description": "Competição de 54 horas focada em cibersegurança, onde desenvolvemos o MVP do VerifiCAR — uma solução onde compradores podem verificar se o link de um anúncio de veículo é autêntico.",
          "achievements.sw.theme": "Cibersegurança",
          "achievements.sw.placement": "Colocação",
          "achievements.sw.dateLabel": "Data",
          "achievements.sw.locationLabel": "Local",
          "achievements.sw.pitch": "Apresentação do Pitch",
          "achievements.sw.graphs": "Dados de Validação",
          "achievements.sw.frontend": "Código Front-end",
          "achievements.comingSoon": "Em Breve",
          "nav.experience": "Experiência",
          "nav.international": "Internacional",
          "nav.techStack": "Tecnologias",
          "nav.projects": "Projetos",
          "nav.achievements": "Conquistas",
          "nav.contact": "Contato",
          "exp.title": "Experiência em TI",
          "exp.sp.role": "Estagiária de Desenvolvimento de Software",
          "exp.sp.period": "Mai 2025 - Jul 2025",
          "exp.sp.tasks": [
            "Desenvolver o back-end de um sistema eletrônico de controle de ponto com PHP, MySQL, HTML, CSS e JavaScript.",
            "Integração da API da Meta para envio seguro de links/códigos de recuperação de senha.",
            "Desenvolver automação sistêmica via API OpenAI/GPT para consultas em linguagem natural ao banco de dados.",
            "Projetar e implementar lógica de negócios complexa para recálculo automático de registros.",
            "Gerenciar controle de versão e código-fonte com Git e GitHub."
          ],
          "exp.sp.captions": ["Dia de Home Office", "Sistema Protótipo", "O Escritório"],
          "exp.nsc.role": "Estagiária de TI",
          "exp.nsc.period": "Set 2024 - Mai 2025",
          "exp.nsc.tasks": [
            "Dar suporte aos colaboradores com o sistema JD Edwards.",
            "Gerenciar acessos e permissões através do Active Directory.",
            "Atender chamados via ServiceNow.",
            "Atualizar e criar documentação de sistemas e publicar no SharePoint e Confluence."
          ],
          "exp.nsc.captions": ["Entrada Principal", "Primeiro Dia no Escritório", "Selfie no Escritório", "Dia da Mulher", "Carnaval", "Reunião de Estagiários", "Reunião de Estagiários 2"],
          "exp.flex.role": "Atendente de SAC",
          "exp.flex.period": "Jun 2020 - Jul 2022",
          "exp.flex.tasks": [
            "Atender por telefone sobre problemas com cartão de crédito e auxiliar o cliente na resolução de problemas com o aplicativo.",
            "Auxiliar colegas na resolução de problemas complexos.",
            "Atender o cliente via chat.",
            "Utilizar o Salesforce para verificar dados de clientes e fornecer orientações precisas."
          ],
          "exp.flex.captions": ["Entrada Principal", "Fim do Treinamento Salesforce", "Natal"],
          "intl.title": "Experiência Internacional",
          "intl.brazil": "Brasil",
          "intl.brazil.city": "São José, SC",
          "intl.brazil.jobs": [
            { "period": "2018", "role": "Professora de Inglês", "company": "CAIC Prof. Febrônio Tancredo de Oliveira", "description": "Lecionar inglês para alunos do ensino fundamental (6º ao 9º ano). Elaborar provas e atividades para avaliar o progresso dos alunos. Criar jogos interativos e atividades criativas para engajar os alunos e aumentar a participação." },
            { "period": "2022", "role": "Gerente de Loja", "company": "Cacau Show — Shopping Continente", "description": "Gerenciar operações diárias da loja em ambiente de shopping. Liderar vendas e atender clientes. Controlar estoque, layout da loja e logística do depósito. Treinar e supervisionar novos funcionários. Gerenciar documentos e relatórios com o sistema Master Retail PDV." }
          ],
          "intl.portugal": "Portugal",
          "intl.portugal.city": "Lisboa / Palmela, Setúbal",
          "intl.portugal.jobs": [
            { "period": "2023-24", "role": "Garçonete em Hotel 5 Estrelas", "company": "Talenter — Lisboa", "description": "Atender com alto padrão em hotel 5 estrelas e cassino no café da manhã, jantar e coffee breaks. Participar de grandes eventos no hotel e cassino. Servir vinhos e atender clientes internacionais, com postura polida e fluência em idiomas. Gerenciar múltiplas mesas simultaneamente em horários de pico e manter qualidade e satisfação do cliente." },
            { "period": "2023", "role": "Operadora de Linha", "company": "Hit & Fit Holding", "description": "Operar em linha de produção de derivados de tomate (molhos e concentrados) e garantir a fluidez do envase e embalagem. Aplicar rigorosamente as normas de higiene e segurança alimentar (HACCP) para garantir a integridade do produto. Inspecionar visual e tecnicamente a esteira para identificar e remover produtos fora do padrão." },
            { "period": "2023-24", "role": "Operadora de Linha", "company": "Hanon Systems — Palmela, Setúbal", "description": "Operar na linha de produção de componentes automotivos para a AutoEuropa (Grupo Volkswagen) e seguir padrões rigorosos de qualidade e tempo de ciclo. Inspecionar tecnicamente peças para garantir conformidade com normas da indústria automotiva. Colaborar em ambiente industrial de alta cadência e manter produtividade e segurança operacional." }
          ],
          "intl.germany": "Alemanha",
          "intl.germany.city": "Aachen",
          "intl.germany.jobs": [
            { "period": "2025-26", "role": "Sortation Associate", "company": "Amazon", "description": "Operar em centro logístico de alto volume, com foco em Problem Solve e Quality Control. Executar tarefas de Induct (entrada de pacotes) e Stow (armazenamento) e garantir precisão do inventário. Comunicar em inglês e alemão em ambiente dinâmico. Focar em metas de produtividade e segurança operacional." }
          ]
        }
      },
      ES: {
        translation: {
          "hero.greeting": "Hola, mi nombre es",
          "hero.role": "Desarrolladora Full Stack",
          "hero.description": "Licenciatura en Sistemas de Información",
          "tech.title": "Mis",
          "tech.subtitle": "Tecnologías",
          "contact.title": "Contáctame",
          "contact.welcome": "¡Hola! Estamos emocionados por conectar 🔗",
          "contact.input_label": "ingrese su",
          "contact.fields.email": "correo",
          "contact.fields.name": "nombre",
          "contact.fields.company": "empresa",
          "contact.fields.description": "descripción",
          "contact.invalidEmail": "Por favor, ingresa un correo válido",
          "contact.codeSendError": "Error al enviar el código de verificación. Verifica tu correo e intenta de nuevo.",
          "contact.invalidCode": "Código inválido. Intenta de nuevo.",
          "contact.fields.code": "código",
          "contact.steps.email": "¿Para empezar, podrías darnos tu correo?",
          "contact.steps.code": "Enviamos un código de 6 dígitos a tu correo. Ingrésalo abajo. (Revisa tu carpeta de spam si no lo encuentras)",
          "contact.steps.codeVerified": "¡Correo verificado!",
          "contact.steps.sendingCode": "Enviando código de verificación a tu correo...",
          "contact.steps.name": "¡Genial! ¿Y cuál es tu nombre?",
          "contact.steps.company": "¿Entendido! ¿Cuál es el nombre de tu empresa?",
          "contact.steps.optional": "si no es empresa, escribe lo que sea",
          "contact.steps.help": "Perfecto, ¿y cómo podemos ayudarte?",
          "contact.summary.title": "¡Maravilla! Esto es lo que tenemos:",
          "contact.summary.confirm": "¿Se ve bien?",
          "contact.buttons.restart": "Reiniciar",
          "contact.buttons.send": "¡Enviar!",
          "contact.success.sent": "¡Enviado!",
          "contact.success.thanks": "Te responderemos lo antes posible 😎",
          "projects.title": "Proyectos",
          "projects.list": [
            {
              title: "Mi Portafolio",
              description: "Este sitio que estás navegando, hecho con React, TypeScript y Tailwind CSS, enfocado en el rendimiento y diseño responsivo.",
              tech: ["React", "TypeScript", "Tailwind"],
              link: "#",
              image: "images/projects/capaPortfolio.png",
              cover: "images/projects/capaPortfolio.png"
            },
            {
              title: "Proyecto de Extensión",
              description: "Protagonismo Juvenil en la Era Digital",
              tech: ["Enseñanza", "Informática", "Comunidad"],
              link: "https://drive.google.com/file/d/1LUM4euMbWL19hjXX-KYLRIWYS_AZ1day/view?usp=sharing",
              image: "images/projects/capaExtensao.png",
              cover: "images/projects/capaExtensao.png"
            },
            {
              title: "Plataforma E-commerce",
              description: "Aplicación de comercio electrónico completa con integración de pagos, catálogo de productos y autenticación.",
              tech: ["HTML", "CSS", "JavaScript"],
              link: "https://thuanykamers.github.io/DressUP/",
              image: "images/projects/dressup.png"
            },
            {
              title: "Sistema de Control de Asistencia",
              description: "Desarrollo de una solución para gestión de jornada y banco de horas, enfocada en conformidad legal (CLT/Portaria 671). El proyecto integra flujos lógicos complejos, modelado de datos auditable y soporte con inteligencia artificial.",
              tech: ["PHP", "MySQL", "HTML", "CSS", "JS", "APIs"],
              link: "https://skinny-protest-638.notion.site/Sistema-de-Ponto-Eletr-nico-3373f2d9e43b80148ce6d1cb4740ea06?source=copy_link",
              image: "images/projects/capatimeproject.png",
              cover: "images/projects/capatimeproject.png"
            }
          ],
          "achievements.title": "Logros",
          "achievements.sw.badge": "3er Lugar",
          "achievements.sw.date": "25 al 27 de abril de 2025",
          "achievements.sw.location": "São José, Santa Catarina, Brasil",
          "achievements.sw.description": "Competencia de 54 horas enfocada en ciberseguridad, donde desarrollamos el MVP de VerifiCAR — una solución donde los compradores pueden verificar si el enlace de un anuncio de vehículo es auténtico.",
          "achievements.sw.theme": "Ciberseguridad",
          "achievements.sw.placement": "Posición",
          "achievements.sw.dateLabel": "Fecha",
          "achievements.sw.locationLabel": "Ubicación",
          "achievements.sw.pitch": "Presentación del Pitch",
          "achievements.sw.graphs": "Datos de Validación",
          "achievements.sw.frontend": "Código Front-end",
          "achievements.comingSoon": "Próximamente",
          "nav.experience": "Experiencia",
          "nav.international": "Internacional",
          "nav.techStack": "Tecnologías",
          "nav.projects": "Proyectos",
          "nav.achievements": "Logros",
          "nav.contact": "Contacto",
          "exp.title": "Experiencia en TI",
          "exp.sp.role": "Pasante de Desarrollo de Software",
          "exp.sp.period": "May 2025 - Jul 2025",
          "exp.sp.tasks": [
            "Lideró el desarrollo back-end de un sistema electrónico de control de asistencia usando PHP, MySQL, HTML, CSS y JavaScript.",
            "Integración de la API de Meta para el envío seguro de enlaces/códigos de recuperación de contraseña.",
            "Desarrolló automatización sistémica vía API OpenAI/GPT para consultas en lenguaje natural a la base de datos.",
            "Diseñó e implementó lógica de negocio compleja para el recálculo automático de registros.",
            "Gestionó el control de versiones y código fuente usando Git y GitHub."
          ],
          "exp.sp.captions": ["Día de Home Office", "Sistema Prototipo", "La Oficina"],
          "exp.nsc.role": "Pasante de TI",
          "exp.nsc.period": "Sep 2024 - May 2025",
          "exp.nsc.tasks": [
            "Soporte a empleados utilizando el sistema JD Edwards.",
            "Gestión de accesos y permisos a través de Active Directory.",
            "Atención de tickets vía ServiceNow.",
            "Actualización y creación de documentación de sistemas, publicando en SharePoint y Confluence."
          ],
          "exp.nsc.captions": ["Entrada Principal", "Primer Día en la Oficina", "Selfie en la Oficina", "Día de la Mujer", "Carnaval", "Reunión de Pasantes", "Reunión de Pasantes 2"],
          "exp.flex.role": "Representante de Atención al Cliente",
          "exp.flex.period": "Jun 2020 - Jul 2022",
          "exp.flex.tasks": [
            "Atención telefónica sobre problemas con tarjetas de crédito y ayuda al cliente en la resolución de problemas con la aplicación.",
            "Ayuda a colegas en la resolución de problemas complejos.",
            "Atención al cliente vía chat.",
            "Utilización de Salesforce para verificar datos de clientes y proporcionar orientación precisa."
          ],
          "exp.flex.captions": ["Entrada Principal", "Fin del Entrenamiento Salesforce", "Navidad"],
          "intl.title": "Experiencia Internacional",
          "intl.brazil": "Brasil",
          "intl.brazil.city": "São José, SC",
          "intl.brazil.jobs": [
            { "period": "2018", "role": "Profesora de Inglés", "company": "CAIC Prof. Febrônio Tancredo de Oliveira", "description": "Enseñó inglés a alumnos de secundaria (6º a 9º grado). Elaboró exámenes y actividades para evaluar el progreso. Creó juegos interactivos y actividades creativas para aumentar la participación." },
            { "period": "2022", "role": "Gerente de Tienda", "company": "Cacau Show — Shopping Continente", "description": "Gestionó operaciones diarias de la tienda en centro comercial. Lideró atención al cliente y ventas. Controló inventario, disposición de la tienda y logística. Capacitó y supervisó nuevos empleados. Gestionó documentos y reportes con Master Retail PDV." }
          ],
          "intl.portugal": "Portugal",
          "intl.portugal.city": "Lisboa / Palmela, Setúbal",
          "intl.portugal.jobs": [
            { "period": "2023-24", "role": "Camarera en Hotel 5 Estrellas", "company": "Talenter — Lisboa", "description": "Servicio de alto nivel en hotel 5 estrellas y casino, cubriendo desayuno, cena y coffee breaks. Participación en grandes eventos del hotel y casino. Servicio de vinos y atención a clientes internacionales, con etiqueta refinada y fluidez en idiomas. Gestión de múltiples mesas simultáneamente en horarios pico, manteniendo calidad y satisfacción del cliente." },
            { "period": "2023", "role": "Operadora de Línea", "company": "Hit & Fit Holding", "description": "Operación en línea de producción de derivados de tomate (salsas y concentrados), asegurando la fluidez del envasado y embalaje. Aplicación rigurosa de normas de higiene y seguridad alimentaria (HACCP). Inspección visual y técnica de la cinta para identificar y retirar productos fuera de estándar." },
            { "period": "2023-24", "role": "Operadora de Línea", "company": "Hanon Systems — Palmela, Setúbal", "description": "Trabajo en línea de producción de componentes automotrices para AutoEuropa (Grupo Volkswagen), siguiendo estándares rigurosos de calidad y tiempo de ciclo. Inspección técnica de piezas para garantizar conformidad con normas de la industria automotriz. Colaboración en ambiente industrial de alta cadencia, manteniendo productividad y seguridad operacional." }
          ],
          "intl.germany": "Alemania",
          "intl.germany.city": "Aachen",
          "intl.germany.jobs": [
            { "period": "2025-26", "role": "Sortation Associate", "company": "Amazon", "description": "Trabajo en centro logístico de alto volumen, enfocado en Problem Solve y Quality Control. Ejecución de tareas de Induct (entrada de paquetes) y Stow (almacenamiento), garantizando precisión del inventario. Trabajo realizado en inglés con interacciones en alemán, requiriendo comunicación clara y rápida. Enfoque total en metas de productividad y seguridad operacional." }
          ]
        }
      },
      DE: {
        translation: {
          "hero.greeting": "Hallo, mein Name ist",
          "hero.role": "Full-Stack-Entwicklerin",
          "hero.description": "Bachelor in Informationssystemen",
          "tech.title": "Mein",
          "tech.subtitle": "Tech-Stack",
          "contact.title": "Kontakt",
          "contact.welcome": "Hallo! Wir freuen uns auf die Verbindung 🔗",
          "contact.input_label": "eingeben",
          "contact.fields.email": "E-Mail",
          "contact.fields.name": "Name",
          "contact.fields.company": "Unternehmen",
          "contact.fields.description": "Nachricht",
          "contact.invalidEmail": "Bitte gib eine gültige E-Mail-Adresse ein",
          "contact.codeSendError": "Fehler beim Senden des Verifizierungscodes. Überprüfe deine E-Mail und versuche es erneut.",
          "contact.invalidCode": "Ungültiger Code. Bitte versuche es erneut.",
          "contact.fields.code": "Code",
          "contact.steps.email": "Könntest du uns zunächst deine E-Mail-Adresse mitteilen?",
          "contact.steps.code": "Wir haben einen 6-stelligen Verifizierungscode an deine E-Mail gesendet. Gib ihn unten ein. (Überprüfe deinen Spam-Ordner, falls du ihn nicht findest)",
          "contact.steps.codeVerified": "E-Mail verifiziert!",
          "contact.steps.sendingCode": "Verifizierungscode wird an deine E-Mail gesendet...",
          "contact.steps.name": "Super! Und wie heißt du?",
          "contact.steps.company": "Verstanden! Wie heißt dein Unternehmen?",
          "contact.steps.optional": "falls kein Unternehmen, schreib irgendetwas",
          "contact.steps.help": "Perfekt, und wie können wir dir helfen?",
          "contact.summary.title": "Wunderbar! Hier ist, was wir haben:",
          "contact.summary.confirm": "Sieht gut aus?",
          "contact.buttons.restart": "Neu starten",
          "contact.buttons.send": "Absenden!",
          "contact.success.sent": "Gesendet!",
          "contact.success.thanks": "Wir melden uns so schnell wie möglich 😎",
          "projects.title": "Projekte",
          "projects.list": [
            {
              title: "Mein Portfolio",
              description: "Diese Website, die du gerade besuchst, erstellt mit React, TypeScript und Tailwind CSS, mit Fokus auf Performance und responsives Design.",
              tech: ["React", "TypeScript", "Tailwind"],
              link: "#",
              image: "images/projects/capaPortfolio.png",
              cover: "images/projects/capaPortfolio.png"
            },
            {
              title: "Erweiterungsprojekt",
              description: "Jugendlicher Protagonismus im digitalen Zeitalter",
              tech: ["Unterricht", "Informatik", "Gemeinschaft"],
              link: "https://drive.google.com/file/d/1LUM4euMbWL19hjXX-KYLRIWYS_AZ1day/view?usp=sharing",
              image: "images/projects/capaExtensao.png",
              cover: "images/projects/capaExtensao.png"
            },
            {
              title: "E-Commerce-Plattform",
              description: "Vollständige E-Commerce-Anwendung mit Zahlungsintegration, Produktkatalog und Benutzerauthentifizierung.",
              tech: ["HTML", "CSS", "JavaScript"],
              link: "https://thuanykamers.github.io/DressUP/",
              image: "images/projects/dressup.png"
            },
            {
              title: "Elektronisches Zeiterfassungssystem",
              description: "Entwicklung einer Lösung für Arbeitszeitverwaltung und Zeitkonto, mit Fokus auf gesetzliche Konformität (CLT/Portaria 671). Das Projekt integriert komplexe Logikabläufe, prüfbare Datenmodellierung und KI-gestützten Support.",
              tech: ["PHP", "MySQL", "HTML", "CSS", "JS", "APIs"],
              link: "https://skinny-protest-638.notion.site/Sistema-de-Ponto-Eletr-nico-3373f2d9e43b80148ce6d1cb4740ea06?source=copy_link",
              image: "images/projects/capatimeproject.png",
              cover: "images/projects/capatimeproject.png"
            }
          ],
          "achievements.title": "Erfolge",
          "achievements.sw.badge": "3. Platz",
          "achievements.sw.date": "25. bis 27. April 2025",
          "achievements.sw.location": "São José, Santa Catarina, Brasilien",
          "achievements.sw.description": "54-Stunden-Hackathon mit Schwerpunkt Cybersicherheit, bei dem wir das MVP von VerifiCAR entwickelten — eine Lösung, mit der Käufer überprüfen können, ob der Link einer Fahrzeuganzeige authentisch ist.",
          "achievements.sw.theme": "Cybersicherheit",
          "achievements.sw.placement": "Platzierung",
          "achievements.sw.dateLabel": "Datum",
          "achievements.sw.locationLabel": "Ort",
          "achievements.sw.pitch": "Pitch-Präsentation",
          "achievements.sw.graphs": "Validierungsdaten",
          "achievements.sw.frontend": "Front-end-Code",
          "achievements.comingSoon": "Demnächst",
          "nav.experience": "Erfahrung",
          "nav.international": "International",
          "nav.techStack": "Tech-Stack",
          "nav.projects": "Projekte",
          "nav.achievements": "Erfolge",
          "nav.contact": "Kontakt",
          "exp.title": "IT-Erfahrung",
          "exp.sp.role": "Software-Entwicklungspraktikantin",
          "exp.sp.period": "Mai 2025 - Jul 2025",
          "exp.sp.tasks": [
            "Leitete die Back-End-Entwicklung eines elektronischen Zeiterfassungssystems mit PHP, MySQL, HTML, CSS und JavaScript.",
            "Integration der Meta-API für die sichere Zustellung von Passwort-Wiederherstellungslinks/-codes.",
            "Entwickelte systemische Automatisierung über die OpenAI/GPT-API für natürlichsprachliche Datenbankabfragen.",
            "Entwarf und implementierte komplexe Geschäftslogik für automatische Neuberechnung von Datensätzen.",
            "Verwaltete Versionskontrolle und Quellcode mit Git und GitHub."
          ],
          "exp.sp.captions": ["Home-Office-Tag", "Prototyp-System", "Das Büro"],
          "exp.nsc.role": "IT-Praktikantin",
          "exp.nsc.period": "Sep 2024 - Mai 2025",
          "exp.nsc.tasks": [
            "Unterstützung der Mitarbeiter bei der Nutzung des JD-Edwards-Systems.",
            "Verwaltung von Benutzerzugriffen und Berechtigungen über Active Directory.",
            "Bearbeitung von Support-Tickets über ServiceNow.",
            "Aktualisierung und Erstellung von Systemdokumentation, Veröffentlichung auf SharePoint und Confluence."
          ],
          "exp.nsc.captions": ["Haupteingang", "Erster Tag im Büro", "Selfie im Büro", "Frauentag", "Karneval", "Praktikantentreffen", "Praktikantentreffen 2"],
          "exp.flex.role": "Kundendienstmitarbeiterin",
          "exp.flex.period": "Jun 2020 - Jul 2022",
          "exp.flex.tasks": [
            "Telefonische Betreuung bei Kreditkartenproblemen und Hilfe bei der Lösung von App-Problemen.",
            "Unterstützung von Kollegen bei komplexen Problemen.",
            "Kundenbetreuung per Chat.",
            "Nutzung von Salesforce zur Überprüfung von Kundendaten und Bereitstellung präziser Anleitungen."
          ],
          "exp.flex.captions": ["Haupteingang", "Ende des Salesforce-Trainings", "Weihnachten"],
          "intl.title": "Internationale Erfahrung",
          "intl.brazil": "Brasilien",
          "intl.brazil.city": "São José, SC",
          "intl.brazil.jobs": [
            { "period": "2018", "role": "Englischlehrerin", "company": "CAIC Prof. Febrônio Tancredo de Oliveira", "description": "Unterrichtete Englisch für Schüler der Sekundarstufe (6.–9. Klasse). Erstellte Prüfungen und Aufgaben zur Leistungsbewertung. Entwickelte interaktive Spiele und kreative Aktivitäten zur Steigerung der Beteiligung." },
            { "period": "2022", "role": "Filialleiterin", "company": "Cacau Show — Shopping Continente", "description": "Leitete den täglichen Filialbetrieb im Einkaufszentrum. Führte Kundenservice und Verkauf. Kontrollierte Lagerbestand, Ladenlayout und Logistik. Schulte und beaufsichtigte neue Mitarbeiter. Verwaltete Dokumente und Berichte mit Master Retail PDV." }
          ],
          "intl.portugal": "Portugal",
          "intl.portugal.city": "Lissabon / Palmela, Setúbal",
          "intl.portugal.jobs": [
            { "period": "2023-24", "role": "Kellnerin im 5-Sterne-Hotel", "company": "Talenter — Lissabon", "description": "Erstklassiger Service in einem 5-Sterne-Hotel und Casino bei Frühstück, Abendessen und Kaffeepausen. Einsatz bei Großveranstaltungen im Hotel und Casino. Weinservice und internationale Gästebetreuung mit gepflegtem Auftreten und Sprachgewandtheit. Gleichzeitige Betreuung mehrerer Tische in Stoßzeiten bei Wahrung von Qualität und Gästezufriedenheit." },
            { "period": "2023", "role": "Linienoperatorin", "company": "Hit & Fit Holding", "description": "Arbeit an der Produktionslinie für Tomatenprodukte (Soßen und Konzentrate) mit Sicherstellung reibungsloser Abfüll- und Verpackungsprozesse. Strikte Anwendung von Hygiene- und Lebensmittelsicherheitsstandards (HACCP). Visuelle und technische Kontrolle des Förderbands zur Identifizierung und Entfernung nicht konformer Produkte." },
            { "period": "2023-24", "role": "Linienoperatorin", "company": "Hanon Systems — Palmela, Setúbal", "description": "Arbeit an der Produktionslinie für Automobilkomponenten für AutoEuropa (Volkswagen-Konzern) unter strikten Qualitäts- und Taktzeitstandards. Technische Teileinspektion zur Sicherstellung der Konformität mit Automobilindustrienormen. Zusammenarbeit in einem hochfrequenten Industrieumfeld bei Aufrechterhaltung von Produktivität und Arbeitssicherheit." }
          ],
          "intl.germany": "Deutschland",
          "intl.germany.city": "Aachen",
          "intl.germany.jobs": [
            { "period": "2025-26", "role": "Sortation Associate", "company": "Amazon", "description": "Einsatz in einem Hochvolumen-Logistikzentrum mit Fokus auf Problem Solve und Quality Control. Durchführung von Induct- (Paketeingang) und Stow-Aufgaben (Einlagerung) zur Sicherstellung der Bestandsgenauigkeit. Arbeit auf Englisch mit deutschen Interaktionen, erforderte klare und schnelle Kommunikation. Voller Fokus auf Produktivitätsziele und Arbeitssicherheit." }
          ]
        }
      },
      FR: {
        translation: {
          "hero.greeting": "Bonjour, je m'appelle",
          "hero.role": "Développeuse Full Stack",
          "hero.description": "Licence en Systèmes d'Information",
          "tech.title": "Ma",
          "tech.subtitle": "Stack Tech",
          "contact.title": "Me Contacter",
          "contact.welcome": "Bonjour ! Nous sommes ravis de cette connexion 🔗",
          "contact.input_label": "entrez votre",
          "contact.fields.email": "e-mail",
          "contact.fields.name": "nom",
          "contact.fields.company": "entreprise",
          "contact.fields.description": "message",
          "contact.invalidEmail": "Veuillez entrer un e-mail valide",
          "contact.codeSendError": "Échec de l'envoi du code de vérification. Vérifiez votre e-mail et réessayez.",
          "contact.invalidCode": "Code invalide. Veuillez réessayer.",
          "contact.fields.code": "code",
          "contact.steps.email": "Pour commencer, pourriez-vous nous donner votre e-mail ?",
          "contact.steps.code": "Nous avons envoyé un code de vérification à 6 chiffres à votre e-mail. Entrez-le ci-dessous. (Vérifiez vos spams si vous ne le trouvez pas)",
          "contact.steps.codeVerified": "E-mail vérifié !",
          "contact.steps.sendingCode": "Envoi du code de vérification à votre e-mail...",
          "contact.steps.name": "Super ! Et quel est votre nom ?",
          "contact.steps.company": "Compris ! Quel est le nom de votre entreprise ?",
          "contact.steps.optional": "si pas d'entreprise, écrivez n'importe quoi",
          "contact.steps.help": "Parfait, et comment pouvons-nous vous aider ?",
          "contact.summary.title": "Magnifique ! Voici ce que nous avons :",
          "contact.summary.confirm": "Ça vous convient ?",
          "contact.buttons.restart": "Recommencer",
          "contact.buttons.send": "Envoyer !",
          "contact.success.sent": "Envoyé !",
          "contact.success.thanks": "Nous vous répondrons dès que possible 😎",
          "projects.title": "Projets",
          "projects.list": [
            {
              title: "Mon Portfolio",
              description: "Ce site que vous parcourez, créé avec React, TypeScript et Tailwind CSS, axé sur la performance et le design responsive.",
              tech: ["React", "TypeScript", "Tailwind"],
              link: "#",
              image: "images/projects/capaPortfolio.png",
              cover: "images/projects/capaPortfolio.png"
            },
            {
              title: "Projet d'Extension",
              description: "Protagonisme Juvénile à l'Ère Numérique",
              tech: ["Enseignement", "Informatique", "Communauté"],
              link: "https://drive.google.com/file/d/1LUM4euMbWL19hjXX-KYLRIWYS_AZ1day/view?usp=sharing",
              image: "images/projects/capaExtensao.png",
              cover: "images/projects/capaExtensao.png"
            },
            {
              title: "Plateforme E-commerce",
              description: "Application e-commerce complète avec intégration de paiement, catalogue de produits et authentification.",
              tech: ["HTML", "CSS", "JavaScript"],
              link: "https://thuanykamers.github.io/DressUP/",
              image: "images/projects/dressup.png"
            },
            {
              title: "Système de Pointage Électronique",
              description: "Développement d'une solution de gestion des horaires et de banque d'heures, axée sur la conformité légale (CLT/Portaria 671). Le projet intègre des flux logiques complexes, une modélisation de données auditable et un support par intelligence artificielle.",
              tech: ["PHP", "MySQL", "HTML", "CSS", "JS", "APIs"],
              link: "https://skinny-protest-638.notion.site/Sistema-de-Ponto-Eletr-nico-3373f2d9e43b80148ce6d1cb4740ea06?source=copy_link",
              image: "images/projects/capatimeproject.png",
              cover: "images/projects/capatimeproject.png"
            }
          ],
          "achievements.title": "Réalisations",
          "achievements.sw.badge": "3ème Place",
          "achievements.sw.date": "25 au 27 avril 2025",
          "achievements.sw.location": "São José, Santa Catarina, Brésil",
          "achievements.sw.description": "Compétition de 54 heures axée sur la cybersécurité, où nous avons développé le MVP de VerifiCAR — une solution permettant aux acheteurs de vérifier si le lien d'une annonce de véhicule est authentique.",
          "achievements.sw.theme": "Cybersécurité",
          "achievements.sw.placement": "Classement",
          "achievements.sw.dateLabel": "Date",
          "achievements.sw.locationLabel": "Lieu",
          "achievements.sw.pitch": "Présentation du Pitch",
          "achievements.sw.graphs": "Données de Validation",
          "achievements.sw.frontend": "Code Front-end",
          "achievements.comingSoon": "Bientôt",
          "nav.experience": "Expérience",
          "nav.international": "International",
          "nav.techStack": "Technologies",
          "nav.projects": "Projets",
          "nav.achievements": "Réalisations",
          "nav.contact": "Contact",
          "exp.title": "Expérience en TI",
          "exp.sp.role": "Stagiaire en Développement Logiciel",
          "exp.sp.period": "Mai 2025 - Jul 2025",
          "exp.sp.tasks": [
            "Direction du développement back-end d'un système électronique de suivi du temps avec PHP, MySQL, HTML, CSS et JavaScript.",
            "Intégration de l'API Meta pour l'envoi sécurisé de liens/codes de récupération de mot de passe.",
            "Développement d'automatisation systémique via l'API OpenAI/GPT pour des requêtes en langage naturel vers la base de données.",
            "Conception et implémentation de logique métier complexe pour le recalcul automatique des enregistrements.",
            "Gestion du contrôle de version et du code source avec Git et GitHub."
          ],
          "exp.sp.captions": ["Jour de Télétravail", "Système Prototype", "Le Bureau"],
          "exp.nsc.role": "Stagiaire en Informatique",
          "exp.nsc.period": "Sep 2024 - Mai 2025",
          "exp.nsc.tasks": [
            "Support aux employés utilisant le système JD Edwards.",
            "Gestion des accès et permissions via Active Directory.",
            "Traitement des tickets de support via ServiceNow.",
            "Mise à jour et création de documentation système, publication sur SharePoint et Confluence."
          ],
          "exp.nsc.captions": ["Entrée Principale", "Premier Jour au Bureau", "Selfie au Bureau", "Journée de la Femme", "Carnaval", "Réunion des Stagiaires", "Réunion des Stagiaires 2"],
          "exp.flex.role": "Représentante du Service Client",
          "exp.flex.period": "Jun 2020 - Jul 2022",
          "exp.flex.tasks": [
            "Répondre aux appels téléphoniques concernant les problèmes de carte de crédit et aider les clients à résoudre les problèmes avec l'application.",
            "Aider les collègues à résoudre des problèmes complexes.",
            "Support client par chat.",
            "Utilisation de Salesforce pour vérifier les données clients et fournir des instructions précises."
          ],
          "exp.flex.captions": ["Entrée Principale", "Fin de la Formation Salesforce", "Noël"],
          "intl.title": "Expérience Internationale",
          "intl.brazil": "Brésil",
          "intl.brazil.city": "São José, SC",
          "intl.brazil.jobs": [
            { "period": "2018", "role": "Professeure d'Anglais", "company": "CAIC Prof. Febrônio Tancredo de Oliveira", "description": "Enseigné l'anglais à des collégiens (6e à 9e année). Conçu des examens et activités pour évaluer les progrès. Créé des jeux interactifs et activités créatives pour stimuler la participation." },
            { "period": "2022", "role": "Responsable de Magasin", "company": "Cacau Show — Shopping Continente", "description": "Géré les opérations quotidiennes du magasin en centre commercial. Dirigé le service client et les ventes. Contrôlé les stocks, l'agencement et la logistique. Formé et supervisé les nouveaux employés. Géré les documents et rapports avec Master Retail PDV." }
          ],
          "intl.portugal": "Portugal",
          "intl.portugal.city": "Lisbonne / Palmela, Setúbal",
          "intl.portugal.jobs": [
            { "period": "2023-24", "role": "Serveuse dans un Hôtel 5 Étoiles", "company": "Talenter — Lisbonne", "description": "Service haut de gamme dans un hôtel 5 étoiles et casino, couvrant petit-déjeuner, dîner et pauses café. Participation à de grands événements de l'hôtel et du casino. Service de vins et relations avec une clientèle internationale, exigeant une étiquette soignée et une maîtrise des langues. Gestion de plusieurs tables simultanément aux heures de pointe, maintenant qualité et satisfaction client." },
            { "period": "2023", "role": "Opératrice de Ligne", "company": "Hit & Fit Holding", "description": "Travail sur une ligne de production de dérivés de tomate (sauces et concentrés), assurant la fluidité du conditionnement et de l'emballage. Application rigoureuse des normes d'hygiène et de sécurité alimentaire (HACCP). Inspection visuelle et technique du convoyeur pour identifier et retirer les produits non conformes." },
            { "period": "2023-24", "role": "Opératrice de Ligne", "company": "Hanon Systems — Palmela, Setúbal", "description": "Travail sur la ligne de production de composants automobiles pour AutoEuropa (Groupe Volkswagen), suivant des normes strictes de qualité et de temps de cycle. Inspection technique des pièces pour assurer la conformité aux normes de l'industrie automobile. Collaboration dans un environnement industriel à haute cadence, maintenant productivité et sécurité opérationnelle." }
          ],
          "intl.germany": "Allemagne",
          "intl.germany.city": "Aix-la-Chapelle",
          "intl.germany.jobs": [
            { "period": "2025-26", "role": "Sortation Associate", "company": "Amazon", "description": "Travail dans un centre logistique à haut volume, axé sur le Problem Solve et le Quality Control. Exécution de tâches d'Induct (réception de colis) et de Stow (stockage), garantissant la précision de l'inventaire. Travail en anglais avec des interactions en allemand, exigeant une communication claire et rapide. Engagement total envers les objectifs de productivité et de sécurité opérationnelle." }
          ]
        }
      }
    },
    lng: "PT",
    fallbackLng: "PT",
    interpolation: { escapeValue: false }
  });

export default i18n;
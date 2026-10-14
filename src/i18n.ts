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
          "hero.greeting": "Hi, I'm",
          "hero.role": "Junior Developer & IT Support",
          "hero.description": "Bachelor's in Information Systems",
          "tech.title": "Tech",
          "tech.subtitle": "Stack",
          "contact.title": "Contact",
          "contact.subtitle": "Me",
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
          "projects.title": "My",
          "projects.subtitle": "Projects",
          "projects.list": [
            {
              title: "Electronic Time-Tracking System",
              description: "Web system for working hours and time banks built for Brazilian labour law (CLT and Ordinance 671), with a tamper-proof audit trail and an AI assistant for admins.",
              tech: ["PHP", "MySQL", "React", "TypeScript", "APIs"],
              link: "https://skinny-protest-638.notion.site/Electronic-Time-Tracking-System-3373f2d9e43b80148ce6d1cb4740ea06",
              image: "images/projects/capatimeproject.png",
              cover: "images/projects/capatimeproject.png"
            },
            {
              title: "Dress Up E-commerce",
              description: "T-shirt store built as a team project, with product pages, a shopping cart and a simulated checkout.",
              tech: ["HTML", "CSS", "JavaScript"],
              link: "https://thuanykamers.github.io/DressUP/",
              image: "images/projects/dressup.png"
            },
            {
              title: "Secure Cloud: CEI Snoopy",
              description: "University extension project: moved the records of a public daycare centre to a secure cloud and trained its staff to manage them.",
              tech: ["Google Drive", "Cloud", "Digital Training"],
              link: "https://skinny-protest-638.notion.site/Secure-Cloud-Protecting-the-Memory-of-CEI-Snoopy-3e43f2d9e43b81b5af28f88955de4e04",
              image: "images/projects/capaExtensao.png",
              cover: "images/projects/capaExtensao.png"
            },
            {
              title: "Youth Agency in the Digital Age",
              description: "University extension project: 8 weeks of digital literacy workshops for 27 students, bringing an unused school computer lab back into use.",
              tech: ["Digital Literacy", "Scratch", "Teaching"],
              link: "https://skinny-protest-638.notion.site/Youth-Agency-in-the-Digital-Age-3e43f2d9e43b8127a463f0bcc7a742e6",
              image: "images/projects/capaExtensao.png",
              cover: "images/projects/capaExtensao.png"
            }
          ],
          "achievements.title": "My",
          "achievements.subtitle": "Achievements",
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
          "exp.title": "IT",
          "exp.subtitle": "Experience",
          "exp.sp.role": "Software Developer Intern",
          "exp.sp.period": "May 2025 - July 2025",
          "exp.sp.tasks": [
            "Full-stack development of a working prototype of a web-based time-tracking system (PHP, MySQL, HTML, CSS, JavaScript, TypeScript, React), with role-based access for employees, admins and support.",
            "Integrated the Meta API for secure delivery of password recovery links and codes.",
            "Integrated the OpenAI (GPT) API for natural-language database queries.",
            "Built complex business logic, such as a dynamic calendar for hour calculations and a chat-based ticket system, compliant with Brazilian labour law (CLT and Ordinance 671) through auditable data modelling.",
            "Managed version control with Git and GitHub."
          ],
          "exp.sp.captions": ["Home Office Day", "Prototype System", "The Corporate Office"],
          "exp.nsc.role": "IT Intern",
          "exp.nsc.period": "Sept 2024 - May 2025",
          "exp.nsc.tasks": [
            "Supported users of the JD Edwards ERP and resolved about 400 tickets in ServiceNow, following security standards.",
            "Built the SharePoint folder structure, migrated more than 1,000 documents from Confluence and wrote new system documentation.",
            "Independently created more than 50 accounts (Active Directory, Google Admin) and adjusted permissions for about 20% of employees."
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
          "intl.title": "International",
          "intl.subtitle": "Experience",
          "intl.hint": "Click on the pins to explore each country",
          "intl.brazil": "Brazil",
          "intl.brazil.jobs": [
            { "period": "2022", "role": "Store Manager", "company": "Cacau Show - Shopping Continente — São José", "description": "Managed daily store operations in a mall environment. Led customer service and sales. Handled inventory control, store layout, and stockroom logistics. Trained and supervised new staff. Managed documents and reports using Master Retail PDV." },
            { "period": "2018", "role": "English Teacher", "company": "CAIC Prof. Febrônio Tancredo de Oliveira — Palhoça", "description": "Taught ESL to middle school students (6th–9th grade). Created tests and assignments to assess proficiency. Developed interactive games and activities to boost engagement and participation." }
          ],
          "intl.portugal": "Portugal",
          "intl.portugal.jobs": [
            { "period": "2023-24", "role": "Line Operator", "company": "Hanon Systems — Palmela, Setúbal", "description": "Worked on the production line of automotive components for AutoEuropa (Volkswagen Group), following strict quality and cycle-time standards. Performed technical part inspections to ensure compliance with automotive industry norms, preventing defects on the final assembly line. Collaborated in a high-pace industrial environment, maintaining productivity and operational safety." },
            { "period": "2023-24", "role": "Waitress at 5-Star Hotel", "company": "Talenter — Lisboa", "description": "Premium service at a 5-star hotel and casino, covering breakfast, dinner, and coffee breaks. Worked large-scale events at the hotel and casino. Wine service and international guest relations, requiring polished etiquette and multilingual fluency. Managed multiple tables simultaneously during peak hours while maintaining quality and guest satisfaction." },
            { "period": "2023", "role": "Line Operator", "company": "FIT - Fomento da Indústria do Tomate — Palmela, Setúbal", "description": "Operated on a tomato product manufacturing line (sauces and concentrates), ensuring smooth filling and packaging processes. Strictly applied food hygiene and safety standards (HACCP) to guarantee product integrity. Performed visual and technical inspection of the production line to identify and remove non-conforming products." }
          ],
          "intl.germany": "Germany",
          "intl.germany.jobs": [
            { "period": "2026", "role": "Sortation Associate", "company": "Amazon — Euskirchen", "description": "Loading parcel bags onto roll carts for delivery, scanner-guided staging of the carts at the handover points for drivers, and preparing empty carts and bags for the next shift." },
            { "period": "2025-26", "role": "Sortation Associate", "company": "Amazon — Aachen", "description": "Worked in a high-volume logistics center focused on Problem Solve and Quality Control. Executed Induct (package intake) and Stow (storage) tasks, ensuring inventory accuracy. Worked in English in a fast-paced, dynamic environment. Fully committed to productivity targets and operational safety standards." }
          ]
        }
      },
      PT: {
        translation: {
          "hero.greeting": "Olá, eu sou",
          "hero.role": "Desenvolvedora Júnior e Suporte de TI",
          "hero.description": "Bacharel em Sistemas de Informação",
          "tech.title": "Stack",
          "tech.subtitle": "Tecnológica",
          "contact.title": "Fale",
          "contact.subtitle": "Comigo",
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
          "projects.title": "Meus",
          "projects.subtitle": "Projetos",
          "projects.list": [
            {
              title: "Sistema de Ponto Eletrônico",
              description: "Sistema web de jornada e banco de horas conforme a CLT e a Portaria 671, com trilha de auditoria à prova de alteração e assistente de IA para administradores.",
              tech: ["PHP", "MySQL", "React", "TypeScript", "APIs"],
              link: "https://skinny-protest-638.notion.site/Electronic-Time-Tracking-System-3373f2d9e43b80148ce6d1cb4740ea06",
              image: "images/projects/capatimeproject.png",
              cover: "images/projects/capatimeproject.png"
            },
            {
              title: "Dress Up E-commerce",
              description: "Loja de camisetas feita em equipe, com páginas de produtos, carrinho de compras e checkout simulado.",
              tech: ["HTML", "CSS", "JavaScript"],
              link: "https://thuanykamers.github.io/DressUP/",
              image: "images/projects/dressup.png"
            },
            {
              title: "Nuvem Segura: CEI Snoopy",
              description: "Projeto de extensão: migração dos registros de uma creche pública para uma nuvem segura e capacitação da equipe para gerenciá-los.",
              tech: ["Google Drive", "Nuvem", "Capacitação Digital"],
              link: "https://skinny-protest-638.notion.site/Secure-Cloud-Protecting-the-Memory-of-CEI-Snoopy-3e43f2d9e43b81b5af28f88955de4e04",
              image: "images/projects/capaExtensao.png",
              cover: "images/projects/capaExtensao.png"
            },
            {
              title: "Protagonismo Juvenil na Era Digital",
              description: "Projeto de extensão: 8 semanas de oficinas de letramento digital para 27 alunos, reativando o laboratório de informática da escola.",
              tech: ["Letramento Digital", "Scratch", "Ensino"],
              link: "https://skinny-protest-638.notion.site/Youth-Agency-in-the-Digital-Age-3e43f2d9e43b8127a463f0bcc7a742e6",
              image: "images/projects/capaExtensao.png",
              cover: "images/projects/capaExtensao.png"
            }
          ],
          "achievements.title": "Minhas",
          "achievements.subtitle": "Conquistas",
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
          "exp.title": "Experiência em",
          "exp.subtitle": "TI",
          "exp.sp.role": "Estagiária de Desenvolvimento de Software",
          "exp.sp.period": "Mai 2025 - Jul 2025",
          "exp.sp.tasks": [
            "Desenvolvimento full-stack de um protótipo funcional de sistema web de ponto eletrônico (PHP, MySQL, HTML, CSS, JavaScript, TypeScript, React), com controle de acesso por perfil: funcionário, administrador e suporte.",
            "Integração da API da Meta para envio seguro de links e códigos de recuperação de senha.",
            "Integração da API da OpenAI (GPT) para consultas ao banco de dados em linguagem natural.",
            "Lógica de negócio complexa, como calendário dinâmico para cálculo de horas e sistema de chamados via chat, em conformidade com a CLT e a Portaria 671 por meio de modelagem de dados auditável.",
            "Versionamento de código com Git e GitHub."
          ],
          "exp.sp.captions": ["Dia de Home Office", "Sistema Protótipo", "O Escritório"],
          "exp.nsc.role": "Estagiária de TI",
          "exp.nsc.period": "Set 2024 - Mai 2025",
          "exp.nsc.tasks": [
            "Suporte aos usuários do ERP JD Edwards e cerca de 400 chamados atendidos no ServiceNow, seguindo padrões de segurança.",
            "Criação da estrutura de pastas no SharePoint, migração de mais de 1.000 documentos do Confluence e nova documentação de sistemas.",
            "Criação autônoma de mais de 50 contas (Active Directory, Google Admin) e ajuste de permissões de cerca de 20% dos funcionários."
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
          "intl.title": "Experiência",
          "intl.subtitle": "Internacional",
          "intl.hint": "Clique nos pins para explorar cada país",
          "intl.brazil": "Brasil",
          "intl.brazil.jobs": [
            { "period": "2022", "role": "Gerente de Loja", "company": "Cacau Show - Shopping Continente — São José", "description": "Gerenciar operações diárias da loja em ambiente de shopping. Liderar vendas e atender clientes. Controlar estoque, layout da loja e logística do depósito. Treinar e supervisionar novos funcionários. Gerenciar documentos e relatórios com o sistema Master Retail PDV." },
            { "period": "2018", "role": "Professora de Inglês", "company": "CAIC Prof. Febrônio Tancredo de Oliveira — Palhoça", "description": "Lecionar inglês para alunos do ensino fundamental (6º ao 9º ano). Elaborar provas e atividades para avaliar o progresso dos alunos. Criar jogos interativos e atividades criativas para engajar os alunos e aumentar a participação." }
          ],
          "intl.portugal": "Portugal",
          "intl.portugal.jobs": [
            { "period": "2023-24", "role": "Operadora de Linha", "company": "Hanon Systems — Palmela, Setúbal", "description": "Operar na linha de produção de componentes automotivos para a AutoEuropa (Grupo Volkswagen) e seguir padrões rigorosos de qualidade e tempo de ciclo. Inspecionar tecnicamente peças para garantir conformidade com normas da indústria automotiva. Colaborar em ambiente industrial de alta cadência e manter produtividade e segurança operacional." },
            { "period": "2023-24", "role": "Garçonete em Hotel 5 Estrelas", "company": "Talenter — Lisboa", "description": "Atender com alto padrão em hotel 5 estrelas e cassino no café da manhã, jantar e coffee breaks. Participar de grandes eventos no hotel e cassino. Servir vinhos e atender clientes internacionais, com postura polida e fluência em idiomas. Gerenciar múltiplas mesas simultaneamente em horários de pico e manter qualidade e satisfação do cliente." },
            { "period": "2023", "role": "Operadora de Linha", "company": "FIT - Fomento da Indústria do Tomate — Palmela, Setúbal", "description": "Operar em linha de produção de derivados de tomate (molhos e concentrados) e garantir a fluidez do envase e embalagem. Aplicar rigorosamente as normas de higiene e segurança alimentar (HACCP) para garantir a integridade do produto. Inspecionar visual e tecnicamente a esteira para identificar e remover produtos fora do padrão." }
          ],
          "intl.germany": "Alemanha",
          "intl.germany.jobs": [
            { "period": "2026", "role": "Sortation Associate", "company": "Amazon — Euskirchen", "description": "Carregar sacos de pacotes em carrinhos para entrega, posicionar os carrinhos com scanner nos pontos de entrega aos motoristas e preparar carrinhos e sacos vazios para o próximo turno." },
            { "period": "2025-26", "role": "Sortation Associate", "company": "Amazon — Aachen", "description": "Operar em centro logístico de alto volume, com foco em Problem Solve e Quality Control. Executar tarefas de Induct (entrada de pacotes) e Stow (armazenamento) e garantir precisão do inventário. Comunicar em inglês em ambiente dinâmico. Focar em metas de produtividade e segurança operacional." }
          ]
        }
      },
      ES: {
        translation: {
          "hero.greeting": "Hola, soy",
          "hero.role": "Desarrolladora Junior y Soporte de TI",
          "hero.description": "Licenciatura en Sistemas de Información",
          "tech.title": "Mis",
          "tech.subtitle": "Tecnologías",
          "contact.title": "Habla",
          "contact.subtitle": "Conmigo",
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
          "projects.title": "Mis",
          "projects.subtitle": "Proyectos",
          "projects.list": [
            {
              title: "Sistema de Control de Asistencia",
              description: "Sistema web de jornada laboral y banco de horas conforme a la legislación laboral brasileña (CLT y Portaria 671), con registro de auditoría inalterable y asistente de IA para administradores.",
              tech: ["PHP", "MySQL", "React", "TypeScript", "APIs"],
              link: "https://skinny-protest-638.notion.site/Electronic-Time-Tracking-System-3373f2d9e43b80148ce6d1cb4740ea06",
              image: "images/projects/capatimeproject.png",
              cover: "images/projects/capatimeproject.png"
            },
            {
              title: "Dress Up E-commerce",
              description: "Tienda de camisetas desarrollada en equipo, con páginas de productos, carrito de compras y checkout simulado.",
              tech: ["HTML", "CSS", "JavaScript"],
              link: "https://thuanykamers.github.io/DressUP/",
              image: "images/projects/dressup.png"
            },
            {
              title: "Nube Segura: CEI Snoopy",
              description: "Proyecto de extensión universitaria: migración de los registros de una guardería pública a una nube segura y capacitación del equipo para gestionarlos.",
              tech: ["Google Drive", "Nube", "Capacitación Digital"],
              link: "https://skinny-protest-638.notion.site/Secure-Cloud-Protecting-the-Memory-of-CEI-Snoopy-3e43f2d9e43b81b5af28f88955de4e04",
              image: "images/projects/capaExtensao.png",
              cover: "images/projects/capaExtensao.png"
            },
            {
              title: "Jóvenes Protagonistas en la Era Digital",
              description: "Proyecto de extensión universitaria: 8 semanas de talleres de alfabetización digital para 27 alumnos, reactivando el laboratorio de informática de la escuela.",
              tech: ["Alfabetización Digital", "Scratch", "Enseñanza"],
              link: "https://skinny-protest-638.notion.site/Youth-Agency-in-the-Digital-Age-3e43f2d9e43b8127a463f0bcc7a742e6",
              image: "images/projects/capaExtensao.png",
              cover: "images/projects/capaExtensao.png"
            }
          ],
          "achievements.title": "Mis",
          "achievements.subtitle": "Logros",
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
          "exp.title": "Experiencia en",
          "exp.subtitle": "TI",
          "exp.sp.role": "Pasante de Desarrollo de Software",
          "exp.sp.period": "May 2025 - Jul 2025",
          "exp.sp.tasks": [
            "Desarrollo full-stack de un prototipo funcional de sistema web de control de asistencia (PHP, MySQL, HTML, CSS, JavaScript, TypeScript, React), con control de acceso por perfil: empleado, administrador y soporte.",
            "Integración de la API de Meta para el envío seguro de enlaces y códigos de recuperación de contraseña.",
            "Integración de la API de OpenAI (GPT) para consultas a la base de datos en lenguaje natural.",
            "Lógica de negocio compleja, como un calendario dinámico para el cálculo de horas y un sistema de tickets por chat, conforme a la legislación laboral brasileña (CLT y Portaria 671) mediante un modelado de datos auditable.",
            "Control de versiones con Git y GitHub."
          ],
          "exp.sp.captions": ["Día de Home Office", "Sistema Prototipo", "La Oficina"],
          "exp.nsc.role": "Pasante de TI",
          "exp.nsc.period": "Sep 2024 - May 2025",
          "exp.nsc.tasks": [
            "Soporte a usuarios del ERP JD Edwards y cerca de 400 tickets atendidos en ServiceNow, siguiendo estándares de seguridad.",
            "Creación de la estructura de carpetas en SharePoint, migración de más de 1.000 documentos desde Confluence y nueva documentación de sistemas.",
            "Creación autónoma de más de 50 cuentas (Active Directory, Google Admin) y ajuste de permisos de cerca del 20% de los empleados."
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
          "intl.title": "Experiencia",
          "intl.subtitle": "Internacional",
          "intl.hint": "Haz clic en los pines para explorar cada país",
          "intl.brazil": "Brasil",
          "intl.brazil.jobs": [
            { "period": "2022", "role": "Gerente de Tienda", "company": "Cacau Show - Shopping Continente — São José", "description": "Gestionó operaciones diarias de la tienda en centro comercial. Lideró atención al cliente y ventas. Controló inventario, disposición de la tienda y logística. Capacitó y supervisó nuevos empleados. Gestionó documentos y reportes con Master Retail PDV." },
            { "period": "2018", "role": "Profesora de Inglés", "company": "CAIC Prof. Febrônio Tancredo de Oliveira — Palhoça", "description": "Enseñó inglés a alumnos de secundaria (6º a 9º grado). Elaboró exámenes y actividades para evaluar el progreso. Creó juegos interactivos y actividades creativas para aumentar la participación." }
          ],
          "intl.portugal": "Portugal",
          "intl.portugal.jobs": [
            { "period": "2023-24", "role": "Operadora de Línea", "company": "Hanon Systems — Palmela, Setúbal", "description": "Trabajo en línea de producción de componentes automotrices para AutoEuropa (Grupo Volkswagen), siguiendo estándares rigurosos de calidad y tiempo de ciclo. Inspección técnica de piezas para garantizar conformidad con normas de la industria automotriz. Colaboración en ambiente industrial de alta cadencia, manteniendo productividad y seguridad operacional." },
            { "period": "2023-24", "role": "Camarera en Hotel 5 Estrellas", "company": "Talenter — Lisboa", "description": "Servicio de alto nivel en hotel 5 estrellas y casino, cubriendo desayuno, cena y coffee breaks. Participación en grandes eventos del hotel y casino. Servicio de vinos y atención a clientes internacionales, con etiqueta refinada y fluidez en idiomas. Gestión de múltiples mesas simultáneamente en horarios pico, manteniendo calidad y satisfacción del cliente." },
            { "period": "2023", "role": "Operadora de Línea", "company": "FIT - Fomento da Indústria do Tomate — Palmela, Setúbal", "description": "Operación en línea de producción de derivados de tomate (salsas y concentrados), asegurando la fluidez del envasado y embalaje. Aplicación rigurosa de normas de higiene y seguridad alimentaria (HACCP). Inspección visual y técnica de la cinta para identificar y retirar productos fuera de estándar." }
          ],
          "intl.germany": "Alemania",
          "intl.germany.jobs": [
            { "period": "2026", "role": "Sortation Associate", "company": "Amazon — Euskirchen", "description": "Carga de bolsas de paquetes en carros para su reparto, ubicación de los carros con escáner en los puntos de entrega a los conductores y preparación de carros y bolsas vacíos para el siguiente turno." },
            { "period": "2025-26", "role": "Sortation Associate", "company": "Amazon — Aachen", "description": "Trabajo en centro logístico de alto volumen, enfocado en Problem Solve y Quality Control. Ejecución de tareas de Induct (entrada de paquetes) y Stow (almacenamiento), garantizando precisión del inventario. Trabajo realizado en inglés, con comunicación clara y rápida. Enfoque total en metas de productividad y seguridad operacional." }
          ]
        }
      },
      DE: {
        translation: {
          "hero.greeting": "Hallo, ich bin",
          "hero.role": "Junior-Entwicklerin & IT-Support",
          "hero.description": "Bachelor in Informationssystemen",
          "tech.title": "Mein",
          "tech.subtitle": "Tech-Stack",
          "contact.title": "Schreib",
          "contact.subtitle": "Mir",
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
          "projects.title": "Meine",
          "projects.subtitle": "Projekte",
          "projects.list": [
            {
              title: "Elektronisches Zeiterfassungssystem",
              description: "Websystem für Arbeitszeit und Zeitkonten nach brasilianischem Arbeitsrecht (CLT und Verordnung 671), mit manipulationssicherem Audit-Trail und KI-Assistent für Administratoren.",
              tech: ["PHP", "MySQL", "React", "TypeScript", "APIs"],
              link: "https://skinny-protest-638.notion.site/Elektronisches-Zeiterfassungssystem-3e73f2d9e43b811490d5f15f543f2024",
              image: "images/projects/capatimeproject.png",
              cover: "images/projects/capatimeproject.png"
            },
            {
              title: "Dress Up E-Commerce",
              description: "Im Team entwickelter T-Shirt-Shop mit Produktseiten, Warenkorb und simuliertem Checkout.",
              tech: ["HTML", "CSS", "JavaScript"],
              link: "https://thuanykamers.github.io/DressUP/",
              image: "images/projects/dressup.png"
            },
            {
              title: "Sichere Cloud: CEI Snoopy",
              description: "Hochschul-Praxisprojekt: Migration der Unterlagen einer öffentlichen Kita in eine sichere Cloud und Schulung des Teams im Umgang damit.",
              tech: ["Google Drive", "Cloud", "Digitale Schulung"],
              link: "https://skinny-protest-638.notion.site/Sichere-Cloud-Das-Ged-chtnis-des-CEI-Snoopy-sch-tzen-3e43f2d9e43b81038633d97c5c6fe43f",
              image: "images/projects/capaExtensao.png",
              cover: "images/projects/capaExtensao.png"
            },
            {
              title: "Jugendliche als Gestalter im digitalen Zeitalter",
              description: "Hochschul-Praxisprojekt: 8 Wochen Workshops zu digitaler Kompetenz für 27 Schüler, um den ungenutzten Computerraum der Schule wieder in Betrieb zu nehmen.",
              tech: ["Digitale Kompetenz", "Scratch", "Unterricht"],
              link: "https://skinny-protest-638.notion.site/Jugendliche-als-Gestalter-im-digitalen-Zeitalter-3e43f2d9e43b81478b7bf569adaff087",
              image: "images/projects/capaExtensao.png",
              cover: "images/projects/capaExtensao.png"
            }
          ],
          "achievements.title": "Meine",
          "achievements.subtitle": "Erfolge",
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
          "exp.title": "IT",
          "exp.subtitle": "Erfahrung",
          "exp.sp.role": "Software-Entwicklungspraktikantin",
          "exp.sp.period": "Mai 2025 - Jul 2025",
          "exp.sp.tasks": [
            "Full-Stack-Entwicklung eines funktionsfähigen Prototyps eines webbasierten Zeiterfassungssystems (PHP, MySQL, HTML, CSS, JavaScript, TypeScript, React) mit rollenbasierter Zugriffskontrolle für Mitarbeitende, Administratoren und Support.",
            "Integration der Meta-API für den sicheren Versand von Links und Codes zur Passwortwiederherstellung.",
            "Integration der OpenAI-API (GPT) für Datenbankabfragen in natürlicher Sprache.",
            "Komplexe Geschäftslogik, etwa ein dynamischer Kalender zur Stundenberechnung und ein chatbasiertes Ticketsystem, konform mit brasilianischem Arbeitsrecht (CLT und Verordnung 671) durch auditierbare Datenmodellierung.",
            "Versionsverwaltung mit Git und GitHub."
          ],
          "exp.sp.captions": ["Home-Office-Tag", "Prototyp-System", "Das Büro"],
          "exp.nsc.role": "IT-Praktikantin",
          "exp.nsc.period": "Sep 2024 - Mai 2025",
          "exp.nsc.tasks": [
            "Support für Anwender des ERP-Systems JD Edwards und rund 400 bearbeitete Tickets in ServiceNow unter Einhaltung der Sicherheitsstandards.",
            "Aufbau der Ordnerstruktur in SharePoint, Migration von über 1.000 Dokumenten aus Confluence und Erstellung neuer Systemdokumentation.",
            "Eigenständige Einrichtung von über 50 Konten (Active Directory, Google Admin) und Anpassung der Berechtigungen für rund 20 % der Mitarbeitenden."
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
          "intl.title": "Internationale",
          "intl.subtitle": "Erfahrung",
          "intl.hint": "Klicke auf die Pins, um jedes Land zu erkunden",
          "intl.brazil": "Brasilien",
          "intl.brazil.jobs": [
            { "period": "2022", "role": "Filialleiterin", "company": "Cacau Show - Shopping Continente — São José", "description": "Leitete den täglichen Filialbetrieb im Einkaufszentrum. Führte Kundenservice und Verkauf. Kontrollierte Lagerbestand, Ladenlayout und Logistik. Schulte und beaufsichtigte neue Mitarbeiter. Verwaltete Dokumente und Berichte mit Master Retail PDV." },
            { "period": "2018", "role": "Englischlehrerin", "company": "CAIC Prof. Febrônio Tancredo de Oliveira — Palhoça", "description": "Unterrichtete Englisch für Schüler der Sekundarstufe (6.–9. Klasse). Erstellte Prüfungen und Aufgaben zur Leistungsbewertung. Entwickelte interaktive Spiele und kreative Aktivitäten zur Steigerung der Beteiligung." }
          ],
          "intl.portugal": "Portugal",
          "intl.portugal.jobs": [
            { "period": "2023-24", "role": "Linienoperatorin", "company": "Hanon Systems — Palmela, Setúbal", "description": "Arbeit an der Produktionslinie für Automobilkomponenten für AutoEuropa (Volkswagen-Konzern) unter strikten Qualitäts- und Taktzeitstandards. Technische Teileinspektion zur Sicherstellung der Konformität mit Automobilindustrienormen. Zusammenarbeit in einem hochfrequenten Industrieumfeld bei Aufrechterhaltung von Produktivität und Arbeitssicherheit." },
            { "period": "2023-24", "role": "Kellnerin im 5-Sterne-Hotel", "company": "Talenter — Lissabon", "description": "Erstklassiger Service in einem 5-Sterne-Hotel und Casino bei Frühstück, Abendessen und Kaffeepausen. Einsatz bei Großveranstaltungen im Hotel und Casino. Weinservice und internationale Gästebetreuung mit gepflegtem Auftreten und Sprachgewandtheit. Gleichzeitige Betreuung mehrerer Tische in Stoßzeiten bei Wahrung von Qualität und Gästezufriedenheit." },
            { "period": "2023", "role": "Linienoperatorin", "company": "FIT - Fomento da Indústria do Tomate — Palmela, Setúbal", "description": "Arbeit an der Produktionslinie für Tomatenprodukte (Soßen und Konzentrate) mit Sicherstellung reibungsloser Abfüll- und Verpackungsprozesse. Strikte Anwendung von Hygiene- und Lebensmittelsicherheitsstandards (HACCP). Visuelle und technische Kontrolle des Förderbands zur Identifizierung und Entfernung nicht konformer Produkte." }
          ],
          "intl.germany": "Deutschland",
          "intl.germany.jobs": [
            { "period": "2026", "role": "Sortation Associate", "company": "Amazon — Euskirchen", "description": "Beladen von Rollwagen mit Paketsäcken für die Zustellung, scannergestützte Bereitstellung der Rollwagen an den Übergabepunkten für die Fahrer und Vorbereitung leerer Rollwagen und Säcke für die nächste Schicht." },
            { "period": "2025-26", "role": "Sortation Associate", "company": "Amazon — Aachen", "description": "Einsatz in einem Hochvolumen-Logistikzentrum mit Fokus auf Problem Solve und Quality Control. Durchführung von Induct- (Paketeingang) und Stow-Aufgaben (Einlagerung) zur Sicherstellung der Bestandsgenauigkeit. Arbeit auf Englisch mit klarer und schneller Kommunikation. Voller Fokus auf Produktivitätsziele und Arbeitssicherheit." }
          ]
        }
      },
      FR: {
        translation: {
          "hero.greeting": "Bonjour, je suis",
          "hero.role": "Développeuse Junior & Support Informatique",
          "hero.description": "Licence en Systèmes d'Information",
          "tech.title": "Ma",
          "tech.subtitle": "Stack Tech",
          "contact.title": "Me",
          "contact.subtitle": "Contacter",
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
          "projects.title": "Mes",
          "projects.subtitle": "Projets",
          "projects.list": [
            {
              title: "Système de Pointage Électronique",
              description: "Système web de gestion du temps de travail et des heures conforme au droit du travail brésilien (CLT et Portaria 671), avec piste d'audit infalsifiable et assistant IA pour les administrateurs.",
              tech: ["PHP", "MySQL", "React", "TypeScript", "APIs"],
              link: "https://skinny-protest-638.notion.site/Electronic-Time-Tracking-System-3373f2d9e43b80148ce6d1cb4740ea06",
              image: "images/projects/capatimeproject.png",
              cover: "images/projects/capatimeproject.png"
            },
            {
              title: "Dress Up E-commerce",
              description: "Boutique de t-shirts réalisée en équipe, avec pages produits, panier et paiement simulé.",
              tech: ["HTML", "CSS", "JavaScript"],
              link: "https://thuanykamers.github.io/DressUP/",
              image: "images/projects/dressup.png"
            },
            {
              title: "Cloud Sécurisé : CEI Snoopy",
              description: "Projet d'extension universitaire : migration des archives d'une crèche publique vers un cloud sécurisé et formation de l'équipe à leur gestion.",
              tech: ["Google Drive", "Cloud", "Formation Numérique"],
              link: "https://skinny-protest-638.notion.site/Secure-Cloud-Protecting-the-Memory-of-CEI-Snoopy-3e43f2d9e43b81b5af28f88955de4e04",
              image: "images/projects/capaExtensao.png",
              cover: "images/projects/capaExtensao.png"
            },
            {
              title: "Jeunes Acteurs à l'Ère Numérique",
              description: "Projet d'extension universitaire : 8 semaines d'ateliers de culture numérique pour 27 élèves, pour remettre en service la salle informatique de l'école.",
              tech: ["Culture Numérique", "Scratch", "Enseignement"],
              link: "https://skinny-protest-638.notion.site/Youth-Agency-in-the-Digital-Age-3e43f2d9e43b8127a463f0bcc7a742e6",
              image: "images/projects/capaExtensao.png",
              cover: "images/projects/capaExtensao.png"
            }
          ],
          "achievements.title": "Mes",
          "achievements.subtitle": "Réalisations",
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
          "exp.title": "Expérience en",
          "exp.subtitle": "TI",
          "exp.sp.role": "Stagiaire en Développement Logiciel",
          "exp.sp.period": "Mai 2025 - Jul 2025",
          "exp.sp.tasks": [
            "Développement full-stack d'un prototype fonctionnel de système web de pointage (PHP, MySQL, HTML, CSS, JavaScript, TypeScript, React), avec contrôle d'accès par profil : employé, administrateur et support.",
            "Intégration de l'API Meta pour l'envoi sécurisé des liens et codes de récupération de mot de passe.",
            "Intégration de l'API OpenAI (GPT) pour des requêtes en langage naturel sur la base de données.",
            "Logique métier complexe, comme un calendrier dynamique pour le calcul des heures et un système de tickets par chat, conforme au droit du travail brésilien (CLT et Portaria 671) grâce à une modélisation de données auditable.",
            "Gestion de versions avec Git et GitHub."
          ],
          "exp.sp.captions": ["Jour de Télétravail", "Système Prototype", "Le Bureau"],
          "exp.nsc.role": "Stagiaire en Informatique",
          "exp.nsc.period": "Sep 2024 - Mai 2025",
          "exp.nsc.tasks": [
            "Support aux utilisateurs de l'ERP JD Edwards et environ 400 tickets traités dans ServiceNow, dans le respect des normes de sécurité.",
            "Création de l'arborescence SharePoint, migration de plus de 1 000 documents depuis Confluence et rédaction d'une nouvelle documentation des systèmes.",
            "Création autonome de plus de 50 comptes (Active Directory, Google Admin) et ajustement des permissions d'environ 20 % des employés."
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
          "intl.title": "Expérience",
          "intl.subtitle": "Internationale",
          "intl.hint": "Cliquez sur les épingles pour explorer chaque pays",
          "intl.brazil": "Brésil",
          "intl.brazil.jobs": [
            { "period": "2022", "role": "Responsable de Magasin", "company": "Cacau Show - Shopping Continente — São José", "description": "Géré les opérations quotidiennes du magasin en centre commercial. Dirigé le service client et les ventes. Contrôlé les stocks, l'agencement et la logistique. Formé et supervisé les nouveaux employés. Géré les documents et rapports avec Master Retail PDV." },
            { "period": "2018", "role": "Professeure d'Anglais", "company": "CAIC Prof. Febrônio Tancredo de Oliveira — Palhoça", "description": "Enseigné l'anglais à des collégiens (6e à 9e année). Conçu des examens et activités pour évaluer les progrès. Créé des jeux interactifs et activités créatives pour stimuler la participation." }
          ],
          "intl.portugal": "Portugal",
          "intl.portugal.jobs": [
            { "period": "2023-24", "role": "Opératrice de Ligne", "company": "Hanon Systems — Palmela, Setúbal", "description": "Travail sur la ligne de production de composants automobiles pour AutoEuropa (Groupe Volkswagen), suivant des normes strictes de qualité et de temps de cycle. Inspection technique des pièces pour assurer la conformité aux normes de l'industrie automobile. Collaboration dans un environnement industriel à haute cadence, maintenant productivité et sécurité opérationnelle." },
            { "period": "2023-24", "role": "Serveuse dans un Hôtel 5 Étoiles", "company": "Talenter — Lisbonne", "description": "Service haut de gamme dans un hôtel 5 étoiles et casino, couvrant petit-déjeuner, dîner et pauses café. Participation à de grands événements de l'hôtel et du casino. Service de vins et relations avec une clientèle internationale, exigeant une étiquette soignée et une maîtrise des langues. Gestion de plusieurs tables simultanément aux heures de pointe, maintenant qualité et satisfaction client." },
            { "period": "2023", "role": "Opératrice de Ligne", "company": "FIT - Fomento da Indústria do Tomate — Palmela, Setúbal", "description": "Travail sur une ligne de production de dérivés de tomate (sauces et concentrés), assurant la fluidité du conditionnement et de l'emballage. Application rigoureuse des normes d'hygiène et de sécurité alimentaire (HACCP). Inspection visuelle et technique du convoyeur pour identifier et retirer les produits non conformes." }
          ],
          "intl.germany": "Allemagne",
          "intl.germany.jobs": [
            { "period": "2026", "role": "Sortation Associate", "company": "Amazon — Euskirchen", "description": "Chargement de sacs de colis sur des chariots pour la livraison, placement des chariots à l'aide d'un scanner aux points de remise aux chauffeurs et préparation des chariots et sacs vides pour l'équipe suivante." },
            { "period": "2025-26", "role": "Sortation Associate", "company": "Amazon — Aachen", "description": "Travail dans un centre logistique à haut volume, axé sur le Problem Solve et le Quality Control. Exécution de tâches d'Induct (réception de colis) et de Stow (stockage), garantissant la précision de l'inventaire. Travail en anglais, avec une communication claire et rapide. Engagement total envers les objectifs de productivité et de sécurité opérationnelle." }
          ]
        }
      }
    },
    lng: "PT",
    fallbackLng: "PT",
    interpolation: { escapeValue: false }
  });

export default i18n;
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
          "hero.description": "I am an Information Systems student in the last semester of the course.",
          "tech.title": "Tech",
          "tech.subtitle": "Stack",
          "contact.title": "Contact Me",
          "contact.welcome": "Hey there! We're excited to link 🔗",
          "contact.input_label": "enter",
          "contact.fields.email": "email",
          "contact.fields.name": "name",
          "contact.fields.company": "company",
          "contact.fields.description": "description",
          // ADICIONE ESTAS LINHAS ABAIXO:
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
              link: "#"
            },
            {
              title: "Extension Project",
              description: "Youth Protagonism in the Digital Era",
              tech: ["Teaching", "Informatics", "Community"],
              link: "https://drive.google.com/file/d/1LUM4euMbWL19hjXX-KYLRIWYS_AZ1day/view?usp=sharing",
              image: "/images/extensionproj.png"
            },
            {
              title: "E-commerce Platform",
              description: "Full-stack e-commerce application with payment integration, product catalog, and user authentication.",
              tech: ["HTML", "CSS", "JavaScript"],
              link: "https://thuanykamers.github.io/DressUP/",
              image: "/images/dressup.png"
            },
            {
              title: "Social Media App",
              description: "Real-time social networking application with messaging, notifications, and user profiles.",
              tech: ["React", "Firebase", "Tailwind"],
              link: "#"
            }
          ],
          "achievements.title": "Achievements",
          "achievements.sw.badge": "3rd Place",
          "achievements.sw.title": "Startup Weekend SJ - Cybersecurity",
          "achievements.sw.event": "Startup Weekend São José 2025",
          "achievements.sw.date": "April 25-27, 2025",
          "achievements.sw.location": "São José, Santa Catarina, Brazil",
          "achievements.sw.description": "Competed in a 54-hour hackathon focused on cybersecurity, developing VerifiCAR — a platform where buyers can verify if a vehicle ad link is authentic.",
          "achievements.sw.certificate": "Certificate",
          "achievements.sw.theme": "Cybersecurity",
          "achievements.sw.clickToOpen": "Click to view details",
          "achievements.sw.placement": "Placement",
          "achievements.sw.dateLabel": "Date",
          "achievements.sw.locationLabel": "Location",
          "achievements.sw.pitch": "Pitch Deck",
          "achievements.sw.graphs": "Validation Data",
          "achievements.sw.viewDocs": "View Documents",
          "achievements.sw.backToInfo": "Back",
          "achievements.sw.selectDoc": "Select a document to view",
          "achievements.comingSoon": "Coming Soon"
        }
      },
      PT: {
        translation: {
          "hero.greeting": "Olá, meu nome é",
          "hero.role": "Desenvolvedora Full Stack",
          "hero.description": "Sou estudante de Sistemas de Informação no último semestre do curso.",
          "tech.title": "Stack",
          "tech.subtitle": "Tecnológica",
          "contact.title": "Contate-me",
          "contact.welcome": "Olá! Ficamos felizes em fazer essa conexão 🔗",
          "contact.input_label": "digite seu",
          "contact.fields.email": "email",
          "contact.fields.name": "nome",
          "contact.fields.company": "empresa",
          "contact.fields.description": "mensagem",
          // ADICIONE ESTAS LINHAS ABAIXO:
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
              link: "#"
            },
            {
              title: "Projeto de Extensão",
              description: "Protagonismo Juvenil na Era Digital",
              tech: ["Ensino", "Informática", "Comunidade"],
              link: "https://drive.google.com/file/d/1LUM4euMbWL19hjXX-KYLRIWYS_AZ1day/view?usp=sharing",
              image: "/images/extensionproj.png"
            },
            {
              title: "Plataforma E-commerce",
              description: "Aplicação e-commerce completa com integração de pagamento, catálogo de produtos e autenticação.",
              tech: ["HTML", "CSS", "JavaScript"],
              link: "https://thuanykamers.github.io/DressUP/",
              image: "/images/dressup.png"
            },
            {
              title: "Aplicativo Social",
              description: "Rede social em tempo real com mensagens, notificações e perfis de usuário.",
              tech: ["React", "Firebase", "Tailwind"],
              link: "#"
            }
          ],
          "achievements.title": "Conquistas",
          "achievements.sw.badge": "3º Lugar",
          "achievements.sw.title": "Startup Weekend SJ - Cibersegurança",
          "achievements.sw.event": "Startup Weekend São José 2025",
          "achievements.sw.date": "25 a 27 de abril de 2025",
          "achievements.sw.location": "São José, Santa Catarina, Brasil",
          "achievements.sw.description": "Competição de 54 horas focada em cibersegurança, onde desenvolvemos o VerifiCAR — uma plataforma onde compradores podem verificar se o link de um anúncio de veículo é autêntico.",
          "achievements.sw.certificate": "Certificado",
          "achievements.sw.theme": "Cibersegurança",
          "achievements.sw.clickToOpen": "Clique para ver detalhes",
          "achievements.sw.placement": "Colocação",
          "achievements.sw.dateLabel": "Data",
          "achievements.sw.locationLabel": "Local",
          "achievements.sw.pitch": "Apresentação do Pitch",
          "achievements.sw.graphs": "Dados de Validação",
          "achievements.sw.viewDocs": "Ver Documentos",
          "achievements.sw.backToInfo": "Voltar",
          "achievements.sw.selectDoc": "Selecione um documento para visualizar",
          "achievements.comingSoon": "Em Breve"
        }
      },
      ES: {
        translation: {
          "hero.greeting": "Hola, mi nombre es",
          "hero.role": "Desarrolladora Full Stack",
          "hero.description": "Soy estudiante de Sistemas de Información en el último semestre de la carrera.",
          "tech.title": "Mis",
          "tech.subtitle": "Tecnologías",
          "contact.title": "Contáctame",
          "contact.welcome": "¡Hola! Estamos emocionados por conectar 🔗",
          "contact.input_label": "ingrese su",
          "contact.fields.email": "correo",
          "contact.fields.name": "nombre",
          "contact.fields.company": "empresa",
          "contact.fields.description": "descripción",
          // ADICIONE ESTAS LINHAS ABAIXO:
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
              link: "#"
            },
            {
              title: "Proyecto de Extensión",
              description: "Protagonismo Juvenil en la Era Digital",
              tech: ["Enseñanza", "Informática", "Comunidad"],
              link: "https://drive.google.com/file/d/1LUM4euMbWL19hjXX-KYLRIWYS_AZ1day/view?usp=sharing",
              image: "/images/extensionproj.png"
            },
            {
              title: "Plataforma E-commerce",
              description: "Aplicación de comercio electrónico completa con integración de pagos, catálogo de productos y autenticación.",
              tech: ["HTML", "CSS", "JavaScript"],
              link: "https://thuanykamers.github.io/DressUP/",
              image: "/images/dressup.png"
            },
            {
              title: "Aplicación Social",
              description: "Red social en tiempo real con mensajería, notificaciones y perfiles de usuario.",
              tech: ["React", "Firebase", "Tailwind"],
              link: "#"
            }
          ],
          "achievements.title": "Logros",
          "achievements.sw.badge": "3er Lugar",
          "achievements.sw.title": "Startup Weekend SJ - Ciberseguridad",
          "achievements.sw.event": "Startup Weekend São José 2025",
          "achievements.sw.date": "25 al 27 de abril de 2025",
          "achievements.sw.location": "São José, Santa Catarina, Brasil",
          "achievements.sw.description": "Competencia de 54 horas enfocada en ciberseguridad, donde desarrollamos VerifiCAR — una plataforma donde los compradores pueden verificar si el enlace de un anuncio de vehículo es auténtico.",
          "achievements.sw.certificate": "Certificado",
          "achievements.sw.theme": "Ciberseguridad",
          "achievements.sw.clickToOpen": "Haz clic para ver detalles",
          "achievements.sw.placement": "Posición",
          "achievements.sw.dateLabel": "Fecha",
          "achievements.sw.locationLabel": "Ubicación",
          "achievements.sw.pitch": "Presentación del Pitch",
          "achievements.sw.graphs": "Datos de Validación",
          "achievements.sw.viewDocs": "Ver Documentos",
          "achievements.sw.backToInfo": "Volver",
          "achievements.sw.selectDoc": "Selecciona un documento para ver",
          "achievements.comingSoon": "Próximamente"
        }
      },
      DE: {
        translation: {
          "hero.greeting": "Hallo, mein Name ist",
          "hero.role": "Full-Stack-Entwicklerin",
          "hero.description": "Ich studiere Informationssysteme im letzten Semester meines Studiums.",
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
              link: "#"
            },
            {
              title: "Erweiterungsprojekt",
              description: "Jugendlicher Protagonismus im digitalen Zeitalter",
              tech: ["Unterricht", "Informatik", "Gemeinschaft"],
              link: "https://drive.google.com/file/d/1LUM4euMbWL19hjXX-KYLRIWYS_AZ1day/view?usp=sharing",
              image: "/images/extensionproj.png"
            },
            {
              title: "E-Commerce-Plattform",
              description: "Vollständige E-Commerce-Anwendung mit Zahlungsintegration, Produktkatalog und Benutzerauthentifizierung.",
              tech: ["HTML", "CSS", "JavaScript"],
              link: "https://thuanykamers.github.io/DressUP/",
              image: "/images/dressup.png"
            },
            {
              title: "Social-Media-App",
              description: "Echtzeit-soziales Netzwerk mit Nachrichten, Benachrichtigungen und Benutzerprofilen.",
              tech: ["React", "Firebase", "Tailwind"],
              link: "#"
            }
          ],
          "achievements.title": "Erfolge",
          "achievements.sw.badge": "3. Platz",
          "achievements.sw.title": "Startup Weekend SJ - Cybersicherheit",
          "achievements.sw.event": "Startup Weekend São José 2025",
          "achievements.sw.date": "25. bis 27. April 2025",
          "achievements.sw.location": "São José, Santa Catarina, Brasilien",
          "achievements.sw.description": "54-Stunden-Hackathon mit Schwerpunkt Cybersicherheit, bei dem wir VerifiCAR entwickelten — eine Plattform, auf der Käufer überprüfen können, ob der Link einer Fahrzeuganzeige authentisch ist.",
          "achievements.sw.certificate": "Zertifikat",
          "achievements.sw.theme": "Cybersicherheit",
          "achievements.sw.clickToOpen": "Klicken Sie für Details",
          "achievements.sw.placement": "Platzierung",
          "achievements.sw.dateLabel": "Datum",
          "achievements.sw.locationLabel": "Ort",
          "achievements.sw.pitch": "Pitch-Präsentation",
          "achievements.sw.graphs": "Validierungsdaten",
          "achievements.sw.viewDocs": "Dokumente ansehen",
          "achievements.sw.backToInfo": "Zurück",
          "achievements.sw.selectDoc": "Wählen Sie ein Dokument aus",
          "achievements.comingSoon": "Demnächst"
        }
      },
      FR: {
        translation: {
          "hero.greeting": "Bonjour, je m'appelle",
          "hero.role": "Développeuse Full Stack",
          "hero.description": "Je suis étudiante en Systèmes d'Information en dernière année de licence.",
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
              link: "#"
            },
            {
              title: "Projet d'Extension",
              description: "Protagonisme Juvénile à l'Ère Numérique",
              tech: ["Enseignement", "Informatique", "Communauté"],
              link: "https://drive.google.com/file/d/1LUM4euMbWL19hjXX-KYLRIWYS_AZ1day/view?usp=sharing",
              image: "/images/extensionproj.png"
            },
            {
              title: "Plateforme E-commerce",
              description: "Application e-commerce complète avec intégration de paiement, catalogue de produits et authentification.",
              tech: ["HTML", "CSS", "JavaScript"],
              link: "https://thuanykamers.github.io/DressUP/",
              image: "/images/dressup.png"
            },
            {
              title: "Application Sociale",
              description: "Réseau social en temps réel avec messagerie, notifications et profils d'utilisateurs.",
              tech: ["React", "Firebase", "Tailwind"],
              link: "#"
            }
          ],
          "achievements.title": "Réalisations",
          "achievements.sw.badge": "3ème Place",
          "achievements.sw.title": "Startup Weekend SJ - Cybersécurité",
          "achievements.sw.event": "Startup Weekend São José 2025",
          "achievements.sw.date": "25 au 27 avril 2025",
          "achievements.sw.location": "São José, Santa Catarina, Brésil",
          "achievements.sw.description": "Compétition de 54 heures axée sur la cybersécurité, où nous avons développé VerifiCAR — une plateforme permettant aux acheteurs de vérifier si le lien d'une annonce de véhicule est authentique.",
          "achievements.sw.certificate": "Certificat",
          "achievements.sw.theme": "Cybersécurité",
          "achievements.sw.clickToOpen": "Cliquez pour voir les détails",
          "achievements.sw.placement": "Classement",
          "achievements.sw.dateLabel": "Date",
          "achievements.sw.locationLabel": "Lieu",
          "achievements.sw.pitch": "Présentation du Pitch",
          "achievements.sw.graphs": "Données de Validation",
          "achievements.sw.viewDocs": "Voir les Documents",
          "achievements.sw.backToInfo": "Retour",
          "achievements.sw.selectDoc": "Sélectionnez un document à afficher",
          "achievements.comingSoon": "Bientôt"
        }
      }
    },
    lng: "PT",
    fallbackLng: "PT",
    interpolation: { escapeValue: false }
  });

export default i18n;
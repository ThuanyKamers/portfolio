# Configuração EmailJS para Contact Form

## Passos para configurar o envio de emails:

### 1. Criar conta no EmailJS
- Acesse: https://www.emailjs.com/
- Clique em "Sign Up Free"
- Crie uma conta com seu email

### 2. Configurar serviço de email
- No dashboard, vá em "Email Services"
- Clique em "Add Service"
- Escolha Gmail (ou seu provedor de email)
- Siga as instruções para conectar sua conta de email

### 3. Pegar o Service ID
- Após configurar o serviço, copie o **Service ID** (exemplo: `service_abc123`)

### 4. Criar template de email
- No dashboard, vá em "Email Templates"
- Clique em "Create New Template"
- Use este template:

```
Subject: Nova mensagem de contato de {{from_name}}

Olá,

Você recebeu uma nova mensagem através do seu portfólio:

Remetente: {{from_name}}
Email: {{from_email}}
Empresa: {{company}}

Mensagem:
{{message}}

---
Mensagem enviada automaticamente através do formulário de contato.
```

- Salve e copie o **Template ID** (exemplo: `template_abc123`)

### 5. Pegar sua Public Key
- Vá em "Account" (ícone no canto superior direito)
- Copie a **Public Key**

### 6. Atualizar o código
No arquivo `src/sections/Contact.tsx`, substitua:

```typescript
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');  // Coloque sua Public Key aqui
...
await emailjs.send('YOUR_EMAILJS_SERVICE_ID', 'YOUR_EMAILJS_TEMPLATE_ID', templateParams);
// YOUR_EMAILJS_SERVICE_ID = seu Service ID
// YOUR_EMAILJS_TEMPLATE_ID = seu Template ID
```

Também altere:
```typescript
to_email: 'seu_email@gmail.com' // Seu email
```

### 7. Testar
- Abra seu site
- Preencha o formulário de contato
- Clique em "Send"
- Você receberá um email com a mensagem!

## Variáveis disponíveis no template:
- `{{from_name}}` - Nome do visitante
- `{{from_email}}` - Email do visitante
- `{{company}}` - Empresa (opcional)
- `{{message}}` - Mensagem
- `{{to_email}}` - Seu email

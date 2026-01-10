# Integração MailerSend - Documentação

## Configuração

A integração com MailerSend foi implementada com sucesso. O token de API já foi configurado no arquivo `.env.local`.

### Variáveis de Ambiente Necessárias

O arquivo `.env.local` foi criado com as seguintes variáveis:

```
MAILERSEND_API_KEY=mlsn.ac62b1da070aa34281ff221ad9aed943e130bfc8d8f28167b5f91b2711452077
CONTACT_EMAIL_FROM=contato@seusite.com
CONTACT_EMAIL_TO=seu-email@gmail.com
```

**⚠️ IMPORTANTE:** Atualize as seguintes variáveis com seus dados reais:
- `CONTACT_EMAIL_FROM`: Email do remetente (deve ser um domínio verificado no MailerSend)
- `CONTACT_EMAIL_TO`: Email para o qual os contatos serão enviados

### Como Funciona

1. **Frontend (Contact.tsx)**
   - Coleta dados do formulário (nome, email, mensagem)
   - Envia uma requisição POST para `/api/contact`
   - Exibe mensagens de sucesso ou erro

2. **Backend (route.ts)**
   - Valida os dados recebidos
   - Envia dois emails via MailerSend:
     - Email para você (admin) com os dados da submissão
     - Email de confirmação para o recrutador

### Fluxo de Envio

```
Usuário preenche formulário
         ↓
Submete via POST /api/contact
         ↓
Backend valida dados
         ↓
MailerSend envia 2 emails:
  - Email do recrutador → Admin
  - Email de confirmação → Recrutador
         ↓
Retorna status de sucesso/erro
         ↓
Frontend exibe mensagem apropriada
```

### Próximos Passos

1. **Verificar domínio no MailerSend**
   - Acesse https://app.mailersend.com
   - Verifique o domínio que será usado em `CONTACT_EMAIL_FROM`
   - Adicione os registros DNS necessários

2. **Testar a integração**
   - Execute `npm run dev`
   - Preencha o formulário de contato
   - Verifique se os emails foram recebidos

3. **Monitorar erros**
   - Verifique o console do Next.js para logs
   - Use o dashboard do MailerSend para monitorar envios

### Segurança

- O token de API está protegido em `.env.local`
- Nunca exponha o token em commits públicos
- Adicione `.env.local` ao `.gitignore` se ainda não estiver

### Pacotes Instalados

- `mailersend`: Biblioteca oficial do MailerSend para Node.js

### Troubleshooting

Se encontrar problemas:

1. **Email não enviado**
   - Verifique se `CONTACT_EMAIL_FROM` é um domínio verificado no MailerSend
   - Confira se o token de API está correto
   - Verifique os logs no dashboard do MailerSend

2. **Erro de validação**
   - Certifique-se que o email do recrutador é válido
   - Verifique se todos os campos foram preenchidos

3. **Problemas de configuração**
   - Reinicie o servidor `npm run dev`
   - Valide as variáveis de ambiente no `.env.local`

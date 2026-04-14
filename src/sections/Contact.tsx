import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from "../components/ui/stateful-button";
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  // Steps: 0=email, 1=verify code, 2=name, 3=company, 4=description, 5=summary
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ email: '', name: '', company: '', description: '' });
  const [inputValue, setInputValue] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [sendingCode, setSendingCode] = useState(false);
  const [codeSendError, setCodeSendError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const generateCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationCode = async (email: string): Promise<boolean> => {
    const code = generateCode();
    setVerificationCode(code);

    try {
      setSendingCode(true);
      await emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_CODE, {
        to_email: email,
        verification_code: code,
      });
      return true;
    } catch (error) {
      console.error('Erro ao enviar código:', error);
      return false;
    } finally {
      setSendingCode(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [step, isSent, sendingCode]);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      if (step === 0) {
        if (!isValidEmail(inputValue)) {
          setHasEmailError(true);
          return;
        }
        setHasEmailError(false);
        setCodeSendError(false);
        setFormData({ ...formData, email: inputValue });

        // Send verification code
        const sent = await sendVerificationCode(inputValue);
        if (!sent) {
          setCodeSendError(true);
          return;
        }

        setStep(1);
        setInputValue('');
        return;
      }

      if (step === 1) {
        // Verify the code
        if (inputValue.trim() !== verificationCode) {
          setCodeError(true);
          return;
        }
        setCodeError(false);
      }

      if (step === 2) setFormData(prev => ({ ...prev, name: inputValue }));
      if (step === 3) setFormData(prev => ({ ...prev, company: inputValue }));
      if (step === 4) setFormData(prev => ({ ...prev, description: inputValue }));

      setStep(step + 1);
      setInputValue('');
    }
  };

  const sendEmail = async () => {
    try {
      const templateParams = {
        to_email: 'thuanykamers@hotmail.com',
        from_email: formData.email,
        from_name: formData.name,
        company: formData.company || 'Não informado',
        message: formData.description,
      };

      await emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT, templateParams);
      setIsSent(true);
    } catch (error) {
      console.error('Erro ao enviar email:', error);
    }
  };

  const restart = () => {
    setStep(0);
    setFormData({ email: '', name: '', company: '', description: '' });
    setIsSent(false);
    setVerificationCode('');
    setCodeError(false);
    setHasEmailError(false);
  };

  const getInputLabel = () => {
    switch (step) {
      case 0: return t('contact.fields.email');
      case 1: return t('contact.fields.code');
      case 2: return t('contact.fields.name');
      case 3: return t('contact.fields.company');
      case 4: return t('contact.fields.description');
      default: return '';
    }
  };

  return (
    <section id="contact" className="w-full py-20 md:py-48 flex flex-col items-center bg-(--background)" style={{ backgroundColor: 'var(--background)' }}>
      <div className="w-full max-w-5xl px-4 md:px-16">
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <h2 className="text-4xl font-bold tracking-tighter" style={{ color: 'var(--foreground)' }}>
            {t('contact.title')} <span className="text-blue-400 italic">{t('contact.subtitle')}</span>
          </h2>
        </div>

        <div onClick={focusInput} className="w-full backdrop-blur-md rounded-xl overflow-hidden shadow-2xl flex flex-col mt-16 mb-32 cursor-text" style={{ marginBottom: '80px', background: 'linear-gradient(135deg, rgba(13,17,23,0.65) 0%, rgba(22,27,34,0.65) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ padding: '20px 28px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
            </div>
          </div>

          <div ref={scrollRef} className="h-80 md:h-125 overflow-y-auto space-y-6 text-white/90 no-scrollbar" style={{ padding: '16px 28px 32px 28px' }}>
            {/* Sucesso */}
            {isSent ? (
              <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                <p className="text-emerald-400 font-bold text-xl animate-bounce">
                  ✓ {t('contact.success.sent')}
                </p>
                <p className="text-white/60">{t('contact.success.thanks')}</p>
              </div>
            ) : (
              <>
            <p className="text-purple-400">{t('contact.welcome')}</p>
            <p className="opacity-20 text-xs">--------------------------------------------------------------------------------</p>

            {/* Passo 0: Email */}
            <div className="space-y-3">
              <p>{t('contact.steps.email')}</p>
              {step > 0 && <p className="text-emerald-400 flex items-center gap-2">✓ <span className="underline decoration-emerald-500/30">{formData.email}</span></p>}
            </div>

            {/* Passo 1: Código de verificação */}
            {step >= 1 && (
              <div className="space-y-3">
                <p>{t('contact.steps.code')}</p>
                {step > 1 && <p className="text-emerald-400 flex items-center gap-2">✓ {t('contact.steps.codeVerified')}</p>}
              </div>
            )}

            {/* Passo 2: Nome */}
            {step >= 2 && (
              <div className="space-y-3">
                <p>{t('contact.steps.name')}</p>
                {step > 2 && <p className="text-emerald-400 flex items-center gap-2">✓ {formData.name}</p>}
              </div>
            )}

            {/* Passo 3: Empresa */}
            {step >= 3 && (
              <div className="space-y-3">
                <p>{t('contact.steps.company')} <span className="text-white/30 text-xs">({t('contact.steps.optional')})</span></p>
                {step > 3 && <p className="text-emerald-400 flex items-center gap-2">✓ {formData.company}</p>}
              </div>
            )}

            {/* Passo 4: Ajuda/Descrição */}
            {step >= 4 && (
              <div className="space-y-3">
                <p>{t('contact.steps.help')}</p>
                {step > 4 && <p className="text-emerald-400 flex items-center gap-2 italic text-sm">✓ "{formData.description}"</p>}
              </div>
            )}

            {/* Passo 5: Resumo e Confirmação */}
            {step >= 5 && (
              <div className="pt-6 space-y-3 border-t border-white/10">
                <p className="text-blue-400 font-bold uppercase tracking-tighter">{t('contact.summary.title')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 p-4 rounded-lg border border-white/5">
                  <p><span className="text-blue-400 opacity-60">email:</span> {formData.email}</p>
                  <p><span className="text-blue-400 opacity-60">name:</span> {formData.name}</p>
                  <p><span className="text-blue-400 opacity-60">company:</span> {formData.company}</p>
                  <p className="col-span-full"><span className="text-blue-400 opacity-60">description:</span> {formData.description}</p>
                </div>
                <p className="mt-4 animate-pulse">{t('contact.summary.confirm')}</p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                  <button onClick={restart} className="px-6 sm:px-10 py-3 bg-white text-black rounded-lg cursor-pointer hover:bg-gray-200 transition-all font-bold text-xs uppercase tracking-widest">
                    {t('contact.buttons.restart')}
                  </button>
                  <Button onClick={sendEmail} className="px-6 sm:px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 font-bold text-xs uppercase tracking-widest cursor-pointer">
                    {t('contact.buttons.send')}
                  </Button>
                </div>
              </div>
            )}

            {/* Enviando código... */}
            {sendingCode && (
              <p className="text-yellow-400 animate-pulse text-sm">{t('contact.steps.sendingCode')}</p>
            )}

            {/* Input Ativo */}
            {!sendingCode && step < 5 && (
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 md:gap-3 pt-2">
                  <span className="text-emerald-400 font-bold animate-pulse">→</span>
                  <span className="text-blue-400">~</span>
                  <span className="opacity-40 text-xs uppercase">
                    {t('contact.input_label')} {getInputLabel()}:
                  </span>
                  <input
                    ref={inputRef}
                    autoFocus
                    className="bg-transparent border-none outline-none flex-1 text-white border-b border-transparent focus:border-blue-500/50 transition-all"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                {hasEmailError && step === 0 && (
                  <p className="text-red-400 text-xs opacity-80">{t('contact.invalidEmail')}</p>
                )}
                {codeSendError && step === 0 && (
                  <p className="text-red-400 text-xs opacity-80">{t('contact.codeSendError')}</p>
                )}
                {codeError && step === 1 && (
                  <p className="text-red-400 text-xs opacity-80">{t('contact.invalidCode')}</p>
                )}
              </div>
            )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

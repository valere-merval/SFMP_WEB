import { useState } from 'react';
import { login } from '../lib/api';
import { Card, Pill } from '../components/ui';

type Locale = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'ar' | 'zh' | 'ru';

const COPY: Record<Locale, { title: string; subtitle: string; authLabel: string; username: string; password: string; signIn: string; guest: string; overview: string; loginError: string }> = {
  en: { title: 'Sign in to matchday mobility', subtitle: 'Use your email to access the live fan, operations and admin journeys.', authLabel: 'Secure access', username: 'Email', password: 'Password', signIn: 'Sign in', guest: 'Guest mode', overview: 'What you get', loginError: 'Invalid credentials. Use a backend-issued account.' },
  es: { title: 'Inicia sesión para la movilidad del partido', subtitle: 'Usa tu correo para acceder a las experiencias en vivo de fans, operaciones y admin.', authLabel: 'Acceso seguro', username: 'Correo', password: 'Contraseña', signIn: 'Entrar', guest: 'Modo invitado', overview: 'Lo que obtienes', loginError: 'Credenciales inválidas. Usa una cuenta creada en el backend.' },
  fr: { title: 'Connexion à la mobilité du match', subtitle: 'Utilisez votre e-mail pour accéder aux parcours fan, opérations et admin.', authLabel: 'Accès sécurisé', username: 'E-mail', password: 'Mot de passe', signIn: 'Se connecter', guest: 'Mode invité', overview: 'Ce que vous obtenez', loginError: 'Identifiants invalides. Utilisez un compte créé côté backend.' },
  de: { title: 'Anmelden für die Spieltag-Mobilität', subtitle: 'Nutze deine E-Mail für Fan-, Ops- und Admin-Ansichten.', authLabel: 'Sicherer Zugriff', username: 'E-Mail', password: 'Passwort', signIn: 'Anmelden', guest: 'Gastmodus', overview: 'Das bekommst du', loginError: 'Ungültige Zugangsdaten. Nutze ein Backend-Konto.' },
  pt: { title: 'Entrar na mobilidade do jogo', subtitle: 'Use seu e-mail para acessar as jornadas de fãs, operações e admin.', authLabel: 'Acesso seguro', username: 'E-mail', password: 'Senha', signIn: 'Entrar', guest: 'Modo convidado', overview: 'O que você recebe', loginError: 'Credenciais inválidas. Use uma conta do backend.' },
  ar: { title: 'تسجيل الدخول إلى تنقل المباراة', subtitle: 'استخدم بريدك الإلكتروني للوصول إلى رحلات المشجعين والعمليات والإدارة.', authLabel: 'وصول آمن', username: 'البريد الإلكتروني', password: 'كلمة المرور', signIn: 'تسجيل الدخول', guest: 'وضع الضيف', overview: 'ما الذي ستحصل عليه', loginError: 'بيانات الاعتماد غير صحيحة. استخدم حسابًا من الخلفية.' },
  zh: { title: '登录比赛出行平台', subtitle: '使用你的邮箱访问球迷、运营和管理后台。', authLabel: '安全访问', username: '电子邮箱', password: '密码', signIn: '登录', guest: '访客模式', overview: '你将获得', loginError: '凭据无效，请使用后台创建的账号。' },
  ru: { title: 'Войти в матчевую мобильность', subtitle: 'Используйте e-mail для доступа к разделам фанатов, операций и админки.', authLabel: 'Безопасный вход', username: 'Электронная почта', password: 'Пароль', signIn: 'Войти', guest: 'Гостевой режим', overview: 'Что вы получите', loginError: 'Неверные данные. Используйте аккаунт из backend.' },
};

const SUPPORTED: Locale[] = ['en', 'es', 'fr', 'de', 'pt', 'ar', 'zh', 'ru'];

export function AuthScreen({ locale, onLocaleChange, onContinue }: { locale: Locale; onLocaleChange: (locale: Locale) => void; onContinue: () => void }) {
  const [email, setEmail] = useState('fan@sfmp.local');
  const [password, setPassword] = useState('fan123');
  const [error, setError] = useState<string | null>(null);

  const copy = COPY[locale];

  const submit = async () => {
    try {
      setError(null);
      await login(email, password);
      onContinue();
    } catch {
      setError(copy.loginError);
    }
  };

  return (
    <div className="app-shell auth-shell">
      <header className="topbar auth-topbar">
        <div>
          <p className="eyebrow">SMART FAN MOBILITY</p>
          <h1>{copy.title}</h1>
          <p className="lead">{copy.subtitle}</p>
        </div>
        <div className="hero-card auth-hero">
          <div className="hero-topline"><Pill>{copy.authLabel}</Pill><Pill subtle>LIVE</Pill></div>
          <div className="lang-switch" aria-label="Language switcher">
            {SUPPORTED.map((code) => (
              <button key={code} type="button" className={locale === code ? 'lang-pill active' : 'lang-pill'} onClick={() => onLocaleChange(code)}>
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <h2>{copy.authLabel}</h2>
          <p>{copy.subtitle}</p>
          <label className="auth-label">
            {copy.username}
            <input className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="fan@sfmp.local" />
          </label>
          <label className="auth-label">
            {copy.password}
            <input className="auth-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="fan123" />
          </label>
          {error ? <p className="auth-error">{error}</p> : null}
          <div className="cta-row"><button className="primary" onClick={submit}>{copy.signIn}</button><button className="secondary" onClick={onContinue}>{copy.guest}</button></div>
        </div>
      </header>
      <section className="section-grid">
        <Card title={copy.overview} subtitle="Overview" wide>
          <div className="list-stack">
            {['Journey planning', 'Wayfinding maps', 'Ticket and transit pass', 'Operations visibility'].map((item) => (
              <div key={item} className="bullet-row"><span className="dot" /><p>{item}</p></div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

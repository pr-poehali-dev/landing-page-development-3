export const IconCheck = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="m4 12.5 5.5 5.5L20 6.5" /></svg>
);

export const IconClock = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="3.5" width="17" height="17" /><path d="M12 7.5V12l3.5 3" /></svg>
);

export const IconBolt = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 5 13.5h5L10.5 22 19 10h-5.5L13 2Z" /></svg>
);

export const IconPlus = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 4v16M4 12h16" /></svg>
);

export const IconTrash = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 6.5h16M9.5 6.5V4h5v2.5M6.5 6.5l1 14h9l1-14M10 10.5v6.5M14 10.5v6.5" /></svg>
);

export const IconArrow = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12h17M14 5.5 20.5 12 14 18.5" /></svg>
);

export const IconTelegram = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m3 11 17.5-7-3.4 15.5-6.3-4.4-2.9 2.7.5-4.2L19 6 8.4 12.9 3 11Z" /></svg>
);

export const IconShield = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2.8 4.5 5.6v6.1c0 5 3.2 8 7.5 9.5 4.3-1.5 7.5-4.5 7.5-9.5V5.6L12 2.8Z" /><path d="m8.6 11.8 2.5 2.5 4.6-5" /></svg>
);

export const IconDoc = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 2.8h8.5L19 7.3v13.9H6V2.8Z" /><path d="M14 3v4.5h4.5M9 12h6M9 15.5h6" /></svg>
);

export const IconClipboard = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="4.5" width="16" height="17" /><path d="M9 2.5h6v4H9zM8 11.5h8M8 15h8M8 18.5h4.5" /></svg>
);

export const IconClose = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 5l14 14M19 5 5 19" /></svg>
);

export const IconStar = ({ size = 15, off = false }: { size?: number; off?: boolean }) =>
  off ? (
    <svg className="off" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 2.5l2.9 6.3 6.6.8-4.9 4.6 1.3 6.6L12 17.5l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8L12 2.5Z" /></svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6.3 6.6.8-4.9 4.6 1.3 6.6L12 17.5l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8L12 2.5Z" /></svg>
  );

export const IconMail = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" /><path d="m3.5 6 8.5 7 8.5-7" /></svg>
);

export const IconPhone = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 3.5h4l1.5 5-2.3 1.8a13 13 0 0 0 5.5 5.5L15.5 13.5l5 1.5v4a1.6 1.6 0 0 1-1.8 1.6C10.5 20 4 13.5 3.4 5.3A1.6 1.6 0 0 1 5 3.5Z" /></svg>
);

export const IconSpark = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--signal)" strokeWidth="1.8"><path d="M12 2v7M12 15v7M2 12h7M15 12h7" /><path d="m5.5 5.5 3 3M15.5 15.5l3 3M18.5 5.5l-3 3M8.5 15.5l-3 3" strokeWidth="1.2" /></svg>
);

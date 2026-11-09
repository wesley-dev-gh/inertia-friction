"use client";
export default function ScreenBlocker() {
  return (
    <div
      className="
    screenBlocker 
    fixed inset-0 
    flex flex-col gap-5 items-center justify-center 
    bg-(--bg-primary) text-(--text-primary) 
    p-6 text-center 
    [@media(min-width:320px)_and_(min-height:620px)]:hidden"
    >
      <h2
        className="
      text-[calc(var(--layout-vw)*5)] sm:text-[calc(var(--layout-vw)*4)] lg:text-[calc(var(--layout-vw)*2)] 
      font-semibold mb-2"
      >
        (Tela não suportada)
      </h2>
      <p className="text-xl font-medium">
        Para uma melhor experiência, vire seu dispositivo ou acesse de uma tela
        maior.
      </p>
    </div>
  );
}

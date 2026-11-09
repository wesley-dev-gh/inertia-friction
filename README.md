# Inertia Friction

Experiência interativa de física feita com Next.js. Uma malha de pontos é desenhada em tempo real no Canvas e reage ao movimento, simulando inércia, elasticidade e atrito.

## Requisitos

- Node.js e npm

## Executar localmente

```bash
npm ci
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Interações

- **Computador:** mova o ponteiro sobre os pontos para deslocá-los. Eles retornam gradualmente às posições originais.
- **Celular ou tablet:** toque na tela para gerar um impulso. Em dispositivos e navegadores compatíveis.


## Comandos

```bash
npm run dev    # inicia o servidor de desenvolvimento
npm run lint   # verifica o código com ESLint
npm run build  # gera a versão de produção
npm run start  # serve a versão gerada por npm run build
```

## Estrutura do projeto

```text
src/
	app/
		page.jsx       # página principal
		layout.jsx     # layout global e metadados
		globals.css    # estilos globais e tema Tailwind
		robots.js      # regras para mecanismos de busca
		sitemap.js     # sitemap do site
	components/      # Canvas, laterais, listas e layout
	data/data.js     # faixas exibidas na interface
	hooks/use-home.js# animação e interações da simulação
public/
	fonts/           # fontes locais
	images/          # imagens estáticas
```

As listas de faixas podem ser alteradas em `src/data/data.js`. A simulação e seus controles ficam em `src/hooks/use-home.js`; a composição da tela começa em `src/app/page.jsx`.

## Tecnologias

- Next.js 16 e React 19
- Tailwind CSS 4
- Canvas 2D e APIs de ponteiro e movimento do navegador

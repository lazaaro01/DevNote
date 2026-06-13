# DevVault

Biblioteca pessoal de conhecimento técnico com conteúdos sobre desenvolvimento de software, arquitetura, banco de dados e muito mais.

## Stack

- **Framework:** Next.js 16 (App Router, SSG)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4
- **Conteúdo:** MDX com gray-matter + next-mdx-remote
- **Fontes:** Geist (Sans + Mono) via next/font

## Funcionalidades

### 📄 Conteúdo

- Artigos em MDX organizados por categorias
- Frontmatter com título, descrição, tags, data, layout, tema e template
- Geração estática (SSG) com 41 rotas pré-renderizadas
- Sitemap e RSS feed automáticos

### 🎨 Personalização por artigo

Cada artigo pode definir no frontmatter:

```yaml
layout: reading        # default | full-width | reading
theme: violet          # violet | blue | emerald | amber | rose | cyan | orange | pink | indigo | red | fuchsia
template: tutorial     # article | tutorial | cheatsheet | reference
```

### 🖌️ Toolbar de personalização (cliente)

Botão flutuante 🎨 no canto inferior direito dos artigos que permite:

- **Layout:** Padrão, Largo, Leitura, Apresentação
- **Tema:** 11 cores de acento + padrão
- Preferências salvas no `localStorage`

### 🎬 Modo Apresentação

Ativado via toolbar ou tecla `P`. Esconde sidebar e TOC, centraliza o conteúdo com fonte maior e fundo mais escuro — ideal para leitura focada ou apresentações.

### ⌨️ Atalhos de teclado

| Tecla | Ação |
|-------|------|
| `/` | Focar na busca |
| `?` | Abrir lista de atalhos |
| `P` | Alternar modo apresentação |
| `ESC` | Fechar modal / limpar busca |

### 📑 Navegação

- Sidebar fixa com categorias e contadores
- Breadcrumbs em cada artigo
- Tabela de conteúdos lateral com links âncora
- Artigos relacionados por categoria
- Tags clicáveis

### 🎯 Extras

- Tema escuro com fundo aurora animado
- Gradientes e animações CSS (sem bibliotecas externas)
- Botão de impressão / PDF
- Skeleton loading em páginas de categoria e artigo
- Página de busca com filtro por texto

## Estrutura

```
src/
├── app/
│   ├── [category]/[slug]/   # Página do artigo
│   ├── [category]/           # Listagem por categoria
│   ├── feed.xml/             # RSS feed
│   ├── search/               # Busca global
│   ├── sitemap.ts            # Sitemap
│   ├── globals.css           # Estilos globais + tema
│   ├── layout.tsx            # Layout raiz
│   └── page.tsx              # Home
├── components/
│   ├── layouts/              # LayoutSwitcher, Default, FullWidth, Reading
│   ├── templates/            # TemplateRenderer, TutorialTemplate
│   ├── ArticleToolbar.tsx    # Toolbar de personalização
│   ├── KeyboardShortcuts.tsx # Atalhos de teclado
│   ├── MDXContent.tsx        # Renderizador MDX
│   ├── Sidebar.tsx           # Sidebar de navegação
│   ├── TOC.tsx               # Tabela de conteúdos
│   └── ...                   # Demais componentes
├── lib/
│   ├── content.ts            # Carregador de conteúdo via filesystem
│   ├── types.ts              # Tipos compartilhados
│   └── utils.ts              # Utilitários
content/                      # Artigos MDX organizados por categoria
```

## Como usar

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview do build
npm run start
```

## Criar novo artigo

1. Crie um arquivo `.mdx` na categoria desejada em `content/`
2. Adicione o frontmatter:

```yaml
---
title: "Título do Artigo"
description: "Descrição curta"
category: "Backend"
tags:
  - Tag1
  - Tag2
featured: true
publishedAt: "2026-06-13"
layout: default
theme: ""
template: article
---
```

3. Escreva o conteúdo em Markdown com suporte a JSX via MDX
---
## Desenvolvido por **Lázaro Vasconcelos**.
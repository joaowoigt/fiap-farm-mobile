# 🌾 FarmApp - Sistema de Gestão Agrícola

Um aplicativo móvel completo para gestão de fazendas, desenvolvido como projeto final do Hackathon do curso de Engenharia de Frontend na FIAP + Alura.

## 📖 Introdução

O **FarmApp** é uma solução digital inovadora criada para facilitar a gestão de propriedades rurais. Com uma interface intuitiva e funcionalidades robustas, o aplicativo permite que produtores rurais gerenciem sua produção, vendas e metas de forma eficiente e organizada.

### ✨ Principais Funcionalidades

- **📊 Gestão de Produção**: Controle completo dos produtos cultivados com status de acompanhamento
- **💰 Controle de Vendas**: Registro e acompanhamento de vendas com cálculo automático de receitas
- **🎯 Metas e Objetivos**: Definição e monitoramento de metas de produção e vendas
- **📱 Interface Responsiva**: Design adaptado para dispositivos móveis com experiência otimizada
- **🔐 Autenticação Segura**: Sistema de login e registro com Firebase Authentication
- **☁️ Sincronização em Nuvem**: Dados salvos e sincronizados automaticamente

## 🚀 Como Inicializar o Projeto

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **Android Studio** (para emulador Android) ou **Xcode** (para simulador iOS)

### Passo a Passo

1. **Clone o repositório**

   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd fiap-farm-mobile
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure o Firebase**

   - Crie um projeto no [Firebase Console](https://console.firebase.google.com)
   - Ative Authentication e Firestore Database
   - Configure as credenciais no arquivo de configuração

4. **Inicie o servidor de desenvolvimento**

   ```bash
   npx expo start
   ```

5. **Execute o aplicativo**
   - **Android**: Pressione `a` no terminal ou escaneie o QR code com o Expo Go
   - **iOS**: Pressione `i` no terminal ou escaneie o QR code com o Expo Go
   - **Web**: Pressione `w` no terminal

### 📱 Testando o Aplicativo

- **Expo Go**: Instale o app Expo Go na loja de aplicativos e escaneie o QR code
- **Emulador**: Execute um emulador Android/iOS e o app será instalado automaticamente
- **Dispositivo Físico**: Conecte via USB e use `npx expo run:android` ou `npx expo run:ios`

## 🛠️ Tecnologias e Arquitetura

### Stack Tecnológico

- **React Native** - Framework principal para desenvolvimento mobile
- **Expo** - Plataforma de desenvolvimento e build
- **TypeScript** - Linguagem de programação com tipagem estática
- **Firebase** - Backend as a Service (Authentication + Firestore)
- **Expo Router** - Sistema de navegação baseado em arquivos

### 🏗️ Arquitetura Clean Architecture

O projeto segue os princípios da **Clean Architecture**, garantindo código organizado, testável e escalável:

```
📁 Estrutura do Projeto
├── 🎨 app/                    # Camada de Apresentação (UI)
│   ├── (auth)/               # Telas de autenticação
│   ├── (tabs)/               # Telas principais com navegação
│   ├── production/           # Módulo de produção
│   ├── sales/                # Módulo de vendas
│   └── goals/                # Módulo de metas
├── 🧠 domain/                # Camada de Domínio (Regras de Negócio)
│   ├── models/               # Entidades e modelos
│   ├── useCases/             # Casos de uso
│   └── repositories/         # Interfaces dos repositórios
├── 💾 data/                  # Camada de Dados (Acesso a dados)
│   ├── firebase/             # Implementações Firebase
│   ├── mappers/              # Conversores de dados
│   └── responses/            # Tipos de resposta da API
├── 🎨 design-system/         # Sistema de Design
│   ├── colors.ts             # Paleta de cores
│   ├── typography.ts         # Tipografia
│   └── components/           # Componentes reutilizáveis
└── 🔧 context/               # Gerenciamento de Estado Global
    ├── AuthContext.tsx       # Contexto de autenticação
    └── UserContext.tsx       # Contexto de dados do usuário
```

### 🎯 Padrões Implementados

- **Repository Pattern**: Abstração da camada de dados
- **Use Cases**: Encapsulamento da lógica de negócio
- **Context API**: Gerenciamento de estado global
- **Component Composition**: Componentes reutilizáveis e modulares
- **Type Safety**: Tipagem rigorosa com TypeScript

### 🔥 Firebase Services

- **Authentication**: Login/registro com email e senha
- **Firestore**: Banco de dados NoSQL em tempo real
- **Security Rules**: Regras de segurança para acesso aos dados

## 👨‍💻 Apresentação do Autor

### Olá! Eu sou João Woigt Azevedo 👋

**Desenvolvedor Android na Stone** e **Estudante de Engenharia de Frontend** na FIAP + Alura. Sou uma pessoa apaixonada tanto por educação quanto por tecnologias, com formação em Ciências Sociais pela Unicamp e transição para tecnologia durante a pandemia.

Este projeto representa a aplicação prática dos conhecimentos adquiridos em desenvolvimento frontend, combinando minha experiência em desenvolvimento móvel com as mais modernas tecnologias React Native.

### 🎓 Formação Acadêmica

- **Pós-graduação em Front-End Engineering** - FIAP (2024-2026)
- **Tecnologia da Informação** - Let's Code (2021-2022) - Bolsista Santander Universidades
- **Bacharelado e Licenciatura em Ciências Sociais** - Unicamp (2017-2021)

### 💼 Experiência Profissional

**Desenvolvedor Android Senior** com **3+ anos de experiência** no mercado:

- **Stone** (2024 - atual): Desenvolvedor Android com foco em KMP para as squads de Pix
- **CI&T** (2022-2024): Desenvolvedor Android Senior em projetos financeiros com +7mi de instalações
- **Jera** (2021-2022): Desenvolvedor Android
- **CNPq** (2018-2020): Bolsista PIBID - Programa de Introdução à Docência

### 🚀 Competências Técnicas

- **Mobile**: Android nativo, KMP (Kotlin Multiplatform), React Native
- **Frontend**: JavaScript, TypeScript, Next.js
- **Arquitetura**: MVVM, MVP, Clean Architecture, SOLID
- **Ferramentas**: Flow, Coroutines, Koin, Retrofit, JUnit, MockK

### 🏆 Certificações

- ViewModel e Lifecycle para Melhor Experiência em Aplicativos Android
- Desenvolvimento Integrado de Aplicações Android
- Building Industry-Level Multiplatform Apps With KMM
- Aplicando TDD e Padrões de Testes no Desenvolvimento de Aplicativos Android

### 📫 Contato

- **LinkedIn**: [linkedin.com/in/joaowoigt](https://www.linkedin.com/in/joaowoigt)
- **Email**: joaowoigt@gmail.com
- **Localização**: Limeira, São Paulo, Brasil

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte do Hackathon FIAP + Alura.

**Desenvolvido com ❤️ para o Hackathon FIAP + Alura 2025**

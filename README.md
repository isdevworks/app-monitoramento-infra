# 📊 Monitorização de Infraestrutura (React Native + Node.js)

Este é um projeto **experimental e funcional** construído com o objetivo de integrar a minha experiência em Infraestrutura e Redes com o Desenvolvimento Fullstack. O ecossistema recolhe métricas reais de hardware no back-end e apresenta-as numa interface móvel interativa.

O repositório está estruturado em dois módulos principais:
* **`api-hardware`**: Back-end em Node.js responsável por comunicar com o hardware e expor os dados.
* **`app-monitor`**: Front-end móvel construído em React Native e tipado com TypeScript.

## 📱 Como executar a aplicação móvel (Expo Go)

Para testar a interface da aplicação diretamente num dispositivo móvel de forma rápida, utilizamos a ferramenta **Expo Go**:

1. Descarregue e instale a aplicação **Expo Go** no seu telemóvel (disponível na App Store para iOS e Google Play para Android).
2. Clone este repositório no seu computador.
3. No terminal, aceda à pasta da aplicação e instale as dependências:
   ```bash
   cd app-monitor
   npm install

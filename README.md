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

## ⚠️ Configuração de Rede (Aviso Importante)

Como este aplicativo móvel consome a API hospedada na máquina local, a utilização de `localhost` ou `127.0.0.1` fará com que o aplicativo procure o servidor dentro do próprio aparelho celular, resultando em erro de conexão. 

Para avaliar o funcionamento completo:
1. Descubra o IP local do seu computador rodando `ipconfig` (Windows) ou `ifconfig` (Linux/Mac).
2. No arquivo `src/app/index.tsx` (linha 10), altere a URL do fetch substituindo `SEU_IP_LOCAL` pelo IP do seu computador (ex: `http://192.168.0.X:3000/metricas`).
3. Certifique-se de que o dispositivo rodando o Expo Go e o computador rodando o servidor Node.js estão na mesma rede Wi-Fi.

# Pipeline de Integração Contínua (CI)

## 📌 Visão Geral

Esta pipeline de **Integração Contínua (CI)** foi criada para automatizar a validação do projeto por meio da instalação de dependências, execução de testes automatizados e publicação de relatórios.

A workflow é executada em três cenários:

* **Manual** (via GitHub Actions)
* **Agendada** (execução diária)
* **Automática** (a cada push na branch `main`)

O objetivo é garantir que alterações no código não introduzam regressões e que a suíte de testes esteja sempre validada.

---

## ⚙️ Nome da Pipeline

```yaml
name: N1 - Execução Manual
```

Esse nome é exibido na aba **Actions** do GitHub.

---

## 🔐 Permissões

A pipeline utiliza a seguinte permissão:

```yaml
permissions:
  contents: write
```

Essa permissão permite:

* realizar commits automatizados;
* efetuar push no repositório;
* atualizar conteúdos durante a execução da workflow.

---

## 🚀 Gatilhos de Execução

### 1. Execução Manual

Permite disparar a pipeline diretamente pela interface do GitHub.

```yaml
workflow_dispatch:
```

Uso comum:

* rodar testes sob demanda;
* validar alterações antes de merge;
* reproduzir falhas.

---

### 2. Execução Agendada

A pipeline roda automaticamente todos os dias às **19:43 UTC**.

```yaml
schedule:
  - cron: '43 19 * * *'
```

Equivalência de horário:

* **UTC:** 19:43
* **Brasília (UTC-3):** 16:43

#### Estrutura do Cron

```text
┌ minuto (0 - 59)
│ ┌ hora (0 - 23)
│ │ ┌ dia do mês (1 - 31)
│ │ │ ┌ mês (1 - 12)
│ │ │ │ ┌ dia da semana (0 - 6)
│ │ │ │ │
* * * * *
```

---

### 3. Push na Branch Main

Executa a pipeline sempre que houver alterações enviadas para a branch principal.

```yaml
push:
  branches:
    - main
```

Isso garante validação contínua do código em produção.

---

# 🧱 Estrutura do Job

A pipeline possui um único job:

```yaml
jobs:
  test:
```

Esse job é responsável por preparar o ambiente e executar os testes.

---

## 🖥 Ambiente de Execução

```yaml
runs-on: ubuntu-latest
```

O runner utilizado é uma máquina Linux Ubuntu fornecida pelo GitHub.

---

# 🔄 Etapas da Pipeline

## 1. Checkout do Código

Baixa o código-fonte do repositório para o runner.

```yaml
- uses: actions/checkout@v4
```

---

## 2. Configuração do Node.js

Instala a versão necessária do Node.

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 24.x
```

Versão utilizada:

* Node.js **24.x**

---

## 3. Instalação do Yarn

Instala o gerenciador de pacotes globalmente.

```yaml
- name: Instalando Yarn
  run: npm install -g yarn
```

---

## 4. Instalação das Dependências

Instala todas as bibliotecas do projeto.

```yaml
- name: Instalando dependências
  run: yarn
```

Equivalente a:

```bash
yarn install
```

---

## 5. Execução dos Testes

Executa a suíte de testes automatizados.

```yaml
- name: Executar testes
  run: yarn test
```

Exemplos de validações possíveis:

* testes unitários;
* testes de integração;
* testes end-to-end.

---

## 6. Upload de Relatórios

Caso exista conteúdo na pasta `reports`, a pipeline publica os arquivos como artefatos.

```yaml
- name: Upload do relatório
  if: hashFiles('reports/**') != ''
  uses: actions/upload-artifact@v4
  with:
    name: mochawesome-report
    path: reports/
```

### Artefato Gerado

Nome do artefato:

```text
mochawesome-report
```

Esse artefato pode ser baixado após a execução pela interface do GitHub.

---

# 📊 Fluxo da Pipeline

```text
Disparo da Workflow
       ↓
Checkout do Código
       ↓
Configuração do Node
       ↓
Instalação do Yarn
       ↓
Instalação de Dependências
       ↓
Execução dos Testes
       ↓
Upload do Relatório (opcional)
```

---

# ✅ Benefícios da Pipeline

Esta CI oferece:

* automação de validações;
* detecção antecipada de erros;
* feedback rápido para desenvolvedores;
* rastreabilidade de relatórios de testes;
* maior confiabilidade nas entregas.

---

# 🛠 Tecnologias Utilizadas

* GitHub Actions
* Node.js
* Yarn
* Mochawesome (relatórios de teste)

---

# 📁 Estrutura Esperada do Projeto

```bash
.
├── .github/
│   └── workflows/
│       └── ci.yml
├── reports/
├── package.json
└── yarn.lock
```

---

# 👨‍💻 Manutenção

Para evoluir a pipeline futuramente, você pode adicionar:

* lint automático;
* análise de cobertura de testes;
* deploy automatizado;
* notificações em Slack / Teams;
* integração com SonarQube.

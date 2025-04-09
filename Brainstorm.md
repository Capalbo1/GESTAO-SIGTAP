# Sistema de Gestão e Auditoria para SUS/SIGTAP

## **Requisitos Funcionais Detalhados**

### **1. Integração com API SIGTAP (Módulo Crítico)**
- **Extração Automatizada de Dados**:
  - Conexão direta com a API do SIGTAP (ou scraping se API não estiver disponível).
  - Atualização diária dos dados:
    - Tabela completa de procedimentos válidos.
    - Valores de repasse (por procedimento, região, ou porte do hospital).
    - Licenças/exigências (ex.: procedimentos que requerem autorização especial).
- **Filtros e Processamento**:
  - Identificação dos **procedimentos mais lucrativos** (com base em valor bruto e frequência de uso).
  - Lista de procedimentos **disponíveis por hospital** (baseado em: 
    - Porte do hospital (ex.: pequeno, médio, grande).
    - Especialidades cadastradas (ex.: cardiologia, pediatria).
    - Licenças da unidade (ex.: procedimentos de alta complexidade).

### **2. Dashboard de Análise de Dados**
- **Métricas Chave**:
  - "Top 10 procedimentos por valor de repasse".
  - "Procedimentos mais realizados por sua rede".
  - Comparativo: "Seus procedimentos x média do SUS (na mesma região)".
- **Filtros Personalizáveis**:
  - Por período (mês/ano).
  - Por unidade hospitalar (se aplicável).

### **3. Sugestão de Procedimentos por CID (Inteligência do Sistema)**
- **Fluxo**:
  1. Médico insere **CID-10** (ex.: E11 - Diabetes Mellitus tipo 2).
  2. Sistema retorna:
     - Todos os procedimentos associados ao CID (com valores atualizados).
     - **Ordenação personalizável**:
       - Maior valor de repasse.
       - Menor burocracia (ex.: procedimentos sem necessidade de autorização prévia).
       - Mais frequentes no SUS.
  3. Detalhes por procedimento:
     - Licenças necessárias (ex.: "Requer autorização do gestor regional").
     - Materiais/insumos cobertos (link para tabela TUSS).

### **4. Validação de Conformidade**
- **Alertas Automáticos**:
  - "Procedimento X não é compatível com o CID Y (baseado em regras do SUS)".
  - "Hospital não possui licença para realizar procedimento Z".

---

## **Tecnologias para Implementação**

### **Backend (API e Processamento)**
- **Linguagem**: Python (bibliotecas como `requests` para API, `pandas` para análise de dados).
- **Autenticação na API SIGTAP**:
  - Token de acesso (se disponível) ou autenticação OAuth.
  - Fallback: Scraping com `BeautifulSoup` ou `Selenium` (se API for indisponível).
- **Cache de Dados**:
  - Redis (para armazenar temporariamente tabelas SIGTAP e reduzir chamadas à API).

### **Frontend (Visualização)**
- **Framework**: React.js (com bibliotecas como `Chart.js` para gráficos).
- **Componentes Chave**:
  - Filtro interativo de CIDs (com busca por nome ou código).
  - Tabela comparativa de procedimentos (ordenável por colunas).

### **Banco de Dados**
- **Estrutura**:
  - Tabela `procedimentos`:
    ```sql
    CREATE TABLE procedimentos (
      id SERIAL PRIMARY KEY,
      codigo_sigtap VARCHAR(20) UNIQUE,
      nome VARCHAR(255),
      valor DECIMAL(10,2),
      cids_compativel JSONB,  -- Array de CIDs associados
      licenca_necessaria VARCHAR(100)
    );
    ```

---

## **Exemplo de Caso de Uso**
**Cenário**: Um hospital de médio porte precisa aumentar sua receita com o SUS.  
1. **Passo 1**: Acessa o dashboard e identifica que "Cirurgia de Catarata (07.02.01.011-4)" paga R$ 1.200,00 e é frequente na região.  
2. **Passo 2**: No módulo de sugestão, o médico insere o CID "H25" (Catarata Senil) e descobre que:  
   - Pode realizar **3 procedimentos** diferentes (com valores entre R$ 800 e R$ 1.200).  
   - O mais lucrativo requer "Autorização da CES" (licença já possuída pelo hospital).  
3. **Resultado**: Hospital prioriza esse procedimento, aumentando repasses em 15%.

---

## **Próximos Passos**
1. **Contatar o DATASUS**:
   - Solicitar acesso formal à API SIGTAP (evitar scraping).  
2. **MVP (Mínimo Produto Viável)**:
   - Desenvolver primeiro o módulo de extração + dashboard (para validação do mercado).  
3. **Monetização**:
   - Cobrar por **hospital** (ex.: R$ 500/mês para pequenos, R$ 2.000/mês para grandes).  
   - Taxa adicional por **integração com sistemas existentes** (ex.: Tasy, MV).  


# Sistema de Gestão e Auditoria para SUS/SIGTAP (Parte 2: Fechamento Mensal)

## **4. Análise do Arquivo de Fechamento Mensal (TXT do SUS)**
### **Funcionalidades Principais**
- **Upload do Arquivo TXT**:
  - Padrão aceito: Formato oficial do SUS (ex.: `PA_UFMESANAMOV.txt`).
  - Validação inicial (estrutura do arquivo, encoding, etc.).
- **Processamento Automático**:
  - Extração de dados:
    - Procedimentos faturados.
    - Valores repassados.
    - CIDs associados.
  - Cruzamento com a base SIGTAP para:
    - **Auditoria de Conformidade** (Função 4):
      - Identificar procedimentos com:
        - Licenças faltantes (ex.: "Procedimento 07.02.01.011-4 requer autorização não enviada").
        - CIDs incompatíveis (ex.: CID "E11" com procedimento de oftalmologia).
        - Valores incorretos (ex.: diferença entre valor faturado e tabela SIGTAP).
    - **Sugestões de Otimização** (Função 2):
      - Lista de "Procedimentos perdidos":
        - Exemplo: "Para o CID J18.9 (Pneumonia), você poderia ter faturado 07.03.01.012-5 (R$ 1.500) em vez de 07.03.01.011-7 (R$ 900)".
      - Filtros:
        - "Mostrar apenas sugestões com diferença > R$ 300".
        - "Excluir procedimentos que requerem licença não possuída".

### **Dashboard Pós-Análise**
- **Métricas por Unidade Hospitalar**:
  - "Top 5 procedimentos com maior contestação" (valores a restituir).
  - "Receita potencial perdida" (soma das sugestões de otimização).
- **Comparativo Mensal**:
  - "Evolução de contestações" (gráfico linha).
  - "Procedimentos mais realizados vs. mais lucrativos" (gráfico barras).

---

## **5. Fluxo Completo do Sistema**
```mermaid
flowchart TD
    A[Upload do TXT de Fechamento] --> B{Validação do Arquivo}
    B -->|Sucesso| C[Extrair Procedimentos/CIDs]
    B -->|Erro| D[Alertar Usuário]
    C --> E[Cruzar com SIGTAP]
    E --> F[Auditoria: Licenças, CIDs, Valores]
    E --> G[Sugestões: Procedimentos Melhores]
    F --> H[Dashboard de Erros]
    G --> I[Dashboard de Otimização]
    H --> J[Relatório para Correição]
    I --> K[Relatório para Ajustes]
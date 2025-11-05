# gestor_de_tarefas

Projeto realizado através de um desafio técnico de conhecimentos full-stack.

# Ever Kanban

Projeto Full Stack com autenticação JWT, banco SQLite e frontend React.

## 🗓️ Day 1 — Inicialização

## 🏗️ Estrutura

- /apps/api → servidor (Node + TypeScript + Express)
- /apps/web → frontend (React)

## 🚀 Como rodar a API (etapa atual)

1. cd apps/api
2. npm install
3. npm run dev
4. Acesse http://localhost:3000/teste

## 📚 Documentação

Swagger: http://localhost:3000/docs

---

## 🗓️ Dia 2 — Modelagem de Dados (Desenhando o Mundo)

### 🎯 Objetivo

Defina a estrutura do sistema: entidades, relacionamentos e permissões.  
Este é o **projeto-base** de como o seu aplicativo vai funcionar internamente — ainda **sem código**, apenas **lógica e clareza**.

---

## 🧩 Entidades (Objetos Principais)

### 👤 User

Representa uma pessoa que usa o sistema.

| Campo      | Tipo            | Descrição           |
| :--------- | :-------------- | :------------------ |
| `id`       | number / UUID   | identificador único |
| `name`     | string          | nome do usuário     |
| `email`    | string          | e-mail de login     |
| `password` | string (hashed) | senha criptografada |
| `role`     | string          | “admin” ou “user”   |

**Regras:**

- `admin` pode criar, editar, excluir e atribuir tarefas.
- `user` pode apenas gerenciar suas próprias tarefas.

---

### ✅ Task

Representa uma tarefa ou item de trabalho.

| Campo         | Tipo          | Descrição                            |
| :------------ | :------------ | :----------------------------------- |
| `id`          | number / UUID | identificador único                  |
| `title`       | string        | título curto da tarefa               |
| `description` | string        | detalhes da tarefa                   |
| `start_date`  | date          | data de início                       |
| `end_date`    | date          | prazo final                          |
| `priority`    | number (0–10) | nível de prioridade                  |
| `status`      | string        | “To Do”, “In Progress”, “Done”, etc. |
| `assigned_to` | user_id       | quem é o responsável pela tarefa     |

**Regras:**

- Cada tarefa pertence a um único usuário.
- Somente administradores podem atribuir tarefas a outros usuários.

---

### 💬 Comment

Representa uma mensagem anexada a uma tarefa.

| Campo        | Tipo          | Descrição              |
| :----------- | :------------ | :--------------------- |
| `id`         | number / UUID | identificador único    |
| `task_id`    | number        | tarefa à qual pertence |
| `user_id`    | number        | autor do comentário    |
| `text`       | string        | conteúdo do comentário |
| `created_at` | date          | data de criação        |

**Regras:**

- Cada tarefa pode ter vários comentários.
- Cada comentário pertence a um único usuário.

---

### 🏷️ Tag

Representa uma etiqueta de categorização.

| Campo  | Tipo   | Descrição           |
| :----- | :----- | :------------------ |
| `id`   | number | identificador único |
| `name` | string | nome da tag         |

**Regras:**

- Uma tarefa pode ter várias tags.
- Uma tag pode pertencer a várias tarefas.
- Isso exige uma tabela de ligação: **TaskTag**

| Campo     | Tipo   |
| :-------- | :----- |
| `task_id` | number |
| `tag_id`  | number |

---

### 📎 Attachment

Representa arquivos anexados a uma tarefa.

| Campo           | Tipo   | Descrição                        |
| :-------------- | :----- | :------------------------------- |
| `id`            | number | identificador único              |
| `task_id`       | number | tarefa à qual pertence           |
| `file_path`     | string | caminho onde o arquivo foi salvo |
| `original_name` | string | nome original do arquivo         |
| `size`          | number | tamanho do arquivo em bytes      |
| `uploaded_at`   | date   | data do upload                   |

**Regras:**

- Uma tarefa pode ter vários anexos.

---

## 🔗 Diagrama de Relacionamentos (em texto)

User 1 --- n Task 1 --- n Comment
|
n
Tag (via TaskTag)
|
n
Attachment

- Um **User** pode ter várias **Tasks**.
- Uma **Task** pode ter vários **Comments** e **Attachments**.
- Uma **Task** pode ter várias **Tags**, e uma **Tag** pode pertencer a várias **Tasks** (relação n:n).

---

## ⚖️ Matriz de Permissões

| Ação                             | Admin |     User      |
| :------------------------------- | :---: | :-----------: |
| Criar / Editar / Excluir Tarefa  |  ✅   |      ❌       |
| Atribuir Tarefa                  |  ✅   |      ❌       |
| Alterar Status da Própria Tarefa |  ✅   |      ✅       |
| Comentar em Tarefa               |  ✅   |      ✅       |
| Enviar Anexo                     |  ✅   |      ✅       |
| Gerenciar Tags                   |  ✅   | ✅ (opcional) |

---

## 🗓️ Dia 3 — Banco de Dados e Integração com a API

### 🎯 Objetivo

Transformar o modelo de dados em um banco de dados real (SQLite) e conectar a API utilizando o Prisma ORM, garantindo armazenamento persistente e comunicação funcional entre backend e banco.

### 🧩 Principais Conquistas

✅ Configuração completa do Prisma ORM com SQLite.
✅ Geração e validação do Prisma Client.
✅ Implementação da primeira rota de API (/tasks) conectada ao banco.
✅ Testes funcionais realizados via Postman, Thunder Client e curl.

### ⚙️ Detalhes Técnicos

#### Banco de Dados: SQLite integrado via Prisma

Geração do Client: npx prisma generate

Variáveis de Ambiente (.env): DATABASE_URL="file:./prisma/dev.db"

Comando de Teste: curl http://localhost:3000/tasks

### 🧪 Resultados

Após a configuração e migração bem-sucedidas, a rota /tasks retornou registros persistidos no banco SQLite, confirmando que:

A conexão entre Express e Prisma está funcionando corretamente.

As migrações e o schema foram aplicados com sucesso.

Os dados são salvos e recuperados do banco de forma estável.

### 🧰 Stack Utilizada

Node.js 22+;

TypeScript;

Express.js;

Prisma ORM;

SQLite;

Prisma Studio (para visualização e edição dos dados).

## 🗓️ Dia 4 — Relacionamentos e Expansão da API

### 🎯 Objetivo

Ampliar o sistema para lidar com relacionamentos entre tarefas e outros elementos, como **comentários**, **anexos** e **tags**, permitindo uma interação mais completa com os dados no banco.

---

## 🧩 Estrutura e Modelos Adicionados

### 💬 Comment

Representa comentários vinculados a uma tarefa específica.

| Campo       | Tipo   | Descrição           |
| :---------- | :----- | :------------------ |
| `id`        | number | identificador único |
| `content`   | string | texto do comentário |
| `taskId`    | number | tarefa relacionada  |
| `createdAt` | date   | data de criação     |

---

### 📎 Attachment

Representa arquivos anexados a uma tarefa.

| Campo          | Tipo   | Descrição                        |
| :------------- | :----- | :------------------------------- |
| `id`           | number | identificador único              |
| `filePath`     | string | caminho onde o arquivo foi salvo |
| `originalName` | string | nome original do arquivo         |
| `size`         | number | tamanho em bytes                 |
| `taskId`       | number | tarefa associada                 |
| `uploadedAt`   | date   | data de upload                   |

---

### 🏷️ Tag

Usada para classificar tarefas de forma flexível.

| Campo   | Tipo    | Descrição                |
| :------ | :------ | :----------------------- |
| `id`    | number  | identificador único      |
| `name`  | string  | nome da tag              |
| `tasks` | relação | tarefas vinculadas (N:N) |

---

## ⚙️ Migração e Configuração

- Atualização do **schema do Prisma** com novos modelos.
- Execução de nova migração:
  ```bash
  npx prisma migrate dev --name add_comments_attachments_and_tags
  ```

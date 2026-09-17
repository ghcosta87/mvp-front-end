# 🛍️ MVP - Preço Hub - Preços de Supermercado unificados - Frontend

Este projeto é um MVP (Minimum Viable Product) com foco no acompanhamento da gestão de preços de itens de Supermercado. A aplicação centraliza e armazena preços dos produtos, registra e calcula a média de variação de preços dos produtos ao longo do tempo.

> **Contexto Acadêmico:** Este projeto faz parte do escopo de avaliação e material didático da disciplina **Desenvolvimento Full Stack Básico**. O objetivo principal é ilustrar e aplicar na prática os conceitos arquiteturais e de código apresentados ao longo das aulas.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** HTML5, CSS3, Bootstrap


## 🔗 Links

### Olá, seguem os dados referentes à entrega do meu MVP.

- Link para o vídeo: [https://www.youtube.com/](https://www.youtube.com/) 
- Link para o repositório do front-end: [https://github.com/ghcosta87/mvp-front-end.git](https://github.com/ghcosta87/mvp-front-end.git)


## 🚀 Como executar o projeto na sua máquina
### Frontend
```bash
git clone https://github.com/ghcosta87/mvp-front-end.git
```
Abra o arquivo `index.html` com navegador de sua preferência

# ➕ Extras 

## 🖥️ CONFIGURANDO PARA SELF HOSTING 
```bash
mkdir precohub
cd precohub
git clone https://github.com/ghcosta87/mvp-back-end.git
mv mvp-back-end backend

git clone https://github.com/ghcosta87/mvp-front-end.git
mv mvp-front-end frontend

echo "FROM python:3.10-slim" > backend/Dockerfile
echo "WORKDIR /app" >> backend/Dockerfile
echo "COPY requirements.txt ." >> backend/Dockerfile 
echo "RUN pip3 install -r requirements.txt" >> backend/Dockerfile
echo "COPY . ." >> backend/Dockerfile
echo "EXPOSE 5000" >> backend/Dockerfile
echo 'CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]' >> backend/Dockerfile

echo "FROM nginx:alpine" > frontend/Dockerfile
echo "COPY . /usr/share/nginx/html" >> frontend/Dockerfile
echo "EXPOSE 80" >> frontend/Dockerfile
nano frontend/js/constantes.js

echo "services:" > docker-compose.yaml
echo "  api:" >> docker-compose.yaml
echo "    build: ./backend" >> docker-compose.yaml
echo "    ports:" >> docker-compose.yaml
echo "      - "35111:5000"" >> docker-compose.yaml
echo "    restart: unless-stopped" >> docker-compose.yaml
echo "    volumes:" >> docker-compose.yaml
echo "      - ./backend/database:/app/database" >> docker-compose.yaml
echo "      - ./backend/.env:/app/.env" >> docker-compose.yaml
echo "  web:" >> docker-compose.yaml
echo "    build: ./frontend" >> docker-compose.yaml
echo "    ports:" >> docker-compose.yaml
echo "      - "35112:80"" >> docker-compose.yaml
echo "    depends_on:" >> docker-compose.yaml
echo "      - api" >> docker-compose.yaml
echo "    restart: unless-stopped" >> docker-compose.yaml

docker compose build

mv frontend/Dockerfile .Dockerfile-frontend
mv backend/Dockerfile .Dockerfile-backend

rm -Rf frontend backend
mkdir backend backend/database

echo 'API_NAME="Gemini API Key"' > backend/.env
echo 'API_KEY=""' >> backend/.env
echo 'PROJECT_NAME=""' >> backend/.env 
echo 'PROJECT_NUMBER=""' >> backend/.env

nano backend/.env

docker compose up -d
```
Através do navegador de sua preferência digite o ip-da-maquina:35112

## BUGS CONHECIDOS
```
- [ SOLVED ] cadastro concluido com sucesso está retornando erro no toast
- [ SOLVED ] modal fica aberto na pagina inicial
- [ SOLVED ] algumas vezes o aviso "toast" fica somente em vermelho
- [ SOLVED ] ao anexar o arquivo o sidebar não esconde
- [ SOLVED ] avisos do painel nao estao centralizados
- [ SOLVED ] botao voltar na janela de cadastro esta sem fade ao passar o mouse
- [        ] alterar a resposta para receber o nome do usuário, e não o email
- [        ] quando usuario força login pelo console a função GET ainda puxa os dados do backend
```

## FUTURAS ATUALIZAÇÕES
```
- [        ] centralizar as funções com chamadas de api
- [ SOLVED ] botao no alto a direita pra trocar o tema, com apenas um icone
- [ SOLVED ] adicionar o spinner de loading no botao de cadastro
- [        ] passar texto simulando chat da AI abaixo da barra de pesquisaq
- [        ] criar fila de envio
- [        ] criar página inicial acima de todas para indicar o carregamento
- [        ] mostrar o nome da loja mais em conta
```
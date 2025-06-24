FROM node:18

WORKDIR /usr/src/app

RUN useradd -m invitado

COPY package*.json ./

RUN npm install

COPY . .

RUN chown -R invitado:invitado /usr/src/app

USER invitado

EXPOSE 3000

CMD ["npm", "start"]
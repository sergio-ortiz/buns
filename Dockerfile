FROM oven/bun

WORKDIR /app

COPY . .

ENV NODE_ENV production

CMD ["bun", "index.js"]

EXPOSE 3000

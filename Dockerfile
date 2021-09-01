FROM buildkite/puppeteer:latest

RUN apt-get update
RUN apt install ffmpeg -y
RUN apt install tesseract-ocr -y

WORKDIR /app
COPY . /app
RUN npm install
CMD ["npm", "start"]
EXPOSE 8080
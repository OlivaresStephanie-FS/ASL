FROM rust:latest

WORKDIR /app

COPY . .

RUN rustc main.rs -o hello

CMD ["./hello"]
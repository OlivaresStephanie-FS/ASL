# Docker Language Assignment

This repository contains my Week 1 Docker assignment for Advanced Server-Side Languages (ASL).

## Assignment Overview

The objective of this project was to create and execute Docker containers for multiple programming languages. Each container was configured to:

1. Display the message:

```
Hello ASL!
```

2. Display the current date and time.

Each programming language was isolated within its own Docker container and built using a dedicated Dockerfile.

---

## Languages Implemented

The following languages were successfully containerized and executed:

- PHP
- Ruby
- Python
- Lua
- Node.js
- Rust
- C
- Java
- Go (Golang)

---

## Project Structure

```text
docker-assignment/
├── php/
├── ruby/
├── python/
├── lua/
├── nodejs/
├── rust/
├── c/
├── java/
└── golang/
```

Each folder contains:

- A Dockerfile
- Source code for the language
- Commands required to build and execute the container

---

## Example Build and Run Commands

Build the image:

```bash
docker build -t asl-python .
```

Run the container:

```bash
docker run --rm asl-python
```

Example output:

```text
Hello ASL!
Current date: 2026-06-01 20:33:25
```

---

## Learning Outcomes

This assignment provided hands-on experience with:

- Docker images
- Docker containers
- Dockerfiles
- Building custom images
- Running applications inside containers
- Working with interpreted and compiled languages
- Cross-language development environments

---

## Author

Stephanie Olivares

Advanced Server-Side Languages (ASL)

Full Sail University

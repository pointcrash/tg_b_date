FROM python:3.12

WORKDIR /app

COPY . .

RUN pip install uv

RUN uv sync

RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]

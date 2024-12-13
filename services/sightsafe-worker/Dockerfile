FROM python:3.11-slim

# Install curl
RUN apt-get update && \
    apt-get install curl -y && \
    pip install --no-cache-dir pipenv

WORKDIR /opt/worker

COPY Pipfile Pipfile.lock ./

RUN pipenv install --system --deploy

COPY main ./main
COPY fixtures ./fixtures

CMD ["python", "-m", "main"]

FROM python:3.7.0-alpine3.8

WORKDIR /root/scraping

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY concert_scraping.py ./

CMD [ "python", "concert_scraping.py" ]

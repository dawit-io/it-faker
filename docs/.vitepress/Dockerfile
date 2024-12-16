FROM ubuntu
RUN apt update
RUN apt install -y apache2
RUN apt install -y apache2-utils
RUN apt-get install -y nano
RUN a2enmod rewrite
RUN apt clean
COPY 000-default.conf /etc/apache2/sites-available
COPY ./dist/ /var/www/html
EXPOSE 80
CMD ["apache2ctl", "-D", "FOREGROUND"]
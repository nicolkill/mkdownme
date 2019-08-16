FROM node:carbon

ENV INSTALL_PATH /app/

WORKDIR $INSTALL_PATH
COPY . .

ENTRYPOINT ["./run.sh"]

EXPOSE 5000

CMD ["start"]

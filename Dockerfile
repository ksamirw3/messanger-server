FROM readytalk/nodejs

ADD package.json package.json  
RUN npm install  
ADD . .

EXPOSE 3000
CMD ["node","server.js"]

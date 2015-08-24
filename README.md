# TESTE DE FERRAMENTA: CouchDB/PouchDB
Este repostitório foi criado para testar o [CouchDB](http://couchdb.apache.org/) como ferramenta de sincronização de dados entre uma aplicação mobile, desenvolvida no Framework [Ionic](http://ionicframework.com/).

### Instalação
OBS.: Este documento foi criado para execução em um ambiente Ubuntu. As devidas alterações deverão ser feitas, para que este funcione em outros ambientes.

#### Instalação **Ionic**
Instalação do nodejs
```
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get update
sudo apt-get install nodejs build-essential
```

Instalação do Ionic
```
npm install -g
npm install -g cordova ionic
```

#### Instalação **CouchDB**
Além da instalação do couchdb, também optou-se por utilizar o pacote npm **add-cors-to-couchdb**, pois este facilita na configuração do couchdb para evitar problemas de CORS (*Cross Origin Resource Sharing*)

```
sudo apt-get install couchdb
npm install -g add-cors-to-couchdb
add-cors-to-couchdb
```

Se for necessário executar requisições ao CouchDB de outro host que além daquele onde o serviço foi instalado, alterar o arquivo **/etc/couchdb/local.ini**, adicionando a seguinte linha ao final do arquivo
```
bind_address 0.0.0.0
```

Para testar as configurações, executar no browser ```http://<couchdb_ip>:5984/_utils```, onde as coleções podem ser gerenciadas.

### Inicialização da aplicação
Para colocar este pacote em funcionamento, baixa-lo (git clone ...), acessar a pasta recem criada para este projeto e executar os seguintes comandos
```
npm install
bower install
ionic platform add android
ionic build android
ionic serve
```

a aplicação já deverá estar funcionando!

### Links
* [Ionic](http://ionicframework.com/)
* [CouchDB](http://couchdb.apache.org/)
* [PouchDB](http://pouchdb.com/)
* [PouchDB + AngularJS](https://github.com/angular-pouchdb/angular-pouchdb)

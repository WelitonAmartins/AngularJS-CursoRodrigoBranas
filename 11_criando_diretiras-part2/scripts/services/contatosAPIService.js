angular.module('app').factory("contatosAPI", function($http, config){
    var _getContatos = function(){
    var urlapi = config.baseUrl + "/contatos"
    return $http({
        url: urlapi,
        method: 'GET'
      });
    };

    var _saveContato = function(contato){
        return $http.post(config.baseUrl +"/contatos", contato);
    }
    return{
        getContatos: _getContatos,
        saveContato: _saveContato
    };
});
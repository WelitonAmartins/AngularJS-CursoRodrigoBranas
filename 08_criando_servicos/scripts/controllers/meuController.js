angular.module('app').controller('Controller', function($scope, $http){
    $scope.lista = "Lista Telefonica"
    $scope.contatos = [];
    $scope.operadoras = [];
    var carregarContatos = function(){
        
        var urlapi = "http://localhost:8081/contatos"
        $http({
            url: urlapi,
            method: 'GET'
        }).then(function(resposta){
            $scope.contatos = resposta.data;
        
        }).catch(function(data, status){
            $scope.message = "Aconteceu um problema"+ data;
        }).finally(function(){
            $scope.carregarContatos = true;
        });
        
    }
    var carregarOperadoras = function(){
        var urlapi ='http://localhost:8081/operadoras'
          $http({
                url: urlapi,
                method: 'GET'
            }).then(function(resposta){
                $scope.operadoras = resposta.data;
            }, function(resposta){
                alert('Algum erro aconteceu');
            }).finally(function(){//finally sempre executa quando for finalizado 
                $scope.carregarOperadoras = true;
        
        });
    }

    $scope.adicionarContato = function(contato){
       contato.instante = new Date();
       $http.post("http://localhost:8081/contatos", contato).then(function(data){
        delete $scope.contato;
        $scope.contatoForm.$setPristine(); // fazendo o campo voltar a ser pristine a ser virgem
        carregarContatos();
       });
        
    };
    $scope.apagar = function(contatos){
       $scope.contatos = contatos.filter(function (contato){// filter filtrando nessa funcao os contatos selecionados
            if(!contato.selecionado) return contato;
        }); 
    };
    $scope.isContatosSelecionados = function (contatos){
        return contatos.some(function (contato){ // some vai olhar contato a contato e o return true vai ser se contato.selecionado
             return contato.selecionado;
         });
     };

     $scope.ordenarPor = function(campo){
         $scope.criterioDeOrdenacao = campo;
         $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
     }; 
     carregarContatos();
     carregarOperadoras();
});
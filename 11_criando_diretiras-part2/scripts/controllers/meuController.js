angular.module('app').controller('Controller', function($scope, $http, contatosAPI, operadorasAPI){
    $scope.lista = "Lista Telefonica"
    $scope.error = " Erro ao carregar contatos "
    $scope.contatos = [];
    $scope.operadoras = [];
    $scope.contato = {
		data: 1034218800000
};
    var carregarContatos = function(){
        
        contatosAPI.getContatos().then(function(resposta){
            $scope.contatos = resposta.data;
        
        }).catch(function(resposta){
            $scope.message = "Aconteceu um problema";
        }).finally(function(){
            $scope.carregarContatos = true;
        });
        
    }
    var carregarOperadoras = function(){
        operadorasAPI.getOperadoras().then(function(resposta){
                $scope.operadoras = resposta.data;
            
            }).finally(function(){//finally sempre executa quando for finalizado 
                $scope.carregarOperadoras = true;
        
        });
    }

    $scope.adicionarContato = function(contato){
    
       contato.instante = new Date();
       contatosAPI.saveContato(contato).then(function(data){
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
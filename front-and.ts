
 

========= Service

 (function() {

    var app = angular.module("e-processo-ui");
    app.factory('Service', function($http, Upload) {

       _getFiltroRoteiroOperacional = function(filtro) {
        return  $http({
          url: '/url-exemplo/lista-roteiro-operacional',
          method: 'GET',
          params: filtro
        });
      };

             return {
                  getFiltroRoteiroOperacional : _getFiltroRoteiroOperacional
             }

});
})();


============ controller

    ctrl.buscar = function (dados) {
        
        ctrl.loading = true;
        emitirOrdemServicoService.getFiltroRoteiroOperacional(dados).then(
          function(success) {
            
            ctrl.listaRoteiroOperacional = success.data;
            ctrl.loading = false;

          },function(error) {
            toastService.show('Erro ao consultar roteiro operacional.', 'error');
            ctrl.loading = false;
          });
    };



========HTML


    <md-card>
        <md-card-title>
            <md-card-title-text>
                <span class="md-headline">Roteiro operacional</span>
            </md-card-title-text>
        </md-card-title>

        <md-card-content layout="row">
          <div layout="row" layout-xs="column" layout-sm="column" layout-align="start center">
            <div>
              <md-button class="md-primary"
                         ng-disabled="ctrl.selectedRoteiroOperacionalIncluido[0] != null"
                         ng-click="ctrl.incluirRoteiroOperacional();"> 
              <md-icon class="name">add</md-icon> Incluir
          </md-button>
      </div>
       <div>
          <md-button class="md-warn"
                     ng-disabled="ctrl.selectedRoteiroOperacionalIncluido[0] == null"
                     ng-click="ctrl.excluirRoteiroOperacional(ctrl.selectedRoteiroOperacionalIncluido);">
            <md-icon class="name">clear</md-icon> Excluir
          </md-button>
        </div>
</div>
</md-card-content>

<md-card-content>
   <md-table-container id="table_wrapper">
      <table md-table md-row-select multiple="true" ng-model="ctrl.selectedRoteiroOperacionalIncluido" 
      class="mdDataTableResponsive">
      <thead md-head md-order="ctrl.query.order">
        <tr md-row>
            <th md-column md-order-by="codigo"><span>Código</span></th>
            <th md-column md-order-by="descricao"><span>Descrição</span></th>
        </tr>
    </thead>

    <tbody md-body ng-repeat="RoteiroOperacional in ctrl.listaRoteiroOperacionalIncluidos |orderBy: ctrl.queryRoteiroOperacionalIncluido.order | limitTo: ctrl.queryRoteiroOperacionalIncluido.limit : (ctrl.queryRoteiroOperacionalIncluido.page -1) * ctrl.queryRoteiroOperacionalIncluido.limit">

       <tr md-row md-select="RoteiroOperacional" md-auto-select>
         <td md-cell data-label="Código">
         {{RoteiroOperacional.idRoteiroOperacional ? RoteiroOperacional.idRoteiroOperacional : '-'}}</td>
         <td md-cell data-label="Descrição">
         {{RoteiroOperacional.descricaoRoteiroOperacional ?  RoteiroOperacional.descricaoRoteiroOperacional : '-'}}</td>
     </tr>

 </tbody>
</table>
</md-table-container>
<div ng-if="ctrl.listaRoteiroOperacionalIncluidos.length == 0" class="text-center" flex layout-padding>
  <img src="/sefa-ui/v1/svg/nenhum-resultado.svg?v=2" class="img-responsive" height="">
  <div class="svg-titulo">
    Nenhum resultado encontrado
</div>
<div class="svg-subtitulo">
    Faça um novo cadastro
</div>
</div>
<md-table-pagination md-label="{page: 'Página:', rowsPerPage: '', of: 'de'}" 
md-limit="ctrl.queryRoteiroOperacionalIncluido.limit" 
md-limit-options="ctrl.limitOptionsRoteiroOperacionalIncluido" 
md-page="ctrl.queryRoteiroOperacionalIncluido.page" 
md-total="{{ctrl.listaRoteiroOperacionalIncluidos.length}}" md-boundary-links="true">
</md-table-pagination>

</md-card-content>
</md-card>



=============== utilizaçao typeScript


================Modulo

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent],
    bootstrap: [ AppComponent ]
})
export class AppModule { }



========= component.ts

import { Component } from '@angular/core';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
})

export class AppComponent {
    titulo:string = "Titulo da aplicacação";
    nome:string = "Fulando de tal";
    lista:Array<string>=["Nome 1", "Nome 2", "Nome 3"];
}


=========== .html

<h1>{{titulo}}</h1>
    <h2>O Nome: {{nome}}
</h2>

<ul>
  <li *ngFor="let item of lista">
    {{item}}
  </li>
</ul>
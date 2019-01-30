import { NgModule } from '@angular/core';
import { IonicPageModule, List } from 'ionic-angular';
import { ListaAgendamentosPage } from './lista-agendamentos';

@NgModule({
  declarations: [
    ListaAgendamentosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaAgendamentosPage),
  ],
  exports: [
    ListaAgendamentosPage,
  ],
})
export class ListaAgendamentosPageModule {}

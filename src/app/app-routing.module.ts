import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MembersComponent } from './members/members.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', redirectTo: '/members', pathMatch: 'full'},
  {path: 'members', component: MembersComponent},
  {path: 'members/:id', component: MemberComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [ MemberComponent, MembersComponent]
